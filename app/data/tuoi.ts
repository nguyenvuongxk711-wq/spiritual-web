export interface CanChi {
  can: string;        // Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý
  chi: string;        // Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi
  element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  yinYang: "Âm" | "Dương";
}

/* ========== CAN CHI TABLE ========== */
export const CAN_CHI: CanChi[] = [
  { can: "Giáp", chi: "Tý", element: "Mộc", yinYang: "Dương" },
  { can: "Ất", chi: "Sửu", element: "Kim", yinYang: "Âm" },
  { can: "Bính", chi: "Dần", element: "Hỏa", yinYang: "Dương" },
  { can: "Đinh", chi: "Mão", element: "Hỏa", yinYang: "Âm" },
  { can: "Mậu", chi: "Thìn", element: "Thổ", yinYang: "Dương" },
  { can: "Kỷ", chi: "Tỵ", element: "Thổ", yinYang: "Âm" },
  { can: "Canh", chi: "Ngọ", element: "Kim", yinYang: "Dương" },
  { can: "Tân", chi: "Mùi", element: "Kim", yinYang: "Âm" },
  { can: "Nhâm", chi: "Thân", element: "Thủy", yinYang: "Dương" },
  { can: "Quý", chi: "Dậu", element: "Thủy", yinYang: "Âm" },
  { can: "Giáp", chi: "Tuất", element: "Mộc", yinYang: "Dương" },
  { can: "Ất", chi: "Hợi", element: "Mộc", yinYang: "Âm" },
  { can: "Bính", chi: "Tý", element: "Hỏa", yinYang: "Dương" },
  { can: "Đinh", chi: "Sửu", element: "Thổ", yinYang: "Âm" },
  { can: "Mậu", chi: "Dần", element: "Thổ", yinYang: "Dương" },
  { can: "Kỷ", chi: "Mão", element: "Thổ", yinYang: "Âm" },
  { can: "Canh", chi: "Thìn", element: "Kim", yinYang: "Dương" },
  { can: "Tân", chi: "Tỵ", element: "Kim", yinYang: "Âm" },
  { can: "Nhâm", chi: "Ngọ", element: "Thủy", yinYang: "Dương" },
  { can: "Quý", chi: "Mùi", element: "Thủy", yinYang: "Âm" },
  { can: "Giáp", chi: "Thân", element: "Mộc", yinYang: "Dương" },
  { can: "Ất", chi: "Dậu", element: "Mộc", yinYang: "Âm" },
  { can: "Bính", chi: "Tuất", element: "Hỏa", yinYang: "Dương" },
  { can: "Đinh", chi: "Hợi", element: "Hỏa", yinYang: "Âm" },
  { can: "Mậu", chi: "Tý", element: "Thổ", yinYang: "Dương" },
  { can: "Kỷ", chi: "Sửu", element: "Thổ", yinYang: "Âm" },
  { can: "Canh", chi: "Dần", element: "Kim", yinYang: "Dương" },
  { can: "Tân", chi: "Mão", element: "Kim", yinYang: "Âm" },
  { can: "Nhâm", chi: "Thìn", element: "Thủy", yinYang: "Dương" },
  { can: "Quý", chi: "Tỵ", element: "Thủy", yinYang: "Âm" },
  { can: "Giáp", chi: "Ngọ", element: "Mộc", yinYang: "Dương" },
  { can: "Ất", chi: "Mùi", element: "Mộc", yinYang: "Âm" },
  { can: "Bính", chi: "Thân", element: "Hỏa", yinYang: "Dương" },
  { can: "Đinh", chi: "Dậu", element: "Hỏa", yinYang: "Âm" },
  { can: "Mậu", chi: "Tuất", element: "Thổ", yinYang: "Dương" },
  { can: "Kỷ", chi: "Hợi", element: "Thổ", yinYang: "Âm" },
  { can: "Canh", chi: "Tý", element: "Kim", yinYang: "Dương" },
  { can: "Tân", chi: "Sửu", element: "Kim", yinYang: "Âm" },
  { can: "Nhâm", chi: "Dần", element: "Thủy", yinYang: "Dương" },
  { can: "Quý", chi: "Mão", element: "Thủy", yinYang: "Âm" },
  { can: "Giáp", chi: "Thìn", element: "Mộc", yinYang: "Dương" },
  { can: "Ất", chi: "Tỵ", element: "Mộc", yinYang: "Âm" },
  { can: "Bính", chi: "Ngọ", element: "Hỏa", yinYang: "Dương" },
  { can: "Đinh", chi: "Mùi", element: "Hỏa", yinYang: "Âm" },
  { can: "Mậu", chi: "Thân", element: "Thổ", yinYang: "Dương" },
  { can: "Kỷ", chi: "Dậu", element: "Thổ", yinYang: "Âm" },
  { can: "Canh", chi: "Tuất", element: "Kim", yinYang: "Dương" },
  { can: "Tân", chi: "Hợi", element: "Kim", yinYang: "Âm" },
  { can: "Nhâm", chi: "Tý", element: "Thủy", yinYang: "Dương" },
  { can: "Quý", chi: "Sửu", element: "Thủy", yinYang: "Âm" },
  { can: "Giáp", chi: "Dần", element: "Mộc", yinYang: "Dương" },
  { can: "Ất", chi: "Mão", element: "Mộc", yinYang: "Âm" },
  { can: "Bính", chi: "Thìn", element: "Hỏa", yinYang: "Dương" },
  { can: "Đinh", chi: "Tỵ", element: "Hỏa", yinYang: "Âm" },
  { can: "Mậu", chi: "Ngọ", element: "Thổ", yinYang: "Dương" },
  { can: "Kỷ", chi: "Mùi", element: "Thổ", yinYang: "Âm" },
  { can: "Canh", chi: "Thân", element: "Kim", yinYang: "Dương" },
  { can: "Tân", chi: "Dậu", element: "Kim", yinYang: "Âm" },
  { can: "Nhâm", chi: "Tuất", element: "Thủy", yinYang: "Dương" },
  { can: "Quý", chi: "Hợi", element: "Thủy", yinYang: "Âm" },
];

/* Năm âm lịch bắt đầu từ năm 1924 (Giáp Tý) */
export function getCanChi(year: number): CanChi | null {
  const idx = year - 1924;
  if (idx < 0 || idx >= CAN_CHI.length) return null;
  return CAN_CHI[idx];
}

/* ========== TUONG SINH / TUONG KHAC ========== */

const tuongSinh: Record<string, string> = {
  Kim: "Thủy",
  Thủy: "Mộc",
  Mộc: "Hỏa",
  Hỏa: "Thổ",
  Thổ: "Kim",
};

const tuongKhac: Record<string, string> = {
  Kim: "Mộc",
  Mộc: "Thổ",
  Thổ: "Thủy",
  Thủy: "Hỏa",
  Hỏa: "Kim",
};

export interface TuoiMatchResult {
  score: number;
  label: string;
  desc: string;
  elementA: string;
  elementB: string;
  relation: "Tương sinh" | "Tương khắc" | "Bình hòa";
}

export function matchTuoi(a: number, b: number): TuoiMatchResult | null {
  const ca = getCanChi(a);
  const cb = getCanChi(b);
  if (!ca || !cb) return null;

  const sameElement = ca.element === cb.element;
  const sinh = tuongSinh[ca.element] === cb.element || tuongSinh[cb.element] === ca.element;
  const khac = tuongKhac[ca.element] === cb.element || tuongKhac[cb.element] === ca.element;

  let score = 50;
  let relation: TuoiMatchResult["relation"] = "Bình hòa";
  let label = "Bình hòa";
  let desc = "Hai tuổi không sinh không khắc. Quan hệ cần vun đắp bằng sự thấu hiểu.";

  if (sameElement) {
    score = 85;
    relation = "Bình hòa";
    label = "Hòa hợp";
    desc = `Cùng ngũ hành ${ca.element}. Dễ đồng cảm, hiểu nhau nhanh.`;
  } else if (sinh) {
    score = 90;
    relation = "Tương sinh";
    label = "Đại cát";
    desc = `${ca.element} sinh ${cb.element} — quan hệ bổ trợ, nuôi dưỡng lẫn nhau.`;
  } else if (khac) {
    score = 40;
    relation = "Tương khắc";
    label = "Cần điều tiết";
    desc = `${ca.element} khắc ${cb.element} — có mâu thuẫn nhưng có thể hóa giải bằng sự khéo léo.`;
  }

  // Bonus cùng âm/dương
  if (ca.yinYang === cb.yinYang) score -= 5;
  else score += 5;

  // Bonus can hợp (Giáp-Kỷ, Bính-Tân, Mậu-Quý, Canh-Ất, Nhâm-Đinh)
  const canHop: Record<string, string> = { Giáp: "Kỷ", Kỷ: "Giáp", Bính: "Tân", Tân: "Bính", Mậu: "Quý", Quý: "Mậu", Canh: "Ất", Ất: "Canh", Nhâm: "Đinh", Đinh: "Nhâm" };
  if (canHop[ca.can] === cb.can) score += 10;

  // Trừ can xung
  const canXung: Record<string, string> = { Giáp: "Canh", Canh: "Giáp", Ất: "Tân", Tân: "Ất", Bính: "Nhâm", Nhâm: "Bính", Đinh: "Quý", Quý: "Đinh" };
  if (canXung[ca.can] === cb.can) score -= 15;

  // Chi tam hợp
  const tamHop = [
    ["Thân", "Tý", "Thìn"],
    ["Dậu", "Sửu", "Tỵ"],
    ["Tuất", "Ngọ", "Dần"],
    ["Hợi", "Mão", "Mùi"],
  ];
  const inSameTamHop = tamHop.some((g) => g.includes(ca.chi) && g.includes(cb.chi));
  if (inSameTamHop) score += 10;

  // Chi xung
  const chiXung: Record<string, string> = {
    Tý: "Ngọ", Ngọ: "Tý", Sửu: "Mùi", Mùi: "Sửu",
    Dần: "Thân", Thân: "Dần", Mão: "Dậu", Dậu: "Mão",
    Thìn: "Tuất", Tuất: "Thìn", Tỵ: "Hợi", Hợi: "Tỵ",
  };
  if (chiXung[ca.chi] === cb.chi) score -= 10;

  score = Math.min(100, Math.max(0, score));

  return { score, label, desc, elementA: ca.element, elementB: cb.element, relation };
}

/* Luận giải chi tiết theo từng mục */
export function luanTuoi(type: string, a: number, b: number, match: TuoiMatchResult | null): string {
  const ca = getCanChi(a);
  const cb = getCanChi(b);
  if (!ca || !cb || !match) return "Không đủ dữ liệu để luận.";
  
  const base = `${ca.can} ${ca.chi} (${ca.element}) với ${cb.can} ${cb.chi} (${cb.element}). `;
  
  switch (type) {
    case "vo-chong":
      return base + (match.score >= 80 ? "Hai tuổi rất hợp nhau. Tình cảm bền vững, dễ sinh sống hòa thuận. Nên cưới sớm." :
             match.score >= 60 ? "Hai tuổi khá hợp. Cần vun đắp, thông cảm lẫn nhau." :
             "Hai tuổi có xung khắc. Cần nhiều sự nhẫn nhịn, bao dung mới bền lâu.");
    case "ket-hon":
      return base + (match.score >= 80 ? "Năm cưới tốt, dễ sinh quý tử, gia đình hưng thịnh." :
             match.score >= 60 ? "Năm cưới được, nhưng cần chọn ngày lành tháng tốt." :
             "Năm này không tốt để cưới. Nên chọn năm khác hoặc xem ngày kỹ.");
    case "hop-nhau":
      return base + (match.score >= 80 ? "Hai tuổi rất hợp tác. Làm ăn chung dễ phát đạt." :
             match.score >= 60 ? "Hai tuổi có thể hợp tác. Cần rõ ràng về tiền bạc." :
             "Hai tuổi dễ mâu thuẫn. Nên tránh hợp tác làm ăn chung.");
    case "sinh-con":
      return base + (match.score >= 80 ? "Hai tuổi sinh con tốt. Con thông minh, hiếu thảo." :
             match.score >= 60 ? "Có thể sinh con. Chọn năm sinh hợp tuổi bố mẹ." :
             "Nên chọn năm sinh con cẩn thận. Tránh năm xung khắc.");
    case "lam-an":
      return base + (match.score >= 80 ? "Hai tuổi hợp làm ăn. Cùng nhau phát tài." :
             match.score >= 60 ? "Có thể làm chung. Cần phân công rõ ràng." :
             "Không nên làm ăn chung. Dễ tranh chấp, mất lòng.");
    case "xong-dat":
      return base + (match.score >= 80 ? "Tuổi này rất tốt để xông đất đầu năm. Mang lại may mắn." :
             match.score >= 60 ? "Tuổi này xông đất được. Nên chọn giờ hoàng đạo." :
             "Tuổi này không tốt để xông đất. Nên chọn tuổi khác.");
    default:
      return base + match.desc;
  }
}

/* ========== HOP LAM AN / LAM NHA ========== */

export function checkTuoiLamNha(chuNha: number, namXay: number): { ok: boolean; msg: string } {
  const cc = getCanChi(chuNha);
  if (!cc) return { ok: false, msg: "Tuổi không hợp lệ" };

  // Tam tai: cách 12, 24, 36 tuổi
  const diff = namXay - chuNha;
  if (diff === 12 || diff === 24 || diff === 36) {
    return { ok: false, msg: `Năm ${namXay} phạm Tam tai (${diff} tuổi). Không nên xây, sửa nhà.` };
  }

  // Kim lâu
  if (diff % 9 === 1 || diff % 9 === 3 || diff % 9 === 6) {
    return { ok: false, msg: `Năm ${namXay} phạm Kim lâu. Kiêng xây nhà.` };
  }

  // Hoang ốc
  if (diff % 6 === 1) {
    return { ok: false, msg: `Năm ${namXay} phạm Hoang ốc. Không nên động thổ.` };
  }

  return { ok: true, msg: `Năm ${namXay} không phạm Tam tai, Kim lâu, Hoang ốc. Rất tốt để xây/sửa nhà.` };
}
