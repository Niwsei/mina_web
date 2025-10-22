"use client";
import { Search } from "lucide-react";
export function SearchBar({
  value, onChange, placeholder
}:{ value:string; onChange:(v:string)=>void; placeholder?:string }){
  return (
    <label className="relative block">
      <input
        className="w-full rounded-(--radius-4px) border border-white/12 bg-[rgba(12,7,5,0.7)] px-11 py-3 text-sm text-(--brand-cream) placeholder:text-(--brand-cream)/45 shadow-sm focus:border-(--brand-orange) focus:outline-none focus-visible:ring-1 focus-visible:ring-(--brand-orange)/50 focus-visible:ring-offset-1"
        placeholder={placeholder}
        value={value}
        onChange={e=>onChange(e.target.value)}
        aria-label="search"
      />
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--brand-cream)/60" />
    </label>
  );
}
