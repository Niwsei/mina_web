import { useEffect, useMemo, useState } from "react";
import type { Product, ModifierOption } from "@/lib/types";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (params: { label: string; unitPrice: number; qty: number }) => void;
};

function RadioRow({
  title,
  options,
  value,
  onChange
}:{
  title:string;
  options: ModifierOption[];
  value: string | null;
  onChange: (id: string)=>void;
}){
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">{title}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(opt=>(
          <button
            key={opt.id}
            className={`rounded-full border px-3 py-1 text-sm ${value===opt.id? "border-[var(--brand-red)] bg-[var(--brand-red)] text-white":"hover:bg-neutral-100"}`}
            onClick={()=>onChange(opt.id)}
          >
            {opt.label}{opt.delta? ` (+฿${(opt.delta/100).toFixed(2)})`: ""}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckboxRow({
  title,
  options,
  value,
  onToggle
}:{
  title:string;
  options: ModifierOption[];
  value: Set<string>;
  onToggle: (id: string)=>void;
}){
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">{title}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(opt=>{
          const active = value.has(opt.id);
          return (
            <button
              key={opt.id}
              className={`rounded-full border px-3 py-1 text-sm ${active? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-white":"hover:bg-neutral-100"}`}
              onClick={()=>onToggle(opt.id)}
            >
              {opt.label}{opt.delta? ` (+฿${(opt.delta/100).toFixed(2)})`: ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProductModal({ product, open, onClose, onConfirm }: Props){
  const has = product?.modifiers;
  const [size,setSize] = useState<string | null>(null);
  const [milk,setMilk] = useState<string | null>(null);
  const [extras,setExtras] = useState<Set<string>>(new Set());
  const [qty,setQty] = useState(1);

  // reset when product changes
  useEffect(()=>{ setSize(null); setMilk(null); setExtras(new Set()); setQty(1); }, [product]);

  const price = useMemo(()=>{let p = product?.price || 0;
    const find = (opts?: ModifierOption[], id?: string|null) => opts?.find(o=>o.id===id || false)?.delta ?? 0;
    p += find(product?.modifiers?.sizes, size);
    p += find(product?.modifiers?.milk, milk);
    if(product?.modifiers?.extras){
      for(const e of extras) p += product.modifiers.extras.find(x=>x.id===e)?.delta ?? 0;
    }
    return p;
  }, [product, size, milk, extras]);

  if(!open || !product) return null;

  const labelParts:string[] = [];
  if(size) labelParts.push(size);
  if(milk) labelParts.push((product.modifiers?.milk?.find(m=>m.id===milk)?.label) || "");
  if(extras.size) labelParts.push(...Array.from(extras).map(e=>product.modifiers?.extras?.find(x=>x.id===e)?.label || e));
  const label = labelParts.length? `${product.name} (${labelParts.join(", ")})` : product.name;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}/>
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <button aria-label="close" onClick={onClose} className="p-1 text-neutral-600 hover:text-black">
            <X size={18}/>
          </button>
        </div>

        <div className="space-y-4">
          {product.imageUrl && (
            <div className="relative h-40 w-full rounded-[12px] overflow-hidden">
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            </div>
          )}
          {has?.sizes && <RadioRow title="ขนาด" options={has.sizes} value={size} onChange={setSize}/>}
          {has?.milk && <RadioRow title="นม" options={has.milk} value={milk} onChange={setMilk}/>}
          {has?.extras && (
            <CheckboxRow
              title="ท็อปปิ้ง"
              options={has.extras}
              value={extras}
              onToggle={(id)=>{
                const s = new Set(extras);
                if (s.has(id)) s.delete(id);
                else s.add(id);
                setExtras(s);
              }}
            />
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border rounded" onClick={()=>setQty(q=>Math.max(1,q-1))}>-</button>
              <span className="tabular-nums">{qty}</span>
              <button className="px-3 py-1 border rounded" onClick={()=>setQty(q=>q+1)}>+</button>
            </div>
            <div className="text-right">
              <div className="text-xs text-neutral-600">ราคาต่อชิ้น</div>
              <div className="text-lg font-semibold tabular-nums">฿{(price/100).toFixed(2)}</div>
            </div>
          </div>

          <button
            className="btn btn-brand w-full"
            onClick={()=>onConfirm({ label, unitPrice: price, qty })}
          >
            เพิ่ม {qty} • ฿{((price*qty)/100).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
