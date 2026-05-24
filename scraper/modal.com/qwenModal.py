from __future__ import annotations

import json
import os
import re
from typing import Any, Dict, List

import modal

MODEL_NAME = os.getenv("QWEN_MODEL_NAME", "Qwen/Qwen3-14B")
MAX_MODEL_LEN = int(os.getenv("QWEN_MAX_MODEL_LEN", "8192"))
DEFAULT_TEMPERATURE = float(os.getenv("QWEN_TEMPERATURE", "0.2"))
MAX_TOKENS = int(os.getenv("QWEN_MAX_TOKENS", "512"))
BATCH_SIZE = int(os.getenv("QWEN_BATCH_SIZE", "8"))

PROMPT_TEMPLATE = os.getenv(
	"QWEN_PROMPT_TEMPLATE",
	(
		"You are a data extraction assistant."
		" Return a JSON object with keys:"
		" company, summary, confidence.\n"
		"Company: {company}\n"
		"Respond ONLY with JSON."
	),
)

app = modal.App("qwen3-14b-batch")

image = (
	modal.Image.from_registry(
		"nvidia/cuda:12.1.1-cudnn8-runtime-ubuntu22.04",
		add_python="3.11",
	)
	.pip_install(
		"torch==2.3.1+cu121",
		"torchvision==0.18.1+cu121",
		"torchaudio==2.3.1+cu121",
		extra_index_url="https://download.pytorch.org/whl/cu121",
	)
	.pip_install(
		"vllm==0.5.3",
		"transformers==4.43.1",
		"accelerate==0.33.0",
		"safetensors==0.4.3",
		"hf-transfer==0.1.6",
	)
	.env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
)


@app.cls(
	gpu=modal.gpu.L40S(),
	image=image,
	scaledown_window=300,
	timeout=60 * 60,
)
class QwenModel:
	def __init__(self) -> None:
		self.llm = None
		self.tokenizer = None

	@modal.enter()
	def load_model(self) -> None:
		from transformers import AutoTokenizer
		from vllm import LLM

		self.tokenizer = AutoTokenizer.from_pretrained(
			MODEL_NAME,
			trust_remote_code=True,
		)
		self.llm = LLM(
			model=MODEL_NAME,
			trust_remote_code=True,
			max_model_len=MAX_MODEL_LEN,
			dtype="bfloat16",
		)

	def _build_prompt(self, company: str) -> str:
		messages = [
			{
				"role": "system",
				"content": "You are a precise JSON-only assistant.",
			},
			{
				"role": "user",
				"content": PROMPT_TEMPLATE.format(company=company),
			},
		]
		return self.tokenizer.apply_chat_template(
			messages,
			tokenize=False,
			add_generation_prompt=True,
		)

	def _parse_json(self, text: str) -> Dict[str, Any]:
		cleaned = text.strip()
		cleaned = re.sub(
			r"^```json\s*|^```\s*|\s*```$",
			"",
			cleaned,
			flags=re.IGNORECASE | re.DOTALL,
		).strip()

		try:
			return json.loads(cleaned)
		except json.JSONDecodeError:
			match = re.search(r"\{.*\}", cleaned, re.DOTALL)
			if match:
				try:
					return json.loads(match.group(0))
				except json.JSONDecodeError:
					pass

		return {"raw": cleaned, "error": "json_parse_failed"}

	def generate(self, prompt: str) -> Dict[str, Any]:
		from vllm import SamplingParams

		sampling_params = SamplingParams(
			temperature=DEFAULT_TEMPERATURE,
			max_tokens=MAX_TOKENS,
			top_p=0.9,
		)

		outputs = self.llm.generate([prompt], sampling_params)
		text = outputs[0].outputs[0].text if outputs and outputs[0].outputs else ""
		return self._parse_json(text)

	@modal.method()
	def process_companies(self, companies: List[str]) -> List[Dict[str, Any]]:
		from vllm import SamplingParams

		if not companies:
			return []

		sampling_params = SamplingParams(
			temperature=DEFAULT_TEMPERATURE,
			max_tokens=MAX_TOKENS,
			top_p=0.9,
		)

		results: List[Dict[str, Any]] = []
		for start in range(0, len(companies), BATCH_SIZE):
			chunk = companies[start : start + BATCH_SIZE]
			prompts = [self._build_prompt(company) for company in chunk]
			outputs = self.llm.generate(prompts, sampling_params)

			for company, output in zip(chunk, outputs):
				text = output.outputs[0].text if output.outputs else ""
				parsed = self._parse_json(text)
				if "company" not in parsed:
					parsed["company"] = company
				results.append(parsed)

		return results


@app.local_entrypoint()
def main() -> None:
	sample = ["Acme", "Globex", "Initech"]
	results = QwenModel().process_companies.remote(sample)
	for item in results:
		print(item)
