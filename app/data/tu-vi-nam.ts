/* Tử vi năm 2024-2030 theo từng chi */

export interface TuViNamData {
  o: string; /* tổng quan */
  c: string; /* công danh */
  l: string; /* tình duyên */
  h: string; /* sức khỏe */
  m: string; /* tiền bạc */
  mo: string[]; /* 12 tháng */
}

const DATA: Record<number, Record<string, TuViNamData>> = {
  2024: {
    Tý: { o: "Tam hợp Thìn, năm tốt.", c: "Thăng tiến, được giúp.", l: "Tốt đẹp, dễ gặp duyên.", h: "Dồi dào, tập thể dục.", m: "Hanh thông, đầu tư được.", mo: ["Khởi","Tăng","Tài","Quý","Thăng","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón"] },
    Sửu: { o: "Phá Thìn, nhiều biến động.", c: "Không ổn, tập trung chuyên môn.", l: "Dễ tan vỡ, kiên nhẫn.", h: "Mệt mỏi, stress.", m: "Hao tài, kiểm soát chi.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Dần: { o: "Nhị hợp Thìn, khá tốt.", c: "Tiến triển, cần kiên nhẫn.", l: "Ổn định, vun đắp.", h: "Tốt, chú ý tiêu hóa.", m: "Tăng nhẹ, tiết kiệm.", mo: ["Ổn","Thử","Tiến","Cẩn","Tài","Hòa","Nghỉ","Cơ","Thu","Quý","Tổng","Bình"] },
    Mão: { o: "Hại Thìn, cần giữ gìn.", c: "Trở ngại, kiên trì.", l: "Bất ổn, dễ chia ly.", h: "Giảm sút, chú ý tai nạn.", m: "Hao tài, không cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Thìn: { o: "Bản mệnh, nhiều thử thách lớn.", c: "Biến động, có thể đổi việc.", l: "Sóng gió, cần bao dung.", h: "Yếu, tim mạch, mắt.", m: "Bất ổn, tránh cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Tiến","Thị","Nghỉ","Tài","Hòa","Cơ","Thu","Tổng"] },
    Tỵ: { o: "Tam hợp Thìn, năm tốt.", c: "Hanh thông, tin tưởng.", l: "Êm đềm, sum vầy.", h: "Tốt, chú ý hô hấp.", m: "Ổn định, mua sắm được.", mo: ["Ổn","Tiến","Tài","Quý","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón","Khởi"] },
    Ngọ: { o: "Phá Thìn, không tham vọng.", c: "Bình ổn, tích lũy.", l: "Êm đềm, không ép buộc.", h: "Ổn, chú ý hô hấp.", m: "Cân bằng, tiết kiệm.", mo: ["Bình","Ổn","Tiến","Cẩn","Quý","Tài","Nghỉ","Cơ","Hòa","Thu","Tổng","Chuẩn"] },
    Mùi: { o: "Phạm Thìn, cần giữ gìn.", c: "Khó khăn, kiên nhẫn.", l: "Bất ổn, dễ chia ly.", h: "Giảm sút, chú ý tai nạn.", m: "Hao tài, không cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Thân: { o: "Tam hợp Thìn, năm rất tốt.", c: "Thăng tiến, khởi nghiệp được.", l: "Tốt đẹp, kết hôn thuận.", h: "Dồi dào, năng lượng.", m: "Hanh thông, sinh lời.", mo: ["Khởi","Tăng","Tài","Thăng","Quý","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón"] },
    Dậu: { o: "Lục hợp Thìn, khá tốt.", c: "Tiến triển, cần kiên nhẫn.", l: "Ổn định, vun đắp.", h: "Tốt, chú ý tiêu hóa.", m: "Tăng nhẹ, tiết kiệm.", mo: ["Ổn","Thử","Tiến","Cẩn","Tài","Hòa","Nghỉ","Cơ","Thu","Quý","Tổng","Bình"] },
    Tuất: { o: "Xung Thìn, nhiều biến động.", c: "Không ổn, tập trung chuyên môn.", l: "Dễ tan vỡ, kiên nhẫn.", h: "Mệt mỏi, stress.", m: "Hao tài, kiểm soát chi.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Hợi: { o: "Trung bình, không mạo hiểm.", c: "Bình thường, học thêm.", l: "Ổn định, hạnh phúc.", h: "Tốt, chú ý tiêu hóa.", m: "Cân bằng, tránh vay.", mo: ["Bình","Ổn","Tiến","Cẩn","Quý","Tài","Nghỉ","Cơ","Hòa","Thu","Tổng","Chuẩn"] },
  },
  2025: {
    Tý: { o: "Xung Tỵ, nhiều biến động.", c: "Không ổn, tập trung chuyên môn.", l: "Dễ tan vỡ, kiên nhẫn.", h: "Mệt mỏi, stress.", m: "Hao tài, kiểm soát chi.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Sửu: { o: "Tam hợp Tỵ, năm tốt.", c: "Hanh thông, tin tưởng.", l: "Êm đềm, sum vầy.", h: "Tốt, chú ý hô hấp.", m: "Ổn định, mua sắm được.", mo: ["Ổn","Tiến","Tài","Quý","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón","Khởi"] },
    Dần: { o: "Hại Tỵ, cần giữ gìn.", c: "Trở ngại, kiên trì.", l: "Bất ổn, dễ chia ly.", h: "Giảm sút, chú ý tai nạn.", m: "Hao tài, không cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Mão: { o: "Nhị hợp Tỵ, khá tốt.", c: "Tiến triển, cần kiên nhẫn.", l: "Ổn định, vun đắp.", h: "Tốt, chú ý tiêu hóa.", m: "Tăng nhẹ, tiết kiệm.", mo: ["Ổn","Thử","Tiến","Cẩn","Tài","Hòa","Nghỉ","Cơ","Thu","Quý","Tổng","Bình"] },
    Thìn: { o: "Phạm Tỵ, cần giữ gìn.", c: "Khó khăn, kiên nhẫn.", l: "Bất ổn, dễ chia ly.", h: "Giảm sút, chú ý tai nạn.", m: "Hao tài, không cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Tỵ: { o: "Bản mệnh, nhiều thử thách lớn.", c: "Biến động, có thể đổi việc.", l: "Sóng gió, cần bao dung.", h: "Yếu, tim mạch, mắt.", m: "Bất ổn, tránh cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Tiến","Thị","Nghỉ","Tài","Hòa","Cơ","Thu","Tổng"] },
    Ngọ: { o: "Lục hợp Tỵ, khá tốt.", c: "Tiến triển, cần kiên nhẫn.", l: "Ổn định, vun đắp.", h: "Tốt, chú ý tiêu hóa.", m: "Tăng nhẹ, tiết kiệm.", mo: ["Ổn","Thử","Tiến","Cẩn","Tài","Hòa","Nghỉ","Cơ","Thu","Quý","Tổng","Bình"] },
    Mùi: { o: "Nhị hợp Tỵ, khá tốt.", c: "Tiến triển, cần kiên nhẫn.", l: "Ổn định, vun đắp.", h: "Tốt, chú ý tiêu hóa.", m: "Tăng nhẹ, tiết kiệm.", mo: ["Ổn","Thử","Tiến","Cẩn","Tài","Hòa","Nghỉ","Cơ","Thu","Quý","Tổng","Bình"] },
    Thân: { o: "Phá Tỵ, không tham vọng.", c: "Bình ổn, tích lũy.", l: "Êm đềm, không ép buộc.", h: "Ổn, chú ý hô hấp.", m: "Cân bằng, tiết kiệm.", mo: ["Bình","Ổn","Tiến","Cẩn","Quý","Tài","Nghỉ","Cơ","Hòa","Thu","Tổng","Chuẩn"] },
    Dậu: { o: "Tam hợp Tỵ, năm tốt.", c: "Thăng tiến, được giúp.", l: "Tốt đẹp, dễ gặp duyên.", h: "Dồi dào, tập thể dục.", m: "Hanh thông, đầu tư được.", mo: ["Khởi","Tăng","Tài","Quý","Thăng","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón"] },
    Tuất: { o: "Phạm Tỵ, cần giữ gìn.", c: "Khó khăn, kiên nhẫn.", l: "Bất ổn, dễ chia ly.", h: "Giảm sút, chú ý tai nạn.", m: "Hao tài, không cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Hợi: { o: "Xung Tỵ, nhiều biến động.", c: "Không ổn, tập trung chuyên môn.", l: "Dễ tan vỡ, kiên nhẫn.", h: "Mệt mỏi, stress.", m: "Hao tài, kiểm soát chi.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
  },
  2026: {
    Tý: { o: "Phạm Thái Tuế, cần giữ gìn.", c: "Biến động, chờ thời cơ.", l: "Bất ổn, kiên nhẫn.", h: "Huyết áp, tim mạch.", m: "Không ổn định, tránh đầu tư.", mo: ["Khó","Cẩn","Quý","Ổn","Tăng","Thị","Nghỉ","Tài","Hòa","Cơ","Thu","Tổng"] },
    Sửu: { o: "Nhiều thử thách, cơ hội rèn luyện.", c: "Kiên trì, thành công đến.", l: "Cần thời gian vun đắp.", h: "Tiêu hóa.", m: "Tăng nhẹ, tiết kiệm.", mo: ["Ổn","Thử","Tiến","Cẩn","Tài","Hòa","Nghỉ","Cơ","Thu","Quý","Tổng","Bình"] },
    Dần: { o: "Tam hợp Ngọ, năm rất thuận.", c: "Thăng tiến, được giúp.", l: "Tốt đẹp, dễ gặp duyên.", h: "Dồi dào, tập thể dục.", m: "Hanh thông, đầu tư được.", mo: ["Khởi","Tăng","Tài","Quý","Thăng","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón"] },
    Mão: { o: "Bị phá, nhiều biến động.", c: "Không ổn, tập trung chuyên môn.", l: "Dễ tan vỡ, kiên nhẫn.", h: "Mệt mỏi, stress.", m: "Hao tài, kiểm soát chi.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Thìn: { o: "Trung bình, không mạo hiểm.", c: "Bình thường, học thêm.", l: "Ổn định, hạnh phúc.", h: "Tốt, chú ý tiêu hóa.", m: "Cân bằng, tránh vay.", mo: ["Bình","Ổn","Tiến","Cẩn","Quý","Tài","Nghỉ","Cơ","Hòa","Thu","Tổng","Chuẩn"] },
    Tỵ: { o: "Lục hợp Ngọ, năm tốt.", c: "Thăng tiến nhanh.", l: "Như ý, viên mãn.", h: "Tốt, tránh cay nóng.", m: "Dồi dào, lộc bất ngờ.", mo: ["Khởi","Tăng","Tài","Thăng","Quý","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón"] },
    Ngọ: { o: "Bản mệnh, nhiều thử thách lớn.", c: "Biến động, có thể đổi việc.", l: "Sóng gió, cần bao dung.", h: "Yếu, tim mạch, mắt.", m: "Bất ổn, tránh cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Tiến","Thị","Nghỉ","Tài","Hòa","Cơ","Thu","Tổng"] },
    Mùi: { o: "Tam hợp Ngọ, hợp tác thuận.", c: "Hanh thông, tin tưởng.", l: "Êm đềm, sum vầy.", h: "Tốt, chú ý hô hấp.", m: "Ổn định, mua sắm được.", mo: ["Ổn","Tiến","Tài","Quý","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón","Khởi"] },
    Thân: { o: "Phạm Ngọ, cần giữ gìn.", c: "Khó khăn, kiên nhẫn.", l: "Bất ổn, dễ chia ly.", h: "Giảm sút, chú ý tai nạn.", m: "Hao tài, không cho vay.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
    Dậu: { o: "Phá Ngọ, không tham vọng.", c: "Bình ổn, tích lũy.", l: "Êm đềm, không ép buộc.", h: "Ổn, chú ý hô hấp.", m: "Cân bằng, tiết kiệm.", mo: ["Bình","Ổn","Tiến","Cẩn","Quý","Tài","Nghỉ","Cơ","Hòa","Thu","Tổng","Chuẩn"] },
    Tuất: { o: "Tam hợp Ngọ, năm rất tốt.", c: "Thăng tiến, khởi nghiệp được.", l: "Tốt đẹp, kết hôn thuận.", h: "Dồi dào, năng lượng.", m: "Hanh thông, sinh lời.", mo: ["Khởi","Tăng","Tài","Thăng","Quý","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón"] },
    Hợi: { o: "Phạm Ngọ, đề phòng tiểu nhân.", c: "Trở ngại, kiên trì.", l: "Dễ bị phá, tin tưởng.", h: "Yếu, thận, tiết niệu.", m: "Bất ổn, tránh đầu tư.", mo: ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"] },
  },
};

/* Fallback: generate prediction based on zodiac relations with year chi */
const CHI_LIST = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
const CAN_LIST = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];

const tamHop: Record<string, string[]> = {
  Tý: ["Thân","Thìn"], Sửu: ["Tỵ","Dậu"], Dần: ["Tuất","Ngọ"],
  Mão: ["Hợi","Mùi"], Thìn: ["Thân","Tý"], Tỵ: ["Dậu","Sửu"],
  Ngọ: ["Dần","Tuất"], Mùi: ["Mão","Hợi"], Thân: ["Tý","Thìn"],
  Dậu: ["Sửu","Tỵ"], Tuất: ["Ngọ","Dần"], Hợi: ["Mùi","Mão"],
};
const lucHop: Record<string, string> = {
  Tý: "Sửu", Sửu: "Tý", Dần: "Hợi", Mão: "Tuất", Thìn: "Dậu", Tỵ: "Thân",
  Ngọ: "Mùi", Mùi: "Ngọ", Thân: "Tỵ", Dậu: "Thìn", Tuất: "Mão", Hợi: "Dần",
};
const xung: Record<string, string> = {
  Tý: "Ngọ", Ngọ: "Tý", Sửu: "Mùi", Mùi: "Sửu", Dần: "Thân", Thân: "Dần",
  Mão: "Dậu", Dậu: "Mão", Thìn: "Tuất", Tuất: "Thìn", Tỵ: "Hợi", Hợi: "Tỵ",
};
const hai: Record<string, string> = {
  Tý: "Mùi", Mùi: "Tý", Sửu: "Ngọ", Ngọ: "Sửu", Dần: "Tỵ", Tỵ: "Dần",
  Mão: "Thìn", Thìn: "Mão", Thân: "Hợi", Hợi: "Thân", Dậu: "Tuất", Tuất: "Dậu",
};
const pha: Record<string, string> = {
  Tý: "Dậu", Dậu: "Tý", Sửu: "Thìn", Thìn: "Sửu", Dần: "Hợi", Hợi: "Dần",
  Mão: "Ngọ", Ngọ: "Mão", Tỵ: "Thân", Thân: "Tỵ", Mùi: "Tuất", Tuất: "Mùi",
};

function generateFallback(chi: string, year: number): TuViNamData {
  const yearChi = CHI_LIST[(year - 4) % 12];
  const yearCan = CAN_LIST[(year - 4) % 10];
  const canChiYear = `${yearCan} ${yearChi}`;

  let o: string, c: string, l: string, h: string, m: string, mo: string[];

  if (tamHop[chi]?.includes(yearChi)) {
    o = `Năm ${year} (${canChiYear}) — Tam hợp với tuổi ${chi}. Năm rất thuận lợi, mọi việc hanh thông.`;
    c = "Thăng tiến nhanh, được quý nhân giúp đỡ. Nên mở rộng công việc.";
    l = "Tình duyên tốt đẹp, dễ gặp duyên lành. Nên kết hôn, sinh con.";
    h = "Sức khỏe dồi dào, tinh thần lạc quan. Nên tập thể dục đều đặn.";
    m = "Tài lộc hanh thông, đầu tư sinh lời. Có lộc bất ngờ.";
    mo = ["Khởi","Tăng","Tài","Quý","Thăng","Hòa","Cơ","Thu","Bình","Tổng","Chuẩn","Đón"];
  } else if (lucHop[chi] === yearChi) {
    o = `Năm ${year} (${canChiYear}) — Lục hợp với tuổi ${chi}. Năm khá tốt, nhiều may mắn.`;
    c = "Tiến triển ổn định, cần kiên nhẫn. Có người giúp đỡ âm thầm.";
    l = "Tình cảm êm đềm, hôn nhân hòa thuận. Nên vun đắp quan hệ.";
    h = "Sức khỏe ổn định, ít bệnh tật. Chú ý ăn uống điều độ.";
    m = "Tài chính tăng nhẹ, nên tiết kiệm. Không nên đầu tư mạo hiểm.";
    mo = ["Ổn","Thử","Tiến","Cẩn","Tài","Hòa","Nghỉ","Cơ","Thu","Quý","Tổng","Bình"];
  } else if (xung[chi] === yearChi) {
    o = `Năm ${year} (${canChiYear}) — Xung khắc với tuổi ${chi}. Năm nhiều biến động, cần giữ gìn.`;
    c = "Biến động lớn, có thể đổi việc. Cần chờ thời cơ, không nên gấp gáp.";
    l = "Bất ổn, dễ chia ly. Cần kiên nhẫn, bao dung trong quan hệ.";
    h = "Sức khỏe giảm sút, chú ý tai nạn, huyết áp, tim mạch.";
    m = "Hao tài, không cho vay. Không nên đầu tư lớn, mua bán nhà đất.";
    mo = ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"];
  } else if (hai[chi] === yearChi) {
    o = `Năm ${year} (${canChiYear}) — Hại với tuổi ${chi}. Năm có trở ngại, cần kiên trì.`;
    c = "Trở ngại, khó khăn. Cần kiên trì, không nên bỏ cuộc giữa chừng.";
    l = "Dễ bị phá, tin tưởng sai người. Cần cẩn thận trong quan hệ.";
    h = "Yếu, chú ý bệnh về thận, tiêu hóa. Nên khám sức khỏe định kỳ.";
    m = "Bất ổn, tránh đầu tư. Không nên tin người về tiền bạc.";
    mo = ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"];
  } else if (pha[chi] === yearChi) {
    o = `Năm ${year} (${canChiYear}) — Phá với tuổi ${chi}. Năm nhiều biến động, cần bình tĩnh.`;
    c = "Không ổn định, cần tập trung chuyên môn. Tránh thay đổi công việc.";
    l = "Dễ tan vỡ, cần kiên nhẫn. Không nên quyết định hôn nhân vội vàng.";
    h = "Mệt mỏi, stress cao. Cần nghỉ ngơi, tránh làm việc quá sức.";
    m = "Hao tài, cần kiểm soát chi tiêu. Không nên mua sắm lớn.";
    mo = ["Cẩn","Khó","Quý","Ổn","Thử","Nghỉ","Cơ","Tài","Hòa","Bình","Tổng","Chuẩn"];
  } else if (chi === yearChi) {
    o = `Năm ${year} (${canChiYear}) — Bản mệnh. Năm nhiều thử thách, cần bình tĩnh.`;
    c = "Biến động lớn, có thể đổi việc. Cần chủ động, không nên thụ động.";
    l = "Sóng gió, cần bao dung. Quan hệ dễ căng thẳng, cần kiên nhẫn.";
    h = "Yếu, chú ý tim mạch, mắt. Nên khám sức khỏe định kỳ.";
    m = "Bất ổn, tránh cho vay. Cần có kế hoạch tài chính rõ ràng.";
    mo = ["Cẩn","Khó","Quý","Ổn","Tiến","Thị","Nghỉ","Tài","Hòa","Cơ","Thu","Tổng"];
  } else {
    o = `Năm ${year} (${canChiYear}) — Trung bình với tuổi ${chi}. Không sinh không khắc.`;
    c = "Bình thường, học hỏi thêm. Cần nỗ lực nhiều hơn để tiến bộ.";
    l = "Ổn định, hạnh phúc. Quan hệ không biến động, cần vun đắp.";
    h = "Tốt, chú ý tiêu hóa. Nên duy trì thói quen tốt.";
    m = "Cân bằng, tránh vay nợ. Không nên đầu tư mạo hiểm.";
    mo = ["Bình","Ổn","Tiến","Cẩn","Quý","Tài","Nghỉ","Cơ","Hòa","Thu","Tổng","Chuẩn"];
  }

  return { o, c, l, h, m, mo };
}

export function getTuViNam(year: number, chi: string): TuViNamData {
  return DATA[year]?.[chi] || generateFallback(chi, year);
}

/* Export all available years */
export const AVAILABLE_YEARS = [2024, 2025, 2026];
