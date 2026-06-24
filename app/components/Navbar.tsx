"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Sun, ChevronDown } from "lucide-react";
import { useSeason, type SeasonTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { NAV_GROUPS } from "../data/nav-menu";

const seasonOptions: { value: SeasonTheme; label: string }[] = [
  { value: "default", label: "Mặc định" },
  { value: "tet", label: "Tết" },
  { value: "valentine", label: "Valentine" },
  { value: "vulan", label: "Vu Lan" },
  { value: "noel", label: "Noel" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [seasonOpen, setSeasonOpen] = useState(false);
  const pathname = usePathname();
  const { season, setSeason } = useSeason();

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-400">
              <Sparkles className="h-5 w-5 text-[var(--surface)]" />
            </div>
            <span className="font-display text-xl font-bold text-[var(--text-primary)] tracking-tight">
              Tâm Linh <span className="text-[var(--accent)]">Việt</span>
            </span>
          </Link>

          {/* Desktop mega menu */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_GROUPS.map((g) => {
              const isActive = g.items.some((i) => pathname === i.href);
              const isOpen = openGroup === g.label;
              const Icon = g.icon;
              return (
                <div
                  key={g.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(g.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {g.label}
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-2"
                      >
                        <div className="w-56 rounded-xl glass-strong border border-[var(--border)] shadow-xl overflow-hidden py-2">
                          {g.items.map((item) => {
                            const ItemIcon = item.icon;
                            const active = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                                  active
                                    ? "text-[var(--accent)] bg-[var(--accent)]/10"
                                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                                )}
                              >
                                {ItemIcon ? (
                                  <ItemIcon className="h-3.5 w-3.5 shrink-0" />
                                ) : (
                                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)] shrink-0" />
                                )}
                                <span className="flex-1">{item.label}</span>
                                {item.hot && (
                                  <span className="rounded bg-[var(--danger)]/10 px-1.5 py-0.5 text-[10px] font-bold text-[var(--danger)]">
                                    Hot
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right side: season + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative hidden sm:block">
              <button
                onClick={() => setSeasonOpen(!seasonOpen)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors"
              >
                <Sun className="h-3.5 w-3.5" />
                <span className="capitalize">
                  {seasonOptions.find((s) => s.value === season)?.label}
                </span>
              </button>
              <AnimatePresence>
                {seasonOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 mt-2 w-40 rounded-xl glass-strong py-2 shadow-xl z-50"
                  >
                    {seasonOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSeason(opt.value); setSeasonOpen(false); }}
                        className={cn(
                          "w-full px-4 py-2 text-left text-sm transition-colors",
                          season === opt.value
                            ? "text-[var(--accent)] bg-[var(--accent)]/10"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — accordion */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-[var(--border)]"
          >
            <div className="px-4 py-3 max-h-[70vh] overflow-y-auto">
              {NAV_GROUPS.map((g) => {
                const expanded = openGroup === g.label;
                const GroupIcon = g.icon;
                return (
                  <div key={g.label} className="mb-1">
                    <button
                      onClick={() => setOpenGroup(expanded ? null : g.label)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
                    >
                      {GroupIcon && <GroupIcon className="h-4 w-4 text-[var(--accent)]" />}
                      <span className="flex-1 text-left">{g.label}</span>
                      <ChevronDown className={cn("h-4 w-4 text-[var(--text-muted)] transition-transform", expanded && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-9 pr-2 pb-1 space-y-0.5">
                            {g.items.map((item) => {
                              const ItemIcon = item.icon;
                              const active = pathname === item.href;
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={cn(
                                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                                    active
                                      ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                                  )}
                                >
                                  {ItemIcon ? <ItemIcon className="h-3.5 w-3.5" /> : <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />}
                                  <span className="flex-1">{item.label}</span>
                                  {item.hot && (
                                    <span className="rounded bg-[var(--danger)]/10 px-1.5 py-0.5 text-[10px] font-bold text-[var(--danger)]">Hot</span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="pt-3 border-t border-[var(--border)] mt-2">
                <p className="px-3 text-xs text-[var(--text-muted)] mb-1.5">Giao diện theo mùa</p>
                <div className="flex flex-wrap gap-1.5 px-3">
                  {seasonOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSeason(opt.value)}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs transition-colors",
                        season === opt.value
                          ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30"
                          : "bg-[var(--border-subtle)] text-[var(--text-muted)] border border-[var(--border)]"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
