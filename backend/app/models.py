import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Float, Enum, Boolean
from app.database import Base


class TaskStatus(str, enum.Enum):
    PENDING = "PENDING"
    SCRAPING = "SCRAPING"
    PROCESSING_AI = "PROCESSING_AI"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)
    domain_url = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    trust_score = Column(Float, default=5.0)
    urls = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)


class ScrapingTask(Base):
    __tablename__ = "scraping_tasks"

    id = Column(Integer, primary_key=True, index=True)
    target_keyword = Column(String(255), nullable=False)
    category = Column(String(100), nullable=True)
    urls = Column(JSON, default=list)
    status = Column(Enum(TaskStatus), default=TaskStatus.PENDING, index=True)
    logs = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class AstrologyData(Base):
    __tablename__ = "astrology_data"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False, index=True)
    keyword = Column(String(255), nullable=False, index=True)
    raw_data = Column(JSON, default=dict)
    final_content = Column(Text, nullable=True)
    ai_model_used = Column(String(100), nullable=True)
    task_id = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
