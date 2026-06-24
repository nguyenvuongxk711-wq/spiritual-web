from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import ScrapingTask, AstrologyData, TaskStatus
from app.schemas import ScrapeRequest, ScrapingTaskOut, TaskStatusOut, AstrologyDataOut, AstrologyDataUpdate
from app.tasks import run_scrape_task

router = APIRouter(prefix="/api", tags=["Scraping Tasks"])


@router.post("/scrape", response_model=ScrapingTaskOut)
async def create_scrape_task(data: ScrapeRequest, db: AsyncSession = Depends(get_db)):
    urls = data.urls or ["https://example.com/tu-vi-search"]
    task = ScrapingTask(
        target_keyword=data.keyword,
        category=data.category,
        urls=urls,
        status=TaskStatus.PENDING,
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    run_scrape_task.delay(task.id, data.keyword, data.category, urls)
    return task


@router.get("/scrape-tasks", response_model=List[ScrapingTaskOut])
async def list_tasks(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ScrapingTask).order_by(ScrapingTask.created_at.desc()))
    return result.scalars().all()


@router.get("/scrape-tasks/{task_id}", response_model=TaskStatusOut)
async def get_task(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await db.get(ScrapingTask, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskStatusOut(
        id=task.id,
        status=task.status.value,
        logs=task.logs,
        updated_at=task.updated_at,
    )


@router.get("/astrology-data", response_model=List[AstrologyDataOut])
async def list_astrology_data(category: str = None, db: AsyncSession = Depends(get_db)):
    query = select(AstrologyData).order_by(AstrologyData.updated_at.desc())
    if category:
        query = query.where(AstrologyData.category == category)
    result = await db.execute(query)
    return result.scalars().all()


@router.patch("/astrology-data/{data_id}", response_model=AstrologyDataOut)
async def update_astrology_data(data_id: int, data: AstrologyDataUpdate, db: AsyncSession = Depends(get_db)):
    stmt = update(AstrologyData).where(AstrologyData.id == data_id).values(final_content=data.final_content)
    await db.execute(stmt)
    await db.commit()
    item = await db.get(AstrologyData, data_id)
    if not item:
        raise HTTPException(status_code=404, detail="Data not found")
    return item


@router.get("/astrology-data/{data_id}", response_model=AstrologyDataOut)
async def get_astrology_data(data_id: int, db: AsyncSession = Depends(get_db)):
    item = await db.get(AstrologyData, data_id)
    if not item:
        raise HTTPException(status_code=404, detail="Data not found")
    return item
