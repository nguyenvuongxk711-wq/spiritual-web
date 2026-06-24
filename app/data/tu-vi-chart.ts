/* Tử Vi Chart Engine */
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

/* Tứ Hóa theo Can */
export const TU_HOA: Record<string, { loc: string; quyen: string; khoa: string; ky: string }> = {
  Giáp: { loc: "Liêm Trinh", quyen: "Phá Quân", khoa: "Vũ Khúc", ky: "Thái Dương" },
  Ất: { loc: "Thiên Cơ", quyen: "Thiên Lương", khoa: "Tử Vi", ky: "Thái Âm" },
  Bính: { loc: "Thiên Đồng", quyen: "Thiên Cơ", khoa: "Văn Xương", ky: "Liêm Trinh" },
  Đinh: { loc: "Thái Âm", quyen: "Thiên Đồng", khoa: "Thiên Cơ", ky: "Cự Môn" },
  Mậu: { loc: "Tham Lang", quyen: "Thái Âm", khoa: "Hữu Bật", ky: "Thiên Cơ" },
  Kỷ: { loc: "Vũ Khúc", quyen: "Tham Lang", khoa: "Thiên Lương", ky: "Văn Khúc" },
  Canh: { loc: "Thái Dương", quyen: "Vũ Khúc", khoa: "Thiên Đồng", ky: "Văn Xương" },
  Tân: { loc: "Cự Môn", quyen: "Thái Dương", khoa: "Vũ Khúc", ky: "Văn Khúc" },
  Nhâm: { loc: "Thiên Lương", quyen: "Tử Vi", khoa: "Thiên Phủ", ky: "Vũ Khúc" },
  Quý: { loc: "Phá Quân", quyen: "Cự Môn", khoa: "Thái Âm", ky: "Tham Lang" },
};

/* 14 Chính Tinh */
const CT = ["Tử Vi","Thiên Cơ","Thái Dương","Vũ Khúc","Thiên Đồng","Liêm Trinh","Thiên Phủ","Thái Âm","Tham Lang","Cự Môn","Thiên Tướng","Thiên Lương","Thất Sát","Phá Quân"];

/* Đặc tính */
const TINH: Record<string, { n: "cát"|"hung"|"trung"; d: string }> = {
  "Tử Vi":{n:"cát",d:"Vua các sao, chủ quyền lực, địa vị. Khí chất lãnh đạo, được nể trọng."},
  "Thiên Cơ":{n:"trung",d:"Chủ trí tuệ, mưu lược. Thông minh, nhạy bén, hợp nghề tư vấn, kế hoạch."},
  "Thái Dương":{n:"cát",d:"Chủ danh tiếng, sự nghiệp phát triển. Nam mạng tốt hơn, chủ uy quyền."},
  "Vũ Khúc":{n:"cát",d:"Chủ tài lộc, sự nghiệp. Giỏi quản lý tài chính, có tài kinh doanh."},
  "Thiên Đồng":{n:"cát",d:"Chủ phúc thọ, gia đình hòa thuận. Tính hiền lành, được hưởng phúc trời."},
  "Liêm Trinh":{n:"trung",d:"Chủ liêm khiết, công minh. Đảm nhận kiểm soát, giám sát, quan hệ xã hội."},
  "Thiên Phủ":{n:"cát",d:"Chủ tài lộc, của cải, kho tàng. Giỏi tích lũy, quản lý tài sản lớn."},
  "Thái Âm":{n:"cát",d:"Chủ tài vận nội trợ. Khéo léo, chu đáo, được lòng người. Nữ mạng rất tốt."},
  "Tham Lang":{n:"trung",d:"Chủ tham vọng, nghệ thuật. Nhiều tham vọng, cần kiềm chế."},
  "Cự Môn":{n:"hung",d:"Chủ khẩu nghiệp, tranh cãi. Cần chú ý lời ăn tiếng nói, dễ bị hiểu lầm."},
  "Thiên Tướng":{n:"cát",d:"Chủ ngoại hình, ấn tượng. Có ngoại hình ưa nhìn, được lòng người."},
  "Thiên Lương":{n:"cát",d:"Chủ y học, cứu người, phúc đức. Tốt bụng, hay giúp đỡ người khác."},
  "Thất Sát":{n:"hung",d:"Chủ uy quyền, quyết đoán. Mạnh mẽ nhưng dễ gây mâu thuẫn, cần kiềm chế."},
  "Phá Quân":{n:"hung",d:"Chủ phá cách, đổi mới. Không thích ràng buộc, hay thay đổi, biến động lớn."},
};

import { luanCungChiTiet } from "./tu-vi-luan";
import { solarToLunar, getCanChiYear } from "./lunar-calendar";
import { getSaoPhuNam, type SaoPhu } from "./tu-vi-phu";

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];

/* Nạp âm ngũ hành theo 30 cặp Lục Thập Hoa Giáp (mỗi cặp 2 năm) */
const NAP_AM_ELEMENT = [
  "Kim","Hỏa","Mộc","Thổ","Kim","Hỏa","Thủy","Thổ","Kim","Mộc",
  "Thủy","Thổ","Hỏa","Mộc","Thủy","Kim","Hỏa","Mộc","Thổ","Kim",
  "Hỏa","Thủy","Thổ","Kim","Mộc","Thủy","Thổ","Hỏa","Mộc","Thủy",
];

/* Ngũ Hành Cục: Thủy 2, Mộc 3, Kim 4, Thổ 5, Hỏa 6 */
const CUC_SO: Record<string, number> = { Thủy: 2, Mộc: 3, Kim: 4, Thổ: 5, Hỏa: 6 };
const CUC_TEN: Record<number, string> = { 2: "Thủy nhị cục", 3: "Mộc tam cục", 4: "Kim tứ cục", 5: "Thổ ngũ cục", 6: "Hỏa lục cục" };

/* Lấy sexagenary index (0..59) từ can index và chi index (định lý CRT) */
function sexagenaryIndex(canIdx: number, chiIdx: number): number {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === canIdx && i % 12 === chiIdx) return i;
  }
  return 0;
}

/* Can của cung Dần theo năm (Ngũ Hổ Độn) */
function canCuaDan(yearCanIdx: number): number {
  return [2, 4, 6, 8, 0][yearCanIdx % 5]; // Giáp/Kỷ→Bính, Ất/Canh→Mậu...
}

/* Tính Ngũ Hành Cục từ năm Can và vị trí cung Mệnh */
function tinhCuc(yearCanIdx: number, menhChiIdx: number): { cuc: number; ten: string } {
  const canDan = canCuaDan(yearCanIdx);
  const steps = (menhChiIdx - 2 + 12) % 12;
  const menhCan = (canDan + steps) % 10;
  const idx60 = sexagenaryIndex(menhCan, menhChiIdx);
  const element = NAP_AM_ELEMENT[Math.floor(idx60 / 2)];
  const cuc = CUC_SO[element];
  return { cuc, ten: CUC_TEN[cuc] };
}

/* An Tử Vi: dựa vào Cục số và ngày ÂM lịch (thuật toán chuẩn) */
function timTuViPos(cuc: number, lunarDay: number): number {
  const rem = lunarDay % cuc;
  let bu: number, thuong: number;
  if (rem === 0) { bu = 0; thuong = lunarDay / cuc; }
  else { bu = cuc - rem; thuong = (lunarDay + bu) / cuc; }
  let vt = (2 + (thuong - 1)) % 12; // khởi Dần(2), đi thuận (thuong-1) bước
  if (bu % 2 === 1) vt = ((vt - bu) % 12 + 12) % 12; // bù lẻ → lùi nghịch
  else vt = (vt + bu) % 12; // bù chẵn → tiến thuận
  return vt;
}

/* Xếp 14 chính tinh vào 12 cung theo 2 vòng (Tử Vi nghịch, Thiên Phủ thuận) */
function placeStars(tuViPos: number): Record<number, string[]> {
  const s: Record<number, string[]> = {};
  for (let i = 0; i < 12; i++) s[i] = [];
  const back = (n: number) => ((tuViPos - n) % 12 + 12) % 12;

  /* Vòng Tử Vi — đi nghịch */
  s[tuViPos].push("Tử Vi");
  s[back(1)].push("Thiên Cơ");
  s[back(3)].push("Thái Dương");
  s[back(4)].push("Vũ Khúc");
  s[back(5)].push("Thiên Đồng");
  s[back(8)].push("Liêm Trinh");

  /* Thiên Phủ đối xứng Tử Vi qua trục Dần-Thân */
  const tpPos = (16 - tuViPos) % 12;
  const fwd = (n: number) => (tpPos + n) % 12;

  /* Vòng Thiên Phủ — đi thuận */
  s[tpPos].push("Thiên Phủ");
  s[fwd(1)].push("Thái Âm");
  s[fwd(2)].push("Tham Lang");
  s[fwd(3)].push("Cự Môn");
  s[fwd(4)].push("Thiên Tướng");
  s[fwd(5)].push("Thiên Lương");
  s[fwd(6)].push("Thất Sát");
  s[fwd(10)].push("Phá Quân");
  return s;
}

/* An cung Mệnh và Thân theo tháng + giờ âm */
function anMenhThan(lunarMonth: number, hourBranch: number): { menh: number; than: number } {
  const cungThang = (1 + lunarMonth) % 12; // Dần=tháng 1
  const menh = ((cungThang - hourBranch) % 12 + 12) % 12;
  const than = (cungThang + hourBranch) % 12;
  return { menh, than };
}

/* ---------- MAIN EXPORT ---------- */
export interface CungInfo {
  name: string;
  chi: string;
  stars: string[];
  hoa: string[]; // which hóa applied
  luan: string;
}

export interface TuViChart {
  can: string;
  chi: string;
  cungMenh: string;   // chi của cung Mệnh
  cungThan: string;   // chi của cung Thân
  cuc: string;        // tên Ngũ Hành Cục
  cucSo: number;      // số cục (tuổi khởi đại vận)
  menhIdx: number;    // chỉ số chi của cung Mệnh (0=Tý)
  lunar: { day: number; month: number; year: number; isLeap: boolean };
  tuHoa: { loc: string; quyen: string; khoa: string; ky: string };
  cungs: CungInfo[];
  daiVan: { age: string; desc: string }[];
}

export function generateTuViChart(year: number, month: number, day: number, hour: number, gender: "nam" | "nu"): TuViChart {
  /* B1: Đổi dương lịch → âm lịch */
  const lunar = solarToLunar(new Date(year, month - 1, day));

  /* B2: Can Chi năm ÂM */
  const ccYear = getCanChiYear(lunar.year);
  const can = ccYear.can;
  const chi = ccYear.chi;
  const canIdx = CAN.indexOf(can);
  const tuHoa = TU_HOA[can] || { loc: "", quyen: "", khoa: "", ky: "" };

  /* B3: Giờ → địa chi giờ (Tý=0..Hợi=11) */
  const hourBranch = Math.floor((hour + 1) / 2) % 12;

  /* B4: An cung Mệnh, Thân */
  const { menh: menhIdx, than: thanIdx } = anMenhThan(lunar.month, hourBranch);

  /* B5: Ngũ Hành Cục */
  const { cuc, ten: cucTen } = tinhCuc(canIdx, menhIdx);

  /* B6: An Tử Vi + 14 chính tinh theo ngày ÂM */
  const tvP = timTuViPos(cuc, lunar.day);
  const stars = placeStars(tvP);

  /* B7: Sắp 12 cung quanh Mệnh (đi nghịch) */
  const cungNames = ["Mệnh","Phụ Mẫu","Phúc Đức","Điền Trạch","Quan Lộc","Nô Bộc","Thiên Di","Tật Ách","Tài Bạch","Tử Tức","Phu Thê","Huynh Đệ"];
  const cungs: CungInfo[] = [];

  for (let k = 0; k < 12; k++) {
    const chiIdx = ((menhIdx - k) % 12 + 12) % 12;
    const cungStars = stars[chiIdx] || [];
    const hoa: string[] = [];
    if (cungStars.includes(tuHoa.loc)) hoa.push("Hóa Lộc");
    if (cungStars.includes(tuHoa.quyen)) hoa.push("Hóa Quyền");
    if (cungStars.includes(tuHoa.khoa)) hoa.push("Hóa Khoa");
    if (cungStars.includes(tuHoa.ky)) hoa.push("Hóa Kỵ");
    const isThan = chiIdx === thanIdx;
    cungs.push({
      name: cungNames[k] + (isThan ? " (Thân)" : ""),
      chi: CHI[chiIdx],
      stars: cungStars,
      hoa,
      luan: luanCungChiTiet(cungNames[k], cungStars),
    });
  }

  /* B8: Đại vận — khởi từ Cục số, Dương nam/Âm nữ thuận, ngược lại nghịch */
  const isYangYear = canIdx % 2 === 0;
  const thuan = (gender === "nam" && isYangYear) || (gender === "nu" && !isYangYear);
  const daiVan: { age: string; desc: string }[] = [];
  const directions = ["Khởi đầu","Phát triển","Đỉnh cao","Ổn định","Chuyển biến","Thử thách","Thu hoạch","Tổng kết"];
  for (let i = 0; i < 8; i++) {
    const start = cuc + i * 10;
    const chiIdx = thuan ? ((menhIdx + i) % 12) : (((menhIdx - i) % 12 + 12) % 12);
    daiVan.push({ age: `${start}-${start + 9}`, desc: `${CHI[chiIdx]} · ${directions[i]}` });
  }

  return {
    can, chi,
    cungMenh: CHI[menhIdx],
    cungThan: CHI[thanIdx],
    cuc: cucTen,
    cucSo: cuc,
    menhIdx,
    lunar: { day: lunar.day, month: lunar.month, year: lunar.year, isLeap: lunar.isLeap },
    tuHoa, cungs, daiVan,
  };
}

/* Cung names theo vị trí k=0..11 tính từ Mệnh đi nghịch */
const CUNG_NAMES = ["Mệnh","Phụ Mẫu","Phúc Đức","Điền Trạch","Quan Lộc","Nô Bộc","Thiên Di","Tật Ách","Tài Bạch","Tử Tức","Phu Thê","Huynh Đệ"];

/* ========== TIỂU HẠN THEO NĂM XEM ========== */
export interface TieuHanResult {
  age: number;
  chi: string;
  cung: string;
  chiIdx: number;
  direction: "thuận" | "nghịch";
}
export function getTieuHan(menhIdx: number, cucSo: number, gender: "nam" | "nu", birthYearCan: string, viewYear: number, birthYear: number): TieuHanResult {
  const isYangYear = CAN.indexOf(birthYearCan) % 2 === 0;
  const thuan = (gender === "nam" && isYangYear) || (gender === "nu" && !isYangYear);
  const age = viewYear - birthYear + 1;
  const offset = age - cucSo;
  const chiIdx = thuan ? ((menhIdx + offset) % 12 + 12) % 12 : ((menhIdx - offset) % 12 + 12) % 12;
  const k = (menhIdx - chiIdx + 12) % 12;
  return { age, chi: CHI[chiIdx], cung: CUNG_NAMES[k], chiIdx, direction: thuan ? "thuận" : "nghịch" };
}

/* ========== LƯU NIÊN SAO THEO NĂM XEM ========== */
export interface LuuNienResult {
  can: string;
  chi: string;
  sao: SaoPhu[];
}
export function getLuuNien(viewYear: number): LuuNienResult {
  const cc = getCanChiYear(viewYear);
  return { can: cc.can, chi: cc.chi, sao: getSaoPhuNam(cc.can, cc.chi) };
}
