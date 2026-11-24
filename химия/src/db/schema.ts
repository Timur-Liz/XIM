import { pgTable, uuid, integer, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

/**
 * Таблица сгенерированных материалов (серверное хранение).
 * Клиент также сохраняет материалы в localStorage — см. src/lib/storage.ts.
 */
export const generations = pgTable("generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  grade: integer("grade").notNull(),
  topic: text("topic").notNull(),
  difficulty: text("difficulty").notNull().default("medium"),
  lang: text("lang").notNull().default("ru"),
  worksheet: text("worksheet").notNull().default(""),
  plan: text("plan").notNull().default(""),
  cheat: text("cheat").notNull().default(""),
  quiz: jsonb("quiz").notNull().default([]),
  flashcards: jsonb("flashcards").notNull().default([]),
  crossword: text("crossword").notNull().default(""),
  mock: boolean("mock").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
