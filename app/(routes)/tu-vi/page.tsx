"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ChevronRight, Sparkles, BookOpen } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Breadcrumb from "../../components/Breadcrumb";
import { NAV_GROUPS } from "../../data/nav-menu";
import { getCanChi, getConGiap, tuViNamDong, tuVi2026, tuTru, canXuongTinhSo } from "../../data/tu-vi-engine";
import { generateTuViChart, TU_HOA, getTieuHan, getLuuNien } from "../../data/tu-vi-chart";
import { luanTongQuat } from "../../data/tu-vi-luan";
import { getSaoPhuNam, getSaoColor } from "../../data/tu-vi-phu";
import { lunarToSolar } from "../../data/lunar-calendar";
import HeroBackground from "../../components/HeroBackground";

/* ========== HELPERS ========== */
function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/* ========== SIDEBAR ========== */
function Sidebar() {
  const [open, setOpen] = useState<string[]>(NAV_GROUPS.map((g) => g.label));

  return (
    <div className="space-y-2">
      {NAV_GROUPS.map((g) => {
        const Icon = g.icon;
        const expanded = open.includes(g.label);
        return (
          <GlassCard key={g.label} className="!p-0 overflow-hidden">
            <button
              onClick={() => setOpen(expanded ? open.filter((l) => l !== g.label) : [...open, g.label])}
              className="flex w-full items-center gap-2 px-4 py-3 text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border)]"
            >
              {Icon && <Icon className="h-4 w-4 text-[var(--accent)]" />}
              <span className="flex-1 text-left">{g.label}</span>
              <ChevronRight
                className={`h-4 w-4 text-[var(--text-muted)] transition-transform ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </button>
            {expanded && (
              <div className="py-1">
                {g.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
                    {item.label}
                    {item.hot && (
                      <span className="ml-auto rounded bg-[var(--danger)]/10 px-1.5 py-0.5 text-[10px] font-bold text-[var(--danger)]">
                        Hot
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </GlassCard>
        );
      })}
    </div>
  );
}

/* ========== FORM ========== */
export default function TuViPage() {
  const [name, setName] = useState("");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1995);
  const [calendar, setCalendar] = useState<"duong" | "am">("duong");
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [gender, setGender] = useState<"nam" | "nu">("nam");
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(6);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [astroData, setAstroData] = useState<any[]>([]);
  const [astroError, setAstroError] = useState<string | null>(null);
  const reduced = useReducedMotion();

  /* Fetch deep astrology data from backend when result is ready */
  useEffect(() => {
    if (!result?.chart) return;
    const keywords = new Set<string>();
    result.chart.cungs.forEach((cung: any) => {
      cung.stars.forEach((s: string) => keywords.add(s));
      keywords.add(cung.name.replace(/^Cung\s+/, ""));
    });
    // Fetch data for main stars/cung
    const main = Array.from(keywords).slice(0, 12);
    Promise.all(
      main.map(async (k) => {
        try {
          const r = await fetch(`http://localhost:8000/api/astrology-data/search?q=${encodeURIComponent(k)}`);
          if (!r.ok) return null;
          const items = await r.json();
          return items[0] || null;
        } catch {
          return null;
        }
      })
    )
      .then((items) => {
        const valid = items.filter(Boolean);
        setAstroData(valid);
        if (valid.length === 0) setAstroError("Chưa có dữ liệu chi tiết trong kho. Vào Admin để cào thêm.");
      })
      .catch(() => setAstroError("Không kết nối được kho dữ liệu (backend chưa chạy?)."));
  }, [result]);

  const submit = () => {
    /* Validate phạm vi cơ bản */
    if (year < 1911 || year > 2026) { setError("Năm sinh phải trong khoảng 1911–2026."); return; }

    /* Quy về dương lịch để lập lá số */
    let sY = year, sM = month, sD = day;
    if (calendar === "am") {
      if (year < 1901 || year > 2099) { setError("Năm âm lịch nằm ngoài phạm vi hỗ trợ (1901–2099)."); return; }
      const solar = lunarToSolar(year, month, day, false);
      sY = solar.getFullYear(); sM = solar.getMonth() + 1; sD = solar.getDate();
    }

    /* Kiểm tra ngày dương hợp lệ (loại 31/2, 30/2...) */
    const check = new Date(sY, sM - 1, sD);
    if (check.getFullYear() !== sY || check.getMonth() !== sM - 1 || check.getDate() !== sD) {
      setError(`Ngày ${day}/${month}/${year} không hợp lệ.`);
      return;
    }

    setError("");
    const cc = getCanChi(sY);
    const cg = getConGiap(sY);
    const tv = tuViNamDong(viewYear, sY);
    const tt = tuTru(sY, sM, sD, hour);
    const cx = canXuongTinhSo(sY);
    const chart = generateTuViChart(sY, sM, sD, hour, gender);
    const tieuHan = getTieuHan(chart.menhIdx, chart.cucSo, gender, chart.can, viewYear, chart.lunar.year);
    const luuNien = getLuuNien(viewYear);
    setResult({ cc, cg, tv, tt, cx, chart, tieuHan, luuNien });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title with real background image */}
          <HeroBackground
            image="https://images.unsplash.com/photo-1532968967842-326318c7f83a?auto=format&fit=crop&w=1200&q=80"
            className="rounded-2xl border border-[var(--border)]"
          >
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-5 py-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-medium text-[var(--accent)] mb-4">
                <Star className="h-3.5 w-3.5" />
                <span>Lập lá số tử vi</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Lá số <span className="text-gradient">Tử Vi</span>
              </h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Nhập thông tin để lập lá số tử vi chi tiết theo phương pháp cổ truyền Việt Nam.
              </p>
            </motion.div>
          </HeroBackground>

          {/* Form */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Họ tên */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Họ Tên
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ tên..."
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Ngày sinh
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={day}
                      onChange={(e) => setDay(Number(e.target.value))}
                      className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
                    >
                      {range(1, 31).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
                    >
                      {range(1, 12).map((m) => (
                        <option key={m} value={m}>Tháng {m}</option>
                      ))}
                    </select>
                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
                    >
                      {range(1911, 2026).reverse().map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Lịch */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Lịch
                  </label>
                  <div className="flex rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-1">
                    <button
                      onClick={() => setCalendar("duong")}
                      className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        calendar === "duong"
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      Dương lịch
                    </button>
                    <button
                      onClick={() => setCalendar("am")}
                      className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        calendar === "am"
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      Âm lịch
                    </button>
                  </div>
                </div>

                {/* Giờ sinh */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Giờ sinh
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={hour}
                      onChange={(e) => setHour(Number(e.target.value))}
                      className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
                    >
                      {range(0, 23).map((h) => (
                        <option key={h} value={h}>{h} Giờ</option>
                      ))}
                    </select>
                    <select
                      value={minute}
                      onChange={(e) => setMinute(Number(e.target.value))}
                      className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
                    >
                      {range(0, 59).map((m) => (
                        <option key={m} value={m}>{m} Phút</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Giới tính */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Giới tính
                  </label>
                  <div className="flex rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-1">
                    <button
                      onClick={() => setGender("nam")}
                      className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        gender === "nam"
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      Nam
                    </button>
                    <button
                      onClick={() => setGender("nu")}
                      className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        gender === "nu"
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      Nữ
                    </button>
                  </div>
                </div>

                {/* Năm xem */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Năm xem
                  </label>
                  <select
                    value={viewYear}
                    onChange={(e) => setViewYear(Number(e.target.value))}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
                  >
                    {range(2000, 2050).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                {/* Tháng xem */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Tháng xem (Âm lịch)
                  </label>
                  <select
                    value={viewMonth}
                    onChange={(e) => setViewMonth(Number(e.target.value))}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)]/50 focus:outline-none"
                  >
                    {range(1, 12).map((m) => (
                      <option key={m} value={m}>Tháng {m}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-4 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-2.5 text-sm text-[var(--danger)] text-center">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={submit}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-rose-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 hover:brightness-110 transition-all min-h-[48px]"
                >
                  <Sparkles className="h-4 w-4" />
                  Lập lá số
                </button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Real results with 12 Cung Tử Vi */}
          {result && (
            <motion.div initial={reduced ? {} : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Header info */}
              <GlassCard glow>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold border border-[var(--accent)]/30 text-lg">{result.cc.chi}</div>
                  <div>
                    <div className="font-display text-xl font-bold text-[var(--text-primary)]">{name || "Chủ mệnh"}</div>
                    <div className="text-sm text-[var(--text-muted)]">{result.cc.can} {result.cc.chi} — {result.cg.animal} — {result.cc.element}</div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-xs text-[var(--text-muted)] mb-1">Ngày sinh âm lịch</div><div className="text-sm font-bold text-[var(--accent)]">{result.chart.lunar.day}/{result.chart.lunar.month}/{result.chart.lunar.year}{result.chart.lunar.isLeap ? " (nhuận)" : ""}</div></div>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-xs text-[var(--text-muted)] mb-1">Cung Mệnh / Thân</div><div className="text-sm font-bold text-[var(--success)]">{result.chart.cungMenh} / {result.chart.cungThan}</div></div>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-xs text-[var(--text-muted)] mb-1">Ngũ Hành Cục</div><div className="text-sm font-bold text-[var(--text-primary)]">{result.chart.cuc}</div></div>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-xs text-[var(--text-muted)] mb-1">Nạp âm</div><div className="text-sm font-bold text-[var(--warning)]">{result.cx.napAm}</div></div>
                </div>
                <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3">
                  <div className="text-xs text-[var(--text-muted)] mb-1">Tổng luận</div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{luanTongQuat(result.cc.can, result.cc.chi, result.chart.cungMenh, `${result.chart.tuHoa.loc} Hóa Lộc, ${result.chart.tuHoa.quyen} Hóa Quyền, ${result.chart.tuHoa.khoa} Hóa Khoa, ${result.chart.tuHoa.ky} Hóa Kỵ`)}</p>
                </div>
              </GlassCard>

              {/* Tứ Trụ */}
              <GlassCard>
                <h3 className="text-sm font-bold text-[var(--accent)] mb-3">Tứ Trụ (Can Chi)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[{t:"Năm",v:result.tt.nam},{t:"Tháng",v:result.tt.thang},{t:"Ngày",v:result.tt.ngay},{t:"Giờ",v:result.tt.gio}].map(x=> (
                    <div key={x.t} className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3 text-center"><div className="text-xs text-[var(--text-muted)] mb-1">{x.t}</div><div className="text-sm font-bold text-[var(--text-primary)]">{x.v}</div></div>
                  ))}
                </div>
              </GlassCard>

              {/* 12 CUNG CHART — Standard 3×4 Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[var(--accent)]">Lá số Tử Vi — 12 Cung</h3>
                  <button onClick={()=>window.print()} className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    In lá số
                  </button>
                </div>
                {(() => {
                  const c = result.chart.cungs;
                  /* CHI order: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi */
                  const chiList = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
                  const saoPhuNam = getSaoPhuNam(result.cc.can, result.cc.chi);
                  return (
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      {chiList.map((chiName, idx) => {
                        const cung = c.find((cu: any) => cu.chi === chiName); /* tra cung theo chi */
                        if (!cung) return <div key={idx} />;
                        const isMenh = cung.name.startsWith("Mệnh");
                        const isTieuHan = chiName === result.tieuHan.chi;
                        const allPhu = saoPhuNam.filter(sp => sp.chi === chiName);
                        const luuNienSao = result.luuNien.sao.filter((s: any) => s.chi === chiName);
                        return (
                          <div key={idx} className={`rounded-xl border p-2 sm:p-3 min-h-[110px] ${isMenh?"border-[var(--accent)]/60 bg-[var(--accent)]/8 shadow-[0_0_20px_var(--accent-glow)]":isTieuHan?"border-[var(--warning)]/40 bg-[var(--warning)]/8":"border-[var(--border)] bg-[var(--surface-elevated)]/50"}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-[10px] sm:text-xs font-bold ${isMenh?"text-[var(--accent)]":isTieuHan?"text-[var(--warning)]":"text-[var(--text-primary)]"}`}>{cung.name}</span>
                              <span className="text-[9px] text-[var(--text-muted)]">{chiName}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-1">
                              {isTieuHan && <span className="inline-block rounded px-1 py-0.5 text-[8px] sm:text-[9px] font-medium bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30">Tiểu hạn</span>}
                              {luuNienSao.slice(0, 2).map((s: any) => (
                                <span key={s.name} className={`inline-block rounded px-1 py-0.5 text-[8px] sm:text-[9px] font-medium border ${s.nature==="cát"?"bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20":"bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20"}`}>L.N {s.name}</span>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1 mb-1">
                              {cung.stars.map((s: string) => {
                                const isHoa = cung.hoa.includes(s) || (TU_HOA[result.cc.can]?.loc === s || TU_HOA[result.cc.can]?.quyen === s || TU_HOA[result.cc.can]?.khoa === s || TU_HOA[result.cc.can]?.ky === s);
                                /* Determine star element for color */
                                const eleMap: Record<string,string> = {"Tử Vi":"Thổ","Thiên Cơ":"Mộc","Thái Dương":"Hỏa","Vũ Khúc":"Kim","Thiên Đồng":"Thủy","Liêm Trinh":"Hỏa","Thiên Phủ":"Thổ","Thái Âm":"Thủy","Tham Lang":"Mộc","Cự Môn":"Thủy","Thiên Tướng":"Thổ","Thiên Lương":"Mộc","Thất Sát":"Kim","Phá Quân":"Thủy"};
                                const color = getSaoColor(eleMap[s] || "");
                                return (
                                  <span key={s} className="inline-block rounded px-1 py-0.5 text-[9px] sm:text-[10px] font-medium border" style={{ background: `${color}15`, color, borderColor: `${color}30` }}>
                                    {s}{isHoa ? "✦" : ""}
                                  </span>
                                );
                              })}
                              {allPhu.slice(0, 4).map((sp: any) => (
                                <span key={sp.name} className={`inline-block rounded px-1 py-0.5 text-[8px] sm:text-[9px] font-medium border ${sp.nature==="cát"?"bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20":sp.nature==="hung"?"bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20":"bg-[var(--text-muted)]/10 text-[var(--text-muted)] border-[var(--text-muted)]/20"}`}>
                                  {sp.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
                {/* Legend */}
                <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--accent)]" />Chính tinh</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--warning)]" />✦ Tứ Hóa</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--success)]" />Sao cát</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--danger)]" />Sao hung</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--warning)]" />Tiểu hạn</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--success)]" />L.N sao cát</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{background:"#e0e0e0"}} />Kim</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{background:"#4ade80"}} />Mộc</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{background:"#60a5fa"}} />Thủy</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{background:"#f87171"}} />Hỏa</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{background:"#facc15"}} />Thổ</span>
                </div>
              </div>

              {/* LUẬN GIẢI CHI TIẾT */}
              <div>
                <h3 className="text-sm font-bold text-[var(--accent)] mb-3">Luận giải chi tiết 12 cung</h3>
                <div className="space-y-2">
                  {result.chart.cungs.map((cung: any, i: number) => (
                    <div key={i} className={`rounded-xl border p-4 ${cung.name.startsWith("Mệnh")?"border-[var(--accent)]/40 bg-[var(--accent)]/5":"border-[var(--border)] bg-[var(--surface-elevated)]/40"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${cung.name.startsWith("Mệnh")?"bg-[var(--accent)]/20 text-[var(--accent)]":"bg-[var(--border-subtle)] text-[var(--text-muted)]"}`}>{i+1}</span>
                        <div>
                          <div className="text-sm font-bold text-[var(--text-primary)]">{cung.name} <span className="text-[var(--text-muted)] font-normal">({cung.chi})</span></div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {cung.stars.map((s: string) => {
                              const isHoa = cung.hoa.length > 0 && (TU_HOA[result.cc.can]?.loc === s || TU_HOA[result.cc.can]?.quyen === s || TU_HOA[result.cc.can]?.khoa === s || TU_HOA[result.cc.can]?.ky === s);
                              return (
                                <span key={s} className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium ${isHoa?"bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30":"bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"}`}>
                                  {s}{isHoa ? " ✦" : ""}
                                </span>
                              );
                            })}
                            {cung.hoa.map((h: string) => (
                              <span key={h} className="inline-block rounded px-2 py-0.5 text-[10px] font-medium bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30">{h}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed pl-10">{cung.luan}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Đại Vận */}
              <GlassCard>
                <h3 className="text-sm font-bold text-[var(--accent)] mb-3">Đại Vận (10 năm 1 vận)</h3>
                <div className="space-y-2">
                  {result.chart.daiVan.map((dv: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 text-xs font-bold text-[var(--accent)]">{dv.age}</span>
                      <div className="flex-1 h-2 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-rose-400" style={{ width: `${100 - i * 12}%` }} />
                      </div>
                      <span className="w-20 text-right text-xs text-[var(--text-secondary)]">{dv.desc}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Tiểu Hạn & Lưu Niên */}
              <div className="grid gap-4 sm:grid-cols-2">
                <GlassCard>
                  <h3 className="text-sm font-bold text-[var(--accent)] mb-3">Tiểu Hạn năm {viewYear}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold border border-[var(--accent)]/30">{result.tieuHan.age}</div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">Cung {result.tieuHan.cung}</div>
                      <div className="text-xs text-[var(--text-muted)]">Chi {result.tieuHan.chi} · Hướng {result.tieuHan.direction}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Tiểu hạn là vận hạn từng năm, di chuyển theo cung mệnh. Năm {viewYear} tiểu hạn tại cung {result.tieuHan.cung} ({result.tieuHan.chi}), chi phối các biến động nhỏ trong năm.</p>
                </GlassCard>
                <GlassCard>
                  <h3 className="text-sm font-bold text-[var(--accent)] mb-3">Lưu Niên năm {viewYear}</h3>
                  <div className="mb-3">
                    <div className="text-sm font-bold text-[var(--text-primary)]">{result.luuNien.can} {result.luuNien.chi}</div>
                    <div className="text-xs text-[var(--text-muted)]">Sao lưu niên chiếu các cung</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {result.luuNien.sao.slice(0, 8).map((s: any) => (
                      <span key={s.name} className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium border ${s.nature==="cát"?"bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20":s.nature==="hung"?"bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20":"bg-[var(--text-muted)]/10 text-[var(--text-muted)] border-[var(--text-muted)]/20"}`}>
                        {s.name} <span className="opacity-70">({s.chi})</span>
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Tử vi năm xem */}
              <GlassCard>
                <h3 className="text-sm font-bold text-[var(--accent)] mb-3">Tử vi năm {viewYear}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{result.tv.o}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[{t:"Sự nghiệp",v:result.tv.c},{t:"Tình duyên",v:result.tv.l},{t:"Sức khỏe",v:result.tv.h},{t:"Tài chính",v:result.tv.m}].map(x=> (
                    <div key={x.t} className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-[10px] text-[var(--text-muted)] mb-1">{x.t}</div><div className="text-xs text-[var(--text-secondary)]">{x.v}</div></div>
                  ))}
                </div>
              </GlassCard>

              {/* Dữ liệu kho Tử Vi (crawl + AI) */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--accent)]" />
                  <h3 className="text-sm font-bold text-[var(--accent)]">Luận giải chi tiết từ kho dữ liệu</h3>
                </div>
                {astroError && (
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 p-4 text-sm text-[var(--text-muted)]">
                    {astroError}
                    <div className="mt-2">
                      <a href="/admin/" className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline">
                        Mở Admin Crawler <ChevronRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  {astroData.map((item) => (
                    <GlassCard key={item.id} className="overflow-hidden">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--accent)]">{item.category}</span>
                        <span className="font-bold text-[var(--text-primary)]">{item.keyword}</span>
                        <span className="ml-auto text-[10px] text-[var(--text-muted)]">{item.ai_model_used}</span>
                      </div>
                      <div
                        className="astro-content text-sm text-[var(--text-secondary)] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.final_content || "<p>Chưa có nội dung tổng hợp.</p>" }}
                      />
                    </GlassCard>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button onClick={()=>setResult(null)} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors min-h-[44px]">Lập lá số khác</button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
