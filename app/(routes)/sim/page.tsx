/**
 * UNIT TEST CASES:
 * 1. "0912345678" + "Hỏa" → total > 0, breakdown có 5 key, color=yellow/green/red
 * 2. "0999999999" + "Thủy" → dân gian cao (nhiều 9), âm dương lệch (toàn lẻ)
 * 3. "0123456789" + "Kim" → âm dương cân bằng hoàn hảo (5 chẵn / 5 lẻ)
 * 4. "123" + "Mộc" → invalid regex → error inline
 * 5. "+84912345678" + "Thổ" → normalize thành 0912345678 rồi tính OK
 */

"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Smartphone,
  Sparkles,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  Zap,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import GlassCard from "../../components/GlassCard";
import { calculateSimScore, type Menh } from "../../data/sim";

const MENH_OPTIONS: { value: Menh; label: string; color: string }[] = [
  { value: "Kim", label: "Kim", color: "#d4d4d8" },
  { value: "Mộc", label: "Mộc", color: "#4ade80" },
  { value: "Thủy", label: "Thủy", color: "#60a5fa" },
  { value: "Hỏa", label: "Hỏa", color: "#fb923c" },
  { value: "Thổ", label: "Thổ", color: "#a8a29e" },
];

/* ========== CIRCULAR PROGRESS ========== */
function CircularProgress({
  value,
  color,
  duration,
}: {
  value: number;
  color: string;
  duration: number;
}) {
  const [prog, setProg] = useState(0);
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (prog / 100) * c;

  useEffect(() => {
    const t = setTimeout(() => setProg(value), 50);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={140} height={140} className="-rotate-90">
        <circle cx={70} cy={70} r={r} stroke="var(--border)" strokeWidth={8} fill="none" />
        <circle
          cx={70}
          cy={70}
          r={r}
          stroke={color}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: c,
            strokeDashoffset: offset,
            transition: `stroke-dashoffset ${duration}ms ease-out`,
          }}
        />
      </svg>
      <span className="absolute text-3xl font-bold" style={{ color }}>
        {Math.round(prog)}
      </span>
    </div>
  );
}

/* ========== PAGE ========== */

export default function SimPage() {
  const [phone, setPhone] = useState("");
  const [menh, setMenh] = useState<Menh>("Hỏa");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<ReturnType<typeof calculateSimScore> | null>(null);
  const [astroData, setAstroData] = useState<any[]>([]);
  const [astroError, setAstroError] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Skip API call on production (Vercel)
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      setAstroError("Chức năng này cần backend chạy local. Vui lòng chạy backend để xem dữ liệu kho.");
      return;
    }
    const keywords = ["Sim phong thủy", "Xem sim", "Số đẹp", "Số tài lộc", "Phong thủy số"];
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

  /* Auto-format SĐT: xxx xxx xxx */
  const onPhone = (raw: string) => {
    let v = raw.replace(/\D/g, "").slice(0, 11);
    if (v.startsWith("0") && v.length > 1) v = v.slice(0, 1) + v.slice(1);
    let formatted = v;
    if (v.length > 4) formatted = v.slice(0, 4) + " " + v.slice(4);
    if (v.length > 7) formatted = formatted.slice(0, 8) + " " + formatted.slice(8);
    setPhone(formatted);
    if (error) setError(null);
  };

  const calc = () => {
    setError(null);
    try {
      const s = calculateSimScore(phone, menh);
      setLoading(true);
      setTimeout(() => {
        setScore(s);
        setLoading(false);
      }, 400);
    } catch (e: any) {
      setError(e.message || "Lỗi không xác định");
    }
  };

  const reset = () => {
    setPhone("");
    setMenh("Hỏa");
    setScore(null);
    setError(null);
  };

  const scoreColor =
    score && score.total >= 70
      ? "var(--success)"
      : score && score.total >= 40
      ? "var(--warning)"
      : "var(--danger)";

  const breakdownEntries = score
    ? Object.entries(score.breakdown)
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-300 mb-4">
            <Smartphone className="h-3.5 w-3.5" />
            <span>Xem Sim Phong Thủy</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Sim <span className="text-gradient">Phong Thủy</span>
          </h1>
          <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">
            Nhập số điện thoại và mệnh chủ để xem độ hợp khắc theo 5 tiêu chí.
          </p>
        </div>

        {/* Form */}
        <GlassCard className="max-w-lg mx-auto mb-10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => onPhone(e.target.value)}
                placeholder="0912 345 678"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/50 focus:outline-none transition-colors tracking-wide"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Mệnh chủ (Ngũ Hành)
              </label>
              <div className="flex flex-wrap gap-2">
                {MENH_OPTIONS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMenh(m.value)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all min-h-[44px] min-w-[44px] border ${
                      menh === m.value
                        ? "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30"
                        : "bg-transparent text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--border-subtle)]"
                    }`}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full mr-1.5 align-middle"
                      style={{ backgroundColor: m.color }}
                    />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--danger)]">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {error}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={calc}
                disabled={loading || !phone.replace(/\s/g, "")}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              >
                {loading ? (
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {loading ? "Đang phân tích..." : "Phân tích"}
              </button>
              {score && (
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[48px] min-w-[48px]"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Kết quả */}
        {score && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Tổng điểm + Circular Progress */}
            <GlassCard className="text-center">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-4">
                Tổng điểm hợp mệnh
              </p>
              <div className="flex justify-center mb-4">
                <CircularProgress
                  value={score.total}
                  color={scoreColor}
                  duration={reduced ? 0 : 1500}
                />
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {score.conclusion}
              </p>
              {/* CTA nếu điểm <70 hoặc >90 */}
              {(score.total < 70 || score.total > 90) && (
                <button className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)]/10 px-4 py-2 text-xs font-medium text-[var(--accent)] border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 transition-colors">
                  <Zap className="h-3.5 w-3.5" />
                  Xem phân tích AI chi tiết
                  <ChevronRight className="h-3 w-3" />
                </button>
              )}
            </GlassCard>

            {/* Breakdown 5 tiêu chí */}
            <div className="space-y-3">
              {breakdownEntries.map(([key, b]) => {
                const pct = Math.round(b.score);
                const barColor =
                  pct >= 70
                    ? "bg-[var(--success)]"
                    : pct >= 40
                    ? "bg-[var(--warning)]"
                    : "bg-[var(--danger)]";
                return (
                  <GlassCard key={key} className="!p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {b.label}
                      </span>
                      <span className="text-xs font-bold text-[var(--text-muted)]">
                        {pct}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[var(--border-subtle)] overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${barColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{
                          duration: reduced ? 0 : 1.2,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                      {pct >= 70 ? (
                        <ShieldCheck className="h-3 w-3 text-[var(--success)]" />
                      ) : pct >= 40 ? (
                        <AlertTriangle className="h-3 w-3 text-[var(--warning)]" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-[var(--danger)]" />
                      )}
                      Trọng số: {Math.round(b.weight * 100)}%
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Dữ liệu kho Sim */}
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-cyan-400">Luận giải chi tiết từ kho dữ liệu</h3>
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
                  <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] font-bold text-cyan-400">{item.category}</span>
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
