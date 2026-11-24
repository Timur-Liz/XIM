"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("him-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("him-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Переключить тему"
      className="glass flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:scale-105 dark:text-amber-300"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
