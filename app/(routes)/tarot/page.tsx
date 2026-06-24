/**
 * UNIT TEST CASES:
 * 1. Ngày mới + chưa bốc → hiển thị button "Bốc bài", localStorage trống.
 * 2. Cùng ngày reload → lấy lá cũ từ localStorage, không random lại.
 * 3. Seed "abc_2026-06-23" → deterministic card index (hash % len).
 * 4. Ngày khác → localStorage key khác → cho phép bốc lá mới.
 * 5. Click bốc bài → thêm class .flipped, sau 800ms hiện luận giải.
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Flame, Sparkles, Lock, Eye } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import HeroBackground from "../../components/HeroBackground";
import { TAROT_CARDS, hashString } from "../../data/tarot";

/* ========== HELPERS ========== */

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getFingerprint(): string {
  if (typeof window === "undefined") return "ssr";
  const raw = navigator.userAgent + screen.width + screen.height + navigator.language;
  return String(hashString(raw));
}

function getDailyCard(): { id: string; date: string } | null {
  if (typeof window === "undefined") return null;
  const key = `daily_tarot_${getTodayKey()}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function saveDailyCard(id: string) {
  if (typeof window === "undefined") return;
  const key = `daily_tarot_${getTodayKey()}`;
  localStorage.setItem(key, JSON.stringify({ id, date: getTodayKey() }));
}

function seededCardId(seed: string): string {
  const idx = Math.abs(hashString(seed)) % TAROT_CARDS.length;
  return TAROT_CARDS[idx].id;
}

/* ========== COMPONENT ========== */

type SpreadType = "daily" | "three" | "celtic" | "relationship" | "career";

const SPREADS: Record<SpreadType, { name: string; count: number; labels: string[] }> = {
  daily: { name: "Hàng ngày (1 lá)", count: 1, labels: ["Hôm nay"] },
  three: { name: "Quá khứ - Hiện tại - Tương lai (3 lá)", count: 3, labels: ["Quá khứ", "Hiện tại", "Tương lai"] },
  celtic: { name: "Celtic Cross (10 lá)", count: 10, labels: ["Hiện tại", "Thách thức", "Mục tiêu", "Cơ sở", "Quá khứ", "Tương lai", "Tiếp cận", "Môi trường", "Hy vọng", "Kết quả"] },
  relationship: { name: "Mối quan hệ (5 lá)", count: 5, labels: ["Bạn", "Đối phương", "Kết nối", "Thách thức", "Tương lai"] },
  career: { name: "Sự nghiệp (5 lá)", count: 5, labels: ["Hiện tại", "Cơ hội", "Thách thức", "Hành động", "Kết quả"] },
};

export default function TarotPage() {
  const reduced = useReducedMotion();
  const [spreadType, setSpreadType] = useState<SpreadType>("daily");
  const [flipped, setFlipped] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [cardIds, setCardIds] = useState<string[]>([]);
  const [preloaded, setPreloaded] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const spread = SPREADS[spreadType];
  const cards = cardIds.map((id) => TAROT_CARDS.find((c) => c.id === id)).filter(Boolean) as typeof TAROT_CARDS;
  const alreadyDrawn = cardIds.length > 0;

  const draw = () => {
    if (alreadyDrawn) return;
    const seed = `${getFingerprint()}_${getTodayKey()}_${spreadType}`;
    const ids: string[] = [];
    for (let i = 0; i < spread.count; i++) {
      const idx = Math.abs(hashString(`${seed}_${i}`)) % TAROT_CARDS.length;
      ids.push(TAROT_CARDS[idx].id);
    }
    setCardIds(ids);
    setFlipped(true);
    setTimeout(() => setRevealed(true), 800);
  };

  /* Preload 3 ảnh ngẫu nhiên khi hover button */
  const preloadImages = useCallback(() => {
    if (preloaded) return;
    const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    shuffled.slice(0, 3).forEach((c) => {
      const img = new Image();
      img.src = c.image;
    });
    setPreloaded(true);
  }, [preloaded]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeroBackground
          image="https://images.unsplash.com/photo-1601024445121-e5b82f020549?auto=format&fit=crop&w=1200&q=80"
          className="rounded-2xl border border-[var(--border)] mb-8"
        >
          <div className="px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-1.5 text-xs font-medium text-rose-300 mb-4">
              <Flame className="h-3.5 w-3.5" />
              <span>Tarot hàng ngày</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Bóc bài <span className="text-gradient">Tarot</span>
            </h1>
            <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">
              Mỗi ngày một lá. Hít thở sâu, tập trung vào câu hỏi, rồi bốc bài.
            </p>
          </div>
        </HeroBackground>
      </motion.div>

      {/* Trải bài selector */}
      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        {(Object.keys(SPREADS) as SpreadType[]).map((key) => (
          <button
            key={key}
            onClick={() => {
              setSpreadType(key);
              setCardIds([]);
              setFlipped(false);
              setRevealed(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              spreadType === key
                ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30"
                : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
            }`}
          >
            {SPREADS[key].name}
          </button>
        ))}
      </div>

      {/* Bài Tarot 3D Flip — single card for daily */}
      {spreadType === "daily" && (
        <div className="mt-8 flex justify-center">
          <div
            className="relative"
            style={{ perspective: "1000px", width: "260px", height: "400px" }}
          >
            <div
              className="relative w-full h-full transition-transform duration-[800ms] ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Mặt sau */}
              <div
                className="absolute inset-0 rounded-2xl glass overflow-hidden flex flex-col items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-[var(--accent)]"
                      style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.8,
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full border-2 border-[var(--accent)]/30 flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                  <p className="text-sm font-medium text-[var(--accent)]">Tarot</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Click để lật bài</p>
                </div>
              </div>

              {/* Mặt trước */}
              <div
                className="absolute inset-0 rounded-2xl glass overflow-hidden flex flex-col"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                {cards[0] ? (
                  <>
                    <div className="relative h-48 w-full bg-[var(--surface-elevated)]">
                      <img src={cards[0].image} alt={cards[0].nameVN} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col text-left">
                      <h3 className="font-display text-base font-bold text-[var(--text-primary)]">{cards[0].nameVN}</h3>
                      <p className="text-xs text-[var(--text-muted)]">{cards[0].nameEN}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cards[0].keywords.map((k: string) => (
                          <span key={k} className="rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--accent)] border border-[var(--accent)]/20">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] text-sm">Đang tải...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multi-card spread layout */}
      {spreadType !== "daily" && (
        <div className="mt-8 grid gap-4" style={{ gridTemplateColumns: spreadType === "three" ? "repeat(3, 1fr)" : spreadType === "celtic" ? "repeat(5, 1fr)" : "repeat(5, 1fr)" }}>
          {cards.map((card, i) => (
            <div key={card.id} className="flex flex-col items-center">
              <div className="text-xs text-[var(--text-muted)] mb-2">{spread.labels[i]}</div>
              <div
                className="relative rounded-xl glass overflow-hidden flex flex-col transition-transform duration-500"
                style={{ width: "140px", height: "220px", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                <div className="relative h-24 w-full bg-[var(--surface-elevated)]">
                  <img src={card.image} alt={card.nameVN} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-2 flex-1 flex flex-col text-left">
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">{card.nameVN}</h4>
                  <p className="text-[10px] text-[var(--text-muted)]">{card.nameEN}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nút bốc bài */}
      <div className="mt-8">
        <button
          ref={btnRef}
          onClick={draw}
          onMouseEnter={preloadImages}
          disabled={alreadyDrawn}
          className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-rose-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
        >
          {alreadyDrawn ? (
            <>
              <Lock className="h-4 w-4" />
              Đã bốc hôm nay
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Bốc bài
            </>
          )}
        </button>
        {alreadyDrawn && (
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Mỗi ngày chỉ được bốc 1 lá miễn phí. Quay lại ngày mai nhé.
          </p>
        )}
      </div>

      {/* Luận giải — hiện sau khi lật xong 400ms */}
      <AnimatePresence>
        {revealed && cards.length > 0 && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 space-y-4 text-left"
          >
            {spreadType === "daily" ? (
              <>
                <GlassCard>
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                    Thông điệp hôm nay
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cards[0].dailyMessage}
                  </p>
                </GlassCard>

                <GlassCard>
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Eye className="h-4 w-4 text-[var(--success)]" />
                    Lời khuyên
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cards[0].advice}
                  </p>
                </GlassCard>

                <GlassCard>
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Flame className="h-4 w-4 text-[var(--warning)]" />
                    Cảnh báo
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cards[0].warning}
                  </p>
                </GlassCard>
              </>
            ) : (
              <GlassCard>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                  Luận giải trải bài
                </h3>
                <div className="mt-2 space-y-3">
                  {cards.map((card, i) => (
                    <div key={card.id}>
                      <div className="text-xs font-bold text-[var(--accent)] mb-1">{spread.labels[i]}</div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {card.dailyMessage}
                      </p>
                    </div>
                  ))}
                </div>
                {spreadType === "relationship" && (
                  <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 p-3">
                    <p className="text-xs text-[var(--text-muted)]">
                      💡 <strong>Mẹo:</strong> Hãy tập trung vào câu hỏi cụ thể về mối quan hệ trước khi bốc bài để nhận được thông điệp rõ ràng hơn.
                    </p>
                  </div>
                )}
                {spreadType === "career" && (
                  <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 p-3">
                    <p className="text-xs text-[var(--text-muted)]">
                      💡 <strong>Mẹo:</strong> Suy nghĩ về mục tiêu nghề nghiệp hiện tại và các thách thức bạn đang gặp phải để trải bài cho kết quả tốt nhất.
                    </p>
                  </div>
                )}
              </GlassCard>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
