"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Sun, Clock, AlertTriangle, CheckCircle2, BookOpen, ChevronRight } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import HeroBackground from "../../components/HeroBackground";
import { solarToLunar, getCanChiDay } from "../../data/lunar-calendar";

const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
const HOUR_RANGES = ["23-1","1-3","3-5","5-7","7-9","9-11","11-13","13-15","15-17","17-19","19-21","21-23"];
const goodActivities = ["Cầu tài", "Khai trương", "Xuất hành", "Cưới hỏi", "Động thổ", "An táng"];
const badActivities = ["Ký kết quan trọng", "Mở két/tủ", "Chuyển nhà", "Khởi công xây dựng"];

/* Giờ hoàng đạo theo chi NGÀY (bảng cổ truyền) — chỉ số chi giờ tốt */
const HD_BY_DAY: Record<string, number[]> = {
  "Tý":  [0,1,3,6,8,9],  "Ngọ": [0,1,3,6,8,9],
  "Sửu": [2,3,5,8,10,11],"Mùi": [2,3,5,8,10,11],
  "Dần": [0,1,4,5,7,10], "Thân":[0,1,4,5,7,10],
  "Mão": [0,2,3,6,7,9],  "Dậu": [0,2,3,6,7,9],
  "Thìn":[2,4,5,8,9,11], "Tuất":[2,4,5,8,9,11],
  "Tỵ":  [1,4,6,7,10,11],"Hợi": [1,4,6,7,10,11],
};

/* 12 thần Hoàng đạo / Hắc đạo — khởi Thanh Long theo tháng âm */
const THAN_12 = [
  { ten: "Thanh Long", good: true }, { ten: "Minh Đường", good: true },
  { ten: "Thiên Hình", good: false }, { ten: "Chu Tước", good: false },
  { ten: "Kim Quỹ", good: true }, { ten: "Bảo Quang", good: true },
  { ten: "Bạch Hổ", good: false }, { ten: "Ngọc Đường", good: true },
  { ten: "Thiên Lao", good: false }, { ten: "Nguyên Vũ", good: false },
  { ten: "Tư Mệnh", good: true }, { ten: "Câu Trần", good: false },
];
/* Chi khởi Thanh Long theo tháng âm (1-12) */
const THANH_LONG_START = [0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10]; // tháng 1→Tý, 2→Dần...

function getDayInfo(date: Date) {
  const lunar = solarToLunar(date);
  const ccDay = getCanChiDay(date);
  const dayChiIdx = CHI.indexOf(ccDay.chi);
  const startChi = THANH_LONG_START[(lunar.month - 1) % 12];
  const offset = (dayChiIdx - startChi + 12) % 12;
  const than = THAN_12[offset];
  const goodHourIdx = HD_BY_DAY[ccDay.chi] || [];
  return {
    lunarDay: `${ccDay.can} ${ccDay.chi}`,
    lunarDate: `${lunar.day}/${lunar.month}${lunar.isLeap ? " (N)" : ""}`,
    clash: `${CHI[(dayChiIdx + 6) % 12]} (xung ngày)`,
    sao: {
      name: `${than.ten} (${than.good ? "Hoàng đạo" : "Hắc đạo"})`,
      desc: than.good ? "Ngày tốt, thuận lợi cho việc trọng đại." : "Ngày xấu, nên tránh việc lớn.",
      good: than.good,
    },
    goodHours: goodHourIdx.map((i) => `${CHI[i]} (${HOUR_RANGES[i]})`),
  };
}

export default function CalendarPage() {
  const today = useMemo(() => new Date(), []);
  const [selected, setSelected] = useState(today);
  const [astroData, setAstroData] = useState<any[]>([]);
  const [astroError, setAstroError] = useState<string | null>(null);

  useEffect(() => {
    // Skip API call on production (Vercel)
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      setAstroError("Chức năng này cần backend chạy local. Vui lòng chạy backend để xem dữ liệu kho.");
      return;
    }
    const keywords = ["Lịch vạn niên", "Xem ngày tốt xấu", "Đổi ngày âm dương", "Giờ hoàng đạo", "Thần 12"];
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

  const year = selected.getFullYear();
  const month = selected.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const selectedInfo = getDayInfo(selected);

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <HeroBackground
          image="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80"
          className="rounded-2xl border border-[var(--border)] mb-10"
        >
          <div className="text-center px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-300 mb-4">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Lịch Vạn Niên</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Xem ngày <span className="text-gradient">tốt xấu</span>
            </h1>
            <p className="mt-2 text-[var(--text-muted)] max-w-lg mx-auto">
              Tra cứu giờ hoàng đạo, sao tốt/xấu, việc nên và không nên làm theo ngày âm lịch.
            </p>
          </div>
        </HeroBackground>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Calendar */}
          <GlassCard className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                {monthNames[month]} / {year}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(new Date(year, month - 1, 1))}
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
                >
                  ← Trước
                </button>
                <button
                  onClick={() => setSelected(new Date(year, month + 1, 1))}
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
                >
                  Sau →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
                <div key={d} className="text-xs font-semibold text-[var(--text-muted)] py-1">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {padding.map((_, i) => (
                <div key={`p-${i}`} className="aspect-square" />
              ))}
              {calendarDays.map((day) => {
                const active = isToday(day);
                const isSelected =
                  day === selected.getDate() &&
                  month === selected.getMonth() &&
                  year === selected.getFullYear();
                const info = getDayInfo(new Date(year, month, day));
                return (
                  <button
                    key={day}
                    onClick={() => setSelected(new Date(year, month, day))}
                    className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all border ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] font-bold"
                        : active
                        ? "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]"
                        : "border-transparent text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                    }`}
                  >
                    <span>{day}</span>
                    {info.sao.good ? (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[var(--success)]" />
                    ) : (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[var(--warning)]" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[var(--success)]" /> Ngày tốt
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[var(--warning)]" /> Ngày xấu
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full border border-[var(--accent)]" /> Đang chọn
              </span>
            </div>
          </GlassCard>

          {/* Day detail */}
          <div className="lg:col-span-2 space-y-4">
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  {selected.getDate()}/{month + 1}/{year}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Ngày âm</span>
                  <span className="text-[var(--text-primary)] font-medium">{selectedInfo.lunarDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Can Chi ngày</span>
                  <span className="text-[var(--text-primary)] font-medium">{selectedInfo.lunarDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Sao</span>
                  <span className={selectedInfo.sao.good ? "text-[var(--success)]" : "text-[var(--warning)]"}>
                    {selectedInfo.sao.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Tuổi xung</span>
                  <span className="text-[var(--danger)]">{selectedInfo.clash}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-2 italic border-t border-[var(--border)] pt-2">
                  {selectedInfo.sao.desc}
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-[var(--success)]" />
                <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">Giờ hoàng đạo</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedInfo.goodHours.map((h: string) => (
                  <span key={h} className="rounded-md bg-[var(--success)]/10 px-2 py-1 text-xs text-[var(--success)] border border-[var(--success)]/20">
                    {h}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
                <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">Nên làm</h3>
              </div>
              <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                {goodActivities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />
                <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">Kiêng kỵ</h3>
              </div>
              <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                {badActivities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--warning)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* Dữ liệu kho Lịch */}
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-bold text-blue-400">Luận giải chi tiết từ kho dữ liệu</h3>
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
                  <span className="rounded-full bg-blue-400/10 px-2 py-0.5 text-[10px] font-bold text-blue-400">{item.category}</span>
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
