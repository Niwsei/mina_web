import type { Category, Product } from "@/lib/types";

export function ProductListCompact({ menu, onAdd }:{ menu:Category[]; onAdd:(p:Product)=>void }){
  return (
    <div className="grid gap-2">
      {menu.flatMap((c)=>c.products).map((p)=>(
        <div key={p.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b py-2">
          <div className="truncate">{p.name}</div>
          <div className="tabular-nums">฿{(p.price/100).toFixed(2)}</div>
          <button className="btn btn-outline" onClick={()=>onAdd(p)}>เพิ่ม</button>
        </div>
      ))}
    </div>
  );
}