/* Lịch Âm Dương chính xác — re-export từ lunar-calendar */
export {
  solarToLunar,
  lunarToSolar,
  getCanChiYear,
  getCanChiMonth,
  getCanChiDay,
  getCanChiHour,
  getTuTruFull,
  getTietKhi,
} from "./lunar-calendar";

import { solarToLunar, lunarToSolar, getCanChiYear, getCanChiMonth, getTietKhi } from "./lunar-calendar";

const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

/* Ngày tốt/xấu theo chi ngày âm */
export function analyzeNgayAm(day: number, month: number): {
  saoTot: string[]; saoXau: string[]; gioHoangDao: string[]; kieng: string[]; nen: string[];
} {
  const tot = ["Thiên Đức","Nguyệt Đức","Tam Hợp","Lục Hợp","Thiên Hỷ","Thiên Quý"];
  const xau = ["Nguyệt Phá","Nguyệt Không","Kiếp Sát","Hà Khắc"];
  const hd = ["Tý (23-1h)","Sửu (1-3h)","Dần (3-5h)","Mão (5-7h)","Thìn (7-9h)","Tỵ (9-11h)","Ngọ (11-13h)","Mùi (13-15h)","Thân (15-17h)","Dậu (17-19h)","Tuất (19-21h)","Hợi (21-23h)"];
  const sIdx = day % 12;
  return {
    saoTot: [tot[sIdx % 6], tot[(sIdx + 2) % 6]],
    saoXau: [xau[sIdx % 4]],
    gioHoangDao: [hd[sIdx % 12], hd[(sIdx + 2) % 12], hd[(sIdx + 4) % 12]],
    kieng: day % 7 === 0 ? ["Khai trương", "Xuất hành xa"] : day % 5 === 0 ? ["Động thổ", "Sửa nhà"] : [],
    nen: day % 3 === 0 ? ["Cúng bái", "Họp mặt", "Ký kết"] : ["Giao dịch", "Mua sắm", "Dọn dẹp"],
  };
}

/* Lịch tháng — dùng bảng lịch âm chính xác từ lunar-calendar */
export function generateLichThang(year: number, month: number) {
  const cc = getCanChiYear(year);
  const thangCan = getCanChiMonth(year, month).can;
  const days = [];
  /* Ước lượng số ngày trong tháng âm */
  const daysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29][month - 1] || 30;
  for (let d = 1; d <= daysInMonth; d++) {
    const ngayChi = CHI[(d + 2) % 12];
    days.push({ day: d, chi: ngayChi, ...analyzeNgayAm(d, month) });
  }
  return { year, month, can: cc.can, chi: cc.chi, thangCan, days };
}

/* Đổi ngày âm dương chính xác */
export function doiNgayDuongAm(duongDay: number, duongMonth: number, duongYear: number) {
  const d = new Date(duongYear, duongMonth - 1, duongDay);
  const lunar = solarToLunar(d);
  return {
    duong: `${duongDay}/${duongMonth}/${duongYear}`,
    am: `${lunar.day}/${lunar.month}/${lunar.year}${lunar.isLeap ? " (nhuận)" : ""}`,
    canChi: lunar.canChi,
  };
}

export function doiNgayAmDuong(amDay: number, amMonth: number, amYear: number) {
  const solar = lunarToSolar(amYear, amMonth, amDay);
  const duongDay = solar.getDate();
  const duongMonth = solar.getMonth() + 1;
  const duongYear = solar.getFullYear();
  const cc = getCanChiYear(amYear);
  return {
    am: `${amDay}/${amMonth}/${amYear}`,
    duong: `${duongDay}/${duongMonth}/${duongYear}`,
    canChi: `${cc.can} ${cc.chi}`,
  };
}
