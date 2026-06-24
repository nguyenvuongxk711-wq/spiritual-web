export function generateStaticParams() {
  return [
    { slug: ["xong-dat"] },
    { slug: ["vo-chong"] },
    { slug: ["sinh-con"] },
    { slug: ["ket-hon"] },
    { slug: ["hop-nhau"] },
    { slug: ["lam-an"] },
    { slug: ["lam-nha"] },
  ];
}

import { User } from "lucide-react";
import Breadcrumb from "../../../components/Breadcrumb";
import TuoiTool from "../../../components/TuoiTool";
import HeroBackground from "../../../components/HeroBackground";

const META: Record<string, { title: string; desc: string }> = {
  "xong-dat": { title: "Xem tuổi xông đất", desc: "Chọn tuổi xông đất, mở hàng đầu năm hợp gia chủ." },
  "vo-chong": { title: "Xem tuổi vợ chồng", desc: "Đánh giá độ hợp tuổi vợ chồng theo Can Chi, Ngũ hành." },
  "sinh-con": { title: "Xem tuổi sinh con", desc: "Chọn năm sinh con hợp tuổi bố mẹ." },
  "ket-hon": { title: "Xem tuổi kết hôn", desc: "Xem năm kết hôn có hợp tuổi hai người không." },
  "hop-nhau": { title: "Xem tuổi hợp nhau", desc: "Mức độ hòa hợp giữa hai tuổi trong quan hệ, hợp tác." },
  "lam-an": { title: "Xem tuổi làm ăn", desc: "Hai tuổi có hợp để hợp tác kinh doanh không." },
  "lam-nha": { title: "Xem tuổi làm nhà", desc: "Kiểm tra Tam Tai, Kim Lâu, Hoang Ốc cho năm xây/sửa nhà." },
};

export default async function TuoiSubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArr } = await params;
  const slug = slugArr.join("/");
  const meta = META[slug] || { title: slug, desc: "" };
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />
      <HeroBackground
        image="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1200&q=80"
        className="rounded-2xl border border-[var(--border)] mb-8"
      >
        <div className="text-center px-4 py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-300 mb-4">
            <User className="h-3.5 w-3.5" />
            <span>Xem tuổi</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{meta.title}</h1>
          {meta.desc && <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">{meta.desc}</p>}
        </div>
      </HeroBackground>
      <TuoiTool initialTab={slug} showTabs />
    </div>
  );
}
