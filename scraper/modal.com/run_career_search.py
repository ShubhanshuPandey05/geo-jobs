"""
Career URL Search — API-Driven

Fetches companies without career URLs from the admin API,
uses the deployed Qwen3 Agent on Modal to research career pages,
and updates each company's career_url via the API as it finds them.

Usage:
    python run_career_search.py              # Research all without career URLs
    python run_career_search.py "Stripe"     # Research specific companies
    python run_career_search.py --dry-run    # Preview without calling API
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

import httpx

# ─── Config ───────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent

# Load .env from project root
ENV_PATH = SCRIPT_DIR / ".." / ".." / ".env"
if ENV_PATH.exists():
    for line in ENV_PATH.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())

API_BASE_URL = os.environ.get("API_BASE_URL", "http://localhost:3001")
ADMIN_TOKEN = os.environ.get("ADMIN_API_TOKEN", "")
MODAL_API_URL = "https://webdevshubhanshu--qwen3-agent-api-chat.modal.run"


def get_companies_without_career_url() -> list[dict]:
    """Fetch companies without career URLs from the admin API."""
    resp = httpx.get(
        f"{API_BASE_URL}/api/admin/companies/without-career-url",
        headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
        timeout=30.0,
    )
    resp.raise_for_status()
    data = resp.json()
    return data.get("companies", [])


def update_career_url(company_id: int, slug: str, career_url: str) -> bool:
    """Update a single company's career_url via the admin API."""
    try:
        resp = httpx.patch(
            f"{API_BASE_URL}/api/admin/companies/{slug}/career-url",
            json={"career_url": career_url},
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=15.0,
        )
        resp.raise_for_status()
        return True
    except Exception as e:
        print(f"   ⚠️  API update failed: {e}")
        return False


def extract_career_url(response_text: str, company_website: str = "") -> str | None:
    """
    Parse the agent's JSON response to extract career_url.
    Returns None if null or if the URL looks fabricated.
    """
    json_match = re.search(r'\{[^{}]*"career_url"[^{}]*\}', response_text, re.DOTALL)
    if json_match:
        try:
            data = json.loads(json_match.group(0))
            url = data.get("career_url")
            confidence = data.get("confidence", "none")

            if not url or url == "null" or url == "None":
                return None
            if confidence == "none":
                return None

            # Reject fabricated URLs (just website + /careers)
            if company_website:
                base = company_website.rstrip("/")
                fabricated = [
                    f"{base}/careers", f"{base}/career",
                    f"{base}/jobs", f"{base}/job",
                    f"{base}/work-with-us", f"{base}/join-us",
                ]
                if url.rstrip("/") in [f.rstrip("/") for f in fabricated]:
                    if confidence != "high":
                        return None

            return url.rstrip("/.,;:")
        except json.JSONDecodeError:
            pass

    # Fallback: look for career-related URLs (not fabricated ones)
    urls = re.findall(r"https?://[^\s\)\]\},\"']+", response_text)
    career_keywords = ["career", "job", "hiring", "talent", "recruit", "apply", "openings"]
    for url in urls:
        url_lower = url.lower()
        if any(kw in url_lower for kw in career_keywords):
            if company_website:
                base = company_website.rstrip("/").lower()
                if url_lower.rstrip("/") in (f"{base}/careers", f"{base}/jobs"):
                    continue
            return url.rstrip("/.,;:")

    return None


def call_agent(query: str, system_prompt: str, timeout: float = 180.0) -> dict | None:
    """Call the deployed Modal agent via HTTP POST."""
    try:
        resp = httpx.post(
            MODAL_API_URL,
            json={"query": query, "system_prompt": system_prompt},
            timeout=timeout,
        )
        resp.raise_for_status()
        return resp.json()
    except httpx.TimeoutException:
        print("   ⏳ Timed out (GPU container may still be starting)")
        return None
    except httpx.HTTPStatusError as e:
        print(f"   ❌ HTTP {e.response.status_code}: {e.response.text[:200]}")
        return None
    except Exception as e:
        print(f"   ❌ Request error: {e}")
        return None


def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    args = [a for a in args if a != "--dry-run"]

    if not ADMIN_TOKEN:
        print("❌ ADMIN_API_TOKEN not set in .env")
        sys.exit(1)

    # ── Load companies ──
    if args:
        # Specific companies by name — still fetch from API for IDs
        all_companies = get_companies_without_career_url()
        target_names = {n.lower() for n in args}
        companies = [c for c in all_companies if c["name"].lower() in target_names]
        if not companies:
            print(f"❌ None of {args} found in companies without career URLs")
            sys.exit(1)
    else:
        print(f"📡 Fetching companies without career URLs from API...")
        companies = get_companies_without_career_url()

    if not companies:
        print("✅ All companies already have career URLs!")
        return

    print(f"🏢 Found {len(companies)} companies to research")
    for c in companies[:10]:
        print(f"   • {c['name']}")
    if len(companies) > 10:
        print(f"   ... and {len(companies) - 10} more")

    if dry_run:
        print("\n🔍 Dry run — no API calls made")
        return

    print(f"\n🔗 Modal Endpoint: {MODAL_API_URL}")
    print(f"🔗 Admin API: {API_BASE_URL}")
    print("   (First request may take ~2 min while GPU starts)\n")

    json_example = '{"career_url": "<url or null>", "source": "<where you found it>", "confidence": "high/low/none"}'

    system_prompt = (
        "You are a strict career page verifier. You MUST use the web_search or "
        "search_company_careers tool before answering. You are FORBIDDEN from "
        "guessing URLs. If you did not find a career page URL in the actual "
        "search results, you MUST return null for career_url. "
        "Never assume a URL exists - only report what the search results show. "
        "Respond with JSON only."
    )

    found = 0
    skipped = []
    total = len(companies)

    for i, company in enumerate(companies, 1):
        name = company["name"]
        website = company.get("website", "")
        slug = company.get("slug", "")
        company_id = company.get("id")

        print(f"[{i}/{total}] 🔍 Researching: {name}")

        company_info = f"'{name}'"
        if website:
            company_info += f" (website: {website})"

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

        r = call_agent(query, system_prompt)

        if r is None:
            skipped.append(name)
            continue

        response = r.get("response", "")
        tool_calls = r.get("tool_calls", [])

        # If model didn't use tools, retry once with a stronger prompt
        if not tool_calls:
            print(f"   ⚠️  No tools used, retrying with stronger prompt...")
            retry_query = (
                "You MUST use the search_company_careers tool right now to search for: "
                + company_info + "\n"
                "Do NOT answer from memory. Call the tool first, then respond with JSON.\n"
                + json_example
            )
            r = call_agent(retry_query, system_prompt)

            if r is None:
                skipped.append(name)
                continue

            response = r.get("response", "")
            tool_calls = r.get("tool_calls", [])

            if not tool_calls:
                print(f"   ❌ Model still refused to search — skipping")
                skipped.append(name)
                continue

        career_url = extract_career_url(response, website)

        if career_url:
            print(f"   ✅ {career_url}")
            # Update DB immediately via API
            if update_career_url(company_id, slug, career_url):
                print(f"   📝 Saved to DB")
                found += 1
            else:
                print(f"   ⚠️  Found URL but failed to save")
                found += 1  # Still count as found
        else:
            print(f"   ❌ No career URL in search results")
            skipped.append(name)

    # ── Summary ──
    print(f"\n{'=' * 50}")
    print(f"📊 Summary")
    print(f"   Total: {total}")
    print(f"   Found: {found}")
    print(f"   Skipped: {len(skipped)}")
    if skipped:
        for s in skipped[:20]:
            print(f"     • {s}")
        if len(skipped) > 20:
            print(f"     ... and {len(skipped) - 20} more")


if __name__ == "__main__":
    main()
