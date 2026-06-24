import re
from typing import List, Dict
from playwright.async_api import async_playwright


class PlaywrightCrawler:
    def __init__(self, headless: bool = True):
        self.headless = headless

    async def scrape_urls(self, urls: List[str], keyword: str) -> Dict[str, str]:
        """Scrape list of URLs and return {url: cleaned_text}."""
        results = {}
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=self.headless)
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            page = await context.new_page()
            for url in urls:
                try:
                    await page.goto(url, wait_until="networkidle", timeout=30000)
                    # Wait for body or main content
                    await page.wait_for_selector("body", timeout=10000)
                    text = await page.inner_text("body")
                    results[url] = self._clean_text(text)
                except Exception as e:
                    results[url] = f"ERROR: {str(e)}"
            await browser.close()
        return results

    def _clean_text(self, text: str) -> str:
        """Remove excessive whitespace, ads fragments, and navigation."""
        # Remove scripts/styles fragments
        text = re.sub(r"<script[^>]*>.*?</script>", "", text, flags=re.S)
        text = re.sub(r"<style[^>]*>.*?</style>", "", text, flags=re.S)
        # Collapse whitespace
        text = re.sub(r"\s+", " ", text)
        # Truncate to reasonable size for AI
        return text.strip()[:12000]
