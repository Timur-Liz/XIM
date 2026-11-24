"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FlaskConical, Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Главная" },
  { href: "/generate", label: "Генератор" },
  { href: "/catalog", label: "Библиотека" },
  { href: "/program", label: "Программа" },
  { href: "/methodology", label: "Методика" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/about", label: "О проекте" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="btn-grad flex h-10 w-10 items-center justify-center rounded-xl text-white">
            <FlaskConical size={22} />
          </span>
          <span className="leading-tight">
            <span className="font-display block text-sm font-bold tracking-tight sm:text-base">
              Хим-<span className="grad-text">Помощник</span>
            </span>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              ИИ для учителей химии · 7–11 кл.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-emerald-500 to-violet-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/generate"
            className="btn-grad hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white sm:flex"
          >
            <Sparkles size={16} />
            Сгенерировать
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-label="Меню"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                pathname === l.href
                  ? "bg-gradient-to-r from-emerald-500 to-violet-500 text-white"
                  : "text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
