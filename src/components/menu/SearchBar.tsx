"use client";
import { Search } from "lucide-react";
export function SearchBar({
  value, onChange, placeholder
}:{ value:string; onChange:(v:string)=>void; placeholder?:string }){
  return (
    <label className="relative block">
      <input
        className="w-full rounded-[calc(var(--radius)-4px)] border border-white/12 bg-[rgba(12,7,5,0.7)] px-11 py-3 text-sm text-[var(--brand-cream)] placeholder:text-[var(--brand-cream)]/45 shadow-sm focus:border-[var(--brand-orange)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-orange)]/50 focus-visible:ring-offset-1"
        placeholder={placeholder}
        value={value}
        onChange={e=>onChange(e.target.value)}
        aria-label="search"
      />
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-cream)]/60" />
    </label>
  );
}
