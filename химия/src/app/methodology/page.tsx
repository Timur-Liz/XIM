import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, Users, Target, FlaskConical, BookOpenCheck, Trophy, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Методическая копилка — Хим-Помощник",
  description: "Приёмы, шаблоны и статьи для учителей химии: как проводить уроки, проверять знания и готовить к ЦТ.",
};

const ARTICLES = [
  {
    icon: Lightbulb,
    tag: "Приём урока",
    title: "«Химический диктант» за 5 минут",
    desc: "Как проводить быстрый опрос по формулам и уравнениям без стресса для учеников. Шаблон карточек и критерии оценивания.",
    color: "from-amber-500 to-orange-500",
    time: "4 мин чтения",
  },
  {
    icon: Users,
    tag: "Групповая работа",
    title: "Метод «мозгового штурма» на уроке химии",
    desc: "Разбираем приём: как организовать обсуждение гипотез перед экспериментом и научить детей аргументировать.",
    color: "from-emerald-500 to-teal-500",
    time: "6 мин чтения",
  },
  {
    icon: Target,
    tag: "Подготовка к ЦТ",
    title: "Готовим к ЦТ по химии: план на четверть",
    desc: "Пошаговая система повторения: от моля и ОВР до органики. Какие темы дают больше баллов и как их закрепить.",
    color: "from-violet-500 to-purple-500",
    time: "8 мин чтения",
  },
  {
    icon: FlaskConical,
    tag: "Эксперимент",
    title: "Безопасные опыты без реактивов",
    desc: "Виртуальные и бытовые эксперименты: уксус + сода, растворение, кристаллизация. Что можно показать дома и в классе.",
    color: "from-pink-500 to-rose-500",
    time: "5 мин чтения",
  },
  {
    icon: BookOpenCheck,
    tag: "Шаблон",
    title: "Шаблон рабочего листа: 3 части",
    desc: "Разминка, основная часть и рефлексия — структура, которая работает. Скачайте шаблон и адаптируйте под свой параграф.",
    color: "from-cyan-500 to-sky-500",
    time: "3 мин чтения",
  },
  {
    icon: Trophy,
    tag: "Олимпиады",
    title: "Как готовить к олимпиаде по химии",
    desc: "Нестандартные задачи, исследовательские проекты и разбор олимпиадных заданий прошлых лет — с чего начать.",
    color: "from-indigo-500 to-blue-500",
    time: "7 мин чтения",
  },
];

export default function MethodologyPage() {
  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-600 via-sky-600 to-indigo-700 px-6 py-10 text-white sm:px-10">
        <Lightbulb className="animate-floaty absolute -right-4 -top-4 opacity-20" size={160} />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles size={14} /> Методическая копилка
        </span>
        <h1 className="font-display mt-4 text-2xl font-bold sm:text-4xl">Приёмы и шаблоны для уроков</h1>
        <p className="mt-2 max-w-xl text-white/85">
          Практические статьи от учителей для учителей: уроки, контроль, эксперименты и подготовка к ЦТ.
        </p>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a) => (
          <article key={a.title} className="glass card-hover flex flex-col rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-lg`}>
                <a.icon size={24} />
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {a.tag}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-extrabold leading-snug">{a.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{a.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{a.time}</span>
              <Link href="/generate" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700 hover:gap-2.5 dark:text-emerald-300">
                Применить <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="glass mt-8 rounded-3xl p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold">Быстрый старт: шаблон урока на 45 минут</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["0–5 мин", "Актуализация", "Опрос, диктант, повторение"],
            ["5–20 мин", "Изучение", "Объяснение + демонстрация"],
            ["20–35 мин", "Закрепление", "Рабочий лист, задачи"],
            ["35–45 мин", "Итоги", "Рефлексия + домашнее задание"],
          ].map(([t, title, d]) => (
            <div key={t} className="rounded-2xl bg-white/70 p-4 dark:bg-slate-800/70">
              <span className="rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 px-3 py-1 text-xs font-extrabold text-white">{t}</span>
              <p className="mt-2.5 font-extrabold">{title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{d}</p>
            </div>
          ))}
        </div>
        <Link href="/generate" className="btn-grad mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-extrabold text-white">
          <Sparkles size={17} /> Сгенерировать план урока
        </Link>
      </section>
    </div>
  );
}
