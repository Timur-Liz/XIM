"use client";

import { useMemo } from "react";

export default function MoleculeBackground({ density = 14 }: { density?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => ({
        id: i,
        left: `${(i * 73 + 11) % 100}%`,
        size: 10 + ((i * 37) % 42),
        duration: 14 + ((i * 13) % 18),
        delay: -((i * 7) % 20),
        opacity: 0.25 + ((i * 11) % 40) / 100,
      })),
    [density]
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* soft gradient blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/10" />
      <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-500/10" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-500/10" />

      {/* rising bubbles */}
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            bottom: "-60px",
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* decorative molecule SVG */}
      <svg className="animate-spin-slow absolute top-24 right-[8%] hidden h-40 w-40 opacity-25 lg:block" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="78" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx="100" cy="100" r="52" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="100" cy="22" r="10" fill="#10B981" />
        <circle cx="178" cy="100" r="8" fill="#F59E0B" />
        <circle cx="100" cy="178" r="12" fill="#8B5CF6" />
        <circle cx="22" cy="100" r="7" fill="#06B6D4" />
        <circle cx="100" cy="100" r="16" fill="#EC4899" opacity="0.7" />
        <line x1="100" y1="32" x2="100" y2="84" stroke="#8B5CF6" strokeWidth="1.5" />
        <line x1="170" y1="100" x2="116" y2="100" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="100" y1="168" x2="100" y2="116" stroke="#10B981" strokeWidth="1.5" />
        <line x1="29" y1="100" x2="84" y2="100" stroke="#06B6D4" strokeWidth="1.5" />
      </svg>

      <svg className="animate-floaty absolute bottom-24 left-[5%] hidden h-28 w-28 opacity-20 lg:block" viewBox="0 0 120 120" fill="none">
        <path d="M60 8 L104 32 V88 L60 112 L16 88 V32 Z" stroke="#10B981" strokeWidth="2" />
        <circle cx="60" cy="60" r="14" fill="#F59E0B" opacity="0.6" />
        <circle cx="60" cy="8" r="6" fill="#8B5CF6" />
        <circle cx="104" cy="88" r="6" fill="#10B981" />
        <circle cx="16" cy="88" r="6" fill="#EC4899" />
      </svg>
    </div>
  );
}
