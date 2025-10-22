"use client";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/api";

export function Reviews(){
  const [minStar, setMinStar] = useState<number>(0);
  const filtered = useMemo(()=> REVIEWS.filter(r=> r.rating >= minStar), [minStar]);

  const avg = (REVIEWS.reduce((s,r)=>s+r.rating,0)/REVIEWS.length).toFixed(1);

  return (
    <section className="section bg-inherit text-white">
      <div className="container space-y-6">
        <header className="space-y-2">
          <div className="eyebrow">social proof</div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="section-title">เสียงจากลูกค้า</h2>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(15,10,8,0.45)] px-3 py-1 text-sm">
              <span className="flex">
                {[...Array(5)].map((_,i)=><Star key={i} size={16} className="fill-(--brand-orange) text-(--brand-orange)"/>)}
              </span>
              <b className="tabular-nums">{avg}/5</b>
              <span className="text-(--muted)">จาก {REVIEWS.length}+ รีวิว</span>
            </div>
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0,6).map((r)=>(
            <article key={r.id} className="card glass transition-transform hover:-translate-y-0.5 hover:shadow-md will-change-transform">
              <div className="flex items-center gap-2 pb-2">
                <div className="h-8 w-8 shrink-0 rounded-full bg-[rgba(0,0,0,0.6)] text-white grid place-items-center">{r.author[0]}</div>
                <div className="font-medium text-white">{r.author}</div>
                <div className="ml-auto flex">
                  {[...Array(r.rating)].map((_,i)=><Star key={i} size={14} className="fill-(--brand-orange) text-(--brand-orange)"/>)}
                </div>
              </div>
              <p className="text-sm text-(--brand-cream)/90">{r.text}</p>
              <div className="pt-3 text-xs text-(--muted)">{r.source}</div>
            </article>
          ))}
        </div>

        <div className="divider-gradient" />
        <div className="flex items-center justify-between">
          <a href="#" className="btn btn-ghost text-(--brand-cream)/90">เขียนรีวิว</a>
          <a href="#" className="text-sm underline text-(--brand-cream)/90">อ่านรีวิวทั้งหมด</a>
        </div>
      </div>
    </section>
  );
}