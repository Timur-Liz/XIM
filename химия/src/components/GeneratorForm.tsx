"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Sparkles, BookOpen, Gauge, Languages, CheckSquare, Loader2 } from "lucide-react";
import type { GenerateRequest, Grade, Difficulty, Lang, MaterialType } from "@/types";

interface Props {
  initialTopic?: string;
  initialGrade?: Grade;
  loading: boolean;
  onSubmit: (req: GenerateRequest) => void;
}

const GRADES: Grade[] = [7, 8, 9, 10, 11];

const DIFFS: Array<{ id: Difficulty; label: string; desc: string }> = [
  { id: "easy", label: "Лёгкий", desc: "с опорой" },
  { id: "medium", label: "Средний", desc: "по учебнику" },
  { id: "hard", label: "Сложный", desc: "повышенный" },
  { id: "olympiad", label: "Олимпиадный", desc: "нестандартный" },
];

const TYPES: Array<{ id: MaterialType; label: string }> = [
  { id: "all", label: "Весь комплект" },
  { id: "worksheet", label: "Рабочий лист" },
  { id: "plan", label: "План урока" },
  { id: "quiz", label: "Викторина" },
  { id: "cheat", label: "Шпаргалка" },
];

const EXAMPLES = ["§14. Кислоты", "Кислоты, 8 класс", "Периодический закон", "Спирты. Этанол", "Белки", "§9. Кислород. Оксиды"];

export default function GeneratorForm({ initialTopic = "", initialGrade = 8, loading, onSubmit }: Props) {
  const [grade, setGrade] = useState<Grade>(initialGrade);
  const [topic, setTopic] = useState(initialTopic);
  const [materialType, setMaterialType] = useState<MaterialType>("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [lang, setLang] = useState<Lang>("ru");
  const [includeQuiz, setIncludeQuiz] = useState(true);
  const [includeCrossword, setIncludeCrossword] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Введите тему или номер параграфа — например, «§14. Кислоты»");
      return;
    }
    setError("");
    onSubmit({ grade, topic: topic.trim(), materialType, difficulty, lang, includeQuiz, includeCrossword });
  };

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="btn-grad flex h-11 w-11 items-center justify-center rounded-2xl text-white">
          <FlaskConical size={22} />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold">Генератор материалов</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Введите параграф — ИИ соберёт комплект за 30 секунд</p>
        </div>
      </div>

      {/* grade */}
      <div className="mt-6">
        <label className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-700 dark:text-slate-200">
          <BookOpen size={16} className="text-emerald-600" /> Класс *
        </label>
        <div className="grid grid-cols-5 gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGrade(g)}
              className={`relative rounded-2xl py-3 text-base font-extrabold transition ${
                grade === g ? "text-white" : "bg-white/70 text-slate-600 hover:bg-emerald-50 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {grade === g && <motion.span layoutId="grade-pill" className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-violet-600 shadow-lg" transition={{ type: "spring", stiffness: 350, damping: 28 }} />}
              <span className="relative z-10">{g}</span>
            </button>
          ))}
        </div>
      </div>

      {/* topic */}
      <div className="mt-5">
        <label className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-700 dark:text-slate-200">
          <Sparkles size={16} className="text-violet-600" /> Тема / номер параграфа *
        </label>
        <input
          value={topic}
          onChange={(e) => { setTopic(e.target.value); setError(""); }}
          placeholder="Например: §14. Кислоты или «Кислоты, 8 класс»"
          className={`w-full rounded-2xl border-2 bg-white/80 px-4 py-3.5 text-base font-semibold outline-none transition placeholder:font-normal placeholder:text-slate-400 dark:bg-slate-900/60 ${
            error ? "border-rose-400" : "border-slate-200 focus:border-emerald-400 dark:border-slate-700 dark:focus:border-emerald-500"
          }`}
        />
        {error && <p className="mt-2 text-sm font-semibold text-rose-600">{error}</p>}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setTopic(ex)}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-500/20"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* type + difficulty */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-700 dark:text-slate-200">
            <CheckSquare size={16} className="text-amber-600" /> Тип материала
          </label>
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMaterialType(t.id)}
                className={`rounded-full px-3.5 py-2 text-xs font-bold transition ${
                  materialType === t.id ? "bg-gradient-to-r from-emerald-500 to-violet-500 text-white shadow" : "bg-white/70 text-slate-600 hover:bg-emerald-50 dark:bg-slate-800/70 dark:text-slate-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-700 dark:text-slate-200">
            <Gauge size={16} className="text-pink-600" /> Сложность
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {DIFFS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id)}
                className={`rounded-xl px-3 py-2 text-left transition ${
                  difficulty === d.id ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow" : "bg-white/70 text-slate-600 hover:bg-amber-50 dark:bg-slate-800/70 dark:text-slate-300"
                }`}
              >
                <span className="block text-xs font-extrabold">{d.label}</span>
                <span className="block text-[10px] opacity-80">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* lang + checkboxes */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Languages size={16} className="text-cyan-600" />
          <button type="button" onClick={() => setLang("ru")} className={`rounded-full px-3.5 py-2 text-xs font-bold ${lang === "ru" ? "bg-cyan-500 text-white" : "bg-white/70 text-slate-600 dark:bg-slate-800/70 dark:text-slate-300"}`}>Русский</button>
          <button type="button" onClick={() => setLang("by")} className={`rounded-full px-3.5 py-2 text-xs font-bold ${lang === "by" ? "bg-cyan-500 text-white" : "bg-white/70 text-slate-600 dark:bg-slate-800/70 dark:text-slate-300"}`}>Беларуская</button>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
          <input type="checkbox" checked={includeQuiz} onChange={(e) => setIncludeQuiz(e.target.checked)} className="h-5 w-5 accent-emerald-500" />
          Викторина
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
          <input type="checkbox" checked={includeCrossword} onChange={(e) => setIncludeCrossword(e.target.checked)} className="h-5 w-5 accent-violet-500" />
          Кроссворд
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-grad mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-extrabold text-white disabled:opacity-60"
      >
        {loading ? <><Loader2 className="animate-spin" size={20} /> ИИ думает…</> : <><Sparkles size={20} /> Сгенерировать материалы</>}
      </button>
      <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-500">
        Без API-ключа работает демо-режим с готовыми шаблонами по программе РБ.
      </p>
    </form>
  );
}
