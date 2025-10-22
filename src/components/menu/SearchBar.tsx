"use client";
import { Search } from "lucide-react";
export function SearchBar({
  value, onChange, placeholder
}:{ value:string; onChange:(v:string)=>void; placeholder?:string }){
  return (
    <label className="relative block">
      <input
        className="w-full rounded-[calc(var(--radius)-4px)] border border-white/12 bg-[rgba(12,7,5,0.78)] px-11 py-3 text-sm text-[var(--brand-cream)] placeholder:text-[var(--brand-cream)]/45 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.9)] focus:border-[var(--brand-orange)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(18,10,6,0.85)]"
        placeholder={placeholder}
        value={value}
        onChange={e=>onChange(e.target.value)}
        aria-label="search"
      />
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-cream)]/60" />
    </label>
  );
}
