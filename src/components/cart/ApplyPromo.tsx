"use client";
import { useState } from "react";
export function ApplyPromo({ onApply }:{ onApply:(code:string)=>Promise<void> }){
  const [code,setCode]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(){ if(!code.trim() || busy) return; setBusy(true); try{ await onApply(code.trim()); } finally{ setBusy(false); } }
  return (
    <div className="flex items-center gap-2">
      <input className="w-full rounded-[var(--radius)] border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--brand-orange)] focus:outline-none"
        placeholder="โค้ดส่วนลด" value={code} onChange={e=>setCode(e.target.value)} aria-label="promo-code" />
      <button className="btn btn-ghost" onClick={submit} disabled={busy}>{busy? "กำลังเช็ค…":"ใช้โค้ด"}</button>
    </div>
  );
}