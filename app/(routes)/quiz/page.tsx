"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LayoutGrid, ChevronRight, RotateCcw, Sparkles, CheckCircle2 } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import { QUIZZES, calculateQuizResult } from "../../data/quiz";

export default function QuizPage() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<ReturnType<typeof calculateQuizResult>>(null);
  const reduced = useReducedMotion();

  const quiz = QUIZZES.find((q) => q.id === activeQuiz);
  const progress = quiz ? ((qIndex + (result ? 1 : 0)) / quiz.questions.length) * 100 : 0;

  const start = useCallback((id: string) => {
    setActiveQuiz(id);
    setQIndex(0);
    setAnswers([]);
    setResult(null);
  }, []);

  const reset = useCallback(() => {
    setActiveQuiz(null);
    setQIndex(0);
    setAnswers([]);
    setResult(null);
  }, []);

  const choose = useCallback(
    (optIdx: number) => {
      if (!quiz) return;
      const nextAnswers = [...answers, optIdx];
      if (nextAnswers.length === quiz.questions.length) {
        // Hoàn thành
        const res = calculateQuizResult(quiz.id, nextAnswers);
        setAnswers(nextAnswers);
        setResult(res);
      } else {
        setAnswers(nextAnswers);
        setQIndex((prev) => prev + 1);
      }
    },
    [answers, quiz]
  );

  const currentQuestion = quiz?.questions[qIndex];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {!activeQuiz ? (
          /* Danh sách quiz */
          <>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300 mb-4">
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Quiz Tâm Linh</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                Khám phá <span className="text-gradient">chính mình</span>
              </h1>
              <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">
                Các quiz vui nhộn giúp bạn hiểu hơn về tính cách, năng lượng và vận mệnh.
              </p>
            </div>

            <div className="space-y-4">
              {QUIZZES.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={reduced ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <GlassCard
                    className="cursor-pointer group"
                    onClick={() => start(q.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--border-subtle)] text-2xl">
                        {q.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                          {q.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                          {q.desc}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--accent)]">
                          <span>Bắt đầu</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* Đang làm quiz */
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  {quiz?.title}
                </span>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  {result ? "Hoàn thành" : `Câu ${qIndex + 1} / ${quiz?.questions.length}`}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--border-subtle)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {result ? (
                /* Kết quả */
                <motion.div
                  key="result"
                  initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <GlassCard glow className="py-10">
                    <div className="text-6xl mb-4">{result?.icon}</div>
                    <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                      {result?.title}
                    </h2>
                    <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
                      {result?.desc}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)]/10 px-4 py-2 text-xs font-medium text-[var(--accent)] border border-[var(--accent)]/20">
                      <Sparkles className="h-3.5 w-3.5" />
                      {result?.advice}
                    </div>
                  </GlassCard>

                  <button
                    onClick={reset}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[48px]"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Làm quiz khác
                  </button>
                </motion.div>
              ) : (
                /* Câu hỏi */
                <motion.div
                  key={qIndex}
                  initial={reduced ? {} : { opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? {} : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-6">
                      {currentQuestion?.text}
                    </h3>
                    <div className="space-y-3">
                      {currentQuestion?.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => choose(idx)}
                          className="w-full text-left rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/30 px-4 py-3 text-sm text-[var(--text-primary)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all min-h-[48px] flex items-center gap-3"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[10px] font-bold text-[var(--text-muted)]">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
}
