export function generateStaticParams() {
  return [
    { slug: ["tot-xau"] },
    { slug: ["ket-hon"] },
    { slug: ["dong-tho"] },
    { slug: ["xuat-hanh"] },
    { slug: ["nhap-trach"] },
    { slug: ["mua-xe"] },
    { slug: ["an-tang"] },
  ];
}

import Link from "next/link";
import { Sun, Star, Clock, CalendarDays } from "lucide-react";
import Breadcrumb from "../../../components/Breadcrumb";
import GlassCard from "../../../components/GlassCard";
import HeroBackground from "../../../components/HeroBackground";
import { findGoodDays } from "../../../data/ngay";

const META: Record<string, { title: string; desc: string; keywords: string[] }> = {
  "tot-xau": { title: "Xem ngày tốt xấu", desc: "Chọn ngày bất kỳ để xem chi tiết Can Chi, sao, giờ hoàng đạo.", keywords: [] },
  "ket-hon": { title: "Ngày tốt kết hôn", desc: "Các ngày đẹp sắp tới để cưới hỏi, đính hôn.", keywords: ["cưới", "đính hôn", "hỏi vợ", "gả"] },
  "dong-tho": { title: "Ngày tốt động thổ", desc: "Các ngày đẹp để động thổ, xây cất, đào giếng.", keywords: ["động thổ", "xây", "đào giếng"] },
  "xuat-hanh": { title: "Ngày tốt xuất hành", desc: "Các ngày đẹp để xuất hành, đi xa, du lịch.", keywords: ["xuất hành", "đi xa", "du lịch"] },
  "nhap-trach": { title: "Ngày tốt nhập trạch", desc: "Các ngày đẹp để nhập trạch, chuyển về nhà mới.", keywords: ["nhập trạch", "chuyển nhà"] },
  "mua-xe": { title: "Ngày tốt mua xe", desc: "Các ngày đẹp để mua xe, nhận xe.", keywords: ["mua xe", "mua sắm"] },
  "an-tang": { title: "Ngày tốt an táng", desc: "Các ngày phù hợp cho việc an táng, tang lễ.", keywords: ["an táng"] },
};

export default async function NgaySubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArr } = await params;
  const slug = slugArr.join("/");
  const meta = META[slug] || { title: slug, desc: "", keywords: [] };

  const isFinder = meta.keywords.length > 0;
  const days = isFinder ? findGoodDays(meta.keywords, new Date(), 12) : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />
      <HeroBackground
        image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
        className="rounded-2xl border border-[var(--border)] mb-8"
      >
        <div className="text-center px-4 py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-300 mb-4">
            <Sun className="h-3.5 w-3.5" />
            <span>Xem ngày</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{meta.title}</h1>
          {meta.desc && <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">{meta.desc}</p>}
        </div>
      </HeroBackground>

      {!isFinder ? (
        <GlassCard className="text-center py-10">
          <CalendarDays className="mx-auto mb-3 h-10 w-10 text-[var(--accent)]" />
          <p className="text-sm text-[var(--text-secondary)] mb-4">Dùng công cụ xem chi tiết ngày tốt xấu theo ngày bạn chọn.</p>
          <Link href="/ngay" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg hover:brightness-110 transition-all">
            Mở công cụ xem ngày
          </Link>
        </GlassCard>
      ) : days.length === 0 ? (
        <GlassCard className="text-center py-10 text-sm text-[var(--text-muted)]">
          Không tìm thấy ngày phù hợp trong 4 tháng tới.
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {days.map((d, i) => (
            <GlassCard key={i}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-[var(--success)]" />
                    <span className="font-display text-lg font-bold text-[var(--text-primary)]">{d.date}</span>
                    <span className="text-xs text-[var(--text-muted)]">({d.weekday})</span>
                  </div>
                  <div className="mt-1 text-sm text-[var(--accent)] font-medium">Ngày {d.canChi}</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {d.matched.map((m) => (
                      <span key={m} className="rounded-md bg-[var(--success)]/10 px-2 py-0.5 text-[11px] text-[var(--success)] border border-[var(--success)]/20">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-2 border-t border-[var(--border)] pt-3">
                <Clock className="mt-0.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <div className="flex flex-wrap gap-1.5">
                  {d.gioHoangDao.map((h) => (
                    <span key={h} className="rounded bg-[var(--surface-elevated)]/60 px-2 py-0.5 text-[11px] text-[var(--text-secondary)] border border-[var(--border)]">{h}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
