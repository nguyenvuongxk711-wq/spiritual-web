"""Seed dữ liệu mẫu để test Admin Dashboard và tích hợp frontend."""

import asyncio
import sys
from datetime import datetime
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from app.database import AsyncSessionLocal, engine
from app.models import Base, Source, ScrapingTask, AstrologyData, TaskStatus
from app.data.sources_catalog import DEFAULT_SOURCES

SAMPLE_DATA = [
    {
        "category": "Chính tinh",
        "keyword": "Tử Vi",
        "raw_data": {
            "https://lichngaytot.com/tu-vi/sao-tu-vi": "Sao Tử Vi là chủ tinh, đế tinh, tượng trưng cho quyền lực, uy nghi, địa vị. Tử Vi tại Mệnh chủ về người có tố chất lãnh đạo, có khí chất thanh cao.",
            "https://tuvi.com.vn/sao-tu-vi": "Sao Tử Vi là sao quý, chủ về danh dự, địa vị xã hội. Người có Tử Vi đắc địa thường có tính cách bao dung, độ lượng.",
        },
        "final_content": "<h3>Tính chất</h3><p>Sao Tử Vi thuộc hành <strong>Thổ</strong>, là sao đế vương, tượng trưng cho quyền lực, uy quyền và địa vị. Tử Vi đóng vai trò làm chủ toàn bộ lá số.</p><h3>Ý nghĩa tại Mệnh</h3><p>Khi Tử Vi đắc địa tại Mệnh, chủ nhân có tố chất lãnh đạo, khí chất thanh cao, độ lượng, được người khác nể trọng. Nếu Tử Vi hãm địa, người này dễ bảo thủ, tự cao, khó nghe lời khuyên.</p><h3>Kết hợp</h3><ul><li>Tử Vi gặp Thiên Phủ: song tinh tụ hội, tài lộc và quyền thế song toàn.</li><li>Tử Vi gặp Tham Lang: tham vọng lớn, thích hối lộ, dễ thành công nhưng cũng dễ sa ngã.</li></ul>",
        "ai_model_used": "gemini-1.5-pro",
    },
    {
        "category": "Chính tinh",
        "keyword": "Thiên Cơ",
        "raw_data": {
            "https://lichngaytot.com/tu-vi/sao-thien-co": "Sao Thiên Cơ chủ về trí tuệ, sự nhanh nhẹn, tính toán, thích nghi với công nghệ và thay đổi.",
        },
        "final_content": "<h3>Tính chất</h3><p>Sao Thiên Cơ thuộc hành <strong>Mộc</strong>, chủ về trí tuệ, biến động, mưu lược và tính toán. Người có Thiên Cơ đắc địa thường thông minh, lanh lợi, thích nghi nhanh.</p><h3>Ý nghĩa tại Mệnh</h3><p>Thiên Cơ tại Mệnh chủ về người có trí óc, thích công việc đòi hỏi tư duy, sáng tạo, kỹ thuật, tính toán. Nếu hãm địa, dễ đa nghi, lo âu, thay đổi công việc liên tục.</p>",
        "ai_model_used": "gemini-1.5-pro",
    },
    {
        "category": "Chính tinh",
        "keyword": "Thái Dương",
        "raw_data": {
            "https://lichngaytot.com/tu-vi/sao-thai-duong": "Thái Dương là sao dương tinh, chủ về danh tiếng, cha, quý nhân, ánh sáng.",
        },
        "final_content": "<h3>Tính chất</h3><p>Sao Thái Dương thuộc hành <strong>Hỏa</strong>, tượng trưng cho ánh sáng, danh tiếng, sự nhiệt tình và quyền lực bên ngoài. Là sao dương tinh, mạnh ban ngày, đặc biệt từ 9h-15h.</p><h3>Ý nghĩa tại Mệnh</h3><p>Thái Dương đắc địa tại Mệnh chủ về người hướng ngoại, có danh tiếng, được quý nhân giúp đỡ. Nếu hãm địa hoặc gặp sát tinh, dễ vất vả, danh tiếng không tốt, sức khỏe kém.</p>",
        "ai_model_used": "gemini-1.5-pro",
    },
    {
        "category": "Phụ tinh",
        "keyword": "Hóa Kỵ",
        "raw_data": {
            "https://tuvi.com.vn/hoa-ky": "Hóa Kỵ là sao hung, chủ về mất mát, tai tiếng, cãi vã, không may.",
        },
        "final_content": "<h3>Tính chất</h3><p>Hóa Kỵ là một trong Tứ Hóa, chủ về <strong>khó khăn, mất mát, tai tiếng</strong>. Nơi nào có Hóa Kỵ, nơi đó dễ gặp trở ngại, cãi vã, thị phi.</p><h3>Ý nghĩa</h3><p>Hóa Kỵ tại Mệnh: tính cách bướng bỉnh, dễ gây mâu thuẫn với người khác. Hóa Kỵ tại Tài: dễ hao tài, mất của. Hóa Kỵ tại Quan: trở ngại công danh, dễ bị đồn đại.</p>",
        "ai_model_used": "gemini-1.5-pro",
    },
    {
        "category": "Cung",
        "keyword": "Mệnh",
        "raw_data": {
            "https://lichngaytot.com/tu-vi/cung-menh": "Cung Mệnh là cung quan trọng nhất, nói về tính cách, vận mệnh, sự nghiệp tổng thể của đời người.",
        },
        "final_content": "<h3>Cung Mệnh</h3><p>Cung Mệnh là cung đầu tiên và quan trọng nhất trong lá số Tử Vi. Nó phản ánh tính cách, vận mệnh tổng thể, sức khỏe, sự nghiệp và hướng đi chính của đời người.</p><h3>Cách xác định</h3><p>Cung Mệnh được xác định theo tháng sinh âm lịch và giờ sinh, thuộc về một trong 12 chi. Từ cung Mệnh sẽ bố trí các sao chính, sao phụ và vận hạn.</p>",
        "ai_model_used": "gemini-1.5-pro",
    },
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Sources
        for src in DEFAULT_SOURCES:
            existing = await session.execute(
                session.query(Source).filter_by(domain_url=src["domain_url"]).statement
            )
            if existing.scalar():
                continue
            session.add(Source(**src))

        # Sample tasks
        task = ScrapingTask(
            target_keyword="Sao Tử Vi cung Mệnh",
            category="Chính tinh",
            urls=["https://lichngaytot.com/tu-vi/sao-tu-vi", "https://tuvi.com.vn/sao-tu-vi"],
            status=TaskStatus.COMPLETED,
            logs=[
                {"time": datetime.utcnow().isoformat(), "message": "Seed task completed"},
            ],
        )
        session.add(task)
        await session.flush()

        # Sample astrology data
        for item in SAMPLE_DATA:
            existing = await session.execute(
                session.query(AstrologyData).filter_by(keyword=item["keyword"], category=item["category"]).statement
            )
            if existing.scalar():
                continue
            session.add(AstrologyData(
                category=item["category"],
                keyword=item["keyword"],
                raw_data=item["raw_data"],
                final_content=item["final_content"],
                ai_model_used=item["ai_model_used"],
                task_id=task.id,
            ))

        await session.commit()
        print("✅ Seed completed.")


if __name__ == "__main__":
    asyncio.run(seed())
