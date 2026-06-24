/* Tử Vi Engine — simplified for all 8 sub-features */

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
const CHI_ELE: Record<string,string> = { Tý:"Thủy",Sửu:"Thổ",Dần:"Mộc",Mão:"Mộc",Thìn:"Thổ",Tỵ:"Hỏa",Ngọ:"Hỏa",Mùi:"Thổ",Thân:"Kim",Dậu:"Kim",Tuất:"Thổ",Hợi:"Thủy" };
const ANIMALS: Record<string,string> = { Tý:"Chuột",Sửu:"Trâu",Dần:"Hổ",Mão:"Mèo",Thìn:"Rồng",Tỵ:"Rắn",Ngọ:"Ngựa",Mùi:"Dê",Thân:"Khỉ",Dậu:"Gà",Tuất:"Chó",Hợi:"Heo" };

export function getCanChi(year: number) {
  const idx = ((year - 4) % 60 + 60) % 60;
  return { can: CAN[idx%10], chi: CHI[idx%12], element: CHI_ELE[CHI[idx%12]] };
}
export function getConGiap(year: number) { const c=getCanChi(year); return {...c, animal: ANIMALS[c.chi] }; }

const xungMap: Record<string,string> = { Tý:"Ngọ",Ngọ:"Tý",Sửu:"Mùi",Mùi:"Sửu",Dần:"Thân",Thân:"Dần",Mão:"Dậu",Dậu:"Mão",Thìn:"Tuất",Tuất:"Thìn",Tỵ:"Hợi",Hợi:"Tỵ" };
const hopMap: Record<string,string[]> = { Thân:["Tý","Thìn"],Tý:["Thân","Thìn"],Thìn:["Thân","Tý"],Dậu:["Sửu","Tỵ"],Sửu:["Dậu","Tỵ"],Tỵ:["Dậu","Sửu"],Tuất:["Ngọ","Dần"],Ngọ:["Tuất","Dần"],Dần:["Tuất","Ngọ"],Hợi:["Mão","Mùi"],Mão:["Hợi","Mùi"],Mùi:["Hợi","Mão"] };

/* ---------- 1. TỬ VI NĂM ĐỘNG ---------- */
import { getTuViNam, AVAILABLE_YEARS } from "./tu-vi-nam";
export { AVAILABLE_YEARS };

export function tuViNamDong(year: number, birthYear: number) {
  const c = getConGiap(birthYear);
  const p = getTuViNam(year, c.chi);
  return { ...c, ...p };
}

/* Giữ lại hàm cũ để tương thích */
export function tuVi2026(y: number) { return tuViNamDong(2026, y); }

/* ---------- 2. TỬ VI NGÀY ---------- */
export function tuViNgay(y: number, d: Date) {
  const c=getConGiap(y); const dc=getCanChi(d.getFullYear()).chi;
  const isX=xungMap[c.chi]===dc; const isH=(hopMap[c.chi]||[]).includes(dc);
  let v:"tốt"|"xấu"|"bình"="bình",a="Ngày trung bình. Cân nhắc kỹ.";
  if(isH){v="tốt";a=`Ngày hợp ${c.chi}. Nên giao dịch, gặp gỡ.`;} else if(isX){v="xấu";a=`Ngày xung ${c.chi}. Hạn chế quyết định lớn.`;}
  return {c,dayChi:dc,verdict:v,advice:a,isX,isH};
}

/* ---------- 3. TỬ VI THEO NĂM ---------- */
export function tuViNam(y: number, vy: number) {
  const c=getConGiap(y); const v=getCanChi(vy); const isX=xungMap[c.chi]===v.chi; const isH=(hopMap[c.chi]||[]).includes(v.chi);
  let s=50; if(isH)s=85; else if(isX)s=35; else if(c.element===v.element)s=70;
  const l=s>=80?"Đại cát":s>=60?"Cát":s>=40?"Bình":"Hung";
  return {c,view:v,score:s,label:l,isX,isH};
}

/* ---------- 4. TRỌN ĐỜI ---------- */
const LIFE: Record<string,string[]> = {
  Tý:["Trẻ khó, trung niên vất vả, già an nhàn","Lập nghiệp muộn nhưng bền vững","Tài lộc từ kiên trì"],
  Sửu:["Cuộc đời ổn định, ít biến động","Thành công từ chăm chỉ","Gia đình là tài sản lớn nhất"],
  Dần:["Trẻ nhiều thử thách, trưởng thành sớm","Trung niên phát đạt, có quyền lực","Già hưởng phúc từ con cháu"],
  Mão:["Nhạy cảm, dễ tổn thương","Nghệ thuật, sáng tạo là đường sống","Tình duyên nhiều trắc trở"],
  Thìn:["Thông minh, có khí chất lãnh đạo","Nhiều thăng trầm","Hậu vận tốt đẹp"],
  Tỵ:["Khôn ngoan, tinh tế","Trung niên phú quý","Sức khỏe cần chú ý"],
  Ngọ:["Nóng tính nhưng tốt bụng","Nhiều lần đổi nghề","Già có phúc"],
  Mùi:["Hiền lành, được lòng người","Công danh chậm nhưng chắc","Gia đình hạnh phúc"],
  Thân:["Thông minh, lanh lợi","Nhiều cơ hội nhưng dễ bỏ lỡ","Trung niên cần ổn định"],
  Dậu:["Cầu toàn, kỹ tính","Sự nghiệp phát triển muộn","Tài chính vững vàng"],
  Tuất:["Trung thành, đáng tin","Khởi nghiệp muộn nhưng thành","Con cháu hiếu thảo"],
  Hợi:["Phúc hậu, lạc quan","Tiền bạc đến rồi đi","Hậu vận an nhàn"],
};
export function tuViTronDoi(y: number) { const c=getCanChi(y); const m=((y%9)+9)%9||9; const n=["","Khảm","Khôn","Chấn","Tốn","Cung5","Càn","Đoài","Cấn","Ly"]; return {c,cung:n[m],stages:LIFE[c.chi]||[]}; }

/* ---------- 5. 12 CON GIÁP ---------- */
const CG_INFO: Record<string,{t:string[];b:string[];w:string[];lk:string[];cr:string[]}> = {
  Tý:{t:["Thông minh","LanHợp lợi","Nhanh nhẹn","Tiết kiệm"],b:["Thìn","Thân","Sửu"],w:["Ngọ","Mùi","Mão"],lk:["2,3","Xanh, vàng"],cr:["Tài chính","Kinh doanh","IT"]},
  Sửu:{t:["Chăm chỉ","Kiên nhẫn","Thực tế","Trung thành"],b:["Tý","Dậu","Tỵ"],w:["Mùi","Ngọ","Thìn"],lk:["1,4","Vàng, trắng"],cr:["Nông nghiệp","Xây dựng","Y tế"]},
  Dần:{t:["Dũng cảm","Tự tin","Nóng tính","Lãnh đạo"],b:["Ngọ","Tuất","Hợi"],w:["Thân","Tỵ","Dậu"],lk:["1,3,4","Xanh, cam"],cr:["Quân đội","Quản lý","Thể thao"]},
  Mão:{t:["Nhẹ nhàng","Tinh tế","Nhạy cảm","Khéo léo"],b:["Mùi","Thìn","Tuất","Hợi"],w:["Dậu","Ngọ","Tý"],lk:["3,4,6","Hồng, xanh"],cr:["Nghệ thuật","Thiết kế","Y tá"]},
  Thìn:{t:["Quyền lực","Tự tin","Kiêu ngạo","Tham vọng"],b:["Tý","Thân","Dậu"],w:["Tuất","Mão","Thìn"],lk:["1,6,7","Vàng, bạc"],cr:["Chính trị","Quản lý","Luật"]},
  Tỵ:{t:["Khôn ngoan","Bí ẩn","Quyết đoán","Kiên nhẫn"],b:["Sửu","Dậu","Hợi"],w:["Hợi","Thân","Dần"],lk:["2,8,9","Đỏ, vàng"],cr:["Tâm lý","Nghiên cứu","Tài chính"]},
  Ngọ:{t:["Năng động","Tự do","Thẳng thắn","Nóng vội"],b:["Dần","Tuất","Mùi"],w:["Tý","Ngọ","Sửu"],lk:["2,3,7","Đỏ, xanh"],cr:["Du lịch","Bán hàng","Truyền thông"]},
  Mùi:{t:["Hiền lành","Sáng tạo","Nhút nhát","Dễ xúc động"],b:["Ngọ","Mão","Hợi","Tuất"],w:["Sửu","Thìn","Tý"],lk:["2,7","Xanh lá, vàng"],cr:["Giáo dục","Y tế","Nghệ thuật"]},
  Thân:{t:["Thông minh","Nhanh nhẹn","Tò mò","Thiếu kiên nhẫn"],b:["Tý","Thìn","Dậu"],w:["Dần","Hợi","Tỵ"],lk:["4,9","Trắng, xanh dương"],cr:["IT","Khoa học","Kinh doanh"]},
  Dậu:{t:["Cầu toàn","Siêng năng","Tự cao","Thẳng thắn"],b:["Sửu","Tỵ","Thìn","Thân"],w:["Mão","Tuất","Mùi"],lk:["5,7,8","Vàng, nâu"],cr:["Kế toán","Luật","Biên tập"]},
  Tuất:{t:["Trung thành","Công bằng","Cẩn thận","Đa nghi"],b:["Dần","Mùi","Ngọ","Hợi"],w:["Thìn","Sửu","Dậu"],lk:["3,4,9","Xanh lá, đỏ"],cr:["Công an","Y tế","Tư vấn"]},
  Hợi:{t:["Phúc hậu","Lạc quan","Dễ tin","Hào phóng"],b:["Mão","Tuất","Mùi"],w:["Tỵ","Hợi","Thân"],lk:["2,5,8","Xám, vàng"],cr:["Giải trí","Ẩm thực","Từ thiện"]},
};
export function getConGiapInfo(chi: string) { return CG_INFO[chi] || CG_INFO.Tý; }

/* ---------- 6. TỨ TRỤ (Bazi) — accurate via lunar-calendar ---------- */
import { solarToLunar, getCanChiYear, getCanChiMonth, getCanChiDay, getCanChiHour } from "./lunar-calendar";

export function tuTru(year: number, month: number, day: number, hour: number) {
  const date = new Date(year, month - 1, day);
  const lunar = solarToLunar(date);
  const ccYear = getCanChiYear(lunar.year);
  const ccMonth = getCanChiMonth(lunar.year, lunar.month);
  const ccDay = getCanChiDay(date);
  const ccHour = getCanChiHour(ccDay.can, hour);
  return { nam: `${ccYear.can} ${ccYear.chi}`, thang: `${ccMonth.can} ${ccMonth.chi}`, ngay: `${ccDay.can} ${ccDay.chi}`, gio: `${ccHour.can} ${ccHour.chi}` };
}

/* ---------- 7. CĂN XƯƠNG / NẠP ÂM 60 HOA GIÁP ---------- */
const NAP_AM_60 = [
  "Hải Trung Kim","Hải Trung Kim","Lư Trung Hỏa","Lư Trung Hỏa","Đại Lâm Mộc","Đại Lâm Mộc",
  "Lộ Bàng Thổ","Lộ Bàng Thổ","Kiếm Phong Kim","Kiếm Phong Kim","Sơn Đầu Hỏa","Sơn Đầu Hỏa",
  "Giản Hạ Thủy","Giản Hạ Thủy","Thành Đầu Thổ","Thành Đầu Thổ","Bạch Lạp Kim","Bạch Lạp Kim",
  "Dương Liễu Mộc","Dương Liễu Mộc","Tuyền Trung Thủy","Tuyền Trung Thủy","Ốc Thượng Thổ","Ốc Thượng Thổ",
  "Tích Lịch Hỏa","Tích Lịch Hỏa","Tùng Bách Mộc","Tùng Bách Mộc","Trường Lưu Thủy","Trường Lưu Thủy",
  "Sa Trung Kim","Sa Trung Kim","Sơn Hạ Hỏa","Sơn Hạ Hỏa","Bình Địa Mộc","Bình Địa Mộc",
  "Bích Thượng Thổ","Bích Thượng Thổ","Kim Bạc Kim","Kim Bạc Kim","Phúc Đăng Hỏa","Phúc Đăng Hỏa",
  "Thiên Hà Thủy","Thiên Hà Thủy","Đại Dịch Thổ","Đại Dịch Thổ","Thoa Xuyến Kim","Thoa Xuyến Kim",
  "Tang Đốc Mộc","Tang Đốc Mộc","Đại Kê Thủy","Đại Kê Thủy","Sa Trung Thổ","Sa Trung Thổ",
  "Thiên Thượng Hỏa","Thiên Thượng Hỏa","Thạch Lựu Mộc","Thạch Lựu Mộc","Đại Hải Thủy","Đại Hải Thủy",
];

const NAP_AM_ELE: Record<string,string> = {
  "Hải Trung Kim":"Kim","Lư Trung Hỏa":"Hỏa","Đại Lâm Mộc":"Mộc","Lộ Bàng Thổ":"Thổ","Kiếm Phong Kim":"Kim",
  "Sơn Đầu Hỏa":"Hỏa","Giản Hạ Thủy":"Thủy","Thành Đầu Thổ":"Thổ","Bạch Lạp Kim":"Kim","Dương Liễu Mộc":"Mộc",
  "Tuyền Trung Thủy":"Thủy","Ốc Thượng Thổ":"Thổ","Tích Lịch Hỏa":"Hỏa","Tùng Bách Mộc":"Mộc","Trường Lưu Thủy":"Thủy",
  "Sa Trung Kim":"Kim","Sơn Hạ Hỏa":"Hỏa","Bình Địa Mộc":"Mộc","Bích Thượng Thổ":"Thổ","Kim Bạc Kim":"Kim",
  "Phúc Đăng Hỏa":"Hỏa","Thiên Hà Thủy":"Thủy","Đại Dịch Thổ":"Thổ","Thoa Xuyến Kim":"Kim","Tang Đốc Mộc":"Mộc",
  "Đại Kê Thủy":"Thủy","Sa Trung Thổ":"Thổ","Thiên Thượng Hỏa":"Hỏa","Thạch Lựu Mộc":"Mộc","Đại Hải Thủy":"Thủy",
};

const NAP_AM_DESC: Record<string,string> = {
  Kim: "Cương nghị, quyết đoán. Công danh từ nỗ lực, không ngại khó.",
  Mộc: "Nhân hậu, phát triển chậm. Hậu vận tốt, được con cháu kính trọng.",
  Thủy: "Thông minh, biến động. Tài chính lên xuống, nên có kế hoạch dài hạn.",
  Hỏa: "Nhiệt huyết, nóng vội. Thành công đến từ sự kiên trì và kiềm chế.",
  Thổ: "Ổn định, thực tế. Công danh chậm nhưng chắc, gia đình êm ấm.",
};

export function canXuongTinhSo(year: number) {
  const cc = getCanChi(year);
  const idx = ((year - 4) % 60 + 60) % 60;
  const napAm = NAP_AM_60[idx];
  const ele = NAP_AM_ELE[napAm] || "?";
  return { cc, napAm, element: ele, desc: NAP_AM_DESC[ele] || "" };
}

/* ---------- 8. THỐNG KÊ CĂN XƯƠNG ---------- */
export function thongKeCanXuong() {
  const stats: Record<string,number> = {};
  for(let y=1924; y<=2026; y++) {
    const r = canXuongTinhSo(y);
    stats[r.napAm] = (stats[r.napAm]||0)+1;
  }
  return Object.entries(stats).sort((a,b)=>b[1]-a[1]).map(([name,count])=>({name,count}));
}
