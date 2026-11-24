"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, School, FlaskConical } from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Free",
    icon: FlaskConical,
    price: "0 BYN",
    period: "навсегда",
    color: "from-emerald-500 to-teal-500",
    features: ["10 генераций в месяц", "Рабочие листы и планы", "Викторины и шпаргалки", "Экспорт PDF / DOCX", "Библиотека в браузере"],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    price: "9 BYN",
    period: "в месяц",
    color: "from-violet-500 to-purple-600",
    features: ["Безлимитные генерации", "Все типы материалов + кроссворды", "Режим «Упростить / Усложнить»", "Приоритетная скорость ИИ", "История без ограничений", "Поддержка в чате"],
    cta: "Выбрать Pro",
    popular: true,
  },
  {
    id: "school",
    name: "Школа",
    icon: School,
    price: "49 BYN",
    period: "в месяц",
    color: "from-amber-500 to-orange-500",
    features: ["Всё из Pro", "До 20 учителей", "Общий банк материалов", "Отчёты по классам", "Обучение педагогов", "Личный менеджер"],
    cta: "Связаться с нами",
    popular: false,
  },
];

export default function PricingPage() {
  const [selected, setSelected] = useState("pro");

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-6 py-10 text-white sm:px-10">
        <Crown className="animate-floaty absolute -right-4 -top-4 opacity-20" size={160} />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles size={14} /> Тарифы
        </span>
        <h1 className="font-display mt-4 text-2xl font-bold sm:text-4xl">Выберите свой тариф</h1>
        <p className="mt-2 max-w-xl text-white/85">
          Начните бесплатно — переходите на Pro, когда захотите безлимит. Оплата картой РБ, отмена в один клик.
        </p>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {PLANS.map((p, i) => {
          const active = selected === p.id;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(p.id)}
              className={`glass card-hover relative cursor-pointer rounded-3xl p-6 ${active ? "ring-4 ring-violet-400/60" : ""} ${p.popular ? "lg:-translate-y-3" : ""}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg">
                  Популярный
                </span>
              )}
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-lg`}>
                <p.icon size={24} />
              </span>
              <h3 className="font-display mt-4 text-xl font-bold">{p.name}</h3>
              <p className="mt-2">
                <span className="font-display text-3xl font-black">{p.price}</span>
                <span className="ml-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">{p.period}</span>
              </p>
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/generate"
                onClick={(e) => e.stopPropagation()}
                className={`mt-6 flex items-center justify-center gap-2 rounded-full py-3.5 font-extrabold text-white ${active ? "btn-grad" : "bg-slate-800/85 hover:bg-slate-900 dark:bg-slate-700"}`}
              >
                {p.cta}
              </Link>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
        Тарифы — заглушка для демонстрации. Сейчас все функции доступны бесплатно в демо-режиме.
      </p>
    </div>
  );
}
