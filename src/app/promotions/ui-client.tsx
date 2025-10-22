"use client";
import type { Promotion } from "@/lib/types";
import { toast } from "@/components/ui/toast";
import { Copy } from "lucide-react";
import { useMemo, useState } from "react";

export function PromoClient({ initial }:{ initial: Promotion[] }){
  const [tab,setTab] = useState<Promotion["status"] | "ALL">("ACTIVE");
  const list = useMemo(()=>{
    const data = tab==="ALL"? initial : initial.filter(p=>p.status===tab);
    return data.sort((a,b)=> a.status.localeCompare(b.status));
  },[initial, tab]);

  async function copy(code?:string){
    if(!code){ toast({ title:"โปรนี้ไม่มีโค้ด", variant:"info" }); return; }
    try{
      await navigator.clipboard.writeText(code);
      toast({ title:"คัดลอกโค้ดแล้ว", description: code, variant:"success" });
    }catch{
      toast({ title:"คัดลอกไม่สำเร็จ", variant:"error" });
    }
  }

  return (
    <section className="space-y-4">
      <div className="tabs">
        {["ACTIVE","UPCOMING","EXPIRED","ALL"].map((t)=>(
          <button key={t} onClick={()=>setTab(t as any)}
            className={`tab ${tab===t? "tab-active":""}`}>{t==="ALL"?"ทั้งหมด":t}</button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p)=>(
          <article key={p.id} className="card transition hover:-translate-y-0.5 hover:shadow-2xl">
            <header className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">{p.title}</h3>
              {p.badge && <span className="badge badge-fire">{p.badge}</span>}
            </header>
            <p className="text-sm text-neutral-700">{p.description}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-neutral-600">
                ช่วงเวลา: {p.period.start}{p.period.end? ` – ${p.period.end}`:""}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${
                p.status==="ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                p.status==="UPCOMING" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                "bg-neutral-100 text-neutral-700 border"
              }`}>{p.status}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              {p.code ? <code className="rounded bg-neutral-100 px-2 py-1 text-sm">{p.code}</code> : <span/>}
              <button className="btn btn-ghost" onClick={()=>copy(p.code)}><Copy size={16}/> คัดลอก</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
