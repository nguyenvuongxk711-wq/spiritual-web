"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, BookOpen, ChevronRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import PhongThuyTool from "../../components/PhongThuyTool";
import HeroBackground from "../../components/HeroBackground";
import GlassCard from "../../components/GlassCard";

export default function PhongThuyPage() {
  const reduced = useReducedMotion();
  const [astroData, setAstroData] = useState<any[]>([]);
  const [astroError, setAstroError] = useState<string | null>(null);

  useEffect(() => {
    // Skip API call on production (Vercel)
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      setAstroError("Chức năng này cần backend chạy local. Vui lòng chạy backend để xem dữ liệu kho.");
      return;
    }
    const keywords = ["Phong thủy", "Hướng nhà", "Bát trạch", "Thước lỗ ban", "Kim Lâu", "Tam Tai"];
    Promise.all(
      keywords.map(async (k) => {
        try {
          const r = await fetch(`http://localhost:8000/api/astrology-data/search?q=${encodeURIComponent(k)}`);
          if (!r.ok) return null;
          const items = await r.json();
          return items[0] || null;
        } catch {
          return null;
        }
      })
    )
      .then((items) => {
        const valid = items.filter(Boolean);
        setAstroData(valid);
        if (valid.length === 0) setAstroError("Chưa có dữ liệu chi tiết trong kho. Vào Admin để cào thêm.");
      })
      .catch(() => setAstroError("Không kết nối được kho dữ liệu (backend chưa chạy?)."));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />
      <motion.div initial={reduced ? {} : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <HeroBackground
          image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
          className="rounded-2xl border border-[var(--border)] mb-8"
        >
          <div className="text-center px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300 mb-4">
              <Compass className="h-3.5 w-3.5" />
              <span>Phong thủy</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Xem <span className="text-gradient">Phong Thủy</span>
            </h1>
            <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">
              Thước lỗ ban, hướng nhà, bàn thờ, bếp nấu theo tuổi chủ.
            </p>
          </div>
        </HeroBackground>
        <PhongThuyTool initialTab="lo-ban" showTabs />

        {/* Dữ liệu kho Phong Thủy */}
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-emerald-400">Luận giải chi tiết từ kho dữ liệu</h3>
          </div>
          {astroError && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 p-4 text-sm text-[var(--text-muted)]">
              {astroError}
              <div className="mt-2">
                <a href="/admin/" className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline">
                  Mở Admin Crawler <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
          <div className="space-y-3">
            {astroData.map((item) => (
              <GlassCard key={item.id} className="overflow-hidden">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">{item.category}</span>
                  <span className="font-bold text-[var(--text-primary)]">{item.keyword}</span>
                  <span className="ml-auto text-[10px] text-[var(--text-muted)]">{item.ai_model_used}</span>
                </div>
                <div
                  className="astro-content text-sm text-[var(--text-secondary)] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.final_content || "<p>Chưa có nội dung tổng hợp.</p>" }}
                />
              </GlassCard>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
