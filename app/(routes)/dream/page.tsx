/**
 * UNIT TEST CASES:
 * 1. "" (empty) → hiển thị toàn bộ 10 giấc mơ (default list)
 * 2. "rắn" → match title "Mơ thấy rắn" + keywords ["rắn", "bò sát"]
 * 3. "rắn cắn" → fuzzy match cả 2 từ "rắn" và "cắn" trong keywords
 * 4. "không có" → empty state hiển thị + link AI Chat
 * 5. Debounce: gõ "nước" nhanh 3 lần → chỉ search 1 lần sau 300ms
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Moon, Search, Sparkles, MessageCircle, ChevronDown } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import HeroBackground from "../../components/HeroBackground";
import { DREAM_KB, fuzzySearchDreams } from "../../data/dreams";

/* ========== HIGHLIGHT MATCHED TEXT ========== */
function Highlight({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="bg-[var(--accent)]/20 text-[var(--accent)] rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function DreamPage() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduced = useReducedMotion();

  /* Debounce 300ms */
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(
    () => fuzzySearchDreams(debounced),
    [debounced]
  );

  const toggle = useCallback(
    (slug: string) => {
      setExpanded((prev) => (prev === slug ? null : slug));
    },
    []
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header with background image */}
        <HeroBackground
          image="https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=1200&q=80"
          className="rounded-2xl border border-[var(--border)] mb-10"
        >
          <div className="text-center px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-1.5 text-xs font-medium text-violet-300 mb-4">
              <Moon className="h-3.5 w-3.5" />
              <span>Giải Mã Giấc Mơ</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Ý nghĩa <span className="text-gradient">giấc mơ</span>
            </h1>
            <p className="mt-2 text-[var(--text-muted)] max-w-lg mx-auto">
              Tìm từ khóa giấc mơ, đọc luận giải tâm linh và con số may mắn liên quan.
            </p>
          </div>
        </HeroBackground>

        {/* Search */}
        <GlassCard className="max-w-lg mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập từ khóa (vd: rắn, bay, nước...)"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/50 focus:outline-none transition-colors"
            />
          </div>
          <p className="mt-2 text-xs text-[var(--text-muted)] text-center">
            {debounced ? `Tìm kiếm: "${debounced}"` : "Gõ từ khóa để tìm giấc mơ"}
          </p>
        </GlassCard>

        {/* Results */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {results.map((dream, idx) => {
              const isOpen = expanded === dream.slug;
              return (
                <motion.div
                  key={dream.slug}
                  layout={!reduced}
                  initial={reduced ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? {} : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  <GlassCard
                    className="cursor-pointer"
                    onClick={() => toggle(dream.slug)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-400/10 text-lg">
                        🌙
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                          <Highlight text={dream.title} query={debounced} />
                        </h3>
                        <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
                          <Highlight text={dream.summary} query={debounced} />
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {dream.keywords.slice(0, 4).map((k) => (
                            <span
                              key={k}
                              className="rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--accent)] border border-[var(--accent)]/20"
                            >
                              {k}
                            </span>
                          ))}
                        </div>

                        {/* Expand inline */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={reduced ? {} : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduced ? {} : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-3">
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                  {dream.detail}
                                </p>
                                <div className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)]/10 px-2.5 py-1 text-xs font-medium text-[var(--accent)] border border-[var(--accent)]/20">
                                  <Sparkles className="h-3 w-3" />
                                  Số may mắn: {dream.luckyNumbers.join(", ")}
                                </div>
                                {dream.relatedDreams.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5">
                                    <span className="text-xs text-[var(--text-muted)]">
                                      Liên quan:
                                    </span>
                                    {dream.relatedDreams.map((r) => (
                                      <span
                                        key={r}
                                        className="text-xs text-[var(--text-secondary)] underline decoration-dotted cursor-pointer hover:text-[var(--accent)]"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setQuery(r);
                                        }}
                                      >
                                        {r}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty state */}
          {results.length === 0 && debounced && (
            <motion.div
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--border-subtle)]">
                <MessageCircle className="h-8 w-8 text-[var(--text-muted)]" />
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Không tìm thấy giấc mơ "{debounced}"
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Hãy thử mô tả khác hoặc hỏi AI để giải đáp chi tiết hơn.
              </p>
              <button
                onClick={() => setQuery("")}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)]/10 px-4 py-2 text-xs font-medium text-[var(--accent)] border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 transition-colors min-h-[44px]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Xem tất cả giấc mơ
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
