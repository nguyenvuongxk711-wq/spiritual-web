export const dynamic = "force-static";

export function generateStaticParams() {
  return [{slug:["ngay"]},{slug:["nam"]},{slug:["nam-sinh"]},{slug:["tron-doi"]},{slug:["12-giap"]},{slug:["tu-tru"]},{slug:["can-xuong"]},{slug:["thong-ke"]},];
}

import { Suspense } from "react";
import Link from "next/link";
import {tuVi2026,tuViNgay,tuViNam,tuViTronDoi,getConGiap,getConGiapInfo,tuTru,canXuongTinhSo,thongKeCanXuong} from "../../../data/tu-vi-engine";
import Breadcrumb from "../../../components/Breadcrumb";

/* Shared UI */
function Card({ children, glow }: { children: React.ReactNode; glow?: boolean }) {
  return <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 backdrop-blur-sm p-5 ${glow ? "shadow-[0_0_40px_var(--accent-glow)]" : ""}`}>{children}</div>;
}
function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return <span className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold border" style={{ background: `${color}15`, color, borderColor: `${color}40` }}>{children}</span>;
}
const YS = ({ n, v }: { n: string; v: string }) => <select name={n} defaultValue={v} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)]">{Array.from({length:2026-1924+1},(_,i)=>1924+i).map(y=><option key={y} value={y}>{y}</option>)}</select>;
const DS = ({ n, v }: { n: string; v: string }) => <select name={n} defaultValue={v} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)]">{Array.from({length:31},(_,i)=>i+1).map(d=><option key={d} value={d}>{d}</option>)}</select>;
const MS = ({ n, v }: { n: string; v: string }) => <select name={n} defaultValue={v} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)]">{Array.from({length:12},(_,i)=>i+1).map(m=><option key={m} value={m}>Tháng {m}</option>)}</select>;
const HS = ({ n, v }: { n: string; v: string }) => <select name={n} defaultValue={v} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)]">{Array.from({length:24},(_,i)=>i).map(h=><option key={h} value={h}>{h} Giờ</option>)}</select>;
const MIN = ({ n, v }: { n: string; v: string }) => <select name={n} defaultValue={v} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)]">{Array.from({length:60},(_,i)=>i).map(m=><option key={m} value={m}>{m} Phút</option>)}</select>;
const R = ({ label, n, v, opts }: { label: string; n: string; v: string; opts: { val: string; text: string }[] }) => (
  <div>
    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</label>
    <div className="flex rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-1">
      {opts.map(o => (
        <label key={o.val} className={`flex-1 text-center rounded-lg px-2 py-2 text-sm font-medium cursor-pointer transition-colors ${v===o.val?"bg-[var(--accent)]/10 text-[var(--accent)]":"text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
          <input type="radio" name={n} value={o.val} defaultChecked={v===o.val} className="sr-only" />{o.text}
        </label>
      ))}
    </div>
  </div>
);
const S = ({ label }: { label: string }) => <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-rose-500 px-8 py-3 text-sm font-bold text-white shadow-lg min-h-[48px]">{label}</button>;
const L = ({ label, children }: { label: string; children: React.ReactNode }) => <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</label>{children}</div>;

/* Full form used by most sub-pages */
function FullForm({ sp, actionLabel, extra }: { sp: Record<string, string>; actionLabel: string; extra?: React.ReactNode }) {
  return (
    <Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <L label="Ngày sinh"><div className="flex gap-2"><DS n="d" v={sp.d || "1"} /><MS n="m" v={sp.m || "1"} /><YS n="y" v={sp.y || "1995"} /></div></L>
        <R label="Lịch" n="cal" v={sp.cal || "duong"} opts={[{val:"duong",text:"Dương lịch"},{val:"am",text:"Âm lịch"}]} />
        <L label="Giờ sinh"><div className="flex gap-2"><HS n="h" v={sp.h || "12"} /><MIN n="min" v={sp.min || "0"} /></div></L>
        <R label="Giới tính" n="gender" v={sp.gender || "nam"} opts={[{val:"nam",text:"Nam"},{val:"nu",text:"Nữ"}]} />
        {extra}
      </div>
      <div className="mt-5 flex justify-center"><S label={actionLabel} /></div>
    </Card>
  );
}

/* 1. TỬ VI HÀNG NGÀY */
function TuViNgay({ searchParams: sp }: { searchParams: Record<string, string> }) {
  const year = Number(sp.y) || 1995;
  const dateStr = sp.d || new Date().toISOString().split("T")[0];
  const r = tuViNgay(year, new Date(dateStr + "T00:00:00"));
  const vc = r.verdict === "tốt" ? "var(--success)" : r.verdict === "xấu" ? "var(--danger)" : "var(--warning)";
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Tử vi hàng ngày</h1>
      <FullForm sp={sp} actionLabel="Xem tử vi ngày" extra={<L label="Ngày xem"><input type="date" name="date" defaultValue={dateStr} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-4 py-2.5 text-sm text-[var(--text-primary)]" /></L>} />
      <Card glow>
        <div className="text-center mb-4"><div className="text-sm text-[var(--text-muted)]">{dateStr}</div><Badge color={vc}>{r.verdict.toUpperCase()}</Badge></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><div className="text-xs text-[var(--text-muted)]">Tuổi</div><div className="font-bold text-[var(--text-primary)]">{r.c.can} {r.c.chi} ({r.c.animal})</div></div>
          <div><div className="text-xs text-[var(--text-muted)]">Ngày</div><div className="font-bold text-[var(--text-primary)]">{r.dayChi}</div></div>
        </div>
        <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">{r.advice}</p>
      </Card>
    </div>
  );
}

/* 2. TỬ VI 2026 */
function TuViNam2026({ searchParams: sp }: { searchParams: Record<string, string> }) {
  const year = Number(sp.y) || 1995;
  const r = tuVi2026(year);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Tử vi 2026 — Bính Ngọ</h1>
      <FullForm sp={sp} actionLabel="Xem tử vi 2026" />
      <Card glow>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-lg font-bold text-[var(--accent)] border border-[var(--accent)]/30">{r.chi}</div>
          <div><div className="font-display text-xl font-bold text-[var(--text-primary)]">{r.can} {r.chi} — {r.animal}</div><div className="text-sm text-[var(--text-muted)]">Mệnh: {r.element}</div></div>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{r.o}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[{t:"Sự nghiệp",v:r.c},{t:"Tình duyên",v:r.l},{t:"Sức khỏe",v:r.h},{t:"Tài chính",v:r.m}].map(x=>(
            <div key={x.t} className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-xs font-semibold text-[var(--accent)] mb-1">{x.t}</div><div className="text-sm text-[var(--text-secondary)]">{x.v}</div></div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {r.mo.map((m: string, i: number) => <div key={i} className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-2 text-center"><div className="text-[10px] text-[var(--text-muted)]">Tháng {i + 1}</div><div className="text-xs font-medium text-[var(--text-primary)]">{m}</div></div>)}
      </div>
    </div>
  );
}

/* 3. TỬ VI THEO NĂM */
function TuViTheoNam({ searchParams: sp }: { searchParams: Record<string, string> }) {
  const year = Number(sp.y) || 1995;
  const vy = Number(sp.vy) || 2026;
  const r = tuViNam(year, vy);
  const sc = r.score >= 70 ? "var(--success)" : r.score >= 40 ? "var(--accent)" : "var(--danger)";
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Tử vi theo năm</h1>
      <FullForm sp={sp} actionLabel="Xem tử vi theo năm" extra={<L label="Năm xem"><YS n="vy" v={String(vy)} /></L>} />
      <Card glow>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-20 w-20"><svg className="-rotate-90" width={80} height={80}><circle cx={40} cy={40} r={32} stroke="var(--border)" strokeWidth={6} fill="none" /><circle cx={40} cy={40} r={32} stroke={sc} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray={2*Math.PI*32} strokeDashoffset={2*Math.PI*32*(1-r.score/100)} /></svg><span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[var(--text-primary)]">{r.score}</span></div>
          <div><Badge color={sc}>{r.label}</Badge><div className="mt-1 text-sm text-[var(--text-muted)]">{r.c.can} {r.c.chi} vs {r.view.can} {r.view.chi}</div></div>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{r.isH ? "Năm hợp tuổi, thuận lợi." : r.isX ? "Năm xung tuổi, cẩn trọng." : "Năm bình hòa với tuổi."}</p>
      </Card>
    </div>
  );
}

/* 4. TRỌN ĐỜI */
function TuViTronDoiPage({ searchParams: sp }: { searchParams: Record<string, string> }) {
  const year = Number(sp.y) || 1995;
  const r = tuViTronDoi(year);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Tử vi trọn đời</h1>
      <FullForm sp={sp} actionLabel="Xem tử vi trọn đời" />
      <Card glow>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold border border-[var(--accent)]/30">{r.c.chi}</div>
          <div><div className="font-display text-lg font-bold text-[var(--text-primary)]">{r.c.can} {r.c.chi} — {r.c.element}</div><div className="text-sm text-[var(--text-muted)]">Cung mệnh: {r.cung}</div></div>
        </div>
        <div className="space-y-3">
          {r.stages.map((s: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[10px] font-bold text-[var(--accent)]">{i + 1}</span>
              <p className="text-sm text-[var(--text-secondary)]">{s}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* 5. 12 CON GIÁP */
function TuVi12Giap() {
  const years = [2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Tử vi 12 con giáp</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {years.map(y => { const c = getConGiap(y); const info = getConGiapInfo(c.chi); return (
          <Card key={y}>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-lg font-bold text-[var(--accent)] border border-[var(--accent)]/30">{c.chi}</div>
              <div><div className="font-bold text-[var(--text-primary)]">{c.can} {c.chi} — {c.animal}</div><div className="text-xs text-[var(--text-muted)]">{y} • {c.element}</div></div>
            </div>
            <div className="mb-1"><span className="text-xs text-[var(--text-muted)]">Tính cách: </span><span className="text-xs text-[var(--text-secondary)]">{info.t.join(", ")}</span></div>
            <div className="mb-1"><span className="text-xs text-[var(--text-muted)]">Hợp: </span><span className="text-xs text-[var(--success)]">{info.b.join(", ")}</span></div>
            <div className="mb-1"><span className="text-xs text-[var(--text-muted)]">Khắc: </span><span className="text-xs text-[var(--danger)]">{info.w.join(", ")}</span></div>
            <div className="mb-1"><span className="text-xs text-[var(--text-muted)]">Số may mắn: </span><span className="text-xs text-[var(--accent)]">{info.lk[0]}</span></div>
            <div><span className="text-xs text-[var(--text-muted)]">Nghề: </span><span className="text-xs text-[var(--text-secondary)]">{info.cr.join(", ")}</span></div>
          </Card>
        ); })}
      </div>
    </div>
  );
}

/* 6. TỨ TRỤ */
function TuTruPage({ searchParams: sp }: { searchParams: Record<string, string> }) {
  const y = Number(sp.y) || 1995, m = Number(sp.m) || 6, d = Number(sp.d) || 15, h = Number(sp.h) || 12;
  const r = tuTru(y, m, d, h);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Lập lá số tứ trụ</h1>
      <Card>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 max-w-xl items-end">
          <L label="Năm"><YS n="y" v={String(y)} /></L>
          <L label="Tháng"><select name="m" defaultValue={m} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2.5 text-sm text-[var(--text-primary)]">{Array.from({length:12},(_,i)=>i+1).map(v=><option key={v} value={v}>{v}</option>)}</select></L>
          <L label="Ngày"><DS n="d" v={String(d)} /></L>
          <L label="Giờ"><HS n="h" v={String(h)} /></L>
          <div className="col-span-2 sm:col-span-4 flex justify-center"><S label="Lập tứ trụ" /></div>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-4">
        {[{t:"Năm",v:r.nam,c:"var(--accent)"},{t:"Tháng",v:r.thang,c:"var(--success)"},{t:"Ngày",v:r.ngay,c:"var(--warning)"},{t:"Giờ",v:r.gio,c:"var(--danger)"}].map(x=> (
          <Card key={x.t} glow><div className="text-xs text-[var(--text-muted)] mb-1">{x.t}</div><div className="font-display text-lg font-bold" style={{color:x.c}}>{x.v}</div></Card>
        ))}
      </div>
    </div>
  );
}

/* 7. CĂN XƯƠNG */
function CanXuongPage({ searchParams: sp }: { searchParams: Record<string, string> }) {
  const year = Number(sp.y) || 1995;
  const r = canXuongTinhSo(year);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Căn xương tính số (Nạp âm)</h1>
      <FullForm sp={sp} actionLabel="Tra cứu nạp âm" />
      <Card glow>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold border border-[var(--accent)]/30">{r.cc.chi}</div>
          <div><div className="font-display text-lg font-bold text-[var(--text-primary)]">{r.cc.can} {r.cc.chi}</div><div className="text-sm text-[var(--text-muted)]">{r.cc.element}</div></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-xs text-[var(--text-muted)] mb-1">Nạp âm</div><div className="text-sm font-bold text-[var(--accent)]">{r.napAm}</div></div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-xs text-[var(--text-muted)] mb-1">Ngũ hành nạp âm</div><div className="text-sm font-bold text-[var(--success)]">{r.element}</div></div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-3"><div className="text-xs text-[var(--text-muted)] mb-1">Luận giải</div><div className="text-sm text-[var(--text-secondary)]">{r.desc}</div></div>
        </div>
      </Card>
    </div>
  );
}

/* 8. THỐNG KÊ */
function ThongKePage() {
  const stats = thongKeCanXuong().slice(0, 12);
  const max = stats[0]?.count || 1;
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Thống kê nạp âm</h1>
      <p className="text-sm text-[var(--text-muted)]">Phân bố 30 loại nạp âm qua các năm 1924–2026</p>
      <Card>
        <div className="space-y-3">
          {stats.map(s => (
            <div key={s.name} className="flex items-center gap-3">
              <div className="w-32 shrink-0 text-xs text-[var(--text-secondary)] truncate">{s.name}</div>
              <div className="flex-1 h-5 rounded-full bg-[var(--border-subtle)] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-rose-400" style={{ width: `${(s.count / max) * 100}%` }} /></div>
              <div className="w-8 text-right text-xs font-medium text-[var(--text-primary)]">{s.count}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* MAIN */
export default async function TuViPage({ params, searchParams }: { params: Promise<{ slug: string[] }>; searchParams: Promise<Record<string, string>> }) {
  const { slug: slugArr } = await params;
  const sp = await searchParams;
  const slug = slugArr?.[0] || "";
  const nav = [{k:"ngay",l:"Hàng ngày"},{k:"nam",l:"2026"},{k:"nam-sinh",l:"Theo năm"},{k:"tron-doi",l:"Trọn đời"},{k:"12-giap",l:"12 con giáp"},{k:"tu-tru",l:"Tứ trụ"},{k:"can-xuong",l:"Căn xương"},{k:"thong-ke",l:"Thống kê"}];
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />
      <div className="flex flex-wrap gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-1 mb-6">
        {nav.map(n => <Link key={n.k} href={`/tu-vi/${n.k}/`} className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap min-h-[36px] ${slug===n.k?"bg-[var(--accent)]/10 text-[var(--accent)]":"text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>{n.l}</Link>)}
      </div>
      <Suspense fallback={<div className="text-center py-12 text-sm text-[var(--text-muted)]">Đang tải...</div>}>
        {slug==="ngay" && <TuViNgay searchParams={sp} />}
        {slug==="nam" && <TuViNam2026 searchParams={sp} />}
        {slug==="nam-sinh" && <TuViTheoNam searchParams={sp} />}
        {slug==="tron-doi" && <TuViTronDoiPage searchParams={sp} />}
        {slug==="12-giap" && <TuVi12Giap />}
        {slug==="tu-tru" && <TuTruPage searchParams={sp} />}
        {slug==="can-xuong" && <CanXuongPage searchParams={sp} />}
        {slug==="thong-ke" && <ThongKePage />}
        {!nav.find(n=>n.k===slug) && <div className="text-center py-12 text-[var(--text-muted)]">Chọn một mục ở trên</div>}
      </Suspense>
    </div>
  );
}
