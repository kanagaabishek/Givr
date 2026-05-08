"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextValue {
  dark: boolean;
  accent: string;
  toggleDark: () => void;
  setAccent: (a: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  dark: false,
  accent: "teal",
  toggleDark: () => {},
  setAccent: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [accent, setAccentState] = useState("teal");

  useEffect(() => {
    document.body.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    document.body.dataset.accent = accent;
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ dark, accent, toggleDark: () => setDark(d => !d), setAccent: setAccentState }}>
      {children}
    </ThemeContext.Provider>
  );
}
