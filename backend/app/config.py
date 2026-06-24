from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://tamlinh:tamlinh123@localhost:5432/tamlinh_db"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/0"
    ai_api_key: str = ""
    ai_provider: str = "gemini"
    ai_model: str = "gemini-1.5-pro"

    class Config:
        env_file = ".env"


settings = Settings()
