"""
LangGraph Agent with Qwen3-14B (vLLM) + Tavily Web Search
==========================================================
Deployed on Modal.com as a unified GPU-accelerated service.

Architecture:
  ┌─────────────────────────────────────────────┐
  │  Modal GPU Container (L40S)                 │
  │                                             │
  │  ┌──────────────────────────────────────┐   │
  │  │  vLLM Server (OpenAI-compatible)     │   │
  │  │  Qwen3-14B · Tool Calling · Hermes   │   │
  │  └──────────┬───────────────────────────┘   │
  │             │ localhost:8000/v1              │
  │  ┌──────────▼───────────────────────────┐   │
  │  │  LangGraph ReAct Agent               │   │
  │  │  ├─ web_search (Tavily)              │   │
  │  │  └─ search_company_careers (Tavily)  │   │
  │  └──────────────────────────────────────┘   │
  └─────────────────────────────────────────────┘

Usage:
  Deploy:  modal deploy agent.py
  Test:    modal run agent.py
  Serve:   modal serve agent.py   (dev mode with hot-reload)
"""

from __future__ import annotations

import json
import os
import subprocess
import time
from typing import Any, Optional

import modal

# ─── Configuration ────────────────────────────────────────────────────────
MODEL_NAME = "Qwen/Qwen3-14B"
MAX_MODEL_LEN = 8192
VLLM_PORT = 8000
GPU_TYPE = "l40s"

app = modal.App("qwen3-agent")

# ─── Docker image with ALL dependencies ──────────────────────────────────
# The model is pre-downloaded at image build time so it's baked into the
# image layer. This avoids a ~28GB download on every cold start.
image = (
    modal.Image.from_registry(
        "nvidia/cuda:12.4.1-devel-ubuntu22.04",
        add_python="3.11",
    )
    .pip_install(
        # vLLM + inference
        "vllm>=0.8.5",
        "transformers>=4.45.0",
        "torch>=2.4.0",
        "hf-transfer>=0.1.6",
        # LangChain + LangGraph
        "langchain>=0.3.0",
        "langchain-openai>=0.2.0",
        "langchain-community>=0.3.0",
        "langgraph>=0.2.0",
        # Tavily web search
        "tavily-python>=0.5.0",
        # HTTP
        "httpx>=0.27.0",
        "fastapi[standard]>=0.115.0",
    )
    .env({
        "HF_HUB_ENABLE_HF_TRANSFER": "1",
        "VLLM_ATTENTION_BACKEND": "FLASH_ATTN",
    })
    # Pre-download model weights into the image (one-time cost at build)
    .run_commands(
        f"python -c \"from huggingface_hub import snapshot_download; "
        f"snapshot_download('{MODEL_NAME}', local_dir='/models/{MODEL_NAME}')\"",
    )
)

# After baking the model into the image, point to it directly
BAKED_MODEL_PATH = f"/models/{MODEL_NAME}"


# ═══════════════════════════════════════════════════════════════════════════
#  Agent Service — GPU container running vLLM + LangGraph together
# ═══════════════════════════════════════════════════════════════════════════

@app.cls(
    image=image,
    gpu=GPU_TYPE,
    secrets=[modal.Secret.from_name("tavily-secret")],  # TAVILY_API_KEY
    scaledown_window=300,
    timeout=60 * 60,
)
@modal.concurrent(max_inputs=16)
class AgentService:
    """
    Unified service: starts vLLM on the GPU, then runs LangGraph
    agent queries through it. Everything in one container for
    zero-latency LLM calls (no network hop).
    """

    # ── Lifecycle ──────────────────────────────────────────────────────

    @modal.enter()
    def start(self):
        """Boot the vLLM server and wait until it's healthy."""
        import threading

        print("🚀 Starting vLLM server...")
        self._server = subprocess.Popen(
            [
                "python", "-m", "vllm.entrypoints.openai.api_server",
                "--model", BAKED_MODEL_PATH,
                "--served-model-name", MODEL_NAME,
                "--port", str(VLLM_PORT),
                "--max-model-len", str(MAX_MODEL_LEN),
                "--dtype", "bfloat16",
                "--enable-auto-tool-choice",
                "--tool-call-parser", "hermes",
                "--trust-remote-code",
            ],
            # Stream output to container logs (NOT to PIPE — that deadlocks)
            stdout=None,
            stderr=None,
        )
        self._wait_for_server()
        self._init_agent()

    def _wait_for_server(self, timeout: int = 600):
        """Poll the /health endpoint until vLLM is ready."""
        import httpx
        for i in range(timeout):
            # Check if the process has crashed
            ret = self._server.poll()
            if ret is not None:
                raise RuntimeError(
                    f"vLLM process exited with code {ret} after {i}s. "
                    f"Check the Modal container logs for details."
                )
            try:
                r = httpx.get(f"http://localhost:{VLLM_PORT}/health", timeout=2)
                if r.status_code == 200:
                    print(f"✅ vLLM ready in {i + 1}s")
                    return
            except (httpx.ConnectError, httpx.ReadTimeout):
                pass
            if i % 30 == 0 and i > 0:
                print(f"⏳ Still waiting for vLLM... ({i}s elapsed)")
            time.sleep(1)
        raise RuntimeError(f"vLLM failed to start within {timeout}s")

    def _init_agent(self):
        """Initialize the LangGraph agent after vLLM is up."""
        from langchain_openai import ChatOpenAI
        from langchain_core.tools import tool
        from langgraph.prebuilt import create_react_agent
        from tavily import TavilyClient

        # ── LLM via local vLLM ──
        self.llm = ChatOpenAI(
            model=MODEL_NAME,
            base_url=f"http://localhost:{VLLM_PORT}/v1",
            api_key="not-needed",
            temperature=0.3,
            max_tokens=2048,
        )

        # ── Tavily client ──
        tavily_api_key = os.environ.get("TAVILY_API_KEY", "")
        self.tavily = TavilyClient(api_key=tavily_api_key)

        # ── Tool definitions ──
        tavily_ref = self.tavily  # closure reference

        @tool
        def web_search(query: str) -> str:
            """Search the web for real-time information on any topic.
            Use this for current events, facts, documentation, news,
            or anything that may need up-to-date data."""
            try:
                results = tavily_ref.search(
                    query=query,
                    max_results=5,
                    search_depth="advanced",
                    include_answer=True,
                )
                parts = []
                if results.get("answer"):
                    parts.append(f"**Summary:** {results['answer']}\n")
                for i, r in enumerate(results.get("results", []), 1):
                    parts.append(
                        f"{i}. [{r.get('title', '')}]({r.get('url', '')})\n"
                        f"   {r.get('content', '')[:500]}\n"
                    )
                return "\n".join(parts) or "No results found."
            except Exception as e:
                return f"Search error: {e}"

        @tool
        def search_company_careers(company_name: str) -> str:
            """Search for a specific company's career/jobs page, hiring info,
            and open positions. Returns URLs and summaries."""
            try:
                results = tavily_ref.search(
                    query=f"{company_name} careers jobs hiring apply",
                    max_results=5,
                    search_depth="advanced",
                    include_answer=True,
                )
                parts = []
                if results.get("answer"):
                    parts.append(f"**Career Info:** {results['answer']}\n")
                for i, r in enumerate(results.get("results", []), 1):
                    parts.append(
                        f"{i}. [{r.get('title', '')}]({r.get('url', '')})\n"
                        f"   {r.get('content', '')[:500]}\n"
                    )
                return "\n".join(parts) or "No career info found."
            except Exception as e:
                return f"Career search error: {e}"

        self.tools = [web_search, search_company_careers]

        # ── Build the LangGraph ReAct agent ──
        self.agent = create_react_agent(
            model=self.llm,
            tools=self.tools,
        )
        print("✅ LangGraph agent initialized")

    @modal.exit()
    def stop(self):
        if hasattr(self, "_server") and self._server:
            self._server.terminate()
            self._server.wait(timeout=10)
            print("🛑 vLLM server stopped")

    # ── Agent Methods ──────────────────────────────────────────────────

    @modal.method()
    def chat(self, query: str, system_prompt: str | None = None) -> dict:
        """
        Run a single agent query.

        Args:
            query: The user's question or instruction.
            system_prompt: Optional system instructions.

        Returns:
            {
                "query": str,
                "response": str,
                "steps": int,
                "tool_calls": [{tool, input, output}]
            }
        """
        messages = []
        if system_prompt:
            messages.append(("system", system_prompt))
        messages.append(("user", query))

        result = self.agent.invoke({"messages": messages})

        # Parse the result
        all_msgs = result.get("messages", [])
        final = all_msgs[-1] if all_msgs else None

        tool_calls = []
        for msg in all_msgs:
            if hasattr(msg, "type") and msg.type == "tool":
                tool_calls.append({
                    "tool": getattr(msg, "name", "unknown"),
                    "output": msg.content[:800] if msg.content else "",
                })

        return {
            "query": query,
            "response": final.content if final else "No response.",
            "steps": len(all_msgs),
            "tool_calls": tool_calls,
        }

    @modal.method()
    def research_company(self, company: str, website: str = "") -> dict:
        """
        Research a single company's career page.

        Returns structured info: career URL found from web search results.
        Returns null for career_url if nothing was found in search results.
        """
        company_info = "'" + company + "'"
        if website:
            company_info += " (their website is " + website + ")"

        json_example = '{"career_url": "<url or null>", "source": "<where you found it>", "confidence": "high/low/none"}'

        query = (
            "Search the web for the careers or jobs page of " + company_info + ".\n\n"
            "INSTRUCTIONS:\n"
            "1. You MUST call the search tool first. Do NOT skip searching.\n"
            "2. Look through the search results carefully for any career/jobs page URL.\n"
            "3. Only report a URL if you actually found it in the search results.\n"
            "4. Do NOT guess or fabricate a URL (e.g. do NOT just append /careers to the website).\n"
            "5. If the search results do not contain a careers page URL, say career_url is null.\n\n"
            "After searching, respond ONLY with this JSON (no other text):\n"
            + json_example
        )

        return self.chat(
            query=query,
            system_prompt=(
                "You are a strict career page verifier. You MUST use the web_search or "
                "search_company_careers tool before answering. You are FORBIDDEN from "
                "guessing URLs. If you did not find a career page URL in the actual "
                "search results, you MUST return null for career_url. "
                "Never assume a URL exists - only report what the search results show. "
                "Respond with JSON only."
            ),
        )


    @modal.method()
    def research_companies_batch(self, companies: list[str]) -> list[dict]:
        """Research multiple companies sequentially."""
        results = []
        for company in companies:
            try:
                r = self.research_company(company)
                results.append({"company": company, "status": "ok", **r})
            except Exception as e:
                results.append({"company": company, "status": "error", "error": str(e)})
        return results

    @modal.method()
    def health(self) -> dict:
        """Health check."""
        import httpx
        r = httpx.get(f"http://localhost:{VLLM_PORT}/health")
        return {"agent": "ok", "vllm": r.status_code}


# ═══════════════════════════════════════════════════════════════════════════
#  Web Endpoints — REST API for external access
# ═══════════════════════════════════════════════════════════════════════════

@app.function(
    image=image,
    secrets=[modal.Secret.from_name("tavily-secret")],
    timeout=300,
)
@modal.fastapi_endpoint(method="POST", docs=True)
def api_chat(body: dict) -> dict:
    """
    POST /api_chat

    Body:
    {
        "query": "What are the latest AI trends?",
        "system_prompt": "optional"
    }
    """
    query = body.get("query")
    if not query:
        return {"error": "Missing 'query' in request body"}

    agent = AgentService()
    return agent.chat.remote(
        query=query,
        system_prompt=body.get("system_prompt"),
    )


@app.function(
    image=image,
    secrets=[modal.Secret.from_name("tavily-secret")],
    timeout=600,
)
@modal.fastapi_endpoint(method="POST", docs=True)
def api_research(body: dict) -> dict:
    """
    POST /api_research

    Body:
    {
        "companies": ["Stripe", "Vercel", "Datadog"]
    }
    """
    companies = body.get("companies", [])
    if not companies:
        return {"error": "Missing 'companies' in request body"}

    agent = AgentService()
    return {"results": agent.research_companies_batch.remote(companies)}


# ═══════════════════════════════════════════════════════════════════════════
#  Local Entrypoint — Test from your terminal
# ═══════════════════════════════════════════════════════════════════════════

@app.local_entrypoint()
def main():
    """Test the agent with sample queries."""
    agent = AgentService()

    print("=" * 60)
    print("🤖  Qwen3-14B + Tavily Agent — Test Suite")
    print("=" * 60)

    # ── Test 1: General web search ──
    print("\n🔍 Test 1: Web search query")
    print("-" * 40)
    r = agent.chat.remote(
        query="What are the latest developments in AI agents in 2025?"
    )
    print(f"Response: {r['response'][:800]}")
    print(f"Steps: {r['steps']} | Tool calls: {len(r['tool_calls'])}")

    # ── Test 2: Company career research ──
    print("\n🏢 Test 2: Company career page search")
    print("-" * 40)
    r = agent.research_company.remote("Datadog")
    print(f"Response: {r['response'][:800]}")

    # ── Test 3: Batch research ──
    print("\n📋 Test 3: Batch company research")
    print("-" * 40)
    results = agent.research_companies_batch.remote(["Stripe", "Vercel"])
    for item in results:
        print(f"\n  {item['company']}: {item['status']}")
        if item.get("response"):
            print(f"  {item['response'][:300]}...")

    print("\n✅ Done!")
