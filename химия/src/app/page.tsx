import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Хим-Помощник — ИИ-генератор материалов для учителей химии 7–11 классов",
  description:
    "Введите номер параграфа — ИИ сгенерирует рабочий лист, план-конспект урока, викторину, шпаргалку и карточки по учебной программе Республики Беларусь.",
};

export default function HomePage() {
  return <HomeClient />;
}
