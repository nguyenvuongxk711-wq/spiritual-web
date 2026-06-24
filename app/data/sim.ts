/**
 * SIM PHONG THỦY SCORING ENGINE
 * Pure function, no side effects. Có thể unit test độc lập.
 *
 * UNIT TEST CASES:
 * 1. input: "0912345678" + "Hỏa" → total > 0, breakdown có 5 key
 * 2. input: "0999999999" + "Thủy" → dân gian cao (nhiều 9), âm dương lệch
 * 3. input: "0123456789" + "Kim" → âm dương cân bằng hoàn hảo (5 chẵn/5 lẻ)
 * 4. input: "123" + "Mộc" → invalid (regex fail) → throw error
 * 5. input: "+84912345678" + "Thổ" → normalize thành 0912345678 rồi tính
 */

export type Menh = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export interface SimScore {
  total: number; // 0-100
  breakdown: {
    nguHanh: { score: number; weight: number; label: string };
    amDuong: { score: number; weight: number; label: string };
    duNien: { score: number; weight: number; label: string };
    batQuai: { score: number; weight: number; label: string };
    danGian: { score: number; weight: number; label: string };
  };
  conclusion: string;
  color: "red" | "yellow" | "green";
}

/* ========== CONSTANTS ========== */

/** Ánh xạ chữ số sang Ngũ Hành (theo phong thủy số học phổ biến) */
const DIGIT_NGUHANH: Record<number, string> = {
  1: "Thủy", 6: "Thủy", 7: "Thủy",
  2: "Thổ", 5: "Thổ", 8: "Thổ",
  3: "Mộc", 4: "Mộc", 9: "Mộc",
  0: "Kim",
};

/** Tương sinh: A sinh B */
const TUONG_SINH: Record<string, string> = {
  Kim: "Thủy", Thủy: "Mộc", Mộc: "Hỏa", Hỏa: "Thổ", Thổ: "Kim",
};

/** Tương khắc: A khắc B */
const TUONG_KHAC: Record<string, string> = {
  Kim: "Mộc", Mộc: "Thổ", Thổ: "Thủy", Thủy: "Hỏa", Hỏa: "Kim",
};

/** Cặp số Du Niên tốt (dân gian) */
const DU_NIEN_GOOD = ["39", "93", "68", "86", "14", "41", "49", "94", "13", "31", "27", "72"];

/** Cặp số xấu (tuyệt mệnh, ngũ quỷ, lục sát, họa hại) */
const DU_NIEN_BAD = ["12", "21", "69", "96", "48", "84", "37", "73", "18", "81", "79", "97", "36", "63", "24", "42"];

/** Dân gian: số đuôi đẹp / xấu */
const LUCKY_ENDINGS = ["68", "86", "88", "99", "66", "38", "39", "78", "89", "98"];
const UNLUCKY_ENDINGS = ["49", "53", "44", "78", "87", "00"];

/* ========== HELPERS ========== */

function normalizePhone(phone: string): string {
  let p = phone.replace(/\s/g, "").replace(/[+.]/g, "");
  if (p.startsWith("84") && p.length > 10) p = "0" + p.slice(2);
  if (!p.startsWith("0")) p = "0" + p;
  return p;
}

function getDigits(phone: string): number[] {
  return phone.split("").map(Number);
}

function dominantElement(digits: number[]): string {
  const count: Record<string, number> = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };
  digits.forEach((d) => {
    const e = DIGIT_NGUHANH[d];
    if (e) count[e] = (count[e] || 0) + 1;
  });
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

/* ========== 5 TIÊU CHÍ ========== */

/** 1. Ngũ Hành sim vs Mệnh chủ (30%) */
function scoreNguHanh(digits: number[], menh: Menh): number {
  const simMain = dominantElement(digits);
  if (simMain === menh) return 70; // cùng hành: khá
  if (TUONG_SINH[menh] === simMain) return 95; // sim sinh cho mệnh chủ: tốt nhất
  if (TUONG_SINH[simMain] === menh) return 85; // mệnh chủ sinh cho sim: tốt
  if (TUONG_KHAC[menh] === simMain) return 25; // sim khắc mệnh: xấu
  if (TUONG_KHAC[simMain] === menh) return 35; // mệnh khắc sim: trung bình xấu
  return 50; // trung lập
}

/** 2. Âm Dương cân bằng (20%)
 *  Chẵn = Âm (0,2,4,6,8), Lẻ = Dương (1,3,5,7,9)
 *  Cân bằng hoàn hảo ~ 50/50 → 100 điểm
 */
function scoreAmDuong(digits: number[]): number {
  const am = digits.filter((d) => [0, 2, 4, 6, 8].includes(d)).length;
  const duong = digits.filter((d) => [1, 3, 5, 7, 9].includes(d)).length;
  const total = am + duong;
  if (total === 0) return 0;
  const ratio = Math.min(am, duong) / Math.max(am, duong); // 0 -> 1
  return Math.round(ratio * 100);
}

/** 3. Du Niên (20%)
 *  Quét cặp số liên tiếp trong SĐT
 */
function scoreDuNien(digits: number[]): number {
  const pairs = digits.map((d, i) => (i < digits.length - 1 ? `${d}${digits[i + 1]}` : "")).filter(Boolean);
  let good = 0, bad = 0;
  pairs.forEach((p) => {
    if (DU_NIEN_GOOD.includes(p)) good++;
    if (DU_NIEN_BAD.includes(p)) bad++;
  });
  const total = pairs.length || 1;
  const raw = ((good - bad * 0.5) / total) * 100;
  return Math.max(0, Math.min(100, Math.round(raw + 50))); // normalize
}

/** 4. Bát Quái (15%)
 *  Tổng các chữ số mod 8 → tra quẻ. Đơn giản hóa: mod 8 càng gần 4 (trung) càng tốt.
 */
function scoreBatQuai(digits: number[]): number {
  const sum = digits.reduce((a, b) => a + b, 0);
  const mod = ((sum % 8) + 8) % 8; // 0..7
  const dist = Math.abs(mod - 4); // khoảng cách đến trung tâm
  return Math.round((1 - dist / 4) * 100);
}

/** 5. Dân gian (15%)
 *  Kiểm tra đuôi và tổng thể cặp số may mắn.
 */
function scoreDanGian(digits: number[]): number {
  const tail2 = digits.slice(-2).join("");
  const tail1 = String(digits[digits.length - 1]);
  let s = 50;
  if (LUCKY_ENDINGS.includes(tail2)) s += 35;
  if (UNLUCKY_ENDINGS.includes(tail2)) s -= 30;
  if (["6", "8", "9"].includes(tail1)) s += 10;
  if (["4", "5"].includes(tail1)) s -= 5;
  return Math.max(0, Math.min(100, s));
}

/* ========== MAIN EXPORT ========== */

export function calculateSimScore(phone: string, menh: Menh): SimScore {
  const p = normalizePhone(phone);
  const vnRegex = /^(0|84)\d{9,10}$/;
  if (!vnRegex.test(p)) {
    throw new Error("Số điện thoại không hợp lệ. Vui lòng nhập số VN (0xxxxxxxxx hoặc +84)");
  }
  const digits = getDigits(p);

  const nguHanh = scoreNguHanh(digits, menh);
  const amDuong = scoreAmDuong(digits);
  const duNien = scoreDuNien(digits);
  const batQuai = scoreBatQuai(digits);
  const danGian = scoreDanGian(digits);

  const weights = { nguHanh: 0.30, amDuong: 0.20, duNien: 0.20, batQuai: 0.15, danGian: 0.15 };
  const total = Math.round(
    nguHanh * weights.nguHanh +
    amDuong * weights.amDuong +
    duNien * weights.duNien +
    batQuai * weights.batQuai +
    danGian * weights.danGian
  );

  let conclusion: string;
  let color: SimScore["color"];
  if (total >= 85) {
    conclusion = "Sim này rất hợp với mệnh của bạn! Năng lượng tương sinh mạnh mẽ, đường công danh tài lộc hanh thông.";
    color = "green";
  } else if (total >= 70) {
    conclusion = "Sim khá tốt. Có một số điểm cần chú ý nhưng tổng thể vẫn mang lại may mắn và ổn định.";
    color = "green";
  } else if (total >= 40) {
    conclusion = "Sim trung bình. Một số yếu tố chưa hài hòa với mệnh chủ. Cân nhắc đổi sim nếu có thể.";
    color = "yellow";
  } else {
    conclusion = "Sim này có nhiều yếu tố xung khắc với mệnh bạn. Nên tìm sim khác để cải thiện vận khí.";
    color = "red";
  }

  return {
    total,
    breakdown: {
      nguHanh: { score: nguHanh, weight: weights.nguHanh, label: "Ngũ Hành vs Mệnh" },
      amDuong: { score: amDuong, weight: weights.amDuong, label: "Âm Dương cân bằng" },
      duNien: { score: duNien, weight: weights.duNien, label: "Du Niên" },
      batQuai: { score: batQuai, weight: weights.batQuai, label: "Bát Quái" },
      danGian: { score: danGian, weight: weights.danGian, label: "Dân gian" },
    },
    conclusion,
    color,
  };
}
