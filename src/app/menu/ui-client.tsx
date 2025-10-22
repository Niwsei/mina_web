"use client";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/components/cart/store";
import { CategoryPills } from "@/components/menu/CategoryPills";
import { SearchBar } from "@/components/menu/SearchBar";

export type MenuProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
};

export type MenuCategory = { id:string; name:string; products:MenuProduct[] };

export function MenuClient({ initialMenu }:{ initialMenu: MenuCategory[] }){
  const add = useCartStore(s=>s.add);

  const categories = useMemo(
    ()=> [{ id:"all", name:"ทั้งหมด" }, ...initialMenu.map(c=>({ id:c.id, name:c.name }))],
    [initialMenu]
  );

  const [active,setActive] = useState<string>("all");
  const [q,setQ] = useState("");

  const products = useMemo<MenuProduct[]>(()=>{
    const list = active==="all"
      ? initialMenu.flatMap(c=>c.products)
      : (initialMenu.find(c=>c.id===active)?.products ?? []);
    return q ? list.filter(product=>product.name.toLowerCase().includes(q.toLowerCase())) : list;
  },[initialMenu, active, q]);

  return (
    <section className="space-y-8">
      <div className="sticky top-[calc(var(--header-h)+12px)] z-30">
        <div className="relative overflow-hidden rounded-(--radius+4px) border border-white/8 bg-[rgba(18,10,6,0.75)] px-4 py-4 shadow-sm backdrop-blur-md">
          <span className="shine-stripe" aria-hidden="true" />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex-1">
              <CategoryPills categories={categories} active={active} onChange={setActive} />
            </div>
            <div className="w-full lg:w-[320px]">
              <SearchBar value={q} onChange={setQ} placeholder="ค้นหาเมนู…" />
            </div>
          </div>
        </div>
      </div>

      {products.length>0 ? (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 anim-fadeUp anim-delay-2">
          {products.map((product)=>(
            <ProductCard
              key={product.id}
              product={product}
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
    <div className="floating-card anim-fadeUp space-y-2 rounded-[calc(var(--radius)+4px)] border-white/10 bg-[rgba(18,10,6,0.82)] p-10 text-center text-(--brand-cream)/80">
      <div className="badge badge-fire mb-2">ไม่มีผลลัพธ์</div>
      <p className="text-sm">ไม่พบรายการที่ตรงกับ “{query}”</p>
      <p className="text-xs text-(--brand-cream)/60">ลองเปลี่ยนหมวดหมู่หรือกรองคำค้นหาใหม่อีกครั้ง</p>
    </div>
  );
}
