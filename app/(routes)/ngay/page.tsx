"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Star, AlertTriangle, CheckCircle2, Clock, CalendarDays, XCircle, Sparkles } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Breadcrumb from "../../components/Breadcrumb";
import HeroBackground from "../../components/HeroBackground";
import { analyzeNgay, type NgayResult } from "../../data/ngay";

export default function NgayPage() {
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split("T")[0];
  });
  const [result, setResult] = useState<NgayResult | null>(null);
  const reduced = useReducedMotion();

  const submit = () => {
    const d = new Date(date + "T00:00:00");
    setResult(analyzeNgay(d));
  };

  const reset = () => setResult(null);

  const verdictColor: Record<string, string> = {
    "tốt": "var(--success)",
    "xấu": "var(--danger)",
    "bình thường": "var(--warning)",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />

      <motion.div initial={reduced ? {} : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <HeroBackground
          image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
          className="rounded-2xl border border-[var(--border)] mb-8"
        >
          <div className="text-center px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-300 mb-4">
              <Sun className="h-3.5 w-3.5" />
              <span>Xem ngày</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Ngày <span className="text-gradient">tốt xấu</span>
            </h1>
            <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">
              Chọn ngày để xem Can Chi, sao tốt/xấu, giờ hoàng đạo và việc nên làm.
            </p>
          </div>
        </HeroBackground>

        {!result && (
          <GlassCard>
            <div className="max-w-sm mx-auto">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Chọn ngày</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={submit}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-amber-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all min-h-[48px]"
              >
                <CalendarDays className="h-4 w-4" />
                Xem ngày
              </button>
            </div>
          </GlassCard>
        )}

        <AnimatePresence>
          {result && (
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Header */}
              <GlassCard className="text-center py-6">
                <div className="text-sm text-[var(--text-muted)] mb-1">{date}</div>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  {result.canChi}
                </h2>
                <div
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-bold border"
                  style={{
                    background: `${verdictColor[result.verdict]}15`,
                    color: verdictColor[result.verdict],
                    borderColor: `${verdictColor[result.verdict]}30`,
                  }}
                >
                  {result.verdict === "tốt" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : result.verdict === "xấu" ? (
                    <XCircle className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  Ngày {result.verdict}
                </div>
              </GlassCard>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Sao tốt */}
                <GlassCard>
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-[var(--success)] mb-3">
                    <Star className="h-4 w-4" />
                    Sao tốt ({result.saoTot.length})
                  </h3>
                  {result.saoTot.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.saoTot.map((s) => (
                        <span key={s} className="rounded-md bg-[var(--success)]/10 px-2.5 py-1 text-xs font-medium text-[var(--success)] border border-[var(--success)]/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--text-muted)]">Không có sao tốt nổi bật</p>
                  )}
                </GlassCard>

                {/* Sao xấu */}
                <GlassCard>
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-[var(--danger)] mb-3">
                    <AlertTriangle className="h-4 w-4" />
                    Sao xấu ({result.saoXau.length})
                  </h3>
                  {result.saoXau.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.saoXau.map((s) => (
                        <span key={s} className="rounded-md bg-[var(--danger)]/10 px-2.5 py-1 text-xs font-medium text-[var(--danger)] border border-[var(--danger)]/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--text-muted)]">Không có sao xấu</p>
                  )}
                </GlassCard>

                {/* Giờ hoàng đạo */}
                <GlassCard>
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] mb-3">
                    <Clock className="h-4 w-4" />
                    Giờ hoàng đạo
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.gioHoangDao.map((g) => (
                      <span key={g} className="rounded-md bg-[var(--accent)]/8 px-2.5 py-1 text-xs font-medium text-[var(--accent)] border border-[var(--accent)]/20">
                        {g}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                {/* Kiêng kỵ / Nên làm */}
                <GlassCard>
                  <div className="mb-3">
                    <h3 className="flex items-center gap-1.5 text-sm font-semibold text-[var(--danger)] mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      Kiêng kỵ ({result.kiengKy.length})
                    </h3>
                    <ul className="space-y-1">
                      {result.kiengKy.map((v, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <XCircle className="h-3 w-3 text-[var(--danger)] shrink-0" />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-[var(--border)]">
                    <h3 className="flex items-center gap-1.5 text-sm font-semibold text-[var(--success)] mb-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Nên làm ({result.nenLam.length})
                    </h3>
                    <ul className="space-y-1">
                      {result.nenLam.map((v, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <CheckCircle2 className="h-3 w-3 text-[var(--success)] shrink-0" />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[44px]"
                >
                  Xem ngày khác
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
