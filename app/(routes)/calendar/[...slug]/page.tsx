export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ slug: ["thang"] }, { slug: ["nam"] }, { slug: ["doi-ngay"] }];
}

import { Suspense } from "react";
import Link from "next/link";
import { getCanChiYear, generateLichThang, doiNgayDuongAm, doiNgayAmDuong, getTietKhi } from "../../../data/calendar";
import Breadcrumb from "../../../components/Breadcrumb";

/* Shared UI */
function Card({ children, glow }: { children: React.ReactNode; glow?: boolean }) {
  return <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 backdrop-blur-sm p-5 ${glow ? "shadow-[0_0_40px_var(--accent-glow)]" : ""}`}>{children}</div>;
}
function S({ label }: { label: string }) {
  return <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg min-h-[40px]">{label}</button>;
}

/* 1. LỊCH ÂM DƯƠNG THÁNG */
function LichThang({ searchParams }: { searchParams: Record<string, string> }) {
  const y = Number(searchParams.y) || 2026;
  const m = Number(searchParams.m) || 6;
  const lich = generateLichThang(y, m);
  return (
    <div className="space-y-4">
      <h1 className="font-display text-xl font-bold text-[var(--text-primary)]">Lịch âm dương tháng</h1>
      <Card>
        <form className="flex flex-wrap gap-3 items-end">
          <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Năm</label>
            <select name="y" defaultValue={y} className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)]">{Array.from({length:10},(_,i)=>2020+i).map(v=><option key={v} value={v}>{v}</option>)}</select>
          </div>
          <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Tháng</label>
            <select name="m" defaultValue={m} className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)]">{Array.from({length:12},(_,i)=>i+1).map(v=><option key={v} value={v}>Tháng {v}</option>)}</select>
          </div>
          <S label="Xem lịch" />
        </form>
      </Card>
      <Card glow>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-sm text-[var(--text-muted)]">Tháng {lich.month} năm {lich.year}</div>
          <div className="text-sm font-bold text-[var(--accent)]">{lich.thangCan} {lich.chi} — {lich.can} năm</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--text-muted)] mb-1">
          {["CN","T2","T3","T4","T5","T6","T7"].map(d=><div key={d} className="py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {lich.days.map((d: any) => (
            <div key={d.day} className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-1.5 text-center min-h-[60px]">
              <div className="text-xs font-bold text-[var(--text-primary)]">{d.day}</div>
              <div className="text-[9px] text-[var(--text-muted)]">{d.chi}</div>
              {d.saoTot.length > 0 && <div className="mt-0.5 h-1 w-1 rounded-full bg-[var(--success)] mx-auto" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* 2. LỊCH ÂM DƯƠNG NĂM */
function LichNam() {
  const year = 2026;
  const cc = getCanChiYear(year);
  const months = Array.from({ length: 12 }, (_, i) => generateLichThang(year, i + 1));
  return (
    <div className="space-y-4">
      <h1 className="font-display text-xl font-bold text-[var(--text-primary)]">Lịch âm dương {year}</h1>
      <Card glow>
        <div className="text-center mb-4">
          <div className="font-display text-lg font-bold text-[var(--accent)]">{cc.can} {cc.chi}</div>
          <div className="text-sm text-[var(--text-muted)]">Năm {year} — Bính Ngọ</div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {months.map((m, i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--accent)]">Tháng {i + 1}</span>
                <span className="text-[10px] text-[var(--text-muted)]">{m.thangCan} {m.chi}</span>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center">
                {m.days.slice(0, 14).map((d: any) => (
                  <div key={d.day} className="text-[9px] text-[var(--text-muted)] py-0.5">{d.day}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* 3. ĐỔI NGÀY ÂM DƯƠNG */
function DoiNgay({ searchParams }: { searchParams: Record<string, string> }) {
  const mode = searchParams.mode || "duong-am";
  const d = Number(searchParams.d) || 15;
  const m = Number(searchParams.m) || 6;
  const y = Number(searchParams.y) || 2026;
  const result = mode === "duong-am" ? doiNgayDuongAm(d, m, y) : doiNgayAmDuong(d, m, y);
  return (
    <div className="space-y-4">
      <h1 className="font-display text-xl font-bold text-[var(--text-primary)]">Đổi ngày âm dương</h1>
      <Card>
        <form className="grid gap-3 sm:grid-cols-2 max-w-md">
          <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Chuyển đổi</label>
            <select name="mode" defaultValue={mode} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)]">
              <option value="duong-am">Dương lịch → Âm lịch</option>
              <option value="am-duong">Âm lịch → Dương lịch</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1"><label className="block text-xs text-[var(--text-secondary)] mb-1">Ngày</label><input type="number" name="d" defaultValue={d} min={1} max={31} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)]" /></div>
            <div className="flex-1"><label className="block text-xs text-[var(--text-secondary)] mb-1">Tháng</label><input type="number" name="m" defaultValue={m} min={1} max={12} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)]" /></div>
            <div className="flex-1"><label className="block text-xs text-[var(--text-secondary)] mb-1">Năm</label><input type="number" name="y" defaultValue={y} min={1900} max={2100} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)]" /></div>
          </div>
          <div className="sm:col-span-2"><S label="Đổi ngày" /></div>
        </form>
      </Card>
      <Card glow>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-4 text-center">
            <div className="text-xs text-[var(--text-muted)] mb-1">{mode === "duong-am" ? "Dương lịch" : "Âm lịch"}</div>
            <div className="text-lg font-bold text-[var(--text-primary)]">{result.duong}</div>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-4 text-center">
            <div className="text-xs text-[var(--text-muted)] mb-1">{mode === "duong-am" ? "Âm lịch" : "Dương lịch"}</div>
            <div className="text-lg font-bold text-[var(--accent)]">{result.am}</div>
          </div>
        </div>
        <div className="mt-3 text-center text-sm text-[var(--text-muted)]">Can Chi: <span className="text-[var(--accent)] font-bold">{result.canChi}</span></div>
      </Card>
    </div>
  );
}

/* MAIN */
export default async function CalendarSubPage({ params, searchParams }: { params: Promise<{ slug: string[] }>; searchParams: Promise<Record<string, string>> }) {
  const { slug: slugArr } = await params;
  const sp = await searchParams;
  const slug = slugArr?.[0] || "";
  const nav = [{ k: "thang", l: "Lịch tháng" }, { k: "nam", l: "Lịch năm 2026" }, { k: "doi-ngay", l: "Đổi ngày" }];
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />
      <div className="flex flex-wrap gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-1 mb-6">
        {nav.map(n => <Link key={n.k} href={`/calendar/${n.k}/`} className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${slug===n.k?"bg-[var(--accent)]/10 text-[var(--accent)]":"text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>{n.l}</Link>)}
      </div>
      <Suspense fallback={<div className="text-center py-12 text-sm text-[var(--text-muted)]">Đang tải...</div>}>
        {slug === "thang" && <LichThang searchParams={sp} />}
        {slug === "nam" && <LichNam />}
        {slug === "doi-ngay" && <DoiNgay searchParams={sp} />}
        {!nav.find(n => n.k === slug) && <div className="text-center py-12 text-[var(--text-muted)]">Chọn một mục ở trên</div>}
      </Suspense>
    </div>
  );
}
