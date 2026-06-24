/* Sao phụ cơ bản cho Tử Vi */

export interface SaoPhu { name: string; nature: "cát"|"hung"|"trung"; desc: string; chi: string; }

/* Sao phụ theo năm Can + Chi — mỗi sao LUÔN tồn tại, an vào đúng cung (chi vị trí) */
export function getSaoPhuNam(can: string, chi: string): SaoPhu[] {
  const sao: SaoPhu[] = [];
  const add = (name: string, nature: "cát"|"hung"|"trung", desc: string, pos: string) => {
    if (pos) sao.push({ name, nature, desc, chi: pos });
  };

  /* === Trợ tinh theo Can năm (vị trí = map[can]) === */
  const taPhu: Record<string,string> = { Giáp:"Thìn", Ất:"Thìn", Bính:"Ngọ", Đinh:"Ngọ", Mậu:"Thân", Kỷ:"Thân", Canh:"Tuất", Tân:"Tuất", Nhâm:"Tý", Quý:"Tý" };
  add("Tả Phụ", "cát", "Trợ tinh, chủ quý nhân bên trái, trợ giúp.", taPhu[can]);

  const huuBat: Record<string,string> = { Giáp:"Tuất", Ất:"Tuất", Bính:"Tý", Đinh:"Tý", Mậu:"Dần", Kỷ:"Dần", Canh:"Thìn", Tân:"Thìn", Nhâm:"Ngọ", Quý:"Ngọ" };
  add("Hữu Bật", "cát", "Trợ tinh, chủ quý nhân bên phải, hỗ trợ.", huuBat[can]);

  const vanXuong: Record<string,string> = { Giáp:"Tỵ", Ất:"Ngọ", Bính:"Thân", Đinh:"Dậu", Mậu:"Tuất", Kỷ:"Hợi", Canh:"Tý", Tân:"Sửu", Nhâm:"Dần", Quý:"Mão" };
  add("Văn Xương", "cát", "Chủ văn chương, học vấn, thi cử.", vanXuong[can]);

  const vanKhuc: Record<string,string> = { Giáp:"Tý", Ất:"Sửu", Bính:"Dần", Đinh:"Mão", Mậu:"Thìn", Kỷ:"Tỵ", Canh:"Ngọ", Tân:"Mùi", Nhâm:"Thân", Quý:"Dậu" };
  add("Văn Khúc", "cát", "Chủ nghệ thuật, tài hoa, âm nhạc.", vanKhuc[can]);

  const thienKhoi: Record<string,string> = { Giáp:"Sửu", Ất:"Tý", Bính:"Hợi", Đinh:"Tuất", Mậu:"Dậu", Kỷ:"Thân", Canh:"Mùi", Tân:"Ngọ", Nhâm:"Tỵ", Quý:"Thìn" };
  add("Thiên Khôi", "cát", "Chủ quý nhân nam, đề bạt, giúp đỡ.", thienKhoi[can]);

  const thienViet: Record<string,string> = { Giáp:"Mùi", Ất:"Thân", Bính:"Dậu", Đinh:"Tuất", Mậu:"Hợi", Kỷ:"Tý", Canh:"Sửu", Tân:"Dần", Nhâm:"Mão", Quý:"Thìn" };
  add("Thiên Việt", "cát", "Chủ quý nhân nữ, âm trợ, bảo bọc.", thienViet[can]);

  const locTon: Record<string,string> = { Giáp:"Dần", Ất:"Mão", Bính:"Tỵ", Đinh:"Ngọ", Mậu:"Tỵ", Kỷ:"Ngọ", Canh:"Thân", Tân:"Dậu", Nhâm:"Hợi", Quý:"Tý" };
  add("Lộc Tồn", "cát", "Chủ tài lộc ổn định, tích lũy, sung túc.", locTon[can]);

  const longTri: Record<string,string> = { Giáp:"Thìn", Ất:"Thìn", Bính:"Tỵ", Đinh:"Tỵ", Mậu:"Ngọ", Kỷ:"Ngọ", Canh:"Mùi", Tân:"Mùi", Nhâm:"Thân", Quý:"Thân" };
  add("Long Trì", "cát", "Chủ quý nhân phù trợ, danh tiếng tốt.", longTri[can]);

  const phuongCac: Record<string,string> = { Giáp:"Dậu", Ất:"Dậu", Bính:"Tuất", Đinh:"Tuất", Mậu:"Hợi", Kỷ:"Hợi", Canh:"Tý", Tân:"Tý", Nhâm:"Sửu", Quý:"Sửu" };
  add("Phượng Các", "cát", "Chủ văn chương, học vấn cao, danh vọng.", phuongCac[can]);

  const giaiThan: Record<string,string> = { Giáp:"Tý", Ất:"Sửu", Bính:"Dần", Đinh:"Mão", Mậu:"Thìn", Kỷ:"Tỵ", Canh:"Ngọ", Tân:"Mùi", Nhâm:"Thân", Quý:"Dậu" };
  add("Giải Thần", "cát", "Hóa giải tai ương, giải trừ khó khăn.", giaiThan[can]);

  /* === Sao theo Chi năm (vị trí = map[chi]) === */
  const hongLoan: Record<string,string> = { Tý:"Mão", Sửu:"Dần", Dần:"Sửu", Mão:"Tý", Thìn:"Hợi", Tỵ:"Tuất", Ngọ:"Dậu", Mùi:"Thân", Thân:"Mùi", Dậu:"Ngọ", Tuất:"Tỵ", Hợi:"Thìn" };
  add("Hồng Loan", "cát", "Chủ hôn nhân, tình duyên, hỷ sự.", hongLoan[chi]);

  const thienHy: Record<string,string> = { Tý:"Dậu", Sửu:"Thân", Dần:"Mùi", Mão:"Ngọ", Thìn:"Tỵ", Tỵ:"Thìn", Ngọ:"Mão", Mùi:"Dần", Thân:"Sửu", Dậu:"Tý", Tuất:"Hợi", Hợi:"Tuất" };
  add("Thiên Hỷ", "cát", "Chủ hỷ sự, vui vẻ, tin mừng.", thienHy[chi]);

  const kinhDuong: Record<string,string> = { Tý:"Dậu", Sửu:"Dậu", Dần:"Tý", Mão:"Tý", Thìn:"Mão", Tỵ:"Mão", Ngọ:"Ngọ", Mùi:"Ngọ", Thân:"Thân", Dậu:"Thân", Tuất:"Hợi", Hợi:"Hợi" };
  add("Kình Dương", "hung", "Chủ bạo lực, kiện tụng, tai nạn.", kinhDuong[chi]);

  const daLa: Record<string,string> = { Tý:"Mão", Sửu:"Mão", Dần:"Ngọ", Mão:"Ngọ", Thìn:"Thân", Tỵ:"Thân", Ngọ:"Dậu", Mùi:"Dậu", Thân:"Tý", Dậu:"Tý", Tuất:"Thìn", Hợi:"Thìn" };
  add("Đà La", "hung", "Chủ thị phi, kiện tụng, bệnh tật.", daLa[chi]);

  const diaKhong: Record<string,string> = { Tý:"Tuất", Sửu:"Hợi", Dần:"Tý", Mão:"Sửu", Thìn:"Dần", Tỵ:"Mão", Ngọ:"Thìn", Mùi:"Tỵ", Thân:"Ngọ", Dậu:"Mùi", Tuất:"Thân", Hợi:"Dậu" };
  add("Địa Không", "hung", "Chủ mất mát, hao tài, cô độc.", diaKhong[chi]);

  const diaKiep: Record<string,string> = { Tý:"Hợi", Sửu:"Tý", Dần:"Sửu", Mão:"Dần", Thìn:"Mão", Tỵ:"Thìn", Ngọ:"Tỵ", Mùi:"Ngọ", Thân:"Mùi", Dậu:"Thân", Tuất:"Dậu", Hợi:"Tuất" };
  add("Địa Kiếp", "hung", "Chủ kiếp nạn, tai ương, thất bại.", diaKiep[chi]);

  const hoaTinh: Record<string,string> = { Tý:"Dậu", Sửu:"Thân", Dần:"Ngọ", Mão:"Tỵ", Thìn:"Thìn", Tỵ:"Mão", Ngọ:"Dần", Mùi:"Sửu", Thân:"Tý", Dậu:"Hợi", Tuất:"Dậu", Hợi:"Mùi" };
  add("Hỏa Tinh", "hung", "Chủ bệnh tật, nóng nảy, hao tài.", hoaTinh[chi]);

  const linhTinh: Record<string,string> = { Tý:"Tuất", Sửu:"Dậu", Dần:"Thân", Mão:"Mùi", Thìn:"Ngọ", Tỵ:"Tỵ", Ngọ:"Thìn", Mùi:"Mão", Thân:"Dần", Dậu:"Sửu", Tuất:"Tý", Hợi:"Hợi" };
  add("Linh Tinh", "hung", "Chủ phiền muộn, nóng nảy, bất an.", linhTinh[chi]);

  const thienKhoc: Record<string,string> = { Tý:"Ngọ", Sửu:"Tỵ", Dần:"Thìn", Mão:"Mão", Thìn:"Dần", Tỵ:"Sửu", Ngọ:"Tý", Mùi:"Hợi", Thân:"Tuất", Dậu:"Dậu", Tuất:"Thân", Hợi:"Mùi" };
  add("Thiên Khốc", "hung", "Chủ tang chế, buồn rầu, mất mát.", thienKhoc[chi]);

  const thienHu: Record<string,string> = { Tý:"Ngọ", Sửu:"Mùi", Dần:"Thân", Mão:"Dậu", Thìn:"Tuất", Tỵ:"Hợi", Ngọ:"Tý", Mùi:"Sửu", Thân:"Dần", Dậu:"Mão", Tuất:"Thìn", Hợi:"Tỵ" };
  add("Thiên Hư", "hung", "Chủ hao tài, khó khăn, thất bại.", thienHu[chi]);

  const hoaCai: Record<string,string> = { Tý:"Thìn", Sửu:"Sửu", Dần:"Tuất", Mão:"Mùi", Thìn:"Thìn", Tỵ:"Sửu", Ngọ:"Tuất", Mùi:"Mùi", Thân:"Thìn", Dậu:"Sửu", Tuất:"Tuất", Hợi:"Mùi" };
  add("Hoa Cái", "trung", "Chủ tôn giáo, triết học, cô độc.", hoaCai[chi]);

  const bachHo: Record<string,string> = { Tý:"Thìn", Sửu:"Tỵ", Dần:"Ngọ", Mão:"Mùi", Thìn:"Thân", Tỵ:"Dậu", Ngọ:"Tuất", Mùi:"Hợi", Thân:"Tý", Dậu:"Sửu", Tuất:"Dần", Hợi:"Mão" };
  add("Bạch Hổ", "hung", "Chủ huyết quang, tai nạn, bệnh tật.", bachHo[chi]);

  const thienDuc: Record<string,string> = { Tý:"Sửu", Sửu:"Dần", Dần:"Mão", Mão:"Thìn", Thìn:"Tỵ", Tỵ:"Ngọ", Ngọ:"Mùi", Mùi:"Thân", Thân:"Dậu", Dậu:"Tuất", Tuất:"Hợi", Hợi:"Tý" };
  add("Thiên Đức", "cát", "Chủ đức hạnh, được trời phù hộ.", thienDuc[chi]);

  const thienMa: Record<string,string> = { Tý:"Dần", Sửu:"Hợi", Dần:"Thân", Mão:"Tỵ", Thìn:"Dần", Tỵ:"Hợi", Ngọ:"Thân", Mùi:"Tỵ", Thân:"Dần", Dậu:"Hợi", Tuất:"Thân", Hợi:"Tỵ" };
  add("Thiên Mã", "trung", "Chủ di chuyển, biến động, du lịch.", thienMa[chi]);

  const daiHao: Record<string,string> = { Tý:"Tý", Sửu:"Tý", Dần:"Ngọ", Mão:"Ngọ", Thìn:"Tý", Tỵ:"Tý", Ngọ:"Ngọ", Mùi:"Ngọ", Thân:"Tý", Dậu:"Tý", Tuất:"Ngọ", Hợi:"Ngọ" };
  add("Đại Hao", "hung", "Chủ hao tài lớn, phá của.", daiHao[chi]);

  const tieuHao: Record<string,string> = { Tý:"Ngọ", Sửu:"Ngọ", Dần:"Tý", Mão:"Tý", Thìn:"Ngọ", Tỵ:"Ngọ", Ngọ:"Tý", Mùi:"Tý", Thân:"Ngọ", Dậu:"Ngọ", Tuất:"Tý", Hợi:"Tý" };
  add("Tiểu Hao", "hung", "Chủ hao tài nhỏ, chi tiêu nhiều.", tieuHao[chi]);

  return sao;
}

/* Màu theo ngũ hành sao */
export function getSaoColor(element: string): string {
  const map: Record<string, string> = {
    Kim: "#e0e0e0", /* trắng bạc */
    Mộc: "#4ade80", /* xanh lá */
    Thủy: "#60a5fa", /* xanh dương */
    Hỏa: "#f87171", /* đỏ */
    Thổ: "#facc15", /* vàng */
  };
  return map[element] || "#b8b0d1";
}

/* Sao phụ cho từng cung — giữ rỗng vì sao phụ nay được an theo chi chính xác trong getSaoPhuNam */
export function getSaoPhuCung(_cungName: string, _can: string, _chi: string): SaoPhu[] {
  return [];
}
