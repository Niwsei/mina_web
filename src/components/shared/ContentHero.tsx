import type { PropsWithChildren } from "react";
import { Sparkles } from "lucide-react";

export function ContentHero({
  eyebrow,
  title,
  description,
  meta,
  side,
  visual,
}: PropsWithChildren<{
  eyebrow?: { text: string; icon?: React.ReactNode };
  title: string;
  description: string;
  meta: React.ReactNode;
  side?: React.ReactNode;
  visual?: React.ReactNode;
}>) {
  return (
    <div className="content-hero">
      <div className="content-hero-body">
        {eyebrow && (
          <span className="badge badge-dark inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
            {eyebrow.icon ?? <Sparkles size={16} />} {eyebrow.text}
          </span>
        )}
        <h2 className="text-2xl font-semibold text-[var(--brand-cream)] md:text-4xl">{title}</h2>
        <p className="max-w-xl text-sm text-neutral-100/80 md:text-base">{description}</p>
        <div className="content-hero-meta">{meta}</div>
      </div>
      {side && <aside className="content-hero-side">{side}</aside>}
      {visual && <div className="content-hero-visual">{visual}</div>}
    </div>
  );
}
