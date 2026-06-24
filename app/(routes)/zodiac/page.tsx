"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Compass, Heart, Briefcase, Zap, Shield, AlertTriangle, Sparkles, X } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import HeroBackground from "../../components/HeroBackground";
import { ZODIAC_DATA, getCompatibility } from "../../data/zodiac";

const SIGNS = Object.entries(ZODIAC_DATA).map(([slug, s]) => ({ slug, ...s }));

const elementColor: Record<string, string> = {
  Lửa: "#fb923c",
  Đất: "#a8a29e",
  Khí: "#38bdf8",
  Nước: "#818cf8",
};

export default function ZodiacPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [compatA, setCompatA] = useState<string>("bach-duong");
  const [compatB, setCompatB] = useState<string>("kim-nguu");
  const reduced = useReducedMotion();

  const open = useCallback((slug: string) => setSelected(slug), []);
  const close = useCallback(() => setSelected(null), []);

  const detail = selected ? ZODIAC_DATA[selected] : null;
  const compat = getCompatibility(compatA, compatB);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={reduced ? {} : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <HeroBackground
          image="https://images.unsplash.com/photo-1532968967842-326318c7f83a?auto=format&fit=crop&w=1200&q=80"
          className="rounded-2xl border border-[var(--border)] mb-10"
        >
          <div className="text-center px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-xs font-medium text-sky-300 mb-4">
              <Compass className="h-3.5 w-3.5" />
              <span>Cung Hoàng Đạo</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Horoscope <span className="text-gradient">phương Tây</span>
            </h1>
          <p className="mt-2 text-[var(--text-muted)] max-w-lg mx-auto">
            Chọn cung của bạn để xem tính cách, dự báo hàng ngày và độ tương hợp.
          </p>
          </div>
        </HeroBackground>

        {/* Grid 12 cung */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SIGNS.map((sign, i) => (
            <motion.div
              key={sign.slug}
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <GlassCard
                className="cursor-pointer h-full"
                onClick={() => open(sign.slug)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                    style={{ background: `${elementColor[sign.element]}15` }}
                  >
                    {sign.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold text-[var(--text-primary)] truncate">
                      {sign.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">{sign.date}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {sign.traits.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-[var(--accent)]/8 px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)] border border-[var(--border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: elementColor[sign.element] }}
                  />
                  {sign.element} — {sign.ruler}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Compatibility */}
        <div className="mt-10">
          <GlassCard>
            <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-400" />
              Xem độ tương hợp
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <select
                value={compatA}
                onChange={(e) => setCompatA(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
              >
                {SIGNS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
              <span className="text-[var(--text-muted)] text-sm">+</span>
              <select
                value={compatB}
                onChange={(e) => setCompatB(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
              >
                {SIGNS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-16 w-16">
                <svg className="-rotate-90" width={64} height={64}>
                  <circle cx={32} cy={32} r={26} stroke="var(--border)" strokeWidth={6} fill="none" />
                  <circle
                    cx={32}
                    cy={32}
                    r={26}
                    stroke={compat.score >= 70 ? "var(--success)" : compat.score >= 40 ? "var(--warning)" : "var(--danger)"}
                    strokeWidth={6}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - compat.score / 100)}
                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[var(--text-primary)]">
                  {compat.score}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{compat.text}</p>
            </div>
          </GlassCard>
        </div>
      </motion.div>

      {/* Detail overlay */}
      <AnimatePresence>
        {detail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24"
            onClick={close}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={reduced ? {} : { y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? {} : { y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl glass border border-[var(--border)] p-6"
            >
              <button
                onClick={close}
                className="absolute right-4 top-4 rounded-lg p-1 text-[var(--text-muted)] hover:bg-[var(--border-subtle)]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                  style={{ background: `${elementColor[detail.element]}20` }}
                >
                  {detail.icon}
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                    {detail.name}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    {detail.nameEN} · {detail.date}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: elementColor[detail.element] }}
                    />
                    {detail.element} — cai quản bởi {detail.ruler}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Section icon={<Zap className="h-4 w-4 text-[var(--accent)]" />} title="Tính cách">
                  <div className="flex flex-wrap gap-1.5">
                    {detail.traits.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </Section>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Section icon={<Shield className="h-4 w-4 text-[var(--success)]" />} title="Điểm mạnh">
                    <ul className="space-y-1">
                      {detail.strengths.map((s) => (
                        <li key={s} className="text-sm text-[var(--text-secondary)] flex items-start gap-1.5">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--success)] shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Section>
                  <Section icon={<AlertTriangle className="h-4 w-4 text-[var(--warning)]" />} title="Điểm yếu">
                    <ul className="space-y-1">
                      {detail.weaknesses.map((w) => (
                        <li key={w} className="text-sm text-[var(--text-secondary)] flex items-start gap-1.5">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--warning)] shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </Section>
                </div>

                <Section icon={<Heart className="h-4 w-4 text-rose-400" />} title="Tình yêu">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail.love}</p>
                </Section>

                <Section icon={<Briefcase className="h-4 w-4 text-sky-400" />} title="Sự nghiệp">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail.career}</p>
                </Section>

                <Section icon={<Sparkles className="h-4 w-4 text-[var(--accent)]" />} title="Dự báo hôm nay">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">{detail.daily}</p>
                </Section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)] mb-2">
        {icon}
        {title}
      </h4>
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-[var(--accent)]/8 px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] border border-[var(--border)]">
      {children}
    </span>
  );
}
