export function generateStaticParams() {
  return [
    { slug: ["kinh-dich"] },
    { slug: ["xin-xam"] },
    { slug: ["mai-hoa"] },
  ];
}

import { BookOpen } from "lucide-react";
import Breadcrumb from "../../../components/Breadcrumb";
import QueTool from "../../../components/QueTool";
import HeroBackground from "../../../components/HeroBackground";

const META: Record<string, { title: string; tab: "kinh-dich" | "xin-xam" | "mai-hoa"; desc: string }> = {
  "kinh-dich": { title: "Quẻ Kinh Dịch", tab: "kinh-dich", desc: "Gieo quẻ Kinh Dịch — 64 quẻ, luận ý nghĩa & lời khuyên." },
  "xin-xam": { title: "Xin Xăm", tab: "xin-xam", desc: "Rút thẻ xăm linh nghiệm, giải nghĩa bài thơ xăm." },
  "mai-hoa": { title: "Mai Hoa Dịch Số", tab: "mai-hoa", desc: "Gieo quẻ Mai Hoa theo con số, luận đoán cát hung." },
};

export default async function QueSubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArr } = await params;
  const slug = slugArr.join("/");
  const meta = META[slug] || { title: slug, tab: "kinh-dich" as const, desc: "" };
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />
      <HeroBackground
        image="https://images.unsplash.com/photo-1515896421626-8b5d9f0c38a6?auto=format&fit=crop&w=1200&q=80"
        className="rounded-2xl border border-[var(--border)] mb-8"
      >
        <div className="text-center px-4 py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-1.5 text-xs font-medium text-violet-300 mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Gieo Quẻ</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{meta.title}</h1>
          {meta.desc && <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">{meta.desc}</p>}
        </div>
      </HeroBackground>
      <QueTool initialTab={meta.tab} showTabs />
    </div>
  );
}
