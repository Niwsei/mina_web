import { memo } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
type Product = { id:string; name:string; price:number; imageUrl?:string; description?:string };

export const ProductCard = memo(function ProductCard({ product, onAdd }:{
  product: Product; onAdd: (p: Product)=>void;
}){
  return (
    <div className="group card p-0 overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 w-full">
        {product.imageUrl && /^https?:\/\//.test(product.imageUrl) ? (
          // External images: render native <img> to avoid next/image host config errors
          <img
            src={product.imageUrl}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <Image
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover"
            priority={false}
          />
        )}
        <div className="absolute right-2 top-2 rounded-full bg-[rgba(0,0,0,0.6)] px-2.5 py-1 text-xs text-white">
          ฿{(product.price/100).toFixed(2)}
        </div>
      </div>
      <div className="space-y-2 p-4">
  <h4 className="font-semibold text-[var(--brand-cream)]">{product.name}</h4>
  <p className="line-clamp-2 text-sm text-[var(--muted)]">{product.description||" "}</p>
        <button
          className="btn btn-brand w-full flex items-center justify-center gap-2"
          onClick={()=>onAdd(product)}
          aria-label={`เพิ่ม ${product.name} ลงตะกร้า`}
        >
          <Plus size={16}/> เพิ่ม
        </button>
      </div>
    </div>
  );
});