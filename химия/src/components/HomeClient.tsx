"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, FileText, ClipboardList, HelpCircle, Bookmark, Layers,
  ArrowRight, Clock, ShieldCheck, Printer, Zap, BookOpen, Star, FlaskConical,
} from "lucide-react";
import { PROGRAM } from "@/lib/program";

const FEATURES = [
  { icon: FileText, title: "Рабочий лист", desc: "3 части: разминка, основная, рефлексия. Тесты, пропуски, таблицы, задачи.", color: "from-emerald-500 to-teal-500" },
  { icon: ClipboardList, title: "План-конспект урока", desc: "Цели, этапы с таймингом, вопросы, домашнее задание — готов к уроку.", color: "from-violet-500 to-purple-500" },
  { icon: HelpCircle, title: "Интерактивная викторина", desc: "7–8 вопросов с пояснениями. Ученики проходят прямо на сайте.", color: "from-amber-500 to-orange-500" },
  { icon: Bookmark, title: "Шпаргалка ученика", desc: "Краткий опорный конспект: определения, формулы, уравнения.", color: "from-pink-500 to-rose-500" },
  { icon: Layers, title: "Карточки для повторения", desc: "Флеш-карточки с переворотом — идеально для подготовки к ЦТ.", color: "from-cyan-500 to-sky-500" },
  { icon: Printer, title: "Экспорт PDF / DOCX", desc: "Печать в один клик, выгрузка в Word, копирование в буфер.", color: "from-indigo-500 to-blue-500" },
];

const STEPS = [
  { n: "01", title: "Введите параграф", desc: "Например, «§14. Кислоты» или «Кислоты, 8 класс». Выберите класс и сложность." },
  { n: "02", title: "ИИ собирает комплект", desc: "Рабочий лист, план урока, викторина, шпаргалка и карточки — за ~30 секунд." },
  { n: "03", title: "Проверьте и экспортируйте", desc: "Отредактируйте, распечатайте или скачайте DOCX. Материалы сохраняются в библиотеку." },
];

export default function HomeClient() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2rem] px-6 pb-14 pt-12 sm:px-10 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl dark:bg-emerald-500/15" />
          <div className="absolute -left-16 top-40 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl dark:bg-violet-500/15" />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 shadow-sm dark:bg-slate-800/80 dark:text-emerald-300">
              <Sparkles size={14} /> ИИ-ассистент учителя химии · РБ
            </span>
            <h1 className="font-display mt-5 text-[clamp(1.9rem,5vw,3.4rem)] font-black leading-[1.08] tracking-tight">
              Параграф —<br />
              <span className="grad-text">готовый урок</span><br />
              за 30 секунд
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Введите номер параграфа — «Хим-Помощник» сгенерирует рабочий лист, план-конспект,
              викторину и шпаргалку по учебной программе Республики Беларусь для 7–11 классов.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/generate" className="btn-grad inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-extrabold text-white">
                <Sparkles size={19} /> Сгенерировать материалы
              </Link>
              <Link href="/program" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-extrabold text-slate-700 transition hover:scale-[1.02] dark:text-slate-200">
                <BookOpen size={19} /> Программа 7–11
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><Clock size={15} className="text-emerald-600" /> 30 секунд на комплект</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-violet-600" /> По программе РБ</span>
              <span className="flex items-center gap-1.5"><Zap size={15} className="text-amber-600" /> Бесплатно, без регистрации</span>
            </div>
          </motion.div>

          {/* hero visual: flask card */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.15 }} className="relative">
            <div className="glass card-hover relative rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">§14 · 8 класс</span>
                <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><Star size={13} className="fill-amber-400 text-amber-400" /> 4.9 · 2 400+ учителей</span>
              </div>
              <h3 className="font-display mt-4 text-xl font-bold">Кислоты: состав и свойства</h3>
              <div className="mt-4 space-y-2.5">
                {[
                  ["Рабочий лист", "9 заданий · 3 части", "bg-emerald-500"],
                  ["План-конспект урока", "45 мин · 7 этапов", "bg-violet-500"],
                  ["Викторина", "7 вопросов с пояснениями", "bg-amber-500"],
                  ["Шпаргалка + карточки", "формулы и уравнения", "bg-pink-500"],
                ].map(([t, d, c]) => (
                  <div key={t} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 dark:bg-slate-800/70">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold">{t}</p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">{d}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">Готово</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <span className="btn-grad flex-1 rounded-full py-2.5 text-center text-sm font-extrabold text-white">Печать / PDF</span>
                <span className="flex-1 rounded-full border-2 border-violet-300 py-2.5 text-center text-sm font-extrabold text-violet-700 dark:border-violet-500/40 dark:text-violet-300">DOCX</span>
              </div>
            </div>
            <div className="animate-floaty absolute -left-4 -top-4 hidden sm:block">
              <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold">
                <FlaskConical size={18} className="text-emerald-600" /> H₂SO₄ + Zn → ZnSO₄ + H₂↑
              </div>
            </div>
            <div className="animate-floaty2 absolute -bottom-4 -right-3 hidden sm:block">
              <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-white">✓</span> Викторина: 7/7
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-6">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Что генерирует <span className="grad-text">ИИ</span></h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Полный комплект материалов к каждому параграфу — в один клик.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass card-hover rounded-3xl p-6"
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg`}>
                <f.icon size={24} />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-14 rounded-[2rem] bg-gradient-to-br from-emerald-600 via-violet-600 to-indigo-700 p-8 text-white sm:p-10">
        <h2 className="font-display text-center text-2xl font-bold sm:text-3xl">Как это работает</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <span className="font-display text-4xl font-black text-amber-300">{s.n}</span>
              <h3 className="mt-3 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/generate" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-extrabold text-violet-700 shadow-xl transition hover:scale-105">
            Начать генерацию <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* PROGRAM PREVIEW */}
      <section className="mt-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Программа по классам</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400">Выберите тему — и сразу генерируйте материалы к ней.</p>
          </div>
          <Link href="/program" className="font-bold text-emerald-700 hover:underline dark:text-emerald-300">Вся программа →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM.map((g) => (
            <Link key={g.grade} href={`/generate?grade=${g.grade}&topic=${encodeURIComponent(g.topics[0].title)}`} className="glass card-hover rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-black" style={{ color: g.color }}>{g.grade} класс</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{g.topics.length} тем</span>
              </div>
              <p className="mt-2 text-sm font-bold text-slate-700 dark:text-slate-200">{g.subtitle}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                {g.topics.slice(0, 3).map((t) => (
                  <li key={t.title} className="truncate">• {t.title}</li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700 dark:text-emerald-300">Сгенерировать <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-14">
        <h2 className="font-display text-center text-2xl font-bold sm:text-3xl">Учителя говорят</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { name: "Анна К.", role: "учитель химии, Минск", text: "Готовлюсь к уроку за 10 минут вместо часа. Рабочие листы получаются разнообразными — ученики в восторге." },
            { name: "Дмитрий С.", role: "учитель химии, Гродно", text: "Викторины с пояснениями — спасение перед контрольной. Дети сами просят «ещё один круг»." },
            { name: "Ольга М.", role: "учитель химии, Витебск", text: "Планы-конспекты полностью соответствуют программе РБ. Экспорт в DOCX — просто находка." },
          ].map((t) => (
            <div key={t.name} className="glass card-hover rounded-3xl p-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">«{t.text}»</p>
              <p className="mt-4 text-sm font-extrabold">{t.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
