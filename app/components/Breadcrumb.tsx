"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

const LABEL_MAP: Record<string, string> = {
  "": "Trang chủ",
  "tu-vi": "Xem tử vi",
  "lap-la-so": "Lập lá số tử vi",
  "nam": "Tử vi 2026",
  "ngay": "Tử vi hàng ngày",
  "nam-sinh": "Tử vi theo năm",
  "tron-doi": "Tử vi trọn đời",
  "12-giap": "Tử vi 12 con giáp",
  "tu-tru": "Lập lá số tử trụ",
  "can-xuong": "Căn xương tính số",
  "thong-ke": "Thống kê căn xương",
  "calendar": "Lịch vạn niên",
  "thang": "Lịch tháng",
  "doi-ngay": "Đổi ngày âm dương",
  "que": "Gieo quẻ",
  "kinh-dich": "Quẻ kinh dịch",
  "xin-xam": "Quẻ xin xăm",
  "mai-hoa": "Quẻ mai hoa",
  "tuoi": "Xem tuổi",
  "xong-dat": "Xem tuổi xông đất",
  "vo-chong": "Xem tuổi vợ chồng",
  "sinh-con": "Xem tuổi sinh con",
  "ket-hon": "Xem tuổi kết hôn",
  "hop-nhau": "Xem tuổi hợp nhau",
  "lam-an": "Xem tuổi làm ăn",
  "lam-nha": "Xem tuổi làm nhà",
  "tot-xau": "Xem ngày tốt xấu",
  "dong-tho": "Xem ngày động thổ",
  "xuat-hanh": "Xem ngày xuất hành",
  "nhap-trach": "Xem ngày nhập trạch",
  "mua-xe": "Xem ngày mua xe",
  "an-tang": "Xem ngày an táng",
  "phong-thuy": "Phong thủy",
  "thuoc-lo-ban": "Thước lỗ ban",
  "huong-ban-tho": "Xem hướng bàn thờ",
  "huong-bep": "Xem hướng bếp nấu",
  "huong-giuong": "Xem hướng giường ngủ",
  "huong-nha": "Xem hướng nhà",
  "numerology": "Thần Số Học",
  "tarot": "Tarot",
  "zodiac": "Cung Hoàng Đạo",
  "dream": "Giải Mã Giấc Mơ",
  "quiz": "Quiz Tâm Linh",
  "sim": "Sim Phong Thủy",
  "meditation": "Thiền & Chữa Lành",
};

export default function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Xây dựng mảng [{ label, href }]
  const crumbs = [{ label: "Trang chủ", href: "/" }];
  let href = "";
  segments.forEach((seg) => {
    href += "/" + seg;
    crumbs.push({
      label: LABEL_MAP[seg] || seg,
      href: href + "/",
    });
  });

  if (segments.length === 0) return null;

  return (
    <nav
      aria-label="breadcrumb"
      className={cn(
        "flex items-center gap-1 text-sm text-[var(--text-muted)] py-3",
        className
      )}
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {isLast ? (
              <span className="font-medium text-[var(--text-primary)]">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-[var(--accent)] transition-colors flex items-center gap-1"
              >
                {i === 0 && <Home className="h-3.5 w-3.5" />}
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
