import { NextRequest } from "next/server";
import type { GenerateRequest } from "@/types";
import { generateMock, serializeMaterial } from "@/lib/mock";
import { buildPrompt } from "@/lib/prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function streamText(text: string, mock: boolean) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const chunkSize = 120;
      let i = 0;
      const tick = () => {
        if (i >= text.length) {
          controller.close();
          return;
        }
        const slice = text.slice(i, i + chunkSize);
        controller.enqueue(encoder.encode(slice));
        i += chunkSize;
        setTimeout(tick, 12);
      };
      tick();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Mock": mock ? "1" : "0",
    },
  });
}

async function callOpenAI(req: GenerateRequest): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "Ты — учитель химии из Беларуси. Отвечай строго в формате с маркерами ===WORKSHEET===, ===PLAN===, ===CHEAT===, ===QUIZ===, ===FLASHCARDS===, ===CROSSWORD===.",
          },
          { role: "user", content: buildPrompt(req) },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content;
    if (!content || !content.includes("===WORKSHEET===")) return null;
    return content;
  } catch {
    return null;
  }
}

async function callAnthropic(req: GenerateRequest): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest",
        max_tokens: 6000,
        messages: [{ role: "user", content: buildPrompt(req) }],
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: Array<{ text?: string }> };
    const content = data.content?.[0]?.text;
    if (!content || !content.includes("===WORKSHEET===")) return null;
    return content;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: GenerateRequest;
  try {
    body = (await request.json()) as GenerateRequest;
  } catch {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (!body.topic || !body.topic.trim()) {
    return Response.json({ error: "Укажите тему или номер параграфа" }, { status: 400 });
  }
  if (![7, 8, 9, 10, 11].includes(body.grade)) {
    return Response.json({ error: "Класс должен быть от 7 до 11" }, { status: 400 });
  }

  // Try real AI providers first, fall back to rich mock
  const aiText = (await callOpenAI(body)) ?? (await callAnthropic(body));

  if (aiText) {
    return streamText(aiText, false);
  }

  const material = generateMock(body);
  return streamText(serializeMaterial(material), true);
}
