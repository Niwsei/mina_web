"use client";
import { ProductCard } from "./ProductCard";
/* import { useCartStore } from "@/components/cart/store"; */
import { useCartStore } from "./cart/store";
import { Category, Product } from "@/lib/types";

export function CategorySection({ category }: { category: Category }){
  const add = useCartStore(s=>s.add);
  return (
    <section>
      <h3 className="mb-3 text-lg font-semibold">{category.name}</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {category.products.map((p: Product)=>(
          <ProductCard key={p.id} product={p} onAdd={(prod)=>add({productId:prod.id, name:prod.name, unitPrice:prod.price})}/>
        ))}
      </div>
    </section>
  );
}
