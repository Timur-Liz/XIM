"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ClipboardList, HelpCircle, Bookmark, Layers, Grid3X3, Sparkles, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import type { GeneratedMaterial } from "@/types";
import Markdown from "./Markdown";
import QuizCard from "./QuizCard";
import ExportButtons from "./ExportButtons";

type TabId = "worksheet" | "plan" | "quiz" | "cheat" | "flashcards" | "crossword";

const TABS: Array<{ id: TabId; label: string; icon: React.ReactNode; color: string }> = [
  { id: "worksheet", label: "Рабочий лист", icon: <FileText size={16} />, color: "from-emerald-500 to-teal-500" },
  { id: "plan", label: "План урока", icon: <ClipboardList size={16} />, color: "from-violet-500 to-purple-500" },
  { id: "quiz", label: "Викторина", icon: <HelpCircle size={16} />, color: "from-amber-500 to-orange-500" },
  { id: "cheat", label: "Шпаргалка", icon: <Bookmark size={16} />, color: "from-pink-500 to-rose-500" },
  { id: "flashcards", label: "Карточки", icon: <Layers size={16} />, color: "from-cyan-500 to-sky-500" },
  { id: "crossword", label: "Кроссворд", icon: <Grid3X3 size={16} />, color: "from-indigo-500 to-blue-500" },
];

interface Props {
  material: GeneratedMaterial;
  onRegenerate?: () => void;
  onAdjustDifficulty?: (dir: "easier" | "harder") => void;
  streaming?: boolean;
}

export default function ResultTabs({ material, onRegenerate, onAdjustDifficulty, streaming }: Props) {
  const [tab, setTab] = useState<TabId>("worksheet");
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const printRef = useRef<HTMLDivElement>(null);

  const activeMarkdown =
    tab === "worksheet" ? material.worksheet :
    tab === "plan" ? material.plan :
    tab === "cheat" ? material.cheat :
    tab === "crossword" ? material.crossword : "";

  const tabTitle = `${material.topic} — ${TABS.find((t) => t.id === tab)?.label}`;

  return (
    <div>
      {/* action bar */}
      <div className="no-print mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Sparkles size={13} />
          {material.mock ? "Демо-генерация (без API-ключа)" : "Сгенерировано ИИ"}
          {streaming && " · печатается…"}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {material.grade} класс · {material.topic}
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          {onRegenerate && (
            <button onClick={onRegenerate} className="inline-flex items-center gap-1.5 rounded-full border-2 border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-400 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
              <RefreshCw size={14} /> Заново
            </button>
          )}
          {onAdjustDifficulty && (
            <>
              <button onClick={() => onAdjustDifficulty("easier")} className="inline-flex items-center gap-1.5 rounded-full border-2 border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                <TrendingDown size={14} /> Упростить
              </button>
              <button onClick={() => onAdjustDifficulty("harder")} className="inline-flex items-center gap-1.5 rounded-full border-2 border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-amber-400 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                <TrendingUp size={14} /> Усложнить
              </button>
            </>
          )}
        </div>
      </div>

      {/* tabs */}
      <div className="no-print mb-4 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const active = tab === t.id;
          const empty = (t.id === "quiz" && material.quiz.length === 0) || (t.id === "crossword" && !material.crossword);
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                active ? "text-white" : "bg-white/70 text-slate-600 hover:bg-white dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {active && <motion.span layoutId="tab-pill" className={`absolute inset-0 rounded-full bg-gradient-to-r ${t.color} shadow-lg`} transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
              <span className="relative z-10 flex items-center gap-2">{t.icon}{t.label}{empty && <span className="text-[10px] opacity-70">(пусто)</span>}</span>
            </button>
          );
        })}
      </div>

      {/* export */}
      {(tab === "worksheet" || tab === "plan" || tab === "cheat" || tab === "crossword") && (
        <div className="no-print mb-4">
          <ExportButtons title={tabTitle} markdown={activeMarkdown} printRef={printRef} />
        </div>
      )}

      {/* content */}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          {tab === "quiz" ? (
            <QuizCard questions={material.quiz} />
          ) : tab === "flashcards" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {material.flashcards.map((c, i) => {
                const isFlipped = !!flipped[i];
                return (
                  <button
                    key={i}
                    onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
                    className="group relative h-44 [perspective:900px]"
                  >
                    <motion.div
                      className="absolute inset-0 [transform-style:preserve-3d]"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="glass absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-5 [backface-visibility:hidden]">
                        <span className="text-xs font-bold uppercase tracking-widest text-violet-500">Карточка {i + 1}</span>
                        <span className="mt-2 text-lg font-extrabold">{c.front}</span>
                        <span className="mt-3 text-xs font-semibold text-slate-400">Нажмите, чтобы перевернуть ↻</span>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-violet-600 p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-80">Ответ</span>
                        <span className="mt-2 text-sm font-semibold leading-relaxed">{c.back}</span>
                      </div>
                    </motion.div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div ref={printRef} className="glass print-area rounded-3xl p-6 sm:p-8">
              {activeMarkdown ? (
                <Markdown text={activeMarkdown} />
              ) : (
                <p className="py-10 text-center text-slate-500">
                  {tab === "crossword" ? "Кроссворд не включён. Включите чекбокс «Кроссворд» в форме генератора и сгенерируйте заново." : "Материал ещё генерируется…"}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
