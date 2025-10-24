"use client";
export function CategoryPills({
  categories, active, onChange
}:{ categories:{id:string; name:string}[]; active:string; onChange:(id:string)=>void }){
  return (
    <div className="flex w-full gap-2 overflow-x-auto">
      {categories.map(c=>(
        <button
          key={c.id}
          className={`focus-ring min-w-[120px] whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
            active===c.id
              ? "border-transparent bg-gradient-to-r from-[rgba(199,106,58,0.9)] via-[rgba(138,51,34,0.85)] to-[rgba(10,5,3,0.95)] text-[var(--brand-cream)] shadow-[0_20px_40px_-25px_rgba(199,106,58,0.85)]"
              : "border-white/15 bg-white/5 text-[var(--brand-cream)]/75 hover:border-white/30 hover:text-[var(--brand-cream)]"
          }`}
          onClick={()=>onChange(c.id)}
          aria-pressed={active===c.id}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
