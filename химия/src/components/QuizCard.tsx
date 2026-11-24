"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Lightbulb, RotateCcw, Trophy, Brain } from "lucide-react";
import type { QuizQuestion } from "@/types";

export default function QuizCard({ questions }: { questions: QuizQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center text-slate-500">
        <Brain className="mx-auto mb-3 text-violet-400" size={36} />
        <p>Викторина не включена. Включите чекбокс «Викторина» в форме генератора.</p>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

  const choose = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplain(true);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplain(false);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowExplain(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const verdict = pct >= 80 ? "Отлично! Вы — настоящий химик! 🧪" : pct >= 50 ? "Хорошо! Ещё немного практики — и будет отлично." : "Не сдавайтесь! Повторите материал и попробуйте снова.";
    return (
      <div className="glass rounded-3xl p-8 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <Trophy size={56} className="mx-auto text-amber-500" />
        </motion.div>
        <h3 className="font-display mt-4 text-2xl font-bold">Викторина завершена!</h3>
        <p className="mt-2 text-lg font-bold grad-text">{score} из {questions.length} · {pct}%</p>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{verdict}</p>
        <button onClick={restart} className="btn-grad mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white">
          <RotateCcw size={17} /> Пройти заново
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
          Вопрос {current + 1} из {questions.length}
        </span>
        <span className="text-sm font-bold text-slate-500">Балл: {score}</span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-violet-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
          <h3 className="mt-5 text-lg font-extrabold leading-snug">{q.q}</h3>
          <div className="mt-4 grid gap-2.5">
            {q.options.map((opt, i) => {
              const isChosen = selected === i;
              const isCorrect = i === q.answer;
              let cls = "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-slate-800";
              if (selected !== null && isCorrect) cls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15";
              else if (isChosen && !isCorrect) cls = "border-rose-500 bg-rose-50 dark:bg-rose-500/15";
              else if (selected !== null) cls = "border-slate-200 opacity-60 dark:border-slate-700";
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-semibold transition ${cls}`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold dark:bg-slate-700">
                    {String.fromCharCode(1040 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {selected !== null && isCorrect && <CheckCircle2 className="shrink-0 text-emerald-600" size={20} />}
                  {isChosen && !isCorrect && <XCircle className="shrink-0 text-rose-500" size={20} />}
                </button>
              );
            })}
          </div>

          {showExplain && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex gap-2.5 rounded-2xl bg-amber-50 p-4 text-sm dark:bg-amber-500/10">
              <Lightbulb className="mt-0.5 shrink-0 text-amber-500" size={18} />
              <p><strong>Пояснение:</strong> {q.explain}</p>
            </motion.div>
          )}

          {selected !== null && (
            <button onClick={next} className="btn-grad mt-5 w-full rounded-full py-3 font-bold text-white sm:w-auto sm:px-8">
              {current + 1 >= questions.length ? "Показать результат" : "Следующий вопрос →"}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
