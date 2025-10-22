"use client";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/api";

export function Reviews(){
  const [minStar, setMinStar] = useState<number>(0);
  const filtered = useMemo(()=> REVIEWS.filter(r=> r.rating >= minStar), [minStar]);

  const avg = (REVIEWS.reduce((s,r)=>s+r.rating,0)/REVIEWS.length).toFixed(1);

  return (
    <section className="section coffee-section bg-inherit text-(--brand-cream)">
      <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-40 w-40 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(224,173,99,0.24),_rgba(11,7,5,0)_75%)] blur-[80px]" />
      <div className="container relative">
        <div className="section-shell pattern-grid overflow-hidden space-y-8">
          <span className="shine-stripe" aria-hidden />
          <header className="space-y-4">
            <div className="eyebrow">social proof</div>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="section-title text-white drop-shadow-[0_12px_24px_rgba(0,0,0,.55)]">เสียงจากลูกค้า</h2>
              <div className="glow-ring relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
                <span className="flex">
                  {[...Array(5)].map((_,i)=><Star key={i} size={16} className="fill-(--brand-orange) text-(--brand-orange)"/>)}
                </span>
                <b className="tabular-nums text-white">{avg}/5</b>
                <span className="text-(--brand-cream)/70">จาก {REVIEWS.length}+ รีวิว</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["บรรยากาศอบอุ่น", "บาริสต้าใส่ใจ", "เมล็ดคั่วสด"].map((pill)=>(
                <span key={pill} className="taste-chip text-(--brand-cream)/85">{pill}</span>
              ))}
            </div>

            {/* Filter */}
            <div className="tabs">
              {[0,5,4,3].map(v=>(
                <button key={v}
                  className={`tab ${minStar===v ? "tab-active" : ""}`}
                  onClick={()=>setMinStar(v)}>
                  {v===0? "ทั้งหมด": `${v}★ ขึ้นไป`}
                </button>
              ))}
            </div>
          </header>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0,6).map((r)=>(
              <article key={r.id} className="floating-card pattern-grid relative overflow-hidden p-5 transition-transform hover:-translate-y-1 hover:shadow-[0_32px_60px_-28px_rgba(0,0,0,.8)] will-change-transform">
                <span className="shine-stripe" aria-hidden />
                <div className="flex items-center gap-2 pb-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[rgba(255,255,255,0.12)] text-white/90">{r.author[0]}</div>
                  <div>
                    <div className="font-medium text-white">{r.author}</div>
                    <div className="text-xs text-(--brand-cream)/60">{r.source}</div>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(r.rating)].map((_,i)=><Star key={i} size={14} className="fill-(--brand-orange) text-(--brand-orange)"/>)}
                  </div>
                </div>
                <p className="relative text-sm leading-relaxed text-(--brand-cream)/90">
                  <span className="absolute -left-2 -top-3 text-4xl text-(--brand-orange)/30">“</span>
                  {r.text}
                </p>
                <div className="pt-4 text-xs uppercase tracking-[0.3em] text-(--brand-cream)/45">real guests</div>
              </article>
            ))}
          </div>

          <div className="divider-gradient" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a href="#" className="btn btn-brand">เขียนรีวิว</a>
            <a href="#" className="text-sm underline text-(--brand-cream)/85">อ่านรีวิวทั้งหมด</a>
          </div>
        </div>
      </div>
    </section>
  );
}