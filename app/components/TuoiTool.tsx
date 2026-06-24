"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { User, Heart, Baby, Cake, Handshake, Briefcase, Home, HeartCrack, CheckCircle2 } from "lucide-react";
import GlassCard from "./GlassCard";
import { getCanChi, matchTuoi, checkTuoiLamNha, luanTuoi } from "../data/tuoi";

export const TUOI_TABS = [
  { key: "vo-chong", label: "Vợ chồng", icon: Heart },
  { key: "ket-hon", label: "Kết hôn", icon: Cake },
  { key: "hop-nhau", label: "Hợp nhau", icon: Handshake },
  { key: "sinh-con", label: "Sinh con", icon: Baby },
  { key: "lam-an", label: "Làm ăn", icon: Briefcase },
  { key: "lam-nha", label: "Làm nhà", icon: Home },
  { key: "xong-dat", label: "Xông đất", icon: User },
];

function YearInput({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
      >
        {Array.from({ length: 2026 - 1924 + 1 }, (_, i) => 1924 + i).map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

export default function TuoiTool({ initialTab = "vo-chong", showTabs = true }: { initialTab?: string; showTabs?: boolean }) {
  const [tab, setTab] = useState<string>(initialTab);
  const [yearA, setYearA] = useState(1995);
  const [yearB, setYearB] = useState(1996);
  const [yearXay, setYearXay] = useState(2026);
  const [result, setResult] = useState<any>(null);
  const reduced = useReducedMotion();

  const ca = getCanChi(yearA);
  const cb = getCanChi(yearB);
  const match = ca && cb ? matchTuoi(yearA, yearB) : null;

  const submit = useCallback(() => {
    if (tab === "lam-nha") setResult(checkTuoiLamNha(yearA, yearXay));
    else if (match) setResult(match);
  }, [tab, yearA, yearXay, match]);

  const reset = () => setResult(null);

  const needs2Years = tab !== "lam-nha";
  const needsYearXay = tab === "lam-nha";

  return (
    <motion.div initial={reduced ? {} : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {showTabs && (
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-1 min-w-max">
            {TUOI_TABS.map((t) => {
              const active = tab === t.key;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => { setTab(t.key); reset(); }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all whitespace-nowrap min-h-[44px] ${
                    active ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!result && (
        <GlassCard>
          <div className="grid gap-4 sm:grid-cols-2">
            <YearInput value={yearA} onChange={setYearA} label="Năm sinh (người thứ nhất / chủ nhà)" />
            {needs2Years && <YearInput value={yearB} onChange={setYearB} label="Năm sinh (người thứ hai)" />}
            {needsYearXay && <YearInput value={yearXay} onChange={setYearXay} label="Năm xây / sửa nhà" />}
          </div>
          {ca && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-[var(--border-subtle)] px-2.5 py-1 text-xs text-[var(--text-muted)]">
                {ca.can} {ca.chi} — {ca.element} — {ca.yinYang}
              </span>
              {cb && needs2Years && (
                <span className="rounded-md bg-[var(--border-subtle)] px-2.5 py-1 text-xs text-[var(--text-muted)]">
                  {cb.can} {cb.chi} — {cb.element} — {cb.yinYang}
                </span>
              )}
            </div>
          )}
          <div className="mt-6 flex justify-center">
            <button
              onClick={submit}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-rose-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 hover:brightness-110 transition-all min-h-[48px]"
            >
              <Heart className="h-4 w-4" />
              Xem kết quả
            </button>
          </div>
        </GlassCard>
      )}

      <AnimatePresence>
        {result && (
          <motion.div initial={reduced ? {} : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard glow>
              {needs2Years && typeof result.score === "number" && (
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative h-20 w-20 shrink-0">
                    <svg className="-rotate-90" width={80} height={80}>
                      <circle cx={40} cy={40} r={32} stroke="var(--border)" strokeWidth={6} fill="none" />
                      <circle
                        cx={40} cy={40} r={32}
                        stroke={result.score >= 70 ? "var(--success)" : result.score >= 40 ? "var(--accent)" : "var(--danger)"}
                        strokeWidth={6} fill="none" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={2 * Math.PI * 32 * (1 - result.score / 100)}
                        style={{ transition: "stroke-dashoffset 1s ease-out" }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[var(--text-primary)]">
                      {result.score}
                    </span>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">{result.label}</div>
                    <div className="text-sm text-[var(--text-muted)]">{result.relation}</div>
                  </div>
                </div>
              )}

              {tab === "lam-nha" && (
                <div className="flex items-start gap-3 mb-4">
                  {result.ok ? (
                    <CheckCircle2 className="h-6 w-6 text-[var(--success)] shrink-0 mt-0.5" />
                  ) : (
                    <HeartCrack className="h-6 w-6 text-[var(--danger)] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {result.ok ? "Rất tốt" : "Cần xem xét"}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{result.msg}</p>
                  </div>
                </div>
              )}

              {needs2Years && result.desc && (
                <div className="rounded-lg bg-[var(--border-subtle)]/50 p-4">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{result.desc}</p>
                </div>
              )}

              {needs2Years && match && (
                <div className="mt-3 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-4">
                  <div className="text-xs font-bold text-[var(--accent)] mb-1">Luận giải</div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{luanTuoi(tab, yearA, yearB, match)}</p>
                </div>
              )}

              {needs2Years && result.elementA && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="rounded-md bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-medium text-[var(--accent)] border border-[var(--accent)]/20">{result.elementA}</span>
                  <span className="text-[var(--text-muted)]">vs</span>
                  <span className="rounded-md bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-medium text-[var(--accent)] border border-[var(--accent)]/20">{result.elementB}</span>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[44px]"
                >
                  Xem lại
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
