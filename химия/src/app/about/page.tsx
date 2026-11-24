import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, Mail, Send, MapPin, Heart, Sparkles, GraduationCap, Users, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "О проекте — Хим-Помощник",
  description: "История проекта, автор, миссия и контакты. ИИ-ассистент для учителей химии Республики Беларусь.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-6 py-10 text-white sm:px-10">
        <FlaskConical className="animate-floaty absolute -right-4 -top-4 opacity-20" size={160} />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles size={14} /> О проекте
        </span>
        <h1 className="font-display mt-4 text-2xl font-bold sm:text-4xl">Химия должна быть в радость</h1>
        <p className="mt-2 max-w-xl text-white/85">
          «Хим-Помощник» родился из простой мысли: учитель химии тратит часы на рутину вместо живого общения с учениками.
        </p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold">Наша миссия</h2>
            <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
              Мы создаём инструменты, которые возвращают учителю время и вдохновение. ИИ берёт на себя рутину —
              рабочие листы, планы, викторины, — а учитель остаётся главным: объясняет, вдохновляет, зажигает интерес к науке.
            </p>
            <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
              Все материалы соответствуют учебной программе Республики Беларусь по химии для 7–11 классов и учитывают
              уровень подготовки учеников — от базового до олимпиадного.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: GraduationCap, n: "2 400+", label: "учителей с нами" },
                { icon: BookOpen, n: "18 000+", label: "комплектов сгенерировано" },
                { icon: Users, n: "120 000+", label: "учеников получили материалы" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/70 p-4 text-center dark:bg-slate-800/70">
                  <s.icon size={22} className="mx-auto text-emerald-600" />
                  <p className="font-display mt-2 text-xl font-black">{s.n}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold">Как мы работаем</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-extrabold text-white">1</span> Изучаем программу РБ и учебники — каждый промт ИИ учитывает класс и тему.</li>
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-extrabold text-white">2</span> Тестируем генерацию с учителями-практиками и собираем обратную связь.</li>
              <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-extrabold text-white">3</span> Улучшаем шаблоны: от простых пропусков до олимпиадных задач.</li>
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="glass rounded-3xl p-6 text-center">
            <div className="btn-grad mx-auto flex h-20 w-20 items-center justify-center rounded-3xl text-3xl font-black text-white">
              А
            </div>
            <h3 className="font-display mt-4 text-lg font-bold">Анна Химик</h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Автор проекта · учитель химии высшей категории</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              «Я 12 лет преподаю химию в школе. Этот сервис — мой личный помощник, которым теперь делюсь с коллегами по всей Беларуси.»
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} size={15} className="fill-rose-500 text-rose-500" />
              ))}
            </div>
          </section>

          <section className="glass rounded-3xl p-6">
            <h3 className="font-extrabold">Контакты</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Mail size={16} className="text-emerald-600" /> hello@him-pomoshnik.by</li>
              <li className="flex items-center gap-2"><Send size={16} className="text-violet-600" /> @him_pomoshnik</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-amber-600" /> Минск, Республика Беларусь</li>
            </ul>
            <Link href="/generate" className="btn-grad mt-5 flex items-center justify-center gap-2 rounded-full py-3 font-extrabold text-white">
              <Sparkles size={17} /> Попробовать генератор
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
