import { memo } from "react";
import { Plus } from "lucide-react";
type Product = { id:string; name:string; price:number; imageUrl?:string; description?:string };

export const ProductCard = memo(function ProductCard({ product, onAdd }:{
  product: Product; onAdd: (p: Product)=>void;
}){
  return (
    <div className="group card p-0 overflow-hidden transition hover:-translate-y-0.5 hover:shadow-2xl">
      <div className="relative">
        <img
          src={product.imageUrl||"/placeholder.png"}
          alt={product.name}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-[var(--brand-black)] via-[#2a211b] to-[var(--brand-orange)] px-2.5 py-1 text-xs text-white shadow">
          ฿{(product.price/100).toFixed(2)}
        </div>
      </div>
      <div className="space-y-2 p-4">
        <h4 className="font-semibold">{product.name}</h4>
        <p className="line-clamp-2 text-sm text-neutral-600">{product.description||" "}</p>
        <button className="btn btn-brand w-full" onClick={()=>onAdd(product)}>
          <Plus size={16}/> เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
});