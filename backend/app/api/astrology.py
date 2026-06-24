from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import AstrologyData
from app.schemas import AstrologyDataOut

router = APIRouter(prefix="/api/astrology-data", tags=["Astrology Data"])


@router.get("/search", response_model=List[AstrologyDataOut])
async def search_astrology_data(q: str, category: str = None, db: AsyncSession = Depends(get_db)):
    """Search astrology data by keyword (case-insensitive) for frontend integration."""
    pattern = f"%{q}%"
    stmt = select(AstrologyData).where(
        (AstrologyData.keyword.ilike(pattern)) |
        (AstrologyData.category.ilike(pattern)) |
        (AstrologyData.final_content.ilike(pattern))
    )
    if category:
        stmt = stmt.where(AstrologyData.category == category)
    stmt = stmt.order_by(AstrologyData.updated_at.desc()).limit(20)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/{data_id}", response_model=AstrologyDataOut)
async def get_astrology_data(data_id: int, db: AsyncSession = Depends(get_db)):
    item = await db.get(AstrologyData, data_id)
    if not item:
        raise HTTPException(status_code=404, detail="Data not found")
    return item
