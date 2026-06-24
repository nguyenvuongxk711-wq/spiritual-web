"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type SeasonTheme =
  | "default"
  | "tet"
  | "valentine"
  | "vulan"
  | "noel";

interface ThemeContextType {
  season: SeasonTheme;
  setSeason: (s: SeasonTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  season: "default",
  setSeason: () => {},
});

export function useSeason() {
  return useContext(ThemeContext);
}

function getAutoSeason(): SeasonTheme {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // Simple date-based mapping (lunar approx for demo)
  // Tet: Jan-Feb
  if (month === 1 || (month === 2 && day <= 15)) return "tet";
  // Valentine: Feb
  if (month === 2 && day >= 10 && day <= 20) return "valentine";
  // Vu Lan (July lunar ~ Aug-Sep solar)
  if (month === 8 || month === 9) return "vulan";
  // Noel: Dec
  if (month === 12) return "noel";
  return "default";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<SeasonTheme>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("season-theme") as SeasonTheme | null;
    if (saved) {
      setSeason(saved);
    } else {
      setSeason(getAutoSeason());
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-season", season);
    localStorage.setItem("season-theme", season);
  }, [season, mounted]);

  return (
    <ThemeContext.Provider value={{ season, setSeason }}>
      {children}
    </ThemeContext.Provider>
  );
}
