/**
 * UNIT TEST CASES (input → expected output):
 * 1. "15/08/1995" → lifePath=1 (1+5+0+8+1+9+9+5=38→11→2... chờ, đúng: 15→6, 08→8, 1995→6, 6+8+6=20→2). Life path tính tổng tất cả digits rồi reduce.
 * 2. "11/11/1990" → lifePath=22 (master number, giữ nguyên)
 * 3. "29/02/2001" → invalid (2001 không nhuận) → error inline
 * 4. "01/01/2000" → birthChart {1:2, 2:1, 0 không đếm, còn lại 0}
 * 5. "31/12/1999" → personalYear = reduce(3+1+1+2+2026) = reduce(2033) = 2+0+3+3 = 8
 */

"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, Sparkles, RotateCcw, AlertCircle } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import HeroBackground from "../../components/HeroBackground";
import {
  NUMEROLOGY_KB,
  reduceToSingle,
  calcLifePath,
  calcPersonalYear,
  calcBirthChart,
  validateDate,
} from "../../data/numerology";

/* ========== SVG RADAR CHART: 9 ĐỈNH TẦN SUẤT CHỮ SỐ ========== */
function BirthChartRadar({
  frequencies,
  animating,
}: {
  frequencies: Record<number, number>;
  animating: boolean;
}) {
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const maxFreq = Math.max(...Object.values(frequencies), 1);
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 90;
  const sides = 9;

  const pt = (i: number, val: number) => {
    const a = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const r = (val / maxFreq) * radius;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const vals = labels.map((_, i) => frequencies[i + 1] || 0);
  const points = vals.map((v, i) => pt(i, v));
  const poly = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="drop-shadow-lg">
        {/* Lưới 3 vòng */}
        {[1, 2, 3].map((lv) => (
          <polygon
            key={lv}
            points={Array.from({ length: sides }, (_, i) => {
              const a = (Math.PI * 2 * i) / sides - Math.PI / 2;
              const r = (radius * lv) / 3;
              return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
            }).join(" ")}
            fill="none"
            stroke="rgba(201,168,76,0.10)"
            strokeWidth={1}
          />
        ))}
        {/* Trục */}
        {Array.from({ length: sides }, (_, i) => {
          const a = (Math.PI * 2 * i) / sides - Math.PI / 2;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + radius * Math.cos(a)}
              y2={cy + radius * Math.sin(a)}
              stroke="rgba(201,168,76,0.10)"
              strokeWidth={1}
            />
          );
        })}
        {/* Nhãn */}
        {labels.map((l, i) => {
          const a = (Math.PI * 2 * i) / sides - Math.PI / 2;
          return (
            <text
              key={`lbl-${i}`}
              x={cx + (radius + 18) * Math.cos(a)}
              y={cy + (radius + 18) * Math.sin(a)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text-muted)"
              fontSize={10}
              fontWeight={600}
            >
              {l}
            </text>
          );
        })}
        {/* Polygon dữ liệu + animate stroke */}
        <polygon
          points={poly}
          fill="rgba(201,168,76,0.15)"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeLinejoin="round"
          style={
            animating
              ? {
                  strokeDasharray: 9999,
                  strokeDashoffset: 0,
                  transition: "stroke-dashoffset 1.2s ease-out",
                }
              : undefined
          }
        />
        {points.map((p, i) => (
          <circle key={`d-${i}`} cx={p.x} cy={p.y} r={4} fill="var(--accent)" />
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {labels.map((l, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-md bg-[var(--accent)]/5 px-2 py-1 text-xs text-[var(--text-muted)] border border-[var(--border)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {l}:{frequencies[i + 1] || 0}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function NumerologyPage() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    lifePath: number;
    personalYear: number;
    birthChart: Record<number, number>;
  } | null>(null);
  const [animating, setAnimating] = useState(false);
  const reduced = useReducedMotion();

  /* Auto-format dd/mm/yyyy khi gõ, xóa error khi user sửa */
  const onBirth = useCallback(
    (raw: string) => {
      let v = raw.replace(/\D/g, "");
      if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
      if (v.length >= 5) v = v.slice(0, 5) + "/" + v.slice(5);
      setBirth(v.slice(0, 10));
      if (error) setError(null);
    },
    [error]
  );

  const calculate = () => {
    setError(null);
    const v = validateDate(birth);
    if (!v.ok) {
      setError(v.error || "Ngày không hợp lệ");
      return;
    }
    setLoading(true);
    // Giả lập xử lý để có loading state đẹp
    setTimeout(() => {
      const lifePath = calcLifePath(birth);
      const personalYear = calcPersonalYear(birth);
      const chart = calcBirthChart(birth);
      setResult({ lifePath, personalYear, birthChart: chart });
      setLoading(false);
      if (!reduced) {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 1300);
      }
    }, 350);
  };

  const reset = () => {
    setName("");
    setBirth("");
    setResult(null);
    setError(null);
    setAnimating(false);
  };

  const lp = result ? NUMEROLOGY_KB.lifePath[result.lifePath] : null;
  const py = result ? NUMEROLOGY_KB.personalYear[result.personalYear] : null;
  const dom = result
    ? Object.entries(result.birthChart).sort((a, b) => b[1] - a[1])[0]
    : null;
  const bc = dom ? NUMEROLOGY_KB.birthChart[Number(dom[0])] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with background image */}
        <HeroBackground
          image="https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?auto=format&fit=crop&w=1200&q=80"
          className="rounded-2xl border border-[var(--border)] mb-10"
        >
          <div className="text-center px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-1.5 text-xs font-medium text-purple-300 mb-4">
              <BrainCircuit className="h-3.5 w-3.5" />
              <span>Thần Số Học Pythagoras</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Giải mã <span className="text-gradient">con số vận mệnh</span>
            </h1>
            <p className="mt-2 text-[var(--text-muted)] max-w-lg mx-auto">
              Nhập họ tên và ngày sinh để khám phá đường đời, biểu đồ ngày sinh và
              năm cá nhân.
            </p>
          </div>
        </HeroBackground>

        {/* Form */}
        <GlassCard className="max-w-xl mx-auto mb-10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Ngày sinh (dd/mm/yyyy)
              </label>
              <input
                type="text"
                value={birth}
                onChange={(e) => onBirth(e.target.value)}
                placeholder="15/08/1995"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/50 focus:outline-none transition-colors"
              />
              {error && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--danger)]">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {error}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={calculate}
                disabled={loading || !birth}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {loading ? (
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {loading ? "Đang tính..." : "Giải mã"}
              </button>
              {result && (
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[44px] min-w-[44px]"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Kết quả */}
        {result && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* 3 Card chính */}
            <div className="grid gap-5 sm:grid-cols-3">
              <GlassCard glow>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">
                  Con số chủ đạo
                </p>
                <p className="text-4xl font-bold text-[var(--accent)] mt-1">
                  {result.lifePath}
                </p>
                <p className="text-sm font-semibold text-[var(--text-primary)] mt-2">
                  {lp?.title}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {lp?.desc}
                </p>
              </GlassCard>

              <GlassCard>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">
                  Số xuất hiện nhiều nhất
                </p>
                <p className="text-4xl font-bold text-[var(--accent)] mt-1">
                  {dom ? dom[0] : "—"}
                </p>
                <p className="text-sm font-semibold text-[var(--text-primary)] mt-2">
                  {bc?.label}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {bc?.desc}
                </p>
              </GlassCard>

              <GlassCard>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">
                  Năm cá nhân {new Date().getFullYear()}
                </p>
                <p className="text-4xl font-bold text-[var(--accent)] mt-1">
                  {result.personalYear}
                </p>
                <p className="text-sm font-semibold text-[var(--text-primary)] mt-2">
                  {py?.title}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {py?.desc}
                </p>
              </GlassCard>
            </div>

            {/* Radar Chart */}
            <GlassCard>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4 text-center">
                Biểu đồ tần suất chữ số ngày sinh
              </h3>
              <BirthChartRadar
                frequencies={result.birthChart}
                animating={animating}
              />
            </GlassCard>

            {/* Lời khuyên năm cá nhân */}
            {py && (
              <GlassCard className="!border-[var(--accent)]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    Lời khuyên năm {result.personalYear}
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {py.advice}
                </p>
              </GlassCard>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
