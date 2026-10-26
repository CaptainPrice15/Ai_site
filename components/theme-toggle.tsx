"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const storageKey = "signal-syntax-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch {
      // Keep using the system preference if browser storage is unavailable.
    }
    const initial = stored === "light" || stored === "dark" ? stored : media.matches ? "dark" : "light";
    root.dataset.theme = initial;
    setTheme(initial);

    const followSystem = (event: MediaQueryListEvent) => {
      let hasStoredChoice = false;
      try {
        hasStoredChoice = localStorage.getItem(storageKey) != null;
      } catch {
        // Without storage, keep following the system preference.
      }
      if (!hasStoredChoice) {
        const next = event.matches ? "dark" : "light";
        root.dataset.theme = next;
        setTheme(next);
      }
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // The selected theme still applies for the current page.
    }
    setTheme(next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle color theme"}
      title={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle color theme"}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon" aria-hidden="true">{theme === "dark" ? "☾" : "☼"}</span>
    </button>
  );
}
