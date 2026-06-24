import json
import httpx
from tenacity import retry, stop_after_attempt, wait_exponential
from app.config import settings


SYSTEM_PROMPT = """Bạn là chuyên gia Phong thủy Tử Vi Đẩu Số lão làng. Dưới đây là dữ liệu tham khảo từ nhiều nguồn khác nhau về chủ đề Tử Vi. Các nguồn có thể mâu thuẫn. Nhiệm vụ của bạn là:

1. Đối chiếu, loại bỏ thông tin nhiễu và trùng lặp.
2. Tổng hợp thành một bài luận giải duy nhất, khách quan, sâu sắc.
3. Trình bày theo cấu trúc rõ ràng với HTML snippet.

Định dạng đầu ra bắt buộc:
- <h3> cho các ý chính
- <p> cho đoạn văn
- <ul><li> cho các gạch đầu dòng
- Không giải thích gì thêm, chỉ trả về code HTML.
"""


class AIService:
    def __init__(self):
        self.api_key = settings.ai_api_key
        self.provider = settings.ai_provider.lower()
        self.model = settings.ai_model

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=5, min=5, max=30))
    async def synthesize(self, keyword: str, raw_data: dict) -> str:
        """Synthesize raw data into final HTML content."""
        if not self.api_key:
            return self._fallback_content(keyword, raw_data)

        prompt = self._build_prompt(keyword, raw_data)

        if self.provider == "gemini":
            return await self._call_gemini(prompt)
        elif self.provider == "deepseek":
            return await self._call_deepseek(prompt)
        else:
            return await self._call_gemini(prompt)

    def _build_prompt(self, keyword: str, raw_data: dict) -> str:
        sources_text = "\n\n".join(
            [f"NGUỒN: {url}\n{content[:4000]}" for url, content in raw_data.items()]
        )
        return f"Chủ đề: {keyword}\n\n{sources_text}\n\nHãy tổng hợp thành bài luận giải theo định dạng HTML đã chỉ định."

    async def _call_gemini(self, prompt: str) -> str:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        payload = {
            "contents": [{"role": "user", "parts": [{"text": SYSTEM_PROMPT + "\n\n" + prompt}]}],
            "generationConfig": {"temperature": 0.4, "maxOutputTokens": 2048},
        }
        async with httpx.AsyncClient(timeout=60) as client:
            r = await client.post(url, json=payload)
            r.raise_for_status()
            data = r.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]

    async def _call_deepseek(self, prompt: str) -> str:
        url = "https://api.deepseek.com/chat/completions"
        headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.4,
        }
        async with httpx.AsyncClient(timeout=60) as client:
            r = await client.post(url, json=payload, headers=headers)
            r.raise_for_status()
            data = r.json()
            return data["choices"][0]["message"]["content"]

    def _fallback_content(self, keyword: str, raw_data: dict) -> str:
        # Fallback when no API key
        sources = list(raw_data.keys())
        return f"<h3>Luận giải {keyword}</h3><p>Chưa có API key AI. Dữ liệu thô đã được lưu từ {len(sources)} nguồn.</p><ul>" + "".join(f"<li>{url}</li>" for url in sources) + "</ul>"
