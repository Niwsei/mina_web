export function ProductListCompact({ menu, onAdd }:{ menu:any[]; onAdd:(p:any)=>void }){
  return (
    <div className="grid gap-2">
      {menu.flatMap((c:any)=>c.products).map((p:any)=>(
        <div key={p.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b py-2">
          <div className="truncate">{p.name}</div>
          <div className="tabular-nums">฿{(p.price/100).toFixed(2)}</div>
          <button className="btn btn-outline" onClick={()=>onAdd(p)}>เพิ่ม</button>
        </div>
      ))}
    </div>
  );
}