"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Compass, Ruler, Home, ArrowRight, Star, AlertTriangle, Flame, Bed, Monitor } from "lucide-react";
import GlassCard from "./GlassCard";
import { loBanAnalyze, getHuongNha, getHuongBanTho, getHuongBep, getHuongGiuong, getHuongBanLamViec } from "../data/phong-thuy";

const TABS = [
  { key: "lo-ban", label: "Thước lỗ ban", icon: Ruler },
  { key: "huong-nha", label: "Hướng nhà", icon: Home },
  { key: "ban-tho", label: "Bàn thờ", icon: Star },
  { key: "bep", label: "Bếp", icon: Flame },
  { key: "giuong", label: "Giường", icon: Bed },
  { key: "ban-lam-viec", label: "Bàn làm việc", icon: Monitor },
];

export default function PhongThuyTool({ initialTab = "lo-ban", showTabs = true }: { initialTab?: string; showTabs?: boolean }) {
  const [tab, setTab] = useState(initialTab);
  const [cm, setCm] = useState(100);
  const [tuoi, setTuoi] = useState(1995);
  const [result, setResult] = useState<any>(null);
  const reduced = useReducedMotion();

  const submit = () => {
    if (tab === "lo-ban") setResult(loBanAnalyze(cm));
    else if (tab === "huong-nha") setResult(getHuongNha(tuoi));
    else if (tab === "ban-tho") setResult(getHuongBanTho(tuoi));
    else if (tab === "bep") setResult(getHuongBep(tuoi));
    else if (tab === "giuong") setResult(getHuongGiuong(tuoi));
    else if (tab === "ban-lam-viec") setResult(getHuongBanLamViec(tuoi));
  };

  const reset = () => setResult(null);

  return (
    <motion.div initial={reduced ? {} : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {showTabs && (
        <div className="flex flex-wrap rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-1 mb-8">
          {TABS.map((t) => {
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

      {!result && (
        <GlassCard>
          {tab === "lo-ban" ? (
            <div className="max-w-sm mx-auto">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Nhập kích thước (cm)</label>
              <input
                type="number"
                value={cm}
                onChange={(e) => setCm(Number(e.target.value))}
                min={1}
                max={10000}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
              />
              <p className="mt-2 text-xs text-[var(--text-muted)]">Ví dụ: chiều rộng cửa, bàn thờ, bàn ăn...</p>
            </div>
          ) : (
            <div className="max-w-sm mx-auto">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Năm sinh (âm lịch)</label>
              <select
                value={tuoi}
                onChange={(e) => setTuoi(Number(e.target.value))}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
              >
                {Array.from({ length: 2026 - 1924 + 1 }, (_, i) => 1924 + i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          )}
          <div className="mt-6 flex justify-center">
            <button
              onClick={submit}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all min-h-[48px]"
            >
              <ArrowRight className="h-4 w-4" />
              Xem kết quả
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
            {tab === "lo-ban" && result && (
              <GlassCard glow className="text-center py-8">
                <div className="text-sm text-[var(--text-muted)] mb-2">{cm} cm</div>
                <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">{result.range.name}</h2>
                <div
                  className="inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-bold border"
                  style={{
                    background: result.range.type === "cát" ? "var(--success)15" : "var(--danger)15",
                    color: result.range.type === "cát" ? "var(--success)" : "var(--danger)",
                    borderColor: result.range.type === "cát" ? "var(--success)30" : "var(--danger)30",
                  }}
                >
                  {result.range.type === "cát" ? <Star className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  {result.range.type === "cát" ? "Cát" : "Hung"}
                </div>
                <p className="mt-4 text-sm text-[var(--text-muted)]">Chu kỳ thứ {result.cycleCount + 1} / {result.range.name}</p>
              </GlassCard>
            )}

            {(tab === "huong-nha" || tab === "ban-tho" || tab === "bep" || tab === "giuong" || tab === "ban-lam-viec") && Array.isArray(result) && (
              <div className="space-y-4">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3 text-center">
                  <div className="text-xs text-[var(--text-muted)] mb-1">Năm sinh (âm lịch)</div>
                  <div className="text-sm font-bold text-[var(--accent)]">{tuoi}</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.map((h: any, i: number) => (
                    <div key={i} className="rounded-2xl border-l-2 glass" style={{ borderLeftColor: h.type === "cát" ? "var(--success)" : "var(--danger)", padding: "1.25rem" }}>
                      <div className="flex items-center gap-2 mb-2">
                        {h.type === "cát" ? <Star className="h-4 w-4 text-[var(--success)]" /> : <AlertTriangle className="h-4 w-4 text-[var(--danger)]" />}
                        <span className="font-display text-base font-bold text-[var(--text-primary)]">{h.huong}</span>
                        <span
                          className="ml-auto rounded px-2 py-0.5 text-[10px] font-bold"
                          style={{
                            background: h.type === "cát" ? "var(--success)15" : "var(--danger)15",
                            color: h.type === "cát" ? "var(--success)" : "var(--danger)",
                          }}
                        >
                          {h.type === "cát" ? "Cát" : "Hung"}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[44px]"
              >
                Xem lại
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
