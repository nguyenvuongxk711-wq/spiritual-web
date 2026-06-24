from datetime import datetime
from typing import List
from app.celery_app import celery_app
from app.database import AsyncSessionLocal
from app.models import ScrapingTask, AstrologyData, TaskStatus
from app.crawler import PlaywrightCrawler
from app.ai_service import AIService


async def _add_log(task_id: int, message: str):
    async with AsyncSessionLocal() as session:
        task = await session.get(ScrapingTask, task_id)
        if task:
            logs = task.logs or []
            logs.append({"time": datetime.utcnow().isoformat(), "message": message})
            task.logs = logs
            await session.commit()


async def _set_status(task_id: int, status: TaskStatus):
    async with AsyncSessionLocal() as session:
        task = await session.get(ScrapingTask, task_id)
        if task:
            task.status = status
            task.updated_at = datetime.utcnow()
            await session.commit()


async def _save_astrology_data(category: str, keyword: str, raw_data: dict, final_content: str, ai_model: str, task_id: int):
    async with AsyncSessionLocal() as session:
        existing = await session.query(AstrologyData).filter_by(category=category, keyword=keyword).first()
        if existing:
            existing.raw_data = raw_data
            existing.final_content = final_content
            existing.ai_model_used = ai_model
            existing.task_id = task_id
            existing.updated_at = datetime.utcnow()
        else:
            data = AstrologyData(
                category=category,
                keyword=keyword,
                raw_data=raw_data,
                final_content=final_content,
                ai_model_used=ai_model,
                task_id=task_id,
            )
            session.add(data)
        await session.commit()


@celery_app.task(bind=True, max_retries=3)
def run_scrape_task(self, task_id: int, keyword: str, category: str, urls: List[str]):
    """Celery task: scrape URLs, then synthesize with AI."""
    import asyncio

    async def _process():
        try:
            await _set_status(task_id, TaskStatus.SCRAPING)
            await _add_log(task_id, f"Bắt đầu cào {len(urls)} URL với Playwright")

            crawler = PlaywrightCrawler(headless=True)
            raw_data = await crawler.scrape_urls(urls, keyword)
            await _add_log(task_id, f"Hoàn tất cào dữ liệu: {len(raw_data)} nguồn")

            await _set_status(task_id, TaskStatus.PROCESSING_AI)
            await _add_log(task_id, "Đang gọi AI tổng hợp...")

            ai_service = AIService()
            final_content = await ai_service.synthesize(keyword, raw_data)

            await _save_astrology_data(category, keyword, raw_data, final_content, ai_service.model, task_id)
            await _set_status(task_id, TaskStatus.COMPLETED)
            await _add_log(task_id, "Hoàn thành tổng hợp và lưu database")
        except Exception as e:
            await _add_log(task_id, f"Lỗi: {str(e)}")
            await _set_status(task_id, TaskStatus.FAILED)
            raise self.retry(exc=e, countdown=30)

    return asyncio.run(_process())
