import { memo } from "react";
import { Plus } from "lucide-react";
type Product = { id:string; name:string; price:number; imageUrl?:string; description?:string };

export const ProductCard = memo(function ProductCard({ product, onAdd }:{
  product: Product; onAdd: (p: Product)=>void;
}){
  return (
    // ✨ ใช้ class .card ที่ปรับปรุงแล้ว
    <div className="group card p-0 overflow-hidden transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-800">
      <div className="relative">
        <img
          src={product.imageUrl || "/placeholder.png"} // ควรมี Placeholder ที่สวยงาม
          alt={product.name}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105" // เพิ่ม scale effect
          loading="lazy"
        />
        {/* ✨ ใช้ class ป้ายราคาใหม่ */}
        <div className="product-card-price">
          ฿{(product.price/100).toFixed(2)}
        </div>
      </div>
      <div className="space-y-3 p-4"> {/* เพิ่ม space */}
        <h4 className="font-semibold text-lg">{product.name}</h4> {/* เพิ่มขนาด font */}
        <p className="line-clamp-2 text-sm text-[var(--muted)] min-h-[2.5rem]"> {/* กำหนด min-height กัน layout shift */}
          {product.description || ""} {/* ลบ space ออก */}
        </p>
        <button className="btn btn-brand w-full !mt-4" onClick={()=>onAdd(product)}> {/* เพิ่ม !mt-4 */}
          <Plus size={16}/> เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
});