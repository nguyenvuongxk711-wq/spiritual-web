export interface NumberProfile { title: string; desc: string; advice: string; }
export interface BirthDigitProfile { label: string; desc: string; }

export const NUMEROLOGY_KB = {
  lifePath: {
    1: { title: "Người dẫn đầu", desc: "Độc lập, sáng tạo, có khả năng lãnh đạo bẩm sinh.", advice: "Học cách lắng nghe người khác, đừng để cái tôi quá lớn." },
    2: { title: "Người hòa giải", desc: "Nhạy cảm, hợp tác, giỏi xây dựng mối quan hệ.", advice: "Đừng để sự nhạy cảm biến thành tự ti. Tin vào trực giác." },
    3: { title: "Người sáng tạo", desc: "Vui vẻ, lạc quan, tài năng nghệ thuật và giao tiếp.", advice: "Tập trung vào 1 mục tiêu, tránh phân tán năng lượng." },
    4: { title: "Người xây dựng", desc: "Thực tế, chăm chỉ, đáng tin cậy, yêu thích kỷ luật.", advice: "Đừng quá cứng nhắc. Linh hoạt sẽ giúp bạn đi xa hơn." },
    5: { title: "Người tự do", desc: "Thích phiêu lưu, linh hoạt, ham học hỏi và thay đổi.", advice: "Tự do cần có trách nhiệm. Đừng chạy trốn khỏi cam kết." },
    6: { title: "Người chăm sóc", desc: "Trách nhiệm, yêu thương, gia đình là trọng tâm.", advice: "Yêu bản thân trước khi yêu người khác. Tránh đồng phục thuộc." },
    7: { title: "Nhà tư tưởng", desc: "Trực giác mạnh, thích chiêm tinh, tâm linh và triết học.", advice: "Đừng sống quá khép kín. Chia sẻ kiến thức sẽ giúp bạn trưởng thành." },
    8: { title: "Người quyền lực", desc: "Tham vọng, giỏi quản lý tài chính và kinh doanh.", advice: "Tiền bạc là công cụ, không phải mục đích. Giữ trái tim nhân ái." },
    9: { title: "Nhân đạo", desc: "Rộng lượng, lý tưởng cao, thích giúp đỡ cộng đồng.", advice: "Biết buông bỏ. Không phải lúc nào bạn cũng phải cứu vãn thế giới." },
    11: { title: "Thầy dạy trực giác", desc: "Năng lượng sâu sắc, trực giác siêu phàm.", advice: "Trực giác là quà tặng. Tin vào điều bạn cảm nhận." },
    22: { title: "Nhà xây dựng vĩ đại", desc: "Sức mạnh biến ước mơ lớn thành hiện thực.", advice: "Nghĩ lớn, hành động lớn. Nhưng nhớ giữ chân trên mặt đất." },
    33: { title: "Bậc thầy tâm linh", desc: "Tình yêu vô điều kiện, chữa lành và dẫn dắt linh hồn.", advice: "Chữa lành bản thân trước khi chữa lành người khác." },
  } as Record<number, NumberProfile>,

  birthChart: {
    1: { label: "Số 1 — Độc lập", desc: "Khát khao tự chủ, dẫn đầu, tự tin." },
    2: { label: "Số 2 — Hợp tác", desc: "Nhạy cảm, kiên nhẫn, làm việc nhóm." },
    3: { label: "Số 3 — Sáng tạo", desc: "Biểu đạt, vui vẻ, nghệ thuật, giao tiếp." },
    4: { label: "Số 4 — Thực tế", desc: "Kỷ luật, xây dựng, chăm chỉ, ổn định." },
    5: { label: "Số 5 — Tự do", desc: "Thích thay đổi, phiêu lưu, linh hoạt." },
    6: { label: "Số 6 — Trách nhiệm", desc: "Yêu thương, gia đình, công lý, chăm sóc." },
    7: { label: "Số 7 — Trí tuệ", desc: "Phân tích, tâm linh, nội tâm, tìm kiếm." },
    8: { label: "Số 8 — Quyền lực", desc: "Tham vọng, quản lý, tài chính, kỷ luật." },
    9: { label: "Số 9 — Nhân đạo", desc: "Rộng lượng, phụng sự, kết thúc và bắt đầu." },
  } as Record<number, BirthDigitProfile>,

  personalYear: {
    1: { title: "Năm khởi đầu", desc: "Bắt đầu chu kỳ mới. Độc lập hành động.", advice: "Mạnh dạn bắt đầu dự án mới." },
    2: { title: "Năm hợp tác", desc: "Xây dựng quan hệ, kiên nhẫn.", advice: "Hợp tác thay vì cạnh tranh. Lắng nghe nhiều hơn nói." },
    3: { title: "Năm sáng tạo", desc: "Vui vẻ, giao tiếp, thể hiện bản thân.", advice: "Khám phá nghệ thuật, viết lách, sáng tạo." },
    4: { title: "Năm xây dựng", desc: "Làm việc chăm chỉ, đặt nền móng vững chắc.", advice: "Tập trung kỷ luật. Không nên mạo hiểm lớn." },
    5: { title: "Năm thay đổi", desc: "Tự do, du lịch, phiêu lưu, bất ngờ.", advice: "Nắm bắt thay đổi. Đừng sợ rời khỏi vùng an toàn." },
    6: { title: "Năm gia đình", desc: "Trách nhiệm, hôn nhân, chữa lành quan hệ.", advice: "Dành thời gian cho người thân. Cân bằng công việc và gia đình." },
    7: { title: "Năm nội tâm", desc: "Tĩnh lặng, học hỏi, tâm linh, nghiên cứu.", advice: "Đọc sách, thiền định, đi du lịch một mình." },
    8: { title: "Năm thành công", desc: "Tài chính, sự nghiệp, quyền lực, thành tựu.", advice: "Nắm bắt cơ hội kinh doanh. Hành động quyết đoán." },
    9: { title: "Năm kết thúc", desc: "Buông bỏ, hoàn thiện, chuẩn bị cho chu kỳ mới.", advice: "Dọn dẹp quá khứ. Tha thứ và để mọi thứ qua đi." },
  } as Record<number, NumberProfile>,
};

/* ========== PURE FUNCTIONS ========== */

/** Rút gọn số đến 1 chữ số, giữ nguyên master numbers 11, 22, 33 */
export function reduceToSingle(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num).split("").reduce((sum, ch) => sum + parseInt(ch, 10), 0);
  }
  return num;
}

/** Tính Life Path từ chuỗi dd/mm/yyyy */
export function calcLifePath(dateStr: string): number {
  const digits = dateStr.replace(/\D/g, "").split("").map(Number);
  if (digits.length === 0) return 0;
  return reduceToSingle(digits.reduce((a, b) => a + b, 0));
}

/** Tính năm cá nhân: ngày + tháng + năm hiện tại */
export function calcPersonalYear(dateStr: string): number {
  const clean = dateStr.replace(/\D/g, "");
  if (clean.length < 4) return 0;
  const day = parseInt(clean.slice(0, 2), 10);
  const month = parseInt(clean.slice(2, 4), 10);
  const currentYear = new Date().getFullYear();
  return reduceToSingle(day + month + currentYear);
}

/** Biểu đồ ngày sinh: đếm tần suất chữ số 1-9 trong dd/mm/yyyy */
export function calcBirthChart(dateStr: string): Record<number, number> {
  const map: Record<number, number> = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };
  const digits = dateStr.replace(/\D/g, "").split("").map(Number);
  digits.forEach((d) => { if (d >= 1 && d <= 9) map[d] = (map[d] || 0) + 1; });
  return map;
}

/** Validate ngày sinh dd/mm/yyyy */
export function validateDate(dateStr: string): { ok: boolean; error?: string } {
  const m = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return { ok: false, error: "Định dạng phải là dd/mm/yyyy" };
  const d = parseInt(m[1], 10), mo = parseInt(m[2], 10), y = parseInt(m[3], 10);
  const date = new Date(y, mo - 1, d);
  if (date.getDate() !== d || date.getMonth() + 1 !== mo || date.getFullYear() !== y) {
    return { ok: false, error: "Ngày sinh không hợp lệ" };
  }
  if (y < 1900 || y > new Date().getFullYear()) {
    return { ok: false, error: "Năm sinh không hợp lệ" };
  }
  return { ok: true };
}
