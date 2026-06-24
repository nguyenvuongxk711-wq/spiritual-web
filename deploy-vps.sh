#!/bin/bash
# Script deploy Tâm Linh Việt lên VPS Ubuntu
# Yêu cầu: Docker, Docker Compose, Git đã cài trên VPS

set -e

PROJECT_DIR="/opt/tamlinh-viet"
REPO_URL="https://github.com/YOUR_USERNAME/spiritual-web.git"  # Thay bằng repo của bạn

# 1. Cài đặt cơ bản (nếu chưa có)
sudo apt-get update
sudo apt-get install -y git docker.io docker-compose

# 2. Clone hoặc pull code
if [ -d "$PROJECT_DIR" ]; then
  cd "$PROJECT_DIR"
  git pull origin main
else
  sudo mkdir -p "$PROJECT_DIR"
  sudo git clone "$REPO_URL" "$PROJECT_DIR"
  cd "$PROJECT_DIR"
fi

# 3. Cấu hình environment
cd backend
if [ ! -f .env ]; then
  sudo cp .env.example .env
  echo "⚠️  Hãy sửa file backend/.env và thêm AI_API_KEY thật trước khi chạy tiếp!"
  exit 1
fi

# 4. Build & chạy backend services
cd "$PROJECT_DIR"
sudo docker-compose down || true
sudo docker-compose up -d --build

# 5. Seed data mẫu
sudo docker-compose exec -T api python scripts/seed.py

# 6. Build frontend static
sudo docker run --rm -v "$PROJECT_DIR:/app" -w /app node:20-slim \
  sh -c "npm install && npm run build"

# 7. Copy frontend static ra thư mục phục vụ bằng Nginx
sudo mkdir -p /var/www/tamlinh-viet
sudo cp -r "$PROJECT_DIR/out"/* /var/www/tamlinh-viet/

# 8. Khởi động lại Nginx (nếu có cấu hình)
sudo systemctl restart nginx || true

echo "✅ Deploy hoàn tất!"
echo "Frontend: http://YOUR_VPS_IP"
echo "API: http://YOUR_VPS_IP:8000"
echo "Admin: http://YOUR_VPS_IP/admin"
