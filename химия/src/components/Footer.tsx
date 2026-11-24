import Link from "next/link";
import { FlaskConical, Heart, Mail, Send, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="no-print mt-16 px-3 pb-6 sm:px-6">
      <div className="glass mx-auto max-w-6xl rounded-3xl p-6 sm:p-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="btn-grad flex h-10 w-10 items-center justify-center rounded-xl text-white">
                <FlaskConical size={22} />
              </span>
              <span className="font-display text-base font-bold">
                Хим-<span className="grad-text">Помощник</span>
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              ИИ-ассистент учителя химии: рабочие листы, планы-конспекты, викторины и шпаргалки
              по учебной программе Республики Беларусь для 7–11 классов. Генерируйте за 30 секунд —
              печатайте, экспортируйте в DOCX, делитесь с учениками.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
              Сделано с <Heart size={13} className="fill-rose-500 text-rose-500" /> для учителей химии
            </p>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Навигация</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["/generate", "Генератор материалов"],
                ["/catalog", "Библиотека"],
                ["/program", "Учебная программа"],
                ["/methodology", "Методическая копилка"],
                ["/pricing", "Тарифы"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-violet-700 dark:text-violet-400">Контакты</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Mail size={15} /> hello@him-pomoshnik.by</li>
              <li className="flex items-center gap-2"><Send size={15} /> @him_pomoshnik</li>
              <li className="flex items-center gap-2"><MapPin size={15} /> Минск, Республика Беларусь</li>
            </ul>
            <Link
              href="/generate"
              className="btn-grad mt-4 inline-block rounded-full px-5 py-2.5 text-sm font-bold text-white"
            >
              Попробовать бесплатно
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200/70 pt-4 text-center text-xs text-slate-500 dark:border-slate-700/60 dark:text-slate-500">
          © {new Date().getFullYear()} Хим-Помощник · Учебные материалы генерируются ИИ — проверяйте перед использованием на уроке.
        </div>
      </div>
    </footer>
  );
}
