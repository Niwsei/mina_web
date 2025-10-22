import { create } from "zustand";
type CartItem = { productId:string; name:string; unitPrice:number; qty:number };
type State = {
  items: CartItem[]; promoCode: string; discount: number;
  add: (i: Omit<CartItem,"qty">) => void;
  remove: (idx:number) => void;
  inc: (idx:number) => void;
  dec: (idx:number) => void;
  setDiscount: (code:string, discount:number)=>void;
  reset: ()=>void;
};
export const useCartStore = create<State>((set)=>({
  items: [], promoCode: "", discount: 0,
  add: (i)=> set((s)=> {
    const idx = s.items.findIndex(x=>x.productId===i.productId && x.unitPrice===i.unitPrice);
    if(idx>=0){ const next=[...s.items]; next[idx].qty+=1; return { items: next }; }
    return { items: [...s.items, {...i, qty:1 }] };
  }),
  remove: (idx)=> set((s)=>({ items: s.items.filter((_,i)=>i!==idx) })),
  inc: (idx)=> set((s)=>{ const n=[...s.items]; n[idx].qty+=1; return { items:n }; }),
  dec: (idx)=> set((s)=>{ const n=[...s.items]; n[idx].qty=Math.max(0,n[idx].qty-1); return { items:n.filter(x=>x.qty>0) }; }),
  setDiscount: (code,discount)=> set(()=>({ promoCode: code, discount })),
  reset: ()=> set(()=>({ items:[], promoCode:"", discount:0 }))
}));