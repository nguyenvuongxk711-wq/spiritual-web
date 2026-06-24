/* ========== THƯỚC LỖ BAN ========== */
/* Đơn vị: cm. Khoảng cát: 42.9, khoảng hung: 42.9, tổng chu kỳ 85.8cm */

export interface LoBanRange {
  name: string;       // Tên cung: Tài, Bệnh, Ly, Nghĩa, Quan, Kiếp, Hại, Bản
  type: "cát" | "hung";
  startCm: number;    // Bắt đầu cm trong chu kỳ
  endCm: number;      // Kết thúc cm
}

const CYCLE = 85.8; // 1 chu kỳ thước lỗ ban

const RANGES: LoBanRange[] = [
  { name: "Tài", type: "cát", startCm: 0, endCm: 5.4 },
  { name: "Bệnh", type: "hung", startCm: 5.4, endCm: 10.8 },
  { name: "Ly", type: "hung", startCm: 10.8, endCm: 16.2 },
  { name: "Nghĩa", type: "cát", startCm: 16.2, endCm: 21.6 },
  { name: "Quan", type: "cát", startCm: 21.6, endCm: 26.9 },
  { name: "Kiếp", type: "hung", startCm: 26.9, endCm: 32.3 },
  { name: "Hại", type: "hung", startCm: 32.3, endCm: 37.7 },
  { name: "Bản", type: "cát", startCm: 37.7, endCm: 42.9 },
];

function getRangeInCycle(cm: number): LoBanRange | null {
  const mod = ((cm % CYCLE) + CYCLE) % CYCLE;
  return RANGES.find((r) => mod >= r.startCm && mod < r.endCm) || null;
}

export function loBanAnalyze(cm: number): { range: LoBanRange; cycleCount: number } | null {
  const r = getRangeInCycle(cm);
  if (!r) return null;
  const cycleCount = Math.floor(cm / CYCLE);
  return { range: r, cycleCount };
}

/* ========== HƯỚNG NHÀ THEO TUỔI ========== */

export interface HuongNha {
  huong: string;
  type: "cát" | "hung";
  desc: string;
}

/* Cung mệnh theo tuổi âm lịch: tuổi % 9 → cung số 1-9 */
function getCungMenh(tuoi: number): number {
  const map: Record<number, number> = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 0: 9,
  };
  return map[tuoi % 9] || 1;
}

const BAT_CUNG: Record<number, HuongNha[]> = {
  1: [
    { huong: "Khảm", type: "cát", desc: "Sinh khí — Tài lộc, con cháu đông đúc" },
    { huong: "Ly", type: "cát", desc: "Thiên y — Sức khỏe tốt, trường thọ" },
    { huong: "Chấn", type: "cát", desc: "Diên niên — Hòa thuận, gia đình êm ấm" },
    { huong: "Tốn", type: "cát", desc: "Phục vị — Bình an, ổn định" },
    { huong: "Cấn", type: "hung", desc: "Tuyệt mệnh — Bệnh tật, tai họa" },
    { huong: "Đoài", type: "hung", desc: "Ngũ quỷ — Mất mát, tranh chấp" },
    { huong: "Càn", type: "hung", desc: "Lục sát — Thị phi, kiện tụng" },
    { huong: "Khôn", type: "hung", desc: "Họa hại — Tai nạn, bất an" },
  ],
  2: [
    { huong: "Khôn", type: "cát", desc: "Sinh khí — Giàu có, phú quý" },
    { huong: "Càn", type: "cát", desc: "Thiên y — Bình an, sức khỏe" },
    { huong: "Đoài", type: "cát", desc: "Diên niên — Hòa hợp vợ chồng" },
    { huong: "Cấn", type: "cát", desc: "Phục vị — Ổn định, bền vững" },
    { huong: "Tốn", type: "hung", desc: "Tuyệt mệnh — Nguy hiểm" },
    { huong: "Chấn", type: "hung", desc: "Ngũ quỷ — Rắc rối" },
    { huong: "Khảm", type: "hung", desc: "Lục sát — Mất mát" },
    { huong: "Ly", type: "hung", desc: "Họa hại — Tai họa" },
  ],
  3: [
    { huong: "Chấn", type: "cát", desc: "Sinh khí — Phát đạt, thăng tiến" },
    { huong: "Tốn", type: "cát", desc: "Thiên y — Khỏe mạnh" },
    { huong: "Khảm", type: "cát", desc: "Diên niên — Tình cảm tốt" },
    { huong: "Ly", type: "cát", desc: "Phục vị — Bình yên" },
    { huong: "Đoài", type: "hung", desc: "Tuyệt mệnh — Khó khăn" },
    { huong: "Cấn", type: "hung", desc: "Ngũ quỷ — Thị phi" },
    { huong: "Khôn", type: "hung", desc: "Lục sát — Kiện tụng" },
    { huong: "Càn", type: "hung", desc: "Họa hại — Bất an" },
  ],
  4: [
    { huong: "Tốn", type: "cát", desc: "Sinh khí — Tài lộc" },
    { huong: "Chấn", type: "cát", desc: "Thiên y — Sức khỏe" },
    { huong: "Ly", type: "cát", desc: "Diên niên — Hòa thuận" },
    { huong: "Khảm", type: "cát", desc: "Phục vị — An nhiên" },
    { huong: "Cấn", type: "hung", desc: "Tuyệt mệnh — Bệnh tật" },
    { huong: "Đoài", type: "hung", desc: "Ngũ quỷ — Mất của" },
    { huong: "Càn", type: "hung", desc: "Lục sát — Thị phi" },
    { huong: "Khôn", type: "hung", desc: "Họa hại — Tai nạn" },
  ],
  5: [
    { huong: "Khảm", type: "cát", desc: "Sinh khí — Thịnh vượng" },
    { huong: "Ly", type: "cát", desc: "Thiên y — Trường thọ" },
    { huong: "Chấn", type: "cát", desc: "Diên niên — Hạnh phúc" },
    { huong: "Tốn", type: "cát", desc: "Phục vị — Bình an" },
    { huong: "Cấn", type: "hung", desc: "Tuyệt mệnh — Hiểm họa" },
    { huong: "Đoài", type: "hung", desc: "Ngũ quỷ — Tranh cãi" },
    { huong: "Càn", type: "hung", desc: "Lục sát — Kiện tụng" },
    { huong: "Khôn", type: "hung", desc: "Họa hại — Bất an" },
  ],
  6: [
    { huong: "Càn", type: "cát", desc: "Sinh khí — Quyền lực, địa vị" },
    { huong: "Khôn", type: "cát", desc: "Thiên y — Sức khỏe" },
    { huong: "Cấn", type: "cát", desc: "Diên niên — Hòa hợp" },
    { huong: "Đoài", type: "cát", desc: "Phục vị — Bình yên" },
    { huong: "Ly", type: "hung", desc: "Tuyệt mệnh — Nguy hiểm" },
    { huong: "Khảm", type: "hung", desc: "Ngũ quỷ — Rắc rối" },
    { huong: "Chấn", type: "hung", desc: "Lục sát — Tai nạn" },
    { huong: "Tốn", type: "hung", desc: "Họa hại — Thị phi" },
  ],
  7: [
    { huong: "Đoài", type: "cát", desc: "Sinh khí — Tài lộc, vui vẻ" },
    { huong: "Cấn", type: "cát", desc: "Thiên y — Sức khỏe tốt" },
    { huong: "Càn", type: "cát", desc: "Diên niên — Hòa thuận" },
    { huong: "Khôn", type: "cát", desc: "Phục vị — Ổn định" },
    { huong: "Chấn", type: "hung", desc: "Tuyệt mệnh — Bệnh tật" },
    { huong: "Tốn", type: "hung", desc: "Ngũ quỷ — Mất mát" },
    { huong: "Khảm", type: "hung", desc: "Lục sát — Thị phi" },
    { huong: "Ly", type: "hung", desc: "Họa hại — Tai họa" },
  ],
  8: [
    { huong: "Cấn", type: "cát", desc: "Sinh khí — Phát đạt" },
    { huong: "Đoài", type: "cát", desc: "Thiên y — Trường thọ" },
    { huong: "Khôn", type: "cát", desc: "Diên niên — Hạnh phúc" },
    { huong: "Càn", type: "cát", desc: "Phục vị — Bình an" },
    { huong: "Tốn", type: "hung", desc: "Tuyệt mệnh — Nguy hiểm" },
    { huong: "Chấn", type: "hung", desc: "Ngũ quỷ — Tranh chấp" },
    { huong: "Ly", type: "hung", desc: "Lục sát — Kiện tụng" },
    { huong: "Khảm", type: "hung", desc: "Họa hại — Bất an" },
  ],
  9: [
    { huong: "Ly", type: "cát", desc: "Sinh khí — Thịnh vượng" },
    { huong: "Khảm", type: "cát", desc: "Thiên y — Sức khỏe" },
    { huong: "Tốn", type: "cát", desc: "Diên niên — Hòa thuận" },
    { huong: "Chấn", type: "cát", desc: "Phục vị — An nhiên" },
    { huong: "Khôn", type: "hung", desc: "Tuyệt mệnh — Bệnh tật" },
    { huong: "Càn", type: "hung", desc: "Ngũ quỷ — Mất mát" },
    { huong: "Cấn", type: "hung", desc: "Lục sát — Tai nạn" },
    { huong: "Đoài", type: "hung", desc: "Họa hại — Thị phi" },
  ],
};

export function getHuongNha(tuoi: number): HuongNha[] {
  const cung = getCungMenh(tuoi);
  return BAT_CUNG[cung] || [];
}

/* Hướng bàn thờ: nên đặt hướng Sinh Khí hoặc Diên Niên */
export function getHuongBanTho(tuoi: number): HuongNha[] {
  const all = getHuongNha(tuoi);
  return all.filter(h => h.desc.includes("Sinh khí") || h.desc.includes("Diên niên"));
}

/* Hướng bếp: nên đặt hướng Thiên Y (tránh Tuyệt Mệnh) */
export function getHuongBep(tuoi: number): HuongNha[] {
  const all = getHuongNha(tuoi);
  const thienY = all.find(h => h.desc.includes("Thiên y"));
  const cat = all.filter(h => h.type === "cát");
  return thienY ? [thienY, ...cat.filter(c => c.huong !== thienY.huong).slice(0, 2)] : cat.slice(0, 3);
}

/* Hướng giường ngủ: nên đặt hướng Sinh Khí hoặc Thiên Y */
export function getHuongGiuong(tuoi: number): HuongNha[] {
  const all = getHuongNha(tuoi);
  return all.filter(h => h.desc.includes("Sinh khí") || h.desc.includes("Thiên y") || h.desc.includes("Diên niên"));
}

/* Hướng bàn làm việc: nên đặt hướng Sinh Khí */
export function getHuongBanLamViec(tuoi: number): HuongNha[] {
  const all = getHuongNha(tuoi);
  return all.filter(h => h.desc.includes("Sinh khí") || h.desc.includes("Phục vị"));
}
