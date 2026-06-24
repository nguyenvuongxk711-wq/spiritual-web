/* ========== CAN CHI NGÀY ========== */
/* Mốc: 1900-01-01 = Giáp Thìn (index 16) */

const CAN_LIST = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI_LIST = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

function daysBetween(a: Date, b: Date): number {
  const ms = 1000 * 60 * 60 * 24;
  return Math.floor((a.getTime() - b.getTime()) / ms);
}

export function getCanChiNgay(date: Date): { can: string; chi: string; full: string } {
  const epoch = new Date(1900, 0, 1); // Jan 1 1900
  const diff = daysBetween(date, epoch);
  const idx = ((16 + diff) % 60 + 60) % 60; // ensure positive
  const can = CAN_LIST[idx % 10];
  const chi = CHI_LIST[idx % 12];
  return { can, chi, full: `${can} ${chi}` };
}

/* ========== SAO TỐT / XẤU THEO CHI NGÀY ========== */

const saoTot: Record<string, string[]> = {
  Tý: ["Thiên đức", "Nguyệt đức", "Thiên hỷ"],
  Sửu: ["Tục thế", "Ích hậu"],
  Dần: ["Thiên đức", "Thiên hỷ", "Dân nhật"],
  Mão: ["Nguyệt đức", "Ích hậu"],
  Thìn: ["Thiên đức", "Tục thế"],
  Tỵ: ["Nguyệt đức", "Thiên hỷ"],
  Ngọ: ["Thiên đức", "Dân nhật"],
  Mùi: ["Tục thế", "Ích hậu"],
  Thân: ["Nguyệt đức", "Thiên hỷ"],
  Dậu: ["Thiên đức", "Dân nhật"],
  Tuất: ["Tục thế", "Ích hậu"],
  Hợi: ["Nguyệt đức", "Thiên hỷ"],
};

const saoXau: Record<string, string[]> = {
  Tý: ["Nguyệt phá"],
  Sửu: ["Tuế phá"],
  Dần: ["Kiếp sát"],
  Mão: ["Phủ đầu"],
  Thìn: ["Tử khí"],
  Tỵ: ["Nguyệt phá"],
  Ngọ: ["Tuế phá"],
  Mùi: ["Kiếp sát"],
  Thân: ["Phủ đầu"],
  Dậu: ["Tử khí"],
  Tuất: ["Nguyệt phá"],
  Hợi: ["Tuế phá"],
};

/* ========== GIỜ HOÀNG ĐẠO THEO CHI NGÀY ========== */

const gioHoangDao: Record<string, string[]> = {
  Tý: ["Tý", "Sửu", "Mão", "Ngọ", "Thân", "Dậu"],
  Sửu: ["Dần", "Mão", "Tỵ", "Thân", "Tuất", "Hợi"],
  Dần: ["Tý", "Sửu", "Mão", "Tỵ", "Mùi", "Dậu"],
  Mão: ["Dần", "Thìn", "Tỵ", "Mùi", "Tuất", "Hợi"],
  Thìn: ["Dần", "Thìn", "Ngọ", "Mùi", "Tuất", "Hợi"],
  Tỵ: ["Sửu", "Thìn", "Ngọ", "Thân", "Tuất", "Hợi"],
  Ngọ: ["Dần", "Mão", "Tỵ", "Thân", "Dậu", "Tuất"],
  Mùi: ["Dần", "Mão", "Tỵ", "Thân", "Dậu", "Tuất"],
  Thân: ["Tý", "Sửu", "Mão", "Ngọ", "Thân", "Dậu"],
  Dậu: ["Dần", "Mão", "Tỵ", "Mùi", "Tuất", "Hợi"],
  Tuất: ["Dần", "Thìn", "Ngọ", "Mùi", "Tuất", "Hợi"],
  Hợi: ["Tý", "Sửu", "Mão", "Tỵ", "Ngọ", "Thân"],
};

/* ========== CÁC VIỆC KIÊNG KỴ THEO CHI NGÀY ========== */

const kiengKy: Record<string, string[]> = {
  Tý: ["Động thổ", "An táng", "Khởi công xây dựng", "Mua bán đất đai"],
  Sửu: ["Khai trương", "Xuất hành xa", "Ký kết hợp đồng lớn", "Cưới xin"],
  Dần: ["Cưới xin", "Nhập trạch", "Mua xe", "Khai trương cửa hàng"],
  Mão: ["Khởi tạo", "Động thổ", "Sửa nhà", "Chuyển nhà"],
  Thìn: ["Xuất hành", "Mua xe", "Du lịch xa", "Ký kết quan trọng"],
  Tỵ: ["An táng", "Chữa bệnh phẫu thuật", "Kiện tụng", "Cãi vã"],
  Ngọ: ["Cưới xin", "Đính hôn", "Hỏi vợ", "Gả con"],
  Mùi: ["Động thổ", "Sửa nhà", "Xây cất", "Đào giếng"],
  Thân: ["Khởi nghiệp", "Khai trương", "Đầu tư lớn", "Mua bán đất"],
  Dậu: ["Xuất hành", "Di chuyển xa", "Du lịch", "Chuyển nhà"],
  Tuất: ["Cưới xin", "Nhập trạch", "Hỏi vợ", "An táng"],
  Hợi: ["Động thổ", "An táng", "Xây cất", "Sửa nhà"],
};

/* ========== VIỆC NÊN LÀM THEO CHI NGÀY ========== */

const nenLam: Record<string, string[]> = {
  Tý: ["Cầu tài", "Giao dịch", "Họp mặt", "Ký kết nhỏ", "Mua sắm"],
  Sửu: ["Cúng bái", "Tu sửa nhà", "Dọn dẹp", "Sửa chữa đồ đạc", "Nộp đơn"],
  Dần: ["Xuất hành", "Gặp gỡ", "Ký kết", "Nhận việc mới", "Họp hành"],
  Mão: ["Cưới xin", "Yết kiến", "Cầu học", "Nhập trạch", "Khai trương nhỏ"],
  Thìn: ["Động thổ", "Xây cất", "An táng", "Sửa nhà", "Đào giếng"],
  Tỵ: ["Khai trương", "Mua sắm", "Du lịch", "Gặp đối tác", "Họp mặt"],
  Ngọ: ["Xuất hành", "Cầu tài", "Giao dịch", "Họp hành", "Nhận việc"],
  Mùi: ["Cúng tế", "Yên tâm", "Nghỉ ngơi", "Tu tỉnh", "Viếng thăm"],
  Thân: ["Đi xa", "Gặp quý nhân", "Đầu tư", "Mở rộng kinh doanh", "Ký kết"],
  Dậu: ["Cưới xin", "Nhập trạch", "Khai trương", "Mua xe", "Gặp đối tác"],
  Tuất: ["Tu sửa", "Dọn dẹp", "Giúp đỡ", "Cúng bái", "Sửa chữa"],
  Hợi: ["Học tập", "Nghiên cứu", "Sáng tác", "Thi cử", "Cầu học"],
};

/* ========== MAIN FUNCTION ========== */

export interface NgayResult {
  canChi: string;
  saoTot: string[];
  saoXau: string[];
  gioHoangDao: string[];
  kiengKy: string[];
  nenLam: string[];
  verdict: "tốt" | "xấu" | "bình thường";
}

/* ========== TÌM NGÀY TỐT CHO MỘT VIỆC ========== */
export interface GoodDay {
  date: string;      // dd/mm/yyyy
  weekday: string;
  canChi: string;
  gioHoangDao: string[];
  matched: string[]; // việc nên làm khớp
}

const WEEKDAYS = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

export function findGoodDays(keywords: string[], from: Date, count: number = 12, scanDays: number = 120): GoodDay[] {
  const out: GoodDay[] = [];
  const lowerKw = keywords.map((k) => k.toLowerCase());
  for (let i = 0; i < scanDays && out.length < count; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const { chi, full } = getCanChiNgay(d);
    const nen = nenLam[chi] || [];
    const kieng = kiengKy[chi] || [];
    const matched = nen.filter((v) => lowerKw.some((k) => v.toLowerCase().includes(k)));
    const blocked = kieng.some((v) => lowerKw.some((k) => v.toLowerCase().includes(k)));
    if (matched.length > 0 && !blocked) {
      out.push({
        date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
        weekday: WEEKDAYS[d.getDay()],
        canChi: full,
        gioHoangDao: gioHoangDao[chi] || [],
        matched,
      });
    }
  }
  return out;
}

export function analyzeNgay(date: Date): NgayResult {
  const { chi, full } = getCanChiNgay(date);
  const st = saoTot[chi] || [];
  const sx = saoXau[chi] || [];
  const ghd = gioHoangDao[chi] || [];

  const verdict: NgayResult["verdict"] =
    st.length > sx.length + 1 ? "tốt" : sx.length > st.length ? "xấu" : "bình thường";

  return {
    canChi: full,
    saoTot: st,
    saoXau: sx,
    gioHoangDao: ghd,
    kiengKy: kiengKy[chi] || [],
    nenLam: nenLam[chi] || [],
    verdict,
  };
}
