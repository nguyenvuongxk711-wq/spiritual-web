export function generateStaticParams() {
  return [
    { slug: ["thuoc-lo-ban"] },
    { slug: ["huong-ban-tho"] },
    { slug: ["huong-bep"] },
    { slug: ["huong-giuong"] },
    { slug: ["huong-nha"] },
  ];
}

import { Compass } from "lucide-react";
import Breadcrumb from "../../../components/Breadcrumb";
import PhongThuyTool from "../../../components/PhongThuyTool";
import HeroBackground from "../../../components/HeroBackground";

const META: Record<string, { title: string; tab: string; desc: string }> = {
  "thuoc-lo-ban": { title: "Thước lỗ ban", tab: "lo-ban", desc: "Tra cứu kích thước cát/hung theo thước lỗ ban phong thủy." },
  "huong-ban-tho": { title: "Xem hướng bàn thờ", tab: "ban-tho", desc: "Hướng đặt bàn thờ hợp tuổi gia chủ." },
  "huong-bep": { title: "Xem hướng bếp nấu", tab: "bep", desc: "Hướng đặt bếp hợp tuổi, tránh Tuyệt Mệnh." },
  "huong-giuong": { title: "Xem hướng giường ngủ", tab: "giuong", desc: "Hướng kê giường hợp tuổi để an giấc, sức khỏe tốt." },
  "huong-nha": { title: "Xem hướng nhà", tab: "huong-nha", desc: "Bát trạch — 8 hướng nhà cát/hung theo tuổi gia chủ." },
};

export default async function PhongThuySubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArr } = await params;
  const slug = slugArr.join("/");
  const meta = META[slug] || { title: slug, tab: "huong-nha", desc: "" };
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />
      <HeroBackground
        image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
        className="rounded-2xl border border-[var(--border)] mb-8"
      >
        <div className="text-center px-4 py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300 mb-4">
            <Compass className="h-3.5 w-3.5" />
            <span>Phong thủy</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{meta.title}</h1>
          {meta.desc && <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">{meta.desc}</p>}
        </div>
      </HeroBackground>
      <PhongThuyTool initialTab={meta.tab} showTabs />
    </div>
  );
}
