import { type LucideIcon } from "lucide-react";
import {
  Star, CalendarDays, BookOpen, User, Sun, Compass,
  Sparkles, BrainCircuit, Flame, Moon, LayoutGrid,
  Smartphone, Wind, AlertTriangle,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  hot?: boolean;
}

export interface NavGroup {
  label: string;
  href?: string;
  icon?: LucideIcon;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Xem tử vi",
    icon: Star,
    items: [
      { label: "Lập lá số tử vi", href: "/tu-vi/", hot: true },
      { label: "Tử vi 2026", href: "/tu-vi/nam/" },
      { label: "Tử vi hàng ngày", href: "/tu-vi/ngay/" },
      { label: "Tử vi theo năm", href: "/tu-vi/nam-sinh/" },
      { label: "Tử vi trọn đời", href: "/tu-vi/tron-doi/" },
      { label: "Tử vi 12 con giáp", href: "/tu-vi/12-giap/" },
      { label: "Lập lá số tử trụ", href: "/tu-vi/tu-tru/" },
      { label: "Căn xương tính số", href: "/tu-vi/can-xuong/" },
      { label: "Thống kê căn xương", href: "/tu-vi/thong-ke/" },
    ],
  },
  {
    label: "Lịch vạn niên",
    icon: CalendarDays,
    items: [
      { label: "Lịch âm hôm nay", href: "/calendar/" },
      { label: "Lịch âm dương tháng", href: "/calendar/thang/" },
      { label: "Lịch âm dương 2026", href: "/calendar/nam/" },
      { label: "Đổi ngày âm dương", href: "/calendar/doi-ngay/" },
    ],
  },
  {
    label: "Gieo quẻ",
    icon: BookOpen,
    items: [
      { label: "Quẻ kinh dịch", href: "/que/kinh-dich/" },
      { label: "Quẻ xin xăm", href: "/que/xin-xam/" },
      { label: "Quẻ mai hoa", href: "/que/mai-hoa/" },
    ],
  },
  {
    label: "Xem tuổi",
    icon: User,
    items: [
      { label: "Xem tuổi xông đất", href: "/tuoi/xong-dat/" },
      { label: "Xem tuổi vợ chồng", href: "/tuoi/vo-chong/" },
      { label: "Xem tuổi sinh con", href: "/tuoi/sinh-con/" },
      { label: "Xem tuổi kết hôn", href: "/tuoi/ket-hon/" },
      { label: "Xem tuổi hợp nhau", href: "/tuoi/hop-nhau/" },
      { label: "Xem tuổi làm ăn", href: "/tuoi/lam-an/" },
      { label: "Xem tuổi làm nhà", href: "/tuoi/lam-nha/" },
    ],
  },
  {
    label: "Xem ngày",
    icon: Sun,
    items: [
      { label: "Xem ngày tốt xấu", href: "/ngay/tot-xau/" },
      { label: "Xem ngày kết hôn", href: "/ngay/ket-hon/" },
      { label: "Xem ngày động thổ", href: "/ngay/dong-tho/" },
      { label: "Xem ngày xuất hành", href: "/ngay/xuat-hanh/" },
      { label: "Xem ngày nhập trạch", href: "/ngay/nhap-trach/" },
      { label: "Xem ngày mua xe", href: "/ngay/mua-xe/" },
      { label: "Xem ngày an táng", href: "/ngay/an-tang/" },
    ],
  },
  {
    label: "Phong thủy",
    icon: Compass,
    items: [
      { label: "Thước lỗ ban", href: "/phong-thuy/thuoc-lo-ban/" },
      { label: "Xem hướng bàn thờ", href: "/phong-thuy/huong-ban-tho/" },
      { label: "Xem hướng bếp nấu", href: "/phong-thuy/huong-bep/" },
      { label: "Xem hướng giường ngủ", href: "/phong-thuy/huong-giuong/" },
      { label: "Xem hướng nhà", href: "/phong-thuy/huong-nha/" },
    ],
  },
  {
    label: "Tâm linh",
    icon: Sparkles,
    items: [
      { label: "Thần Số Học", href: "/numerology/", icon: BrainCircuit },
      { label: "Tarot", href: "/tarot/", icon: Flame },
      { label: "Cung Hoàng Đạo", href: "/zodiac/", icon: Compass },
      { label: "Giải Mã Giấc Mơ", href: "/dream/", icon: Moon },
      { label: "Quiz Tâm Linh", href: "/quiz/", icon: LayoutGrid },
      { label: "Sim Phong Thủy", href: "/sim/", icon: Smartphone },
      { label: "Thiền & Chữa Lành", href: "/meditation/", icon: Wind },
    ],
  },
];
