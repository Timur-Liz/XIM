import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MoleculeBackground from "@/components/MoleculeBackground";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], variable: "--font-display", display: "swap", weight: ["500", "700", "900"] });

export const metadata: Metadata = {
  title: "Хим-Помощник — ИИ-генератор материалов для учителей химии 7–11 классов",
  description:
    "Введите номер параграфа — ИИ сгенерирует рабочий лист, план-конспект урока, викторину, шпаргалку и карточки по учебной программе Республики Беларусь.",
  keywords: ["химия", "учитель химии", "рабочий лист", "план урока", "викторина", "Беларусь", "ИИ"],
  openGraph: {
    title: "Хим-Помощник — ИИ для учителей химии",
    description: "Рабочие листы, планы уроков и викторины по химии 7–11 классов за 30 секунд.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${manrope.variable} ${unbounded.variable} antialiased`}>
        <MoleculeBackground />
        <Header />
        <main className="relative z-10 mx-auto w-full max-w-6xl px-3 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
