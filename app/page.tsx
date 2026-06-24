"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  BrainCircuit,
  CalendarDays,
  Flame,
  Compass,
  Moon,
  LayoutGrid,
  ArrowRight,
  Star,
  TrendingUp,
  Zap,
  BookOpen,
  User,
  Sun,
  Wind,
} from "lucide-react";
import GlassCard from "./components/GlassCard";

const features = [
  {
    href: "/tu-vi/",
    icon: Star,
    title: "Tử Vi Lá Số",
    desc: "Lập lá số tử vi 12 cung, đại hạn, tiểu hạn, lưu niên theo phương pháp cổ truyền.",
    color: "text-amber-300",
    bg: "bg-amber-300/10",
    gradient: "from-amber-400/15 via-transparent to-rose-500/5",
    glow: true,
  },
  {
    href: "/numerology/",
    icon: BrainCircuit,
    title: "Thần Số Học",
    desc: "Biểu đồ sức mạnh cá nhân, đường đời & năm cá nhân qua ngày sinh.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    gradient: "from-purple-500/10 via-transparent to-fuchsia-500/5",
    glow: true,
  },
  {
    href: "/calendar/",
    icon: CalendarDays,
    title: "Lịch Vạn Niên",
    desc: "Giờ hoàng đạo, việc nên/không nên, tuổi xung khắc hàng ngày.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    gradient: "from-amber-500/10 via-transparent to-orange-500/5",
    glow: false,
  },
  {
    href: "/tarot/",
    icon: Flame,
    title: "Tarot",
    desc: "Bói bài Tarot chuyên sâu: tình yêu, sự nghiệp, vận mệnh.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    gradient: "from-rose-500/10 via-transparent to-red-500/5",
    glow: false,
  },
  {
    href: "/phong-thuy/huong-nha/",
    icon: Compass,
    title: "Phong Thủy",
    desc: "Bát trạch, hướng nhà, hướng bếp, thước lỗ ban hợp tuổi gia chủ.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    gradient: "from-emerald-500/10 via-transparent to-green-500/5",
    glow: false,
  },
  {
    href: "/que/kinh-dich/",
    icon: BookOpen,
    title: "Gieo Quẻ",
    desc: "Quẻ Kinh Dịch 64 quẻ, xin xăm, Mai Hoa Dịch Số luận cát hung.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    gradient: "from-indigo-500/10 via-transparent to-violet-500/5",
    glow: false,
  },
  {
    href: "/tuoi/vo-chong/",
    icon: User,
    title: "Xem Tuổi",
    desc: "Hợp tuổi vợ chồng, xông đất, làm nhà (Kim Lâu, Tam Tai, Hoang Ốc).",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    gradient: "from-orange-500/10 via-transparent to-amber-500/5",
    glow: false,
  },
  {
    href: "/ngay/tot-xau/",
    icon: Sun,
    title: "Xem Ngày Tốt",
    desc: "Chọn ngày đẹp cưới hỏi, động thổ, xuất hành, nhập trạch, mua xe.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    gradient: "from-yellow-500/10 via-transparent to-amber-500/5",
    glow: false,
  },
  {
    href: "/zodiac/",
    icon: Compass,
    title: "Cung Hoàng Đạo",
    desc: "Horoscope phương Tây và so sánh độ hợp nhau.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    gradient: "from-sky-500/10 via-transparent to-blue-500/5",
    glow: false,
  },
  {
    href: "/dream/",
    icon: Moon,
    title: "Giải Mã Giấc Mơ",
    desc: "Tìm từ khóa giấc mơ, luận giải ý nghĩa & con số may mắn.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    gradient: "from-violet-500/10 via-transparent to-indigo-500/5",
    glow: false,
  },
  {
    href: "/quiz/",
    icon: LayoutGrid,
    title: "Quiz Tâm Linh",
    desc: "Bạn là nguyên tố nào? Kiếp trước bạn là ai? Khám phá ngay!",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    gradient: "from-emerald-500/10 via-transparent to-teal-500/5",
    glow: false,
  },
  {
    href: "/meditation/",
    icon: Wind,
    title: "Thiền & Chữa Lành",
    desc: "Thiền định, hít thở 4-7-8 giảm lo âu, tĩnh tâm mỗi ngày.",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    gradient: "from-teal-500/10 via-transparent to-cyan-500/5",
    glow: false,
  },
];

const trending = [
  { label: "Tử vi 2026 theo tuổi", views: "12.5K", href: "/tu-vi/nam/" },
  { label: "Thần số học 2026", views: "9.2K", href: "/numerology/" },
  { label: "Tarot bài hôm nay", views: "8.1K", href: "/tarot/" },
  { label: "Giải mã giấc mơ", views: "6.7K", href: "/dream/" },
];

const quickTools = [
  { label: "Lập lá số tử vi", href: "/tu-vi/", tone: "from-amber-400/20 to-rose-500/10" },
  { label: "Xem ngày tốt xấu", href: "/ngay/tot-xau/", tone: "from-yellow-400/20 to-orange-500/10" },
  { label: "Tuổi vợ chồng", href: "/tuoi/vo-chong/", tone: "from-orange-400/20 to-amber-500/10" },
  { label: "Hướng nhà phong thủy", href: "/phong-thuy/huong-nha/", tone: "from-emerald-400/20 to-green-500/10" },
  { label: "Gieo quẻ Kinh Dịch", href: "/que/kinh-dich/", tone: "from-indigo-400/20 to-violet-500/10" },
  { label: "Đổi ngày âm dương", href: "/calendar/doi-ngay/", tone: "from-sky-400/20 to-blue-500/10" },
  { label: "Sim phong thủy", href: "/sim/", tone: "from-teal-400/20 to-cyan-500/10" },
  { label: "Thiền 4-7-8", href: "/meditation/", tone: "from-purple-400/20 to-teal-500/10" },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero — real night-sky/astrology background image + gradient overlay */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,14,26,0.45) 0%, rgba(15,14,26,0.85) 100%), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        {/* Animated aurora overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.18), transparent),
                         radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,92,246,0.14), transparent),
                         radial-gradient(ellipse 50% 60% at 20% 80%, rgba(236,72,153,0.10), transparent)`
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-medium text-[var(--accent)] mb-6">
                <Star className="h-3.5 w-3.5" />
                <span>Khám phá vận mệnh của bạn hôm nay</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[var(--text-primary)]">
                Chiêm tinh & Tâm linh{" "}
                <span className="text-gradient">hiện đại</span>
              </h1>
              <p className="mt-5 text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
                Tử Vi, Thần Số Học, Tarot, Cung Hoàng Đạo và hơn thế nữa — tất cả
                trong một không gian tâm linh được thiết kế để giúp bạn hiểu rõ hơn
                về chính mình.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/numerology/"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--surface)] shadow-lg shadow-[var(--accent)]/20 hover:brightness-110 transition-all"
                >
                  <Zap className="h-4 w-4" />
                  Xem Thần Số Học
                </Link>
                <Link
                  href="/calendar/"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-all"
                >
                  <CalendarDays className="h-4 w-4" />
                  Lịch Vạn Niên
                </Link>
              </div>
            </motion.div>

            {/* Daily Oracle Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-purple-500 opacity-20 blur-lg" />
                <GlassCard glow className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-400">
                    <Sparkles className="h-7 w-7 text-[var(--surface)]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Lời Oracle Hôm Nay
                  </h3>
                  <p className="mt-3 text-sm italic text-[var(--text-secondary)] leading-relaxed">
                    "Mỗi ngày là một cơ hội để viết lại câu chuyện của bạn. Hãy
                    tin vào tiếng nói bên trong và để nó dẫn lối."
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[var(--accent)]">
                    <Star className="h-3.5 w-3.5" />
                    <span className="font-medium">Số may mắn: 7</span>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Quick Tools */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <GlassCard className="overflow-hidden">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Chức năng <span className="text-gradient">dùng nhiều</span>
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Bấm là vào thẳng công cụ, không cần tìm trong menu.</p>
            </div>
            <Link href="/tu-vi/" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
              Bắt đầu với lá số <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group rounded-2xl border border-[var(--border)] bg-gradient-to-br ${tool.tone} p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-[var(--accent)]/10`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">{tool.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
                </div>
              </Link>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)]">
            Công cụ <span className="text-gradient">Tâm Linh</span>
          </h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Chọn công cụ phù hợp để khám phá chiều sâu nội tâm
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Link key={f.href} href={f.href}>
              <GlassCard
                delay={i * 0.08}
                glow={f.glow}
                className="h-full group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-60`} />
                <div
                  className={`relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg}`}
                >
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="relative font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {f.title}
                </h3>
                <p className="relative mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {f.desc}
                </p>
                <div className="relative mt-4 flex items-center gap-1 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Khám phá ngay</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending + Moon Phase widget */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Trending */}
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-[var(--accent)]" />
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Đang hot
              </h3>
            </div>
            <div className="space-y-3">
              {trending.map((t, i) => (
                <Link
                  key={i}
                  href={t.href}
                  className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] px-4 py-3 hover:bg-[var(--border-subtle)] hover:border-[var(--accent)]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-bold text-[var(--accent)]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--text-primary)]">
                      {t.label}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {t.views} lượt xem
                  </span>
                </Link>
              ))}
            </div>
          </GlassCard>

          {/* Moon Phase */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Moon className="h-5 w-5 text-[var(--accent)]" />
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Trăng Hôm Nay
              </h3>
            </div>
            <div className="text-center py-4">
              <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gradient-to-b from-[var(--text-secondary)] to-[var(--surface)] shadow-inner shadow-black/30 relative overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[var(--surface)] to-[var(--surface)] opacity-60" style={{ transform: 'translateX(25%)' }} />
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Trăng khuyết
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Giai đoạn phù hợp để suy ngẫm, thiền định và buông bỏ.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
