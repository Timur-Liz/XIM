"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer, FileText, Copy, Check } from "lucide-react";
import { exportDocx, copyText } from "@/lib/export";

interface Props {
  title: string;
  markdown: string;
  printRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ExportButtons({ title, markdown, printRef }: Props) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef ?? fallbackRef,
    documentTitle: title,
  });

  const handleDocx = async () => {
    setExporting(true);
    try {
      await exportDocx(title, markdown);
    } finally {
      setExporting(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyText(markdown);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => handlePrint()}
        className="btn-grad inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white"
      >
        <Printer size={16} /> Печать / PDF
      </button>
      <button
        onClick={handleDocx}
        disabled={exporting}
        className="inline-flex items-center gap-2 rounded-full border-2 border-violet-300 bg-white/70 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50 disabled:opacity-50 dark:border-violet-500/40 dark:bg-slate-800/70 dark:text-violet-300 dark:hover:bg-slate-800"
      >
        <FileText size={16} /> {exporting ? "Создаю…" : "DOCX"}
      </button>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-300 bg-white/70 px-4 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-500/40 dark:bg-slate-800/70 dark:text-emerald-300 dark:hover:bg-slate-800"
      >
        {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
        {copied ? "Скопировано!" : "Копировать"}
      </button>
      <div ref={fallbackRef} className="hidden" />
    </div>
  );
}
