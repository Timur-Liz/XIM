import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";

function mdToParagraphs(md: string): Paragraph[] {
  const lines = md.split("\n");
  const out: Paragraph[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("### ")) {
      out.push(new Paragraph({ text: line.slice(4), heading: HeadingLevel.HEADING_3 }));
    } else if (line.startsWith("## ")) {
      out.push(new Paragraph({ text: line.slice(3), heading: HeadingLevel.HEADING_2 }));
    } else if (line.startsWith("# ")) {
      out.push(new Paragraph({ text: line.slice(2), heading: HeadingLevel.HEADING_1 }));
    } else if (line.startsWith("---")) {
      out.push(new Paragraph({ text: "" }));
    } else if (line.startsWith("> ")) {
      out.push(new Paragraph({ children: [new TextRun({ text: line.slice(2), italics: true })] }));
    } else if (line.startsWith("- ")) {
      out.push(new Paragraph({ text: `• ${line.slice(2)}`, bullet: { level: 0 } }));
    } else {
      out.push(new Paragraph({ text: line }));
    }
  }
  return out;
}

export async function exportDocx(title: string, markdown: string) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: title, heading: HeadingLevel.TITLE }),
          ...mdToParagraphs(markdown),
        ],
      },
    ],
  });
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/[^\wа-яёА-ЯЁ-]+/gi, "_").slice(0, 60) || "material"}.docx`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(ta);
    }
  }
}
