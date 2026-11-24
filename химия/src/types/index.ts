export type Grade = 7 | 8 | 9 | 10 | 11;
export type Difficulty = "easy" | "medium" | "hard" | "olympiad";
export type Lang = "ru" | "by";
export type MaterialType = "all" | "worksheet" | "plan" | "quiz" | "cheat";

export interface GenerateRequest {
  grade: Grade;
  topic: string;
  materialType: MaterialType;
  difficulty: Difficulty;
  lang: Lang;
  includeQuiz: boolean;
  includeCrossword: boolean;
  regenerate?: boolean;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface GeneratedMaterial {
  id: string;
  grade: Grade;
  topic: string;
  difficulty: Difficulty;
  lang: Lang;
  createdAt: string;
  worksheet: string;
  plan: string;
  cheat: string;
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  crossword: string;
  mock: boolean;
}

export interface ProgramTopic {
  title: string;
  hours: number;
  desc: string;
}

export interface ProgramGrade {
  grade: Grade;
  title: string;
  subtitle: string;
  color: string;
  topics: ProgramTopic[];
}
