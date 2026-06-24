from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class SourceCreate(BaseModel):
    domain_url: str
    name: Optional[str] = None
    is_active: bool = True
    trust_score: float = 5.0
    urls: Optional[List[str]] = []


class SourceOut(BaseModel):
    id: int
    domain_url: str
    name: Optional[str]
    is_active: bool
    trust_score: float
    urls: Optional[List[str]]
    created_at: datetime

    class Config:
        from_attributes = True


class ScrapeRequest(BaseModel):
    keyword: str = Field(..., min_length=1)
    category: Optional[str] = "Chính tinh"
    urls: Optional[List[str]] = None


class ScrapingTaskOut(BaseModel):
    id: int
    target_keyword: str
    category: Optional[str]
    urls: Optional[List[str]]
    status: str
    logs: Optional[List[Dict[str, Any]]]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AstrologyDataCreate(BaseModel):
    category: str
    keyword: str
    raw_data: Dict[str, Any]
    final_content: Optional[str] = None
    ai_model_used: Optional[str] = None
    task_id: Optional[int] = None


class AstrologyDataOut(BaseModel):
    id: int
    category: str
    keyword: str
    raw_data: Dict[str, Any]
    final_content: Optional[str]
    ai_model_used: Optional[str]
    task_id: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AstrologyDataUpdate(BaseModel):
    final_content: Optional[str] = None


class TaskStatusOut(BaseModel):
    id: int
    status: str
    logs: Optional[List[Dict[str, Any]]]
    updated_at: datetime
