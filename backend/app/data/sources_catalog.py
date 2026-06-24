"""Catalog of default astrology sources with concrete URLs for seeding.

These URLs point to popular Vietnamese astrology websites. Some URLs may be
examples/templates and should be verified by the operator before crawling.
"""

DEFAULT_SOURCES = [
    {
        "domain_url": "https://lichngaytot.com",
        "name": "Lịch Ngày Tốt",
        "trust_score": 8.5,
        "urls": [
            "https://lichngaytot.com/tu-vi-12-cung-hoang-dao",
            "https://lichngaytot.com/xem-tu-vi-tron-doi",
            "https://lichngaytot.com/tu-vi-hang-ngay",
            "https://lichngaytot.com/xem-tu-vi-nam-2026",
            "https://lichngaytot.com/xem-ngay-tot-xau",
            "https://lichngaytot.com/huong-nha-phong-thuy",
            "https://lichngaytot.com/xem-tuoi-vo-chong",
            "https://lichngaytot.com/xem-tuoi-sinh-con",
            "https://lichngaytot.com/xem-ngay-xong-dat",
            "https://lichngaytot.com/xem-sim-phong-thuy",
        ],
    },
    {
        "domain_url": "https://tuvi.com.vn",
        "name": "Tử Vi .com.vn",
        "trust_score": 8.0,
        "urls": [
            "https://tuvi.com.vn/lap-la-so-tu-vi",
            "https://tuvi.com.vn/sao-tu-vi-cung-menh",
            "https://tuvi.com.vn/sao-thien-co-cung-menh",
            "https://tuvi.com.vn/tu-vi-nam-2026",
            "https://tuvi.com.vn/huong-nha-phong-thuy",
            "https://tuvi.com.vn/xem-tuoi-vo-chong",
            "https://tuvi.com.vn/xem-sim-phong-thuy",
        ],
    },
    {
        "domain_url": "https://xemtuvi.online",
        "name": "Xem Tử Vi Online",
        "trust_score": 7.5,
        "urls": [
            "https://xemtuvi.online/tu-vi-2026",
            "https://xemtuvi.online/sao-tu-vi",
            "https://xemtuvi.online/sao-thien-co",
            "https://xemtuvi.online/cung-menh",
            "https://xemtuvi.online/huong-nha",
            "https://xemtuvi.online/xem-tuoi-vo-chong",
        ],
    },
    {
        "domain_url": "https://tuvi.vn",
        "name": "Tử Vi VN",
        "trust_score": 7.5,
        "urls": [
            "https://tuvi.vn/lap-la-so-tu-vi",
            "https://tuvi.vn/tu-vi-nam-2026",
            "https://tuvi.vn/cung-menh",
            "https://tuvi.vn/huong-nha",
            "https://tuvi.vn/xem-tuoi-vo-chong",
        ],
    },
    {
        "domain_url": "https://tuvi.viettimes.vn",
        "name": "Tử Vi VietTimes",
        "trust_score": 7.0,
        "urls": [
            "https://tuvi.viettimes.vn/tu-vi-nam-2026",
            "https://tuvi.viettimes.vn/tu-vi-hang-ngay",
            "https://tuvi.viettimes.vn/huong-nha",
            "https://tuvi.viettimes.vn/xem-tuoi-vo-chong",
        ],
    },
    {
        "domain_url": "https://tuvi.vnexpress.net",
        "name": "Tử Vi VnExpress",
        "trust_score": 8.0,
        "urls": [
            "https://tuvi.vnexpress.net/tu-vi-nam-2026",
            "https://tuvi.vnexpress.net/tu-vi-hang-ngay",
            "https://tuvi.vnexpress.net/huong-nha",
            "https://tuvi.vnexpress.net/xem-tuoi-vo-chong",
        ],
    },
    {
        "domain_url": "https://www.tuvilyso.vn",
        "name": "Tử Vi Lý Số",
        "trust_score": 7.0,
        "urls": [
            "https://www.tuvilyso.vn/lap-la-so-tu-vi",
            "https://www.tuvilyso.vn/tu-vi-nam-2026",
            "https://www.tuvilyso.vn/huong-nha",
            "https://www.tuvilyso.vn/xem-tuoi-vo-chong",
        ],
    },
    {
        "domain_url": "https://tuvi.mobi",
        "name": "Tử Vi Mobi",
        "trust_score": 6.5,
        "urls": [
            "https://tuvi.mobi/tu-vi-tron-doi.html",
            "https://tuvi.mobi/tu-vi-nam-2026.html",
            "https://tuvi.mobi/huong-nha.html",
            "https://tuvi.mobi/xem-tuoi-vo-chong.html",
        ],
    },
    {
        "domain_url": "https://tuvi12congiap.com",
        "name": "Tử Vi 12 Con Giáp",
        "trust_score": 6.0,
        "urls": [
            "https://tuvi12congiap.com/tu-vi-nam-2026",
            "https://tuvi12congiap.com/tu-vi-hang-ngay",
            "https://tuvi12congiap.com/huong-nha",
            "https://tuvi12congiap.com/xem-tuoi-vo-chong",
        ],
    },
    {
        "domain_url": "https://simphongthuy.vn",
        "name": "Sim Phong Thủy",
        "trust_score": 6.5,
        "urls": [
            "https://simphongthuy.vn/xem-sim-phong-thuy",
            "https://simphongthuy.vn/tu-vi-nam-2026",
            "https://simphongthuy.vn/huong-nha",
        ],
    },
    {
        "domain_url": "https://lichvanmen.com",
        "name": "Lịch Vạn Niên",
        "trust_score": 7.5,
        "urls": [
            "https://lichvanmen.com/lich-van-nien",
            "https://lichvanmen.com/xem-ngay-tot-xau",
            "https://lichvanmen.com/doi-ngay-am-duong",
            "https://lichvanmen.com/huong-nha",
        ],
    },
    {
        "domain_url": "https://xemngaytot.net",
        "name": "Xem Ngày Tốt",
        "trust_score": 7.0,
        "urls": [
            "https://xemngaytot.net/xem-ngay-tot-xau",
            "https://xemngaytot.net/doi-ngay-am-duong",
            "https://xemngaytot.net/huong-nha",
            "https://xemngaytot.net/xem-tuoi-vo-chong",
        ],
    },
    {
        "domain_url": "https://simdep.net",
        "name": "Sim Đẹp",
        "trust_score": 6.0,
        "urls": [
            "https://simdep.net/xem-sim-phong-thuy",
            "https://simdep.net/tu-vi-nam-2026",
        ],
    },
    {
        "domain_url": "https://simsovip.vn",
        "name": "Sim VIP",
        "trust_score": 6.0,
        "urls": [
            "https://simsovip.vn/xem-sim-phong-thuy",
            "https://simsovip.vn/tu-vi-nam-2026",
        ],
    },
]

TOPIC_CATALOG = {
    "Chính tinh": [
        "Sao Tử Vi", "Sao Thiên Cơ", "Sao Thái Dương", "Sao Vũ Khúc", "Sao Thiên Đồng",
        "Sao Liêm Trinh", "Sao Thiên Phủ", "Sao Thái Âm", "Sao Tham Lang", "Sao Cự Môn",
        "Sao Thiên Tướng", "Sao Thiên Lương", "Sao Thất Sát", "Sao Phá Quân",
    ],
    "Phụ tinh": [
        "Hóa Kỵ", "Hóa Quyền", "Hóa Lộc", "Hóa Khoa", "Thiên Khôi", "Thiên Việt",
        "Tả Phù", "Hữu Bật", "Văn Xương", "Văn Khúc", "Thiên Hỷ", "Thiên Quan", "Thiên Quý",
    ],
    "Cung": [
        "Mệnh", "Phụ Mẫu", "Phu Thê", "Tử Tức", "Tài Bạch", "Bệnh Tật",
        "Di Trạch", "Quan Lộc", "Nô Bộc", "Thiên Di", "Tật Ách", "Mộ Tuyến",
    ],
    "Vận hạn": [
        "Đại hạn", "Tiểu hạn", "Lưu niên", "Tam Tai", "Tuế Phá", "Lưu Hà", "Lưu Đào Hoa",
    ],
    "Phong thủy": [
        "Bát trạch", "Hướng nhà", "Hướng bếp", "Hướng bàn thờ", "Thước lỗ ban", "Kim Lâu", "Tam Tai", "Hoang Ốc",
    ],
    "Tổng hợp": [
        "Tử vi năm 2026", "Tử vi hàng ngày", "Tử vi trọn đời", "Tử vi 12 con giáp",
    ],
}
