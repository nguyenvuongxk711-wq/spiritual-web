# Hướng dẫn Deploy Tâm Linh Việt lên VPS

## Yêu cầu VPS

- Ubuntu 22.04/24.04
- RAM: tối thiểu 4GB (Playwright + AI worker cần RAM)
- Ổ cứng: 40GB+
- Cổng mở: 80, 443, 8000
- Quyền sudo

## Bước 1: Chuẩn bị mã nguồn trên máy local

```bash
# Đảm bảo code đã commit
git add .
git commit -m "deploy v1"

# Đẩy lên GitHub (nếu chưa có repo)
git remote add origin https://github.com/YOUR_USERNAME/spiritual-web.git
git push -u origin main
```

## Bước 2: SSH vào VPS

```bash
ssh root@YOUR_VPS_IP
```

## Bước 3: Cài đặt Docker và Docker Compose trên VPS

```bash
sudo apt-get update
sudo apt-get install -y git docker.io docker-compose

# Kiểm tra version
docker --version
docker-compose --version
```

## Bước 4: Clone code về VPS

```bash
sudo mkdir -p /opt/tamlinh-viet
sudo git clone https://github.com/YOUR_USERNAME/spiritual-web.git /opt/tamlinh-viet
cd /opt/tamlinh-viet
```

## Bước 5: Cấu hình environment backend

```bash
cd backend
sudo cp .env.example .env
sudo nano .env
```

Sửa file `.env`:

```
DATABASE_URL=postgresql+asyncpg://tamlinh:TU_MAT_KHAU_MOI@postgres:5432/tamlinh_db
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis://6379/0
AI_API_KEY=your_gemini_or_deepseek_key
AI_PROVIDER=gemini
AI_MODEL=gemini-1.5-pro
```

**Lưu ý:** Đổi `TU_MAT_KHAU_MOI` thành mật khẩu mạnh của bạn.

## Bước 6: Cập nhật mật khẩu PostgreSQL trong docker-compose.yml

```bash
cd /opt/tamlinh-viet
sudo nano docker-compose.yml
```

Tìm dòng `POSTGRES_PASSWORD` và đổi thành mật khẩu bạn đặt ở `.env`:

```yaml
postgres:
  environment:
    POSTGRES_PASSWORD: TU_MAT_KHAU_MOI
```

## Bước 7: Chạy Docker Compose

```bash
sudo docker-compose up -d --build
```

Kiểm tra container:

```bash
sudo docker-compose ps
```

Bạn nên thấy 4 container đang chạy: postgres, redis, api, worker.

## Bước 8: Seed dữ liệu mẫu

```bash
sudo docker-compose exec api python scripts/seed.py
```

Bạn sẽ thấy: `✅ Seed completed.`

## Bước 9: Build frontend static

```bash
# Cài Node.js nếu chưa có
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

cd /opt/tamlinh-viet
npm install
npm run build
```

## Bước 10: Copy frontend ra thư mục phục vụ

```bash
sudo mkdir -p /var/www/tamlinh-viet
sudo cp -r out/* /var/www/tamlinh-viet/
sudo chown -R www-data:www-data /var/www/tamlinh-viet
```

## Bước 11: Cấu hình Nginx

```bash
sudo apt-get install -y nginx
sudo nano /etc/nginx/sites-available/tamlinh-viet
```

Dán nội dung sau (thay `YOUR_DOMAIN_OR_IP` bằng domain hoặc IP của bạn):

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    root /var/www/tamlinh-viet;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin/ {
        try_files $uri $uri/ /admin/index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Kích hoạt cấu hình:

```bash
sudo ln -s /etc/nginx/sites-available/tamlinh-viet /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## Bước 12: Cấu hình firewall (UFW)

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Bước 13: Kiểm tra

Truy cập từ trình duyệt:

- **Frontend**: http://YOUR_VPS_IP/
- **Admin**: http://YOUR_VPS_IP/admin
- **API docs**: http://YOUR_VPS_IP/api/docs

Nếu không truy cập được, kiểm tra log:

```bash
sudo docker-compose logs api
sudo docker-compose logs worker
sudo nginx -t
```

## Bước 14: Thêm HTTPS (tùy chọn nhưng khuyến nghị)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d YOUR_DOMAIN
```

## Cập nhật sau này

Khi có code mới:

```bash
cd /opt/tamlinh-viet
sudo git pull
sudo docker-compose up -d --build
npm install && npm run build
sudo cp -r out/* /var/www/tamlinh-viet/
sudo systemctl reload nginx
```

## Lưu ý bảo mật

- Đổi mật khẩu PostgreSQL trong cả `docker-compose.yml` và `.env`.
- Không commit `.env` vào Git.
- Dùng SSH key thay vì password.
- Giới hạn quyền user Docker nếu cần.
- Theo dõi log worker để tránh AI API bị滥用.

## Troubleshooting

**Container không chạy:**
```bash
sudo docker-compose logs api
sudo docker-compose logs worker
```

**Frontend trắng:**
```bash
sudo nginx -t
sudo systemctl status nginx
```

**Backend không kết nối:**
```bash
sudo docker-compose exec api python -c "from app.database import engine; print('OK')"
```
