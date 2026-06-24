export interface QuizOption {
  text: string;
  scores: Record<string, number>; // key: resultId, value: points
}

export interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

export interface QuizResult {
  id: string;
  title: string;
  desc: string;
  icon: string;
  advice: string;
}

export interface Quiz {
  id: string;
  title: string;
  desc: string;
  icon: string;
  questions: QuizQuestion[];
  results: QuizResult[];
}

export const QUIZZES: Quiz[] = [
  {
    id: "element",
    title: "Bạn là nguyên tố nào?",
    desc: "Lửa, Nước, Đất hay Khí? Khám phá nguyên tố chi phối tính cách của bạn.",
    icon: "🔥",
    questions: [
      {
        text: "Khi gặp khó khăn, bạn thường...",
        options: [
          { text: "Hành động ngay, không ngần ngại", scores: { fire: 3, air: 1, earth: 0, water: 0 } },
          { text: "Phân tích kỹ lưỡng trước khi quyết định", scores: { earth: 3, air: 2, water: 0, fire: 0 } },
          { text: "Lắng nghe trực giác và cảm xúc", scores: { water: 3, air: 1, fire: 0, earth: 0 } },
          { text: "Suy nghĩ đa chiều, tìm ý tưởng mới", scores: { air: 3, fire: 1, water: 0, earth: 0 } },
        ],
      },
      {
        text: "Người khác thường mô tả bạn là...",
        options: [
          { text: "Nhiệt huyết, dũng cảm", scores: { fire: 3, air: 0, earth: 0, water: 0 } },
          { text: "Thực tế, đáng tin", scores: { earth: 3, water: 1, air: 0, fire: 0 } },
          { text: "Nhạy cảm, dễ đồng cảm", scores: { water: 3, earth: 1, air: 0, fire: 0 } },
          { text: "Thông minh, khéo ăn nói", scores: { air: 3, fire: 1, water: 0, earth: 0 } },
        ],
      },
      {
        text: "Môi trường làm việc lý tưởng của bạn là...",
        options: [
          { text: "Năng động, cạnh tranh", scores: { fire: 3, air: 1, earth: 0, water: 0 } },
          { text: "Ổn định, có tổ chức", scores: { earth: 3, water: 1, air: 0, fire: 0 } },
          { text: "Sáng tạo, tự do", scores: { air: 3, water: 1, fire: 0, earth: 0 } },
          { text: "Yên tĩnh, ấm cúng", scores: { water: 3, earth: 1, air: 0, fire: 0 } },
        ],
      },
      {
        text: "Bạn xử lý xung đột bằng cách...",
        options: [
          { text: "Đối đầu trực tiếp", scores: { fire: 3, air: 0, earth: 0, water: 0 } },
          { text: "Thảo luận logic, tìm giải pháp", scores: { air: 3, earth: 1, fire: 0, water: 0 } },
          { text: "Lắng nghe, hòa giải", scores: { water: 3, earth: 1, air: 0, fire: 0 } },
          { text: "Giữ im lặng, chờ thời điểm", scores: { earth: 3, water: 1, fire: 0, air: 0 } },
        ],
      },
      {
        text: "Thứ bạn coi trọng nhất là...",
        options: [
          { text: "Thành công và công nhận", scores: { fire: 3, air: 1, earth: 0, water: 0 } },
          { text: "An toàn và sự ổn định", scores: { earth: 3, water: 1, air: 0, fire: 0 } },
          { text: "Tình yêu và kết nối", scores: { water: 3, fire: 1, earth: 0, air: 0 } },
          { text: "Tri thức và tự do suy nghĩ", scores: { air: 3, fire: 1, water: 0, earth: 0 } },
        ],
      },
    ],
    results: [
      {
        id: "fire",
        title: "Nguyên tố Lửa 🔥",
        desc: "Bạn nóng bỏng, đam mê và tràn đầy năng lượng. Luôn là người tiên phong trong mọi cuộc chơi.",
        icon: "🔥",
        advice: "Học cách kiềm chế cơn nóng giận. Năng lượng lửa rất mạnh nhưng cần điều tiết để không thiêu đốt bản thân.",
      },
      {
        id: "water",
        title: "Nguyên tố Nước 🌊",
        desc: "Sâu thẳm, nhạy cảm và giàu cảm xúc. Bạn cảm nhận thế giới qua trái tim hơn là lý trí.",
        icon: "🌊",
        advice: "Đừng để cảm xúc nhấn chìm lý trí. Tìm lối thoát sáng tạo như nghệ thuật, viết lách.",
      },
      {
        id: "earth",
        title: "Nguyên tố Đất 🌍",
        desc: "Vững chãi, đáng tin và thực tế. Bạn là nền móng mà người khác dựa vào.",
        icon: "🌍",
        advice: "Đôi khi cần buông lỏng sự kiểm soát. Linh hoạt sẽ mang lại những cơ hội bất ngờ.",
      },
      {
        id: "air",
        title: "Nguyên tố Khí 💨",
        desc: "Thông minh, tự do và đầy ý tưởng. Bạn bay cao hơn những giới hạn thông thường.",
        icon: "💨",
        advice: "Hãy hạ cánh xuống mặt đất đôi khi. Ý tưởng hay cần được thực hiện, không chỉ mơ mộng.",
      },
    ],
  },
  {
    id: "past-life",
    title: "Kiếp trước bạn là ai?",
    desc: "Chiêm tinh gia, chiến binh hay nghệ sĩ? Khám phá hành trình linh hồn qua các kiếp.",
    icon: "🌟",
    questions: [
      {
        text: "Bạn bị thu hút bởi địa điểm nào nhất?",
        options: [
          { text: "Đền đài cổ, thư viện", scores: { sage: 3, warrior: 0, artist: 1, healer: 0 } },
          { text: "Chiến trường, pháo đài", scores: { warrior: 3, sage: 0, artist: 0, healer: 0 } },
          { text: "Xưởng vẽ, nhà hát", scores: { artist: 3, healer: 1, sage: 0, warrior: 0 } },
          { text: "Vườn thảo dược, giếng nước", scores: { healer: 3, sage: 1, artist: 0, warrior: 0 } },
        ],
      },
      {
        text: "Kỹ năng bạn tin là từ kiếp trước...",
        options: [
          { text: "Khả năng đọc hiểu người khác", scores: { sage: 3, healer: 1, artist: 0, warrior: 0 } },
          { text: "Sức bền và dũng khí", scores: { warrior: 3, artist: 0, sage: 0, healer: 0 } },
          { text: "Cảm nhận cái đẹp", scores: { artist: 3, healer: 1, sage: 0, warrior: 0 } },
          { text: "Chữa lành và chăm sóc", scores: { healer: 3, sage: 1, artist: 0, warrior: 0 } },
        ],
      },
      {
        text: "Giấc mơ định kỳ của bạn thường có...",
        options: [
          { text: "Những biểu tượng bí ẩn", scores: { sage: 3, artist: 1, warrior: 0, healer: 0 } },
          { text: "Cuộc chiến hoặc chạy trốn", scores: { warrior: 3, sage: 0, artist: 0, healer: 0 } },
          { text: "Cảnh đẹp như tranh", scores: { artist: 3, healer: 1, sage: 0, warrior: 0 } },
          { text: "Nước, ánh sáng, âm thanh chữa lành", scores: { healer: 3, sage: 1, artist: 0, warrior: 0 } },
        ],
      },
      {
        text: "Nếu có một cuốn sách về kiếp trước, tiêu đề sẽ là...",
        options: [
          { text: "\"Tri thức của vũ trụ\"", scores: { sage: 3, healer: 0, artist: 0, warrior: 0 } },
          { text: "\"Con đường của chiến binh\"", scores: { warrior: 3, sage: 0, artist: 0, healer: 0 } },
          { text: "\"Màu sắc của linh hồn\"", scores: { artist: 3, healer: 1, sage: 0, warrior: 0 } },
          { text: "\"Bàn tay chữa lành\"", scores: { healer: 3, sage: 0, artist: 0, warrior: 0 } },
        ],
      },
      {
        text: "Bạn cảm thấy mình thuộc về thời đại nào?",
        options: [
          { text: "Hy Lạp cổ đại — thời của triết gia", scores: { sage: 3, artist: 1, warrior: 0, healer: 0 } },
          { text: "Samurai — thời của danh dự", scores: { warrior: 3, sage: 0, artist: 0, healer: 0 } },
          { text: "Phục Hưng — thời của nghệ sĩ", scores: { artist: 3, sage: 0, warrior: 0, healer: 1 } },
          { text: "Thời cổ đại — thời của thầy thuốc", scores: { healer: 3, sage: 1, artist: 0, warrior: 0 } },
        ],
      },
    ],
    results: [
      {
        id: "sage",
        title: "Nhà hiền triết 📜",
        desc: "Kiếp trước bạn là người tìm kiếm chân lý. Trí tuệ và sự sáng suốt đã đi theo bạn đến kiếp này.",
        icon: "📜",
        advice: "Chia sẻ kiến thức của bạn. Thế giới cần sự khôn ngoan mà bạn đã tích lũy qua nhiều kiếp.",
      },
      {
        id: "warrior",
        title: "Chiến binh ⚔️",
        desc: "Kiếp trước bạn chiến đấu vì lý tưởng. Dũng khí và quyết tâm vẫn chảy trong máu bạn.",
        icon: "⚔️",
        advice: "Hãy chiến đấu cho điều đúng đắn. Nhưng nhớ rằng sức mạnh thật sự nằm ở sự kiên nhẫn.",
      },
      {
        id: "artist",
        title: "Nghệ sĩ 🎨",
        desc: "Kiếp trước bạn sáng tạo vẻ đẹp cho thế giới. Trực giác nghệ thuật là quà tặng của linh hồn.",
        icon: "🎨",
        advice: "Đừng ngại thể hiện bản thân. Cái đẹp bạn tạo ra có sức mạnh chữa lành.",
      },
      {
        id: "healer",
        title: "Thầy thuốc 🌿",
        desc: "Kiếp trước bạn chữa lành thân và tâm. Năng lượng chữa lành vẫn còn trong bạn.",
        icon: "🌿",
        advice: "Lắng nghe nhu cầu của người khác. Đôi khi chỉ cần sự hiện diện của bạn cũng là liều thuốc.",
      },
    ],
  },
];

/* ========== PURE FUNCTION: TÍNH KẾT QUẢ ========== */

export function calculateQuizResult(
  quizId: string,
  answers: number[] // index của option được chọn cho mỗi câu
): QuizResult | null {
  const quiz = QUIZZES.find((q) => q.id === quizId);
  if (!quiz) return null;

  // Tính tổng điểm mỗi resultId
  const totals: Record<string, number> = {};
  answers.forEach((optIdx, qIdx) => {
    const question = quiz.questions[qIdx];
    const option = question?.options[optIdx];
    if (option) {
      Object.entries(option.scores).forEach(([key, val]) => {
        totals[key] = (totals[key] || 0) + val;
      });
    }
  });

  // Tìm resultId có điểm cao nhất
  const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  if (!winner) return null;

  return quiz.results.find((r) => r.id === winner[0]) || null;
}
