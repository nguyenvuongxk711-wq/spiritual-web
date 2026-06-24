export interface DreamEntry {
  slug: string;
  title: string;
  keywords: string[];
  summary: string;
  detail: string;
  luckyNumbers: number[];
  relatedDreams: string[];
}

export const DREAM_KB: DreamEntry[] = [
  {
    slug: "ran",
    title: "Mơ thấy rắn",
    keywords: ["rắn", "bò sát", "cắn", "trăn", "rắn hổ mang"],
    summary: "Biểu tượng của sự chuyển đổi, năng lượng sinh sản hoặc cảnh báo nguy hiểm tiềm ẩn.",
    detail: "Rắn trong mơ thường đại diện cho trí tuệ, sự hồi sinh, hoặc một người đang đe dọa bạn trong cuộc sống thức. Nếu rắn cắn, có thể bạn đang lo lắng về một mối quan hệ độc hại. Nếu rắn lột xác, đó là dấu hiệu của sự tái sinh và thay đổi tích cực.",
    luckyNumbers: [3, 7, 21, 33],
    relatedDreams: ["nuoc", "dong-vat", "mau"],
  },
  {
    slug: "nuoc",
    title: "Mơ thấy nước",
    keywords: ["nước", "biển", "sông", "hồ", "lũ", "tắm", "chìm"],
    summary: "Cảm xúc tiềm ẩn, sự thanh lọc hoặc thay đổi lớn trong cuộc sống.",
    detail: "Nước trong mơ phản ánh trạng thái cảm xúc. Nước trong và yên tĩnh = bình an. Nước đục hoặc sóng lớn = cảm xúc hỗn loạn. Nếu bơi trong nước, bạn đang điều hướng qua khó khăn. Nếu chìm, có thể cảm thấy bị cảm xúc nhấn chìm.",
    luckyNumbers: [2, 8, 14, 29],
    relatedDreams: ["ran", "mua", "nha"],
  },
  {
    slug: "bay",
    title: "Mơ thấy bay",
    keywords: ["bay", "trời", "cánh", "rơi", "cao", "nhảy"],
    summary: "Khát khao tự do, thoát khỏi áp lực hoặc tham vọng cao xa.",
    detail: "Bay lượn trong mơ cho thấy bạn muốn thoát khỏi giới hạn hiện tại. Nếu bay cao dễ dàng = tự tin và thành công sắp đến. Nếu bay khó khăn hoặc rơi = lo lắng về khả năng kiểm soát tình hình.",
    luckyNumbers: [5, 9, 15, 37],
    relatedDreams: ["chim", "cao", "du-lich"],
  },
  {
    slug: "rang-rung",
    title: "Mơ thấy răng rụng",
    keywords: ["răng", "rụng", "gãy", "sâu", "răng vàng", "nhổ"],
    summary: "Lo lắng về ngoại hình, mất quyền lực hoặc thiếu tự tin trong giao tiếp.",
    detail: "Răng rụng là một trong những giấc mơ phổ biến nhất, thường xuất hiện khi bạn cảm thấy bất lực hoặc lo mất uy tín. Cũng có thể liên quan đến việc sợ già đi hoặc mất nhan sắc. Ở văn hóa phương Đông, đôi khi báo hiệu người thân có biến.",
    luckyNumbers: [1, 6, 10, 28],
    relatedDreams: ["mau", "mat", "gia-dinh"],
  },
  {
    slug: "chay-nha",
    title: "Mơ thấy cháy nhà",
    keywords: ["cháy", "lửa", "nhà cháy", "khói", "nóng", "cứu hỏa"],
    summary: "Biến động lớn, cần tái tạo hoặc giải phóng năng lượng cũ.",
    detail: "Lửa vừa hủy diệt vừa thanh tẩy. Cháy nhà trong mơ có thể báo hiệu sự kết thúc của một giai đoạn để bắt đầu giai đoạn mới tốt đẹp hơn. Nếu bạn thoát được khỏi đám cháy = vượt qua khó khăn. Nếu bị mắc kẹt = cần giải quyết vấn đề tích cực hơn.",
    luckyNumbers: [4, 8, 12, 40],
    relatedDreams: ["nha", "nuoc", "mua"],
  },
  {
    slug: "chet",
    title: "Mơ thấy chết",
    keywords: ["chết", "ma", "tang", "quá cố", "giết", "tử"],
    summary: "Kết thúc một giai đoạn, sự chuyển hóa sâu sắc trong tiềm thức.",
    detail: "Mơ thấy chết hiếm khi báo điềm xấu. Thường là dấu hiệu của sự kết thúc — một thói quen xấu, một công việc, hoặc một mối quan hệ. Tiềm thức đang chuẩn bị bạn cho sự tái sinh. Nếu thấy người thân đã mất = họ đang nhắn nhủ hoặc bạn đang nhớ họ.",
    luckyNumbers: [7, 13, 19, 49],
    relatedDreams: ["gia-dinh", "nha", "di-chuyen"],
  },
  {
    slug: "cuoi",
    title: "Mơ thấy cưới",
    keywords: ["cưới", "hôn", "váy cưới", "chồng", "vợ", "nhẫn"],
    summary: "Sự hợp nhất, cam kết mới, hoặc hòa hợp giữa các khía cạnh trong bạn.",
    detail: "Đám cưới trong mơ không nhất thiết liên quan đến hôn nhân thực tế. Có thể bạn đang kết hợp hai khía cạnh tính cách, hoặc cam kết với một dự án mới. Nếu mơ thấy cưới người lạ = sắp có cơ hội bất ngờ. Nếu cưới người yêu cũ = chưa giải quyết xong quá khứ.",
    luckyNumbers: [2, 6, 11, 22],
    relatedDreams: ["tinh-yeu", "gia-dinh", "vang"],
  },
  {
    slug: "vang",
    title: "Mơ thấy vàng / tiền",
    keywords: ["vàng", "tiền", "bạc", "giàu", "mất tiền", "nhặt tiền"],
    summary: "Giá trị bản thân, năng lượng sinh lực, hoặc lo lắng về tài chính.",
    detail: "Tiền vàng trong mơ đại diện cho năng lượng và giá trị nội tại. Nhặt được tiền = nhận ra giá trị bản thân hoặc cơ hội tài chính. Mất tiền = sợ mất an toàn hoặc tự tin. Cho tiền = lòng rộng lượng đang được khai mở.",
    luckyNumbers: [6, 8, 16, 38],
    relatedDreams: ["cuoi", "nha", "di-lam"],
  },
  {
    slug: "chim",
    title: "Mơ thấy chim",
    keywords: ["chim", "bay", "tổ", "trứng", "cánh", "bồ câu", "đại bàng"],
    summary: "Tin vui, tự do tinh thần, hoặc thông điệp từ vũ trụ.",
    detail: "Chim là sứ giả của vũ trụ. Chim hót vui vẻ = tin tốt sắp đến. Chim bay cao = khát vọng được thực hiện. Chim chết hoặc bị nhốt = cảm giác bị gò bó hoặc lo lắng. Chim vào nhà = may mắn về tài lộc.",
    luckyNumbers: [3, 5, 12, 27],
    relatedDreams: ["bay", "nha", "cay"],
  },
  {
    slug: "mau",
    title: "Mơ thấy máu",
    keywords: ["máu", "chảy máu", "đỏ", "vết thương", "sinh con"],
    summary: "Sức sống, năng lượng mạnh mẽ, hoặc cảm giác bị tổn thương sâu sắc.",
    detail: "Máu là sự sống. Trong mơ, máu thường phản ánh năng lượng sinh lực hoặc vết thương tâm lý. Máu chảy nhiều = cảm xúc tràn trề hoặc lo lắng. Máu đông = vết thương đang lành. Máu trên tay = có thể bạn đang làm tổn thương người khác vô tình.",
    luckyNumbers: [1, 9, 18, 36],
    relatedDreams: ["rang-rung", "chet", "sinh-con"],
  },
];

/** Tìm kiếm đơn giản trên title, keywords, summary */
export function searchDreams(query: string): DreamEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return DREAM_KB;
  return DREAM_KB.filter((d) => {
    const haystack = `${d.title} ${d.keywords.join(" ")} ${d.summary}`.toLowerCase();
    return haystack.includes(q);
  });
}

/** Fuzzy match cơ bản: kiểm tra xem các ký tự query có xuất hiện đúng thứ tự không */
export function fuzzySearchDreams(query: string): DreamEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return DREAM_KB;
  return DREAM_KB.filter((d) => {
    const text = `${d.title} ${d.keywords.join(" ")}`.toLowerCase();
    let idx = 0;
    for (let i = 0; i < q.length; i++) {
      const found = text.indexOf(q[i], idx);
      if (found === -1) return false;
      idx = found + 1;
    }
    return true;
  });
}
