"use client";
import type { EventItem } from "@/lib/types";
import { CalendarDays, MapPin, Clock, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "@/components/ui/toast";

export function EventsClient({ initial }:{ initial: EventItem[] }){
  const [tab,setTab] = useState<"UPCOMING"|"PAST"|"ALL">("UPCOMING");
  const list = useMemo(()=>{
    if(tab==="ALL") return initial;
    return initial.filter(e=>e.status===tab);
  },[initial, tab]);

  function rsvp(event: EventItem){
    // mock
    toast({ title:"ลงชื่อสำรองที่นั่งแล้ว", description: event.title, variant:"success" });
  }

  return (
    <section className="space-y-4">
      <div className="tabs">
        {["UPCOMING","PAST","ALL"].map((t)=>(
          <button key={t} onClick={()=>setTab(t as any)}
            className={`tab ${tab===t? "tab-active":""}`}>{t==="ALL"?"ทั้งหมด":t==="UPCOMING"?"กำลังจะมา":"ที่ผ่านมา"}</button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e)=>(
          <article key={e.id} className="card p-0 overflow-hidden transition hover:-translate-y-0.5 hover:shadow-2xl">
            {e.imageUrl && <img src={e.imageUrl} alt={e.title} className="h-40 w-full object-cover" loading="lazy" />}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{e.title}</h3>
              <div className="flex flex-wrap gap-3 text-sm text-neutral-700">
                <span className="inline-flex items-center gap-1"><CalendarDays size={16}/> {e.date}</span>
                <span className="inline-flex items-center gap-1"><Clock size={16}/> {e.time}</span>
                <span className="inline-flex items-center gap-1"><MapPin size={16}/> {e.location}</span>
              </div>
              <p className="text-sm text-neutral-700">{e.blurb}</p>
              <div className="pt-1">
                <button className="btn btn-brand" onClick={()=>rsvp(e)}><Ticket size={16}/> RSVP</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
