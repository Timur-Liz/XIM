"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Brain, CheckCircle2 } from "lucide-react";
import GeneratorForm from "@/components/GeneratorForm";
import ResultTabs from "@/components/ResultTabs";
import type { GenerateRequest, GeneratedMaterial, Grade } from "@/types";
import { parseStreamed } from "@/lib/mock";
import { saveMaterial } from "@/lib/storage";

const THINKING_PHRASES = [
  "ИИ думает…",
  "Подбирает задания по программе РБ…",
  "Составляет уравнения реакций…",
  "Придумывает вопросы викторины…",
  "Оформляет рабочий лист…",
  "Почти готово…",
];

function GenerateInner() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [material, setMaterial] = useState<GeneratedMaterial | null>(null);
  const [streamText, setStreamText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [lastReq, setLastReq] = useState<GenerateRequest | null>(null);
  const [saved, setSaved] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const initialTopic = searchParams.get("topic") || "";
  const initialGrade = (Number(searchParams.get("grade")) || 8) as Grade;

  useEffect(() => {
    const t = setInterval(() => setPhraseIdx((i) => (i + 1) % THINKING_PHRASES.length), 1800);
    return () => clearInterval(t);
  }, []);

  const runGenerate = useCallback(async (req: GenerateRequest) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setSaved(false);
    setStreamText("");
    setLastReq(req);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) throw new Error("Ошибка генерации");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setStreamText(acc);
      }

      const parsed = parseStreamed(acc);
      const meta = (parsed.meta ?? {}) as Record<string, unknown>;
      const finalMaterial: GeneratedMaterial = {
        id: (meta.id as string) || `m_${Date.now().toString(36)}`,
        grade: req.grade,
        topic: req.topic,
        difficulty: req.difficulty,
        lang: req.lang,
        createdAt: new Date().toISOString(),
        worksheet: parsed.worksheet || "Материал генерируется…",
        plan: parsed.plan || "",
        cheat: parsed.cheat || "",
        quiz: parsed.quiz || [],
        flashcards: parsed.flashcards || [],
        crossword: parsed.crossword || "",
        mock: meta.mock === true || res.headers.get("X-Mock") === "1",
      };
      setMaterial(finalMaterial);
      saveMaterial(finalMaterial);
      setSaved(true);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setStreamText("Не удалось сгенерировать. Проверьте соединение и попробуйте ещё раз.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRegenerate = () => {
    if (lastReq) runGenerate({ ...lastReq, regenerate: true });
  };

  const handleAdjust = (dir: "easier" | "harder") => {
    if (!lastReq) return;
    const order: GenerateRequest["difficulty"][] = ["easy", "medium", "hard", "olympiad"];
    const idx = order.indexOf(lastReq.difficulty);
    const next = dir === "easier" ? order[Math.max(0, idx - 1)] : order[Math.min(order.length - 1, idx + 1)];
    runGenerate({ ...lastReq, difficulty: next });
  };

  return (
    <div>
      {/* hero banner */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 via-teal-600 to-violet-700 px-6 py-10 text-white sm:px-10">
        <FlaskConical className="animate-floaty absolute -right-4 -top-4 opacity-20" size={160} />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">
          <Brain size={14} /> Генератор ИИ
        </span>
        <h1 className="font-display mt-4 text-2xl font-bold sm:text-4xl">Соберите комплект к параграфу</h1>
        <p className="mt-2 max-w-xl text-white/85">
          Рабочий лист, план урока, викторина, шпаргалка и карточки — по программе РБ, с учётом класса и сложности.
        </p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr]">
        <div>
          <GeneratorForm initialTopic={initialTopic} initialGrade={initialGrade} loading={loading} onSubmit={runGenerate} />
          {saved && material && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
              <CheckCircle2 size={16} /> Сохранено в библиотеку (/catalog)
            </motion.p>
          )}
        </div>

        <div>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="btn-grad flex h-11 w-11 items-center justify-center rounded-2xl text-white">
                    <FlaskConical size={22} className="animate-pulse-glow" />
                  </span>
                  <div>
                    <p className="font-extrabold">{THINKING_PHRASES[phraseIdx]}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Стриминг ответа — результат появится ниже по мере генерации</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="skeleton h-6 w-2/3" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-5/6" />
                  <div className="skeleton h-4 w-4/6" />
                  <div className="skeleton h-24 w-full" />
                  <div className="skeleton h-4 w-3/4" />
                </div>
                {streamText && (
                  <pre className="mt-5 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-900 p-4 font-mono text-xs leading-relaxed text-emerald-200">
                    {streamText.slice(-3000)}
                  </pre>
                )}
              </motion.div>
            ) : material ? (
              <motion.div key={material.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <ResultTabs material={material} onRegenerate={handleRegenerate} onAdjustDifficulty={handleAdjust} />
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl p-8 text-center">
                <div className="animate-floaty">
                  <FlaskConical size={72} className="text-emerald-500" />
                </div>
                <h3 className="font-display mt-5 text-xl font-bold">Здесь появится результат</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Заполните форму слева: класс, тему параграфа, сложность — и нажмите «Сгенерировать».
                  Попробуйте примеры: «§14. Кислоты», «Спирты. Этанол», «Периодический закон».
                </p>
                <div className="mt-6 grid w-full max-w-md gap-2 text-left text-sm">
                  {["Рабочий лист с пропусками и таблицами", "План-конспект урока с таймингом", "Интерактивная викторина с пояснениями"].map((t) => (
                    <div key={t} className="flex items-center gap-2.5 rounded-2xl bg-white/70 px-4 py-3 font-semibold dark:bg-slate-800/70">
                      <CheckCircle2 size={17} className="shrink-0 text-emerald-600" /> {t}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="glass rounded-3xl p-10 text-center font-bold">Загрузка генератора…</div>}>
      <GenerateInner />
    </Suspense>
  );
}
