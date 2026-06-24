"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Shuffle, Sparkles, RotateCcw, Flame, Wind, Flower2 } from "lucide-react";
import GlassCard from "./GlassCard";
import { QUE_KINH_DICH, QUE_XIN_XAM, QUE_MAI_HOA, randomPick } from "../data/que";

type QueType = "kinh-dich" | "xin-xam" | "mai-hoa";

export default function QueTool({ initialTab = "kinh-dich", showTabs = true }: { initialTab?: QueType; showTabs?: boolean }) {
  const [tab, setTab] = useState<QueType>(initialTab);
  const [result, setResult] = useState<any>(null);
  const [animating, setAnimating] = useState(false);
  const reduced = useReducedMotion();

  const draw = useCallback(() => {
    setAnimating(true);
    setResult(null);
    setTimeout(() => {
      if (tab === "kinh-dich") setResult(randomPick(QUE_KINH_DICH));
      else if (tab === "xin-xam") setResult(randomPick(QUE_XIN_XAM));
      else setResult(randomPick(QUE_MAI_HOA));
      setAnimating(false);
    }, 1200);
  }, [tab]);

  const reset = () => { setResult(null); setAnimating(false); };

  const fortuneColor = (f: string) => {
    if (f.includes("đại cát") || f.includes("thượng")) return "var(--success)";
    if (f.includes("cát")) return "var(--accent)";
    if (f.includes("hung") || f.includes("hạ")) return "var(--danger)";
    return "var(--warning)";
  };

  return (
    <div>
      {showTabs && (
        <div className="flex rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-1 mb-8">
          {[
            { key: "kinh-dich" as QueType, label: "Kinh Dịch", icon: Flame },
            { key: "xin-xam" as QueType, label: "Xin Xăm", icon: Wind },
            { key: "mai-hoa" as QueType, label: "Mai Hoa", icon: Flower2 },
          ].map((t) => {
            const active = tab === t.key;
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); reset(); }}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all min-h-[44px] ${
                  active ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      )}

      {!result && !animating && (
        <div className="text-center mb-8">
          <button
            onClick={draw}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-violet-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:brightness-110 transition-all min-h-[52px]"
          >
            <Shuffle className="h-5 w-5" />
            Gieo quẻ {tab === "kinh-dich" ? "Kinh Dịch" : tab === "xin-xam" ? "Xin Xăm" : "Mai Hoa"}
          </button>
        </div>
      )}

      {animating && (
        <div className="text-center py-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--accent)]/20"
          >
            <Sparkles className="h-8 w-8 text-[var(--accent)]" />
          </motion.div>
          <p className="text-sm text-[var(--text-muted)]">Đang gieo quẻ...</p>
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div initial={reduced ? {} : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard glow className="relative overflow-hidden">
              <div
                className="absolute right-4 top-4 rounded-lg px-3 py-1 text-xs font-bold"
                style={{
                  background: `${fortuneColor(result.fortune || "trung")}20`,
                  color: fortuneColor(result.fortune || "trung"),
                  border: `1px solid ${fortuneColor(result.fortune || "trung")}40`,
                }}
              >
                {result.fortune || "Quẻ"}
              </div>

              {tab === "kinh-dich" && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">{result.name}</h2>
                  <p className="text-sm text-[var(--text-muted)] italic mb-4">{result.desc}</p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />Ý nghĩa
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{result.meaning}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                        <Flame className="h-3.5 w-3.5 text-[var(--warning)]" />Lời khuyên
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{result.advice}</p>
                    </div>
                  </div>
                </div>
              )}

              {tab === "xin-xam" && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-1">Xăm số {result.id}</h2>
                  <p className="text-sm font-bold mb-3" style={{ color: fortuneColor(result.fortune) }}>{result.title}</p>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-4 mb-4">
                    <p className="text-sm text-[var(--text-secondary)] leading-loose whitespace-pre-line italic">{result.poem}</p>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{result.meaning}</p>
                </div>
              )}

              {tab === "mai-hoa" && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">Quẻ Mai Hoa</h2>
                  <div className="flex justify-center gap-3 mb-4">
                    {result.numbers.map((n: number, i: number) => (
                      <div key={i} className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-lg font-bold text-[var(--accent)]">
                        {n}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{result.meaning}</p>
                  <div className="rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/20 px-4 py-3">
                    <p className="text-sm text-[var(--accent)] font-medium">{result.advice}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[44px]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Gieo lại
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
