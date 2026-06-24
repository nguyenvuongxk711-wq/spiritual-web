export interface TarotCard {
  id: string;
  nameVN: string;
  nameEN: string;
  image: string;
  keywords: string[];
  dailyMessage: string;
  advice: string;
  warning: string;
}

/** 22 lá Major Arcana demo — đủ structure để mở rộng thành 78 lá */
export const TAROT_CARDS: TarotCard[] = [
  {
    id: "the-fool",
    nameVN: "The Fool — Kẻ Khờ",
    nameEN: "The Fool",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/RWS_Tarot_00_Fool.jpg/220px-RWS_Tarot_00_Fool.jpg",
    keywords: ["Bắt đầu mới", "Tự do", "Phiêu lưu", "Tin tưởng"],
    dailyMessage: "Hôm nay là ngày của những khởi đầu. Đừng sợ bước vào vùng chưa biết — vũ trụ đang che chở bạn.",
    advice: "Hãy tin vào trực giác và bước đi nhẹ nhàng. Mọi thứ sẽ đến đúng lúc.",
    warning: "Cẩn thận với quyết định bốc đồng. Tự do không đồng nghĩa với vô trách nhiệm.",
  },
  {
    id: "the-magician",
    nameVN: "The Magician — Nhà Ảo Thuật",
    nameEN: "The Magician",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/RWS_Tarot_01_Magician.jpg/220px-RWS_Tarot_01_Magician.jpg",
    keywords: ["Sức mạnh", "Sáng tạo", "Tài năng", "Khởi xướng"],
    dailyMessage: "Bạn có đủ nguồn lực để biến ý tưởng thành hiện thực. Hãy hành động có chủ đích.",
    advice: "Tập trung năng lượng vào 1 mục tiêu. Bạn là người nắm quyền kiểm soát.",
    warning: "Đừng lợi dụng khả năng để thao túng người khác. Sức mạnh cần đi kèm đạo đức.",
  },
  {
    id: "high-priestess",
    nameVN: "The High Priestess — Nữ Tư Tế",
    nameEN: "The High Priestess",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/220px-RWS_Tarot_02_High_Priestess.jpg",
    keywords: ["Trực giác", "Bí mật", "Tri thức ẩn", "Tĩnh lặng"],
    dailyMessage: "Hãy lắng nghe tiếng nói bên trong. Câu trả lời đã nằm sẵn trong bạn.",
    advice: "Dành thời gian một mình, viết nhật ký, thiền định. Đừng vội vàng tìm câu trả lời bên ngoài.",
    warning: "Đừng giữ quá nhiều bí mật. Chia sẻ với người tin tưởng để giảm gánh nặng.",
  },
  {
    id: "the-empress",
    nameVN: "The Empress — Nữ Hoàng",
    nameEN: "The Empress",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/RWS_Tarot_03_Empress.jpg/220px-RWS_Tarot_03_Empress.jpg",
    keywords: ["Phồn vinh", "Sáng tạo", "Yêu thương", "Tự nhiên"],
    dailyMessage: "Năng lượng sáng tạo và yêu thương đang tràn đầy. Hãy nuôi dưỡng bản thân và người thân.",
    advice: "Tận hưởng cuộc sống, thiên nhiên, nghệ thuật. Cho đi yêu thương sẽ nhận lại gấp bội.",
    warning: "Đừng quá chiều chuộng bản thân đến mức trì trệ. Cân bằng giữa thụ hưởng và hành động.",
  },
  {
    id: "the-emperor",
    nameVN: "The Emperor — Hoàng Đế",
    nameEN: "The Emperor",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/220px-RWS_Tarot_04_Emperor.jpg",
    keywords: ["Quyền lực", "Kỷ luật", "Cấu trúc", "Ổn định"],
    dailyMessage: "Hôm nay cần sự kỷ luật và tổ chức. Hãy đặt ra luật lệ rõ ràng cho bản thân.",
    advice: "Lập kế hoạch, tuân thủ nguyên tắc. Sự ổn định là nền tảng cho mọi thành công lớn.",
    warning: "Đừng trở nên độc đoán. Quyền lực cần đi kèm lòng trắc ẩn và sự công bằng.",
  },
  {
    id: "the-hierophant",
    nameVN: "The Hierophant — Giáo Hoàng",
    nameEN: "The Hierophant",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/RWS_Tarot_05_Hierophant.jpg/220px-RWS_Tarot_05_Hierophant.jpg",
    keywords: ["Truyền thống", "Tín ngưỡng", "Học hỏi", "Hướng dẫn"],
    dailyMessage: "Tìm kiếm sự khôn ngoan từ những người đi trước. Truyền thống có giá trị riêng.",
    advice: "Học hỏi từ sách vở, người thầy, hoặc cộng đồng. Đừng tự mày mò khi có người dẫn lối.",
    warning: "Đừng tuân theo mù quáng. Cái gì phù hợp với người khác chưa chắc phù hợp bạn.",
  },
  {
    id: "the-lovers",
    nameVN: "The Lovers — Đôi Tình Nhân",
    nameEN: "The Lovers",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/RWS_Tarot_06_Lovers.jpg/220px-RWS_Tarot_06_Lovers.jpg",
    keywords: ["Tình yêu", "Lựa chọn", "Hòa hợp", "Đối tác"],
    dailyMessage: "Ngày của những kết nối sâu sắc. Tình yêu, tình bạn, hay quan hệ đối tác đều được chiếu sáng.",
    advice: "Lắng nghe trái tim nhưng cũng dùng lý trí. Mọi lựa chọn đều có hệ quả.",
    warning: "Đừng để cảm xúc che mờ phán đoán. Tình yêu mù quáng dễ dẫn đến tổn thương.",
  },
  {
    id: "the-chariot",
    nameVN: "The Chariot — Chiến Xa",
    nameEN: "The Chariot",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/RWS_Tarot_07_Chariot.jpg/220px-RWS_Tarot_07_Chariot.jpg",
    keywords: ["Chiến thắng", "Quyết tâm", "Kiểm soát", "Tiến về phía trước"],
    dailyMessage: "Năng lượng chiến thắng đang bao quanh. Hãy kiểm soát cảm xúc và tiến về đích.",
    advice: "Tập trung vào mục tiêu. Không để ý kiến trái chiều làm bạn chệch hướng.",
    warning: "Chiến thắng không đồng nghĩa với đè bẹp người khác. Hãy thắng một cách tử tế.",
  },
];

/** Tạo seed từ ngày và fingerprint */
export function createSeed(fp: string, date: string): string {
  return `${fp}_${date}`;
}

/** Hash chuỗi thành số nguyên dương (đơn giản, deterministic) */
export function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0; // convert to 32bit int
  }
  return Math.abs(h);
}

/** Random có seed từ mảng cards */
export function seededRandomCard(seed: string): TarotCard {
  const idx = hashString(seed) % TAROT_CARDS.length;
  return TAROT_CARDS[idx];
}
