"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, Clock, Sparkles } from "lucide-react";
import { PROGRAM } from "@/lib/program";

export default function ProgramPage() {
  const [openGrade, setOpenGrade] = useState<number>(8);

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 px-6 py-10 text-white sm:px-10">
        <BookOpen className="animate-floaty absolute -right-4 -top-4 opacity-20" size={160} />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles size={14} /> Учебная программа РБ
        </span>
        <h1 className="font-display mt-4 text-2xl font-bold sm:text-4xl">Химия 7–11 классов</h1>
        <p className="mt-2 max-w-xl text-white/85">
          Темы по классам в соответствии с учебной программой Республики Беларусь. Нажмите на тему — и сгенерируйте материалы к ней.
        </p>
      </section>

      <div className="mt-6 space-y-4">
        {PROGRAM.map((g) => {
          const open = openGrade === g.grade;
          return (
            <div key={g.grade} className="glass overflow-hidden rounded-3xl">
              <button onClick={() => setOpenGrade(open ? 0 : g.grade)} className="flex w-full items-center gap-4 p-5 text-left sm:p-6">
                <span className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${g.color}, #8B5CF6)` }}>
                  {g.grade}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-extrabold">{g.title}</span>
                  <span className="block truncate text-sm text-slate-600 dark:text-slate-400">{g.subtitle}</span>
                </span>
                <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 sm:block dark:bg-slate-800 dark:text-slate-300">
                  {g.topics.length} тем · {g.topics.reduce((s, t) => s + t.hours, 0)} ч
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={22} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-3 border-t border-slate-200/70 p-5 sm:grid-cols-2 sm:p-6 dark:border-slate-700/60">
                      {g.topics.map((t) => (
                        <div key={t.title} className="card-hover rounded-2xl bg-white/70 p-4 dark:bg-slate-800/70">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-extrabold leading-snug">{t.title}</h3>
                            <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-extrabold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                              <Clock size={11} /> {t.hours} ч
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t.desc}</p>
                          <Link
                            href={`/generate?grade=${g.grade}&topic=${encodeURIComponent(t.title)}`}
                            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 px-4 py-2 text-xs font-extrabold text-white shadow transition hover:brightness-110"
                          >
                            <Sparkles size={13} /> Сгенерировать к теме
                          </Link>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
