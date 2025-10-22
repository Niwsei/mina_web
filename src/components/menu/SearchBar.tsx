"use client";
import { Search } from "lucide-react";
export function SearchBar({
  value, onChange, placeholder
}:{ value:string; onChange:(v:string)=>void; placeholder?:string }){
  return (
    <label className="relative">
      <input
        className="w-full rounded-[var(--radius)] border border-neutral-300 bg-white px-10 py-2 text-sm shadow-sm focus:border-[var(--brand-orange)] focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={e=>onChange(e.target.value)}
        aria-label="search"
      />
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
    </label>
  );
}