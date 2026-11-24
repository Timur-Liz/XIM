import Link from "next/link";
import { FlaskConical, Sparkles, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="relative">
        <FlaskConical size={110} className="animate-floaty text-violet-500" />
        <span className="font-display absolute -right-10 -top-6 rotate-12 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 px-4 py-2 text-2xl font-black text-white shadow-xl">
          404
        </span>
      </div>
      <h1 className="font-display mt-8 text-3xl font-bold sm:text-4xl">
        Реакция не найдена <span className="grad-text">🧪</span>
      </h1>
      <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
        Похоже, эта колба разбилась. Но не переживайте — мы сгенерируем что-нибудь полезное!
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-extrabold">
          <Home size={17} /> На главную
        </Link>
        <Link href="/generate" className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3 font-extrabold text-white">
          <Sparkles size={17} /> В генератор
        </Link>
      </div>
    </div>
  );
}
