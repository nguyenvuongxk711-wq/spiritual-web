from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Source
from app.schemas import SourceCreate, SourceOut

router = APIRouter(prefix="/api/sources", tags=["Sources"])


@router.get("", response_model=List[SourceOut])
async def list_sources(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Source))
    return result.scalars().all()


@router.post("", response_model=SourceOut)
async def create_source(data: SourceCreate, db: AsyncSession = Depends(get_db)):
    source = Source(**data.model_dump())
    db.add(source)
    await db.commit()
    await db.refresh(source)
    return source
