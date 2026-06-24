# Hệ thống Admin Crawler + AI Synthesis

## Kiến trúc

- **Frontend Admin**: route `/admin` trong Next.js app hiện tại
- **API Gateway**: FastAPI (Python) tại `localhost:8000`
- **Database**: PostgreSQL
- **Task Queue**: Celery + Redis
- **Crawler**: Playwright headless
- **AI Synthesis**: Gemini / DeepSeek với retry (Tenacity)

## Cấu trúc thư mục

```
backend/
  app/
    main.py           # FastAPI endpoints
    models.py         # SQLAlchemy models
    schemas.py        # Pydantic schemas
    database.py       # Async DB session
    config.py         # Settings
    celery_app.py     # Celery config
    tasks.py          # Celery background tasks
    crawler.py        # Playwright scraper
    ai_service.py     # AI synthesis
  Dockerfile
  Dockerfile.worker
  requirements.txt
  .env.example

docker-compose.yml
```

## Chạy local

1. Cài Docker + Docker Compose
2. Copy file env:
   ```bash
   cd backend
   cp .env.example .env
   ```
3. Thêm API key AI vào `.env`:
   ```
   AI_API_KEY=your_gemini_or_deepseek_key
   AI_PROVIDER=gemini
   AI_MODEL=gemini-1.5-pro
   ```
4. Khởi động toàn bộ hệ thống:
   ```bash
   docker-compose up -d
   ```
5. Truy cập:
   - Admin UI: http://localhost:3000/admin
   - API docs: http://localhost:8000/docs
   - API: http://localhost:8000

## Luồng hoạt động

1. Admin nhập từ khóa + URL trong tab **Crawler**
2. Frontend gọi `POST /api/scrape`
3. FastAPI tạo `ScrapingTask` trong DB (status PENDING)
4. FastAPI đẩy Celery task vào Redis
5. Celery Worker chạy Playwright cào URL
6. Worker update status SCRAPING → PROCESSING_AI
7. Worker gọi AI API (Gemini/DeepSeek) tổng hợp
8. Worker lưu kết quả vào `AstrologyData` (final_content)
9. Frontend poll `/api/scrape-tasks/{id}` mỗi 5 giây để cập nhật progress

## API endpoints

- `GET /api/sources`
- `POST /api/sources`
- `POST /api/scrape` — tạo task
- `GET /api/scrape-tasks` — danh sách task
- `GET /api/scrape-tasks/{id}` — status + logs
- `GET /api/astrology-data` — danh sách dữ liệu
- `GET /api/astrology-data/{id}` — chi tiết
- `PATCH /api/astrology-data/{id}` — cập nhật nội dung

## Ghi chú triển khai

- Hệ thống cần con VPS có RAM đủ cho Playwright (tối thiểu 2GB, khuyến nghị 4GB).
- Container `worker` chạy `--concurrency=1` để tránh overload trình duyệt.
- Nếu không có API key, AI sẽ trả về fallback thông báo nhưng vẫn lưu raw_data.
