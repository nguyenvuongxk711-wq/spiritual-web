export interface ZodiacSign {
  name: string;
  nameEN: string;
  date: string;
  icon: string;
  element: "Lửa" | "Đất" | "Khí" | "Nước";
  ruler: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  love: string;
  career: string;
  daily: string;
}

export const ZODIAC_DATA: Record<string, ZodiacSign> = {
  "bach-duong": {
    name: "Bạch Dương",
    nameEN: "Aries",
    date: "21/3 – 19/4",
    icon: "♈",
    element: "Lửa",
    ruler: "Sao Hỏa",
    traits: ["Nhiệt huyết", "Dũng cảm", "Thẳng thắn", "Cạnh tranh"],
    strengths: ["Lãnh đạo tự nhiên", "Hành động nhanh", "Tự tin"],
    weaknesses: ["Nóng vội", "Bốc đồng", "Thiếu kiên nhẫn"],
    love: "Yêu nồng nhiệt nhưng cần không gian tự do. Hợp với Sư Tử, Nhân Mã.",
    career: "Phù hợp với vai trò lãnh đạo, startup, thể thao, quân đội.",
    daily: "Hôm nay năng lượng dồi dào, hãy khởi động dự án mới. Cẩn thận đừng để cảm xúc lấn át lý trí.",
  },
  "kim-nguu": {
    name: "Kim Ngưu",
    nameEN: "Taurus",
    date: "20/4 – 20/5",
    icon: "♉",
    element: "Đất",
    ruler: "Sao Kim",
    traits: ["Kiên nhẫn", "Thực tế", "Trung thành", "Yêu thích sự ổn định"],
    strengths: ["Đáng tin cậy", "Khéo tay", "Quyết tâm cao"],
    weaknesses: ["Cứng đầu", "Bảo thủ", "Thích vật chất quá mức"],
    love: "Yêu sâu đậm và lâu dài. Cần sự an toàn về tài chính và cảm xúc. Hợp với Xử Nữ, Ma Kết.",
    career: "Tài chính, nghệ thuật, ẩm thực, kiến trúc, quản lý dự án.",
    daily: "Ngày của sự kiên nhẫn đền đáp. Đừng vội vàng thay đổi kế hoạch đã định.",
  },
  "song-tu": {
    name: "Song Tử",
    nameEN: "Gemini",
    date: "21/5 – 20/6",
    icon: "♊",
    element: "Khí",
    ruler: "Sao Thủy",
    traits: ["Thông minh", "Hoạt ngôn", "Tò mò", "Linh hoạt"],
    strengths: ["Giao tiếp xuất sắc", "Học nhanh", "Đa tài"],
    weaknesses: ["Thiếu kiên định", "Nông nổi", "Dễ lo lắng"],
    love: "Cần người bạn đời là tri kỷ, thích trò chuyện. Hợp với Thiên Bình, Bảo Bình.",
    career: "Truyền thông, marketing, giáo dục, viết lách, bán hàng.",
    daily: "Cơ hội giao tiếp mở rộng. Hãy chia sẻ ý tưởng nhưng đừng lan man quá nhiều hướng.",
  },
  "cu-giai": {
    name: "Cự Giải",
    nameEN: "Cancer",
    date: "21/6 – 22/7",
    icon: "♋",
    element: "Nước",
    ruler: "Mặt Trăng",
    traits: ["Nhạy cảm", "Chu đáo", "Trực giác mạnh", "Bảo vệ"],
    strengths: ["Tình cảm sâu sắc", "Trí nhớ tốt", "Chăm sóc người khác"],
    weaknesses: ["Dễ tổn thương", "Rút lui", "Quá bảo vệ"],
    love: "Yêu thương vô điều kiện, cần cảm giác an toàn. Hợp với Bọ Cạp, Song Ngư.",
    career: "Y tá, giáo viên, bất động sản, nhà hàng, tư vấn tâm lý.",
    daily: "Trực giác mách bảo điều quan trọng. Tin vào cảm xúc nhưng đừng để nó nhấn chìm bạn.",
  },
  "su-tu": {
    name: "Sư Tử",
    nameEN: "Leo",
    date: "23/7 – 22/8",
    icon: "♌",
    element: "Lửa",
    ruler: "Mặt Trời",
    traits: ["Tự tin", "Hào phóng", "Sáng tạo", "Lãnh đạo"],
    strengths: ["Carisma", "Truyền cảm hứng", "Lòng trung thành"],
    weaknesses: ["Kiêu ngạo", "Cứng đầu", "Thích được chú ý"],
    love: "Yêu như ngôi sao sân khấu, cần được ngưỡng mộ. Hợp với Bạch Dương, Nhân Mã.",
    career: "Giải trí, quản lý, chính trị, thiết kế, nghệ thuật biểu diễn.",
    daily: "Năng lượng Mặt Trời chiếu rọi. Hãy tỏa sáng nhưng nhớ tôn trọng người khác.",
  },
  "xu-nu": {
    name: "Xử Nữ",
    nameEN: "Virgo",
    date: "23/8 – 22/9",
    icon: "♍",
    element: "Đất",
    ruler: "Sao Thủy",
    traits: ["Phân tích", "Chi tiết", "Thực tế", "Có tổ chức"],
    strengths: ["Tỉ mỉ", "Đáng tin cậy", "Giải quyết vấn đề tốt"],
    weaknesses: ["Hay phê bình", "Lo lắng thái quá", "Khó thỏa mãn"],
    love: "Yêu bằng hành động thực tế. Cần sự chân thành. Hợp với Kim Ngưu, Ma Kết.",
    career: "Biên tập, y học, nghiên cứu, kế toán, logistics.",
    daily: "Chi tiết nhỏ hôm nay tạo nên thành công lớn. Đừng để sự hoàn hảo trở thành kẻ thù.",
  },
  "thien-binh": {
    name: "Thiên Bình",
    nameEN: "Libra",
    date: "23/9 – 22/10",
    icon: "♎",
    element: "Khí",
    ruler: "Sao Kim",
    traits: ["Công bằng", "Lãng mạn", "Hòa giải", "Tinh tế"],
    strengths: ["Diplomacy", "Thẩm mỹ cao", "Lắng nghe"],
    weaknesses: ["Thức khuya", "Phụ thuộc", "Khó quyết định"],
    love: "Tình yêu là nghệ thuật. Cần sự cân bằng và lãng mạn. Hợp với Song Tử, Bảo Bình.",
    career: "Luật sư, thiết kế, ngoại giao, thẩm mỹ, trung gian hòa giải.",
    daily: "Mọi quan hệ cần sự cân bằng. Hôm nay là ngày để lắng nghe cả hai phía.",
  },
  "bo-cap": {
    name: "Bọ Cạp",
    nameEN: "Scorpio",
    date: "23/10 – 21/11",
    icon: "♏",
    element: "Nước",
    ruler: "Sao Diêm Vương",
    traits: ["Sâu sắc", "Quyết đoán", "Bí ẩn", "Mạnh mắn"],
    strengths: ["Trực giác siêu phàm", "Bền bỉ", "Trung thành tuyệt đối"],
    weaknesses: ["Ghen tuông", "Manh động", "Khó tha thứ"],
    love: "Yêu sâu đến xương tuỷ, không chấp nhận sự phản bội. Hợp với Cự Giải, Song Ngư.",
    career: "Tâm lý học, điều tra, tài chính, y học, nghiên cứu.",
    daily: "Năng lượng chuyển hóa mạnh mẽ. Hãy buông bỏ những gì không còn phục vụ bạn.",
  },
  "nhan-ma": {
    name: "Nhân Mã",
    nameEN: "Sagittarius",
    date: "22/11 – 21/12",
    icon: "♐",
    element: "Lửa",
    ruler: "Sao Mộc",
    traits: ["Tự do", "Lạc quan", "Thẳng thắn", "Phiêu lưu"],
    strengths: ["Hài hước", "Triết lý sâu", "Dũng cảm"],
    weaknesses: ["Thiếu tế nhị", "Bốc đồng", "Khó cam kết"],
    love: "Tình yêu là hành trình, không phải đích đến. Hợp với Bạch Dương, Sư Tử.",
    career: "Du lịch, xuất bản, triết học, giáo dục, thể thao.",
    daily: "Mở rộng tầm nhìn. Một cuộc trò chuyện ngẫu nhiên có thể thay đổi quan điểm của bạn.",
  },
  "ma-ket": {
    name: "Ma Kết",
    nameEN: "Capricorn",
    date: "22/12 – 19/1",
    icon: "♑",
    element: "Đất",
    ruler: "Sao Thổ",
    traits: ["Kỷ luật", "Tham vọng", "Thực tế", "Kiên nhẫn"],
    strengths: ["Tổ chức xuất sắc", "Trách nhiệm", "Bền bỉ"],
    weaknesses: ["Pessimistic", "Khắt khe", "Cô độc"],
    love: "Yêu bằng sự cam kết và hành động lâu dài. Hợp với Kim Ngưu, Xử Nữ.",
    career: "Quản lý cấp cao, kế toán, luật, kỹ thuật, xây dựng.",
    daily: "Công việc chăm chỉ hôm nay gặt hái ngày mai. Nhưng đừng quên nghỉ ngơi.",
  },
  "bao-binh": {
    name: "Bảo Bình",
    nameEN: "Aquarius",
    date: "20/1 – 18/2",
    icon: "♒",
    element: "Khí",
    ruler: "Sao Thiên Vương",
    traits: ["Độc lập", "Sáng tạo", "Nhân đạo", "Khác biệt"],
    strengths: ["Tư duy tiến bộ", "Trung thành", "Sáng kiến"],
    weaknesses: ["Cứng nhắc", "Khó đoán", "Thờ ơ"],
    love: "Cần người bạn đời hiểu được tâm hồn phiêu lưu. Hợp với Song Tử, Thiên Bình.",
    career: "Công nghệ, khoa học, xã hội học, phát minh, hoạt động xã hội.",
    daily: "Ý tưởng đột phá có thể đến bất ngờ. Ghi chép lại ngay trước khi quên.",
  },
  "song-ngu": {
    name: "Song Ngư",
    nameEN: "Pisces",
    date: "19/2 – 20/3",
    icon: "♓",
    element: "Nước",
    ruler: "Sao Hải Vương",
    traits: ["Nghệ sĩ", "Nhạy cảm", "Tử tế", "Huyền bí"],
    strengths: ["Sáng tạo vô biên", "Đồng cảm", "Trực giác"],
    weaknesses: ["Ảo tưởng", "Dễ bị ảnh hưởng", "Thoát ly"],
    love: "Tình yêu như cổ tích, cần sự thấu hiểu sâu sắc. Hợp với Cự Giải, Bọ Cạp.",
    career: "Nghệ thuật, âm nhạc, tâm lý, y tế, từ thiện, nhiếp ảnh.",
    daily: "Năng lượng sáng tạo tràn đầy. Hãy để trí tưởng tượng dẫn lối.",
  },
};

/* ========== COMPATIBILITY ========== */

const elementCompat: Record<string, string[]> = {
  Lửa: ["Lửa", "Khí"],
  Đất: ["Đất", "Nước"],
  Khí: ["Khí", "Lửa"],
  Nước: ["Nước", "Đất"],
};

export function getCompatibility(a: string, b: string): { score: number; text: string } {
  const sa = ZODIAC_DATA[a];
  const sb = ZODIAC_DATA[b];
  if (!sa || !sb) return { score: 0, text: "" };

  const sameElement = sa.element === sb.element;
  const compatibleElement = elementCompat[sa.element]?.includes(sb.element);
  const complementary =
    (sa.element === "Lửa" && sb.element === "Nước") ||
    (sa.element === "Nước" && sb.element === "Lửa");

  if (sameElement) return { score: 85, text: "Cùng nguyên tố — hiểu nhau nhanh, năng lượng hòa hợp." };
  if (complementary) return { score: 70, text: "Bù trừ lẫn nhau — cần nỗ lực nhưng rất đáng." };
  if (compatibleElement) return { score: 90, text: "Nguyên tố tương sinh — quan hệ tự nhiên, bền vững." };
  return { score: 55, text: "Khác nguyên tố — cần hiểu biết và thỏa hiệp." };
}
