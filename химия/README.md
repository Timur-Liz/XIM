# Хим-Помощник 🧪

Многостраничный ИИ-сайт для учителей химии 7–11 классов (учебная программа Республики Беларусь).
Учитель вводит номер/тему параграфа — и получает комплект материалов: рабочий лист, план-конспект урока,
интерактивную викторину, шпаргалку, карточки для повторения и кроссворд.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
```

Продакшн-сборка:

```bash
npm run build
npm start
```

## Подключение ИИ

По умолчанию сайт работает в **демо-режиме** (богатые шаблоны по программе РБ, без ключей).
Чтобы включить настоящий ИИ, скопируйте `.env.example` в `.env` и вставьте ключ:

```
OPENAI_API_KEY=sk-...
# или
ANTHROPIC_API_KEY=sk-ant-...
```

API-роут `/api/generate` сначала пробует OpenAI, затем Anthropic, затем — демо-генератор.
Ответ стримится и парсится по маркерам `===WORKSHEET===`, `===PLAN===`, `===CHEAT===`, `===QUIZ===`, `===FLASHCARDS===`, `===CROSSWORD===`.

## Структура проекта

```
src/
  app/
    page.tsx              # / — главная
    generate/page.tsx     # /generate — генератор со стримингом
    catalog/page.tsx      # /catalog — библиотека (localStorage)
    program/page.tsx      # /program — программа РБ 7–11 (аккордеон)
    methodology/page.tsx  # /methodology — методическая копилка
    about/page.tsx        # /about — о проекте
    pricing/page.tsx      # /pricing — тарифы (заглушка)
    not-found.tsx         # 404
    api/generate/route.ts # серверная генерация + стриминг
  components/
    Header.tsx, Footer.tsx, MoleculeBackground.tsx, ThemeToggle.tsx
    GeneratorForm.tsx, ResultTabs.tsx, QuizCard.tsx, ExportButtons.tsx, Markdown.tsx
  lib/
    program.ts            # темы программы РБ по классам
    mock.ts               # демо-генератор + сериализация/парсинг стрима
    prompt.ts             # промт для ИИ-модели
    storage.ts            # localStorage
    export.ts             # DOCX + копирование
  types/index.ts          # типы GenerateRequest, GeneratedMaterial и др.
  db/schema.ts            # таблица generations (Drizzle)
```

## Как добавить новую страницу

1. Создайте папку `src/app/<slug>/` с файлом `page.tsx`.
2. Добавьте `export const metadata` для SEO.
3. Добавьте пункт в `LINKS` в `src/components/Header.tsx` и ссылку в `Footer.tsx`.
4. Используйте готовые классы: `.glass`, `.btn-grad`, `.card-hover`, `.grad-text` — дизайн сохранится автоматически.

## Экспорт

- **Печать / PDF** — через `react-to-print` (кнопка в каждой вкладке результата).
- **DOCX** — библиотека `docx` (Markdown → Word).
- **Копирование** — в буфер обмена.

## База данных

Таблица `generations` в `src/db/schema.ts`. Применить схему:

```bash
npx drizzle-kit push
```
