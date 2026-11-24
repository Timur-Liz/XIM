"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, Search, Trash2, Eye, FlaskConical, Sparkles, X } from "lucide-react";
import type { GeneratedMaterial } from "@/types";
import { loadMaterials, deleteMaterial } from "@/lib/storage";
import ResultTabs from "@/components/ResultTabs";

export default function CatalogPage() {
  const [items, setItems] = useState<GeneratedMaterial[]>([]);
  const [query, setQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState<number | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadMaterials());
  }, []);

  const filtered = useMemo(() => {
    return items.filter((m) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || m.topic.toLowerCase().includes(q) || String(m.grade).includes(q);
      const matchG = gradeFilter === "all" || m.grade === gradeFilter;
      return matchQ && matchG;
    });
  }, [items, query, gradeFilter]);

  const openItem = openId ? items.find((m) => m.id === openId) : null;

  const remove = (id: string) => {
    deleteMaterial(id);
    setItems(loadMaterials());
    if (openId === id) setOpenId(null);
  };

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 px-6 py-10 text-white sm:px-10">
        <Library className="animate-floaty absolute -right-4 -top-4 opacity-20" size={160} />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles size={14} /> Библиотека
        </span>
        <h1 className="font-display mt-4 text-2xl font-bold sm:text-4xl">Мои материалы</h1>
        <p className="mt-2 max-w-xl text-white/85">
          Все сгенерированные комплекты хранятся в вашем браузере (localStorage). Ищите, фильтруйте, открывайте и экспортируйте.
        </p>
      </section>

      <div className="glass mt-6 flex flex-col gap-3 rounded-3xl p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по теме или классу…"
            className="w-full rounded-full border-2 border-slate-200 bg-white/80 py-3 pl-11 pr-4 font-semibold outline-none transition focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900/60"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", 7, 8, 9, 10, 11] as const).map((g) => (
            <button
              key={String(g)}
              onClick={() => setGradeFilter(g)}
              className={`rounded-full px-4 py-2.5 text-sm font-extrabold transition ${
                gradeFilter === g ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow" : "bg-white/70 text-slate-600 hover:bg-violet-50 dark:bg-slate-800/70 dark:text-slate-300"
              }`}
            >
              {g === "all" ? "Все" : `${g} кл.`}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openItem && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass mt-6 rounded-3xl p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold">{openItem.topic} · {openItem.grade} класс</h2>
              <button onClick={() => setOpenId(null)} className="glass flex h-9 w-9 items-center justify-center rounded-full" aria-label="Закрыть">
                <X size={17} />
              </button>
            </div>
            <ResultTabs material={openItem} />
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length === 0 ? (
        <div className="glass mt-6 flex min-h-[320px] flex-col items-center justify-center rounded-3xl p-8 text-center">
          <FlaskConical size={64} className="animate-floaty text-violet-400" />
          <h3 className="font-display mt-4 text-xl font-bold">Пока пусто</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
            {items.length === 0
              ? "Вы ещё ничего не генерировали. Перейдите в генератор и создайте первый комплект!"
              : "Ничего не найдено по вашему запросу. Попробуйте изменить поиск или фильтр."}
          </p>
          <a href="/generate" className="btn-grad mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 font-extrabold text-white">
            <Sparkles size={17} /> Перейти в генератор
          </a>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass card-hover flex flex-col rounded-3xl p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 px-3 py-1 text-xs font-extrabold text-white">{m.grade} класс</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {new Date(m.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                </span>
              </div>
              <h3 className="mt-3 line-clamp-2 font-extrabold leading-snug">{m.topic}</h3>
              <p className="mt-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {m.quiz.length > 0 ? `Викторина: ${m.quiz.length} вопр. · ` : ""}Карточки: {m.flashcards.length}{m.mock ? " · демо" : " · ИИ"}
              </p>
              <div className="mt-4 flex gap-2 pt-1">
                <button onClick={() => setOpenId(m.id)} className="btn-grad flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-extrabold text-white">
                  <Eye size={15} /> Открыть
                </button>
                <button onClick={() => remove(m.id)} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-200 text-rose-500 transition hover:bg-rose-50 dark:border-rose-500/30 dark:hover:bg-rose-500/10" aria-label="Удалить">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
