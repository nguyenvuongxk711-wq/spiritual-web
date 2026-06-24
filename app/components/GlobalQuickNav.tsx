"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Compass, Search, Sparkles, X } from "lucide-react";
import { NAV_GROUPS } from "../data/nav-menu";
import { cn } from "../lib/utils";

export default function GlobalQuickNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string[]>(["Xem tử vi", "Xem ngày", "Tâm linh"]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_GROUPS;
    return NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(q)),
    })).filter((group) => group.items.length > 0 || group.label.toLowerCase().includes(q));
  }, [query]);

  const activeItem = NAV_GROUPS.flatMap((group) => group.items).find((item) => pathname === item.href || pathname.startsWith(item.href.replace(/\/$/, "")));

  return (
    <div className="fixed bottom-5 right-4 z-[60] print:hidden sm:right-5">
      {open && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-[var(--text-primary)]">Tất cả công cụ</div>
              <div className="truncate text-xs text-[var(--text-muted)]">{activeItem?.label || "Chọn nhanh chức năng cần xem"}</div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--border-subtle)] hover:text-[var(--text-primary)]">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm: tử vi, ngày tốt, tarot..."
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/60 py-2 pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)]/60"
              />
            </div>

            <div className="max-h-[62vh] space-y-2 overflow-y-auto pr-1">
              {groups.map((group) => {
                const Icon = group.icon;
                const isExpanded = query.trim() || expanded.includes(group.label);
                return (
                  <div key={group.label} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/35">
                    <button
                      onClick={() => setExpanded(isExpanded ? expanded.filter((g) => g !== group.label) : [...expanded, group.label])}
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-bold text-[var(--text-primary)]"
                    >
                      {Icon && <Icon className="h-4 w-4 text-[var(--accent)]" />}
                      <span className="flex-1">{group.label}</span>
                      <ChevronDown className={cn("h-4 w-4 text-[var(--text-muted)] transition-transform", isExpanded && "rotate-180")} />
                    </button>
                    {isExpanded && (
                      <div className="border-t border-[var(--border)] py-1">
                        {group.items.map((item) => {
                          const ItemIcon = item.icon;
                          const active = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                                active ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              {ItemIcon ? <ItemIcon className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />}
                              <span className="flex-1">{item.label}</span>
                              {item.hot && <span className="rounded bg-[var(--danger)]/10 px-1.5 py-0.5 text-[10px] font-bold text-[var(--danger)]">Hot</span>}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--surface)]/90 px-4 py-3 text-sm font-bold text-[var(--text-primary)] shadow-2xl shadow-black/30 backdrop-blur-xl transition-all hover:border-[var(--accent)]/60 hover:shadow-[0_0_30px_var(--accent-glow)]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--surface)]">
          <Compass className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">Mở công cụ</span>
      </button>
    </div>
  );
}
