"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Wind, Play, Pause, RotateCcw, Timer } from "lucide-react";
import GlassCard from "../../components/GlassCard";

type Mode = "meditate-5" | "breathe-478" | "meditate-15";

interface ModeConfig {
  label: string;
  desc: string;
  icon: string;
  totalSeconds: number;
  breathIn?: number;
  hold?: number;
  breathOut?: number;
}

const MODES: Record<Mode, ModeConfig> = {
  "meditate-5": {
    label: "Thiền 5 phút",
    desc: "Tĩnh tâm nhanh, phù hợp giữa giờ làm việc",
    icon: "🧘",
    totalSeconds: 5 * 60,
  },
  "breathe-478": {
    label: "Hít thở 4-7-8",
    desc: "Giảm lo âu, thư giãn thần kinh",
    icon: "🌬️",
    totalSeconds: 5 * 60,
    breathIn: 4,
    hold: 7,
    breathOut: 8,
  },
  "meditate-15": {
    label: "Thiền 15 phút",
    desc: "Thực hành sâu, chữa lành nội tâm",
    icon: "✨",
    totalSeconds: 15 * 60,
  },
};

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ========== BREATHING CIRCLE ========== */
function BreathingCircle({
  phase,
  scale,
}: {
  phase: string;
  scale: number;
}) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Vòng ngoài */}
      <div
        className="absolute rounded-full border-2 border-[var(--accent)]/20"
        style={{
          width: 200,
          height: 200,
          transform: `scale(${scale})`,
          transition: "transform 4s ease-in-out",
        }}
      />
      {/* Vòng giữa */}
      <div
        className="absolute rounded-full border border-[var(--accent)]/30"
        style={{
          width: 160,
          height: 160,
          transform: `scale(${scale * 0.95})`,
          transition: "transform 4s ease-in-out",
        }}
      />
      {/* Tâm */}
      <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)]/20 to-emerald-400/10 border border-[var(--accent)]/20">
        <Wind className="h-10 w-10 text-[var(--accent)]" />
      </div>
      {/* Phase label */}
      <div className="absolute -bottom-8 text-sm font-medium text-[var(--accent)]">
        {phase}
      </div>
    </div>
  );
}

export default function MeditationPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [phase, setPhase] = useState("Sẵn sàng");
  const [scale, setScale] = useState(1);
  const reduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const config = mode ? MODES[mode] : null;

  const start = useCallback((m: Mode) => {
    setMode(m);
    setRemaining(MODES[m].totalSeconds);
    setRunning(true);
    setPhase("Bắt đầu");
    setScale(1);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (breathRef.current) clearInterval(breathRef.current);
  }, []);

  const reset = useCallback(() => {
    stop();
    setMode(null);
    setRemaining(0);
    setPhase("Sẵn sàng");
    setScale(1);
  }, [stop]);

  /* Timer countdown */
  useEffect(() => {
    if (!running || !config) return;
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, config, stop]);

  /* Breathing 4-7-8 cycle */
  useEffect(() => {
    if (!running || mode !== "breathe-478" || !config?.breathIn) return;

    const cycle = () => {
      // Hít vào 4s
      setPhase("Hít vào...");
      setScale(1.3);
      setTimeout(() => {
        // Giữ 7s
        setPhase("Giữ...");
        setTimeout(() => {
          // Thở ra 8s
          setPhase("Thở ra...");
          setScale(1);
        }, 7000);
      }, 4000);
    };

    cycle();
    breathRef.current = setInterval(cycle, 19000); // 4+7+8 = 19s
    return () => {
      if (breathRef.current) clearInterval(breathRef.current);
    };
  }, [running, mode, config]);

  /* Meditate breathing (đơn giản: hít-thở 4s) */
  useEffect(() => {
    if (!running || mode === "breathe-478") return;

    const cycle = () => {
      setPhase("Hít vào...");
      setScale(1.25);
      setTimeout(() => {
        setPhase("Thở ra...");
        setScale(1);
      }, 4000);
    };

    cycle();
    breathRef.current = setInterval(cycle, 8000);
    return () => {
      if (breathRef.current) clearInterval(breathRef.current);
    };
  }, [running, mode]);

  const isDone = remaining === 0 && mode !== null && !running;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300 mb-4">
            <Wind className="h-3.5 w-3.5" />
            <span>Thiền & Chữa Lành</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Không gian <span className="text-gradient">tĩnh lặng</span>
          </h1>
          <p className="mt-2 text-[var(--text-muted)] max-w-md mx-auto">
            Timer thiền, nhạc tần số chữa lành và hướng dẫn hít thở.
          </p>
        </div>

        {!mode ? (
          /* Chọn mode */
          <div className="grid gap-4 sm:grid-cols-3">
            {(Object.entries(MODES) as [Mode, ModeConfig][]).map(([key, cfg], i) => (
              <motion.div
                key={key}
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard
                  className="cursor-pointer h-full"
                  onClick={() => start(key)}
                >
                  <div className="text-3xl mb-3">{cfg.icon}</div>
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                    {cfg.label}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {cfg.desc}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)]">
                    <Play className="h-3 w-3" />
                    Bắt đầu
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Đang thiền */
          <>
            <GlassCard className="py-10">
              {/* Timer display */}
              <div className="mb-8">
                <div className="text-5xl font-bold text-[var(--text-primary)] tabular-nums tracking-tight">
                  {formatTime(remaining)}
                </div>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {config?.label}
                </p>
              </div>

              {/* Breathing animation */}
              <div className="flex justify-center mb-8">
                <BreathingCircle phase={phase} scale={scale} />
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setRunning(!running)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-emerald-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all min-h-[48px] min-w-[48px]"
                >
                  {running ? (
                    <>
                      <Pause className="h-4 w-4" /> Tạm dừng
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> {remaining === config?.totalSeconds ? "Bắt đầu" : "Tiếp tục"}
                    </>
                  )}
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[48px] min-w-[48px]"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </GlassCard>

            {/* Hoàn thành */}
            {isDone && (
              <motion.div
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <GlassCard>
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    Hoàn thành buổi thiền
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Cảm ơn bạn đã dành thời gian chăm sóc bản thân.
                  </p>
                </GlassCard>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
