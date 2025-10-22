"use client";
export function CategoryPills({
  categories, active, onChange
}:{ categories:{id:string; name:string}[]; active:string; onChange:(id:string)=>void }){
  return (
    <div className="tabs">
      {categories.map(c=>(
        <button
          key={c.id}
          className={`tab ${active===c.id? "tab-active": ""}`}
          onClick={()=>onChange(c.id)}
          aria-pressed={active===c.id}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
