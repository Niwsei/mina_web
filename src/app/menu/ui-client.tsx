"use client";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/components/cart/store";
import { CategoryPills } from "@/components/menu/CategoryPills";
import { SearchBar } from "@/components/menu/SearchBar";

type Category = { id:string; name:string; products:any[] };

export function MenuClient({ initialMenu }:{ initialMenu: Category[] }){
  const add = useCartStore(s=>s.add);

  const categories = useMemo(
    ()=> [{ id:"all", name:"ทั้งหมด" }, ...initialMenu.map(c=>({ id:c.id, name:c.name }))],
    [initialMenu]
  );

  const [active,setActive] = useState<string>("all");
  const [q,setQ] = useState("");

  const products = useMemo(()=>{
    const list = active==="all" ? initialMenu.flatMap(c=>c.products)
      : (initialMenu.find(c=>c.id===active)?.products ?? []);
    return q ? list.filter((p:any)=> p.name.toLowerCase().includes(q.toLowerCase())) : list;
  },[initialMenu, active, q]);

  return (
    <section className="space-y-5">
      <div className="sticky top-[64px] z-20 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container py-3 grid gap-3 md:grid-cols-[1fr_320px]">
          <CategoryPills categories={categories} active={active} onChange={setActive}/>
          <SearchBar value={q} onChange={setQ} placeholder="ค้นหาเมนู…"/>
        </div>
      </div>

      {products.length>0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 anim-fadeUp anim-delay-2">
          {products.map((p:any)=>(
            <ProductCard
              key={p.id}
              product={p}
              onAdd={(prod)=>add({productId:prod.id, name:prod.name, unitPrice:prod.price})}
            />
          ))}
        </div>
      ) : (
        <EmptyState query={q}/>
      )}
    </section>
  );
}

function EmptyState({ query }:{ query:string }){
  return (
    <div className="rounded-[var(--radius)] border border-dashed p-10 text-center anim-fadeUp">
      <div className="badge badge-dark mb-2">ไม่มีผลลัพธ์</div>
      <p className="text-sm text-[var(--muted)]">ไม่พบรายการที่ตรงกับ “{query}”</p>
    </div>
  );
}