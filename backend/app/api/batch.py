from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Source, ScrapingTask, TaskStatus
from app.schemas import ScrapingTaskOut
from app.tasks import run_scrape_task
import csv
import io

router = APIRouter(prefix="/api/batch", tags=["Batch Operations"])


@router.post("/import-csv", response_model=List[ScrapingTaskOut])
async def import_csv_scrape_tasks(
    file: UploadFile = File(...),
    default_category: str = "Chính tinh",
    db: AsyncSession = Depends(get_db),
):
    """Import scrape tasks from CSV file. Expected columns: keyword, category (optional), url (one per row)."""
    if not file.filename.endswith((".csv", ".txt")):
        raise HTTPException(status_code=400, detail="File must be CSV or TXT")

    content = await file.read()
    text = content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(text))

    tasks = []
    for row in reader:
        keyword = row.get("keyword") or row.get("Keyword") or row.get("từ khóa")
        url = row.get("url") or row.get("URL") or row.get("link")
        category = row.get("category") or row.get("Category") or row.get("phân loại") or default_category

        if not keyword or not url:
            continue

        task = ScrapingTask(
            target_keyword=keyword,
            category=category,
            urls=[url],
            status=TaskStatus.PENDING,
        )
        db.add(task)
        tasks.append(task)

    await db.commit()
    for task in tasks:
        await db.refresh(task)
        run_scrape_task.delay(task.id, task.target_keyword, task.category, task.urls)

    return tasks


@router.post("/import-text", response_model=List[ScrapingTaskOut])
async def import_text_scrape_tasks(
    text: str,
    default_category: str = "Chính tinh",
    db: AsyncSession = Depends(get_db),
):
    """Import scrape tasks from plain text (one URL per line, optionally with keyword|url format)."""
    lines = text.strip().split("\n")
    tasks = []

    for line in lines:
        line = line.strip()
        if not line or line.startswith("#"):
            continue

        if "|" in line:
            parts = line.split("|")
            keyword = parts[0].strip()
            url = parts[1].strip()
        else:
            keyword = line.split("/")[-1].replace("-", " ").title()
            url = line

        if not url.startswith("http"):
            continue

        task = ScrapingTask(
            target_keyword=keyword,
            category=default_category,
            urls=[url],
            status=TaskStatus.PENDING,
        )
        db.add(task)
        tasks.append(task)

    await db.commit()
    for task in tasks:
        await db.refresh(task)
        run_scrape_task.delay(task.id, task.target_keyword, task.category, task.urls)

    return tasks
