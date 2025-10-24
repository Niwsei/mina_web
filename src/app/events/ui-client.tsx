"use client";
import type { EventItem } from "@/lib/types";
import { toast } from "@/components/ui/toast";
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ContentCard } from "@/components/shared/ContentCard";
import { ContentHero } from "@/components/shared/ContentHero";

type EventTab = "UPCOMING" | "PAST" | "ALL";

const statusOrder: Record<EventItem["status"], number> = { UPCOMING: 0, PAST: 1 };
const statusLabel: Record<EventItem["status"], string> = {
  UPCOMING: "กำลังจะมา",
  PAST: "ที่ผ่านมา"
};
const statusTone: Record<EventItem["status"], string> = {
  UPCOMING: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  PAST: "bg-neutral-100 text-neutral-600 border border-neutral-200"
};

function formatDate(date: string, formatter: Intl.DateTimeFormat) {
  return formatter.format(new Date(date));
}

export function EventsClient({ initial }: { initial: EventItem[] }) {
  const [tab, setTab] = useState<EventTab>("UPCOMING");

  const shortFormatter = useMemo(
    () => new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short" }),
    []
  );
  const longFormatter = useMemo(
    () => new Intl.DateTimeFormat("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    []
  );

  const ordered = useMemo(() => {
    return [...initial].sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      if (a.status === "PAST" && b.status === "PAST") return bDate - aDate;
      return aDate - bDate;
    });
  }, [initial]);

  const stats = useMemo(
    () =>
      ordered.reduce(
        (acc, event) => {
          acc.total += 1;
          if (event.status === "UPCOMING") acc.upcoming += 1;
          if (event.status === "PAST") acc.past += 1;
          return acc;
        },
        { total: 0, upcoming: 0, past: 0 }
      ),
    [ordered]
  );

  const featured = useMemo(
    () => ordered.find((event) => event.status === "UPCOMING") ?? ordered[0],
    [ordered]
  );

  const filtered = useMemo(() => {
    if (tab === "ALL") return ordered;
    return ordered.filter((event) => event.status === tab);
  }, [ordered, tab]);

  function rsvp(event: EventItem) {
    const title = event.status === "PAST" ? "กิจกรรมนี้จบไปแล้ว" : "ลงชื่อสำรองที่นั่งแล้ว";
    toast({ title, description: event.title, variant: event.status === "PAST" ? "info" : "success" });
  }

  if (!stats.total) {
    return (
      <section className="space-y-8">
        <ContentHero
          eyebrow={{ text: "Events" }}
          title="ยังไม่มีกิจกรรมในขณะนี้"
          description="ติดตามช่องทางนี้เพื่ออัปเดตเวิร์กช็อปและกิจกรรมรอบถัดไป"
          meta={<></>}
        />
      </section>
    );
  }

  return (
    <section className="space-y-6 md:space-y-10">
      {featured && (
        <ContentHero
          eyebrow={{ text: "Highlight Event" }}
          title={featured.title}
          description={featured.blurb}
          meta={
            <>
              <span className="content-pill">
                <CalendarDays size={16} /> {formatDate(featured.date, longFormatter)}
              </span>
              <span className="content-pill">
                <Clock size={16} /> {featured.time}
              </span>
              <span className="content-pill">
                <MapPin size={16} /> {featured.location}
              </span>
            </>
          }
          side={
            <div className="content-hero-actions">
              <button className="btn btn-brand" onClick={() => rsvp(featured)}>
                <Ticket size={16} /> RSVP ฟรี
              </button>
              <p className="text-xs text-neutral-100/70">
                {stats.upcoming} กิจกรรมกำลังเปิดรับสำรองที่นั่ง
              </p>
            </div>
          }
          visual={
            featured.imageUrl && (
              <Image
                src={featured.imageUrl}
                alt={featured.title}
                fill
                className="object-cover"
              />
            )
          }
        />
      )}

      <div className="surface-panel space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 md:text-xl">กิจกรรมทั้งหมด</h3>
            <p className="text-sm text-neutral-600">
              {stats.upcoming} กิจกรรมกำลังจะมาถึง · {stats.past} กิจกรรมที่ผ่านมา
            </p>
          </div>
          <div className="tab-group">
            {["UPCOMING", "PAST", "ALL"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t as EventTab)}
                className={`tab ${tab === t ? "tab-active" : ""}`}
              >
                {t === "ALL" ? "ทั้งหมด" : statusLabel[t as EventItem["status"]]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((event) => (
            <ContentCard
              key={event.id}
              image={
                event.imageUrl && (
                  <div className="relative w-full h-[160px]">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              }
              header={
                <>
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-neutral-900">{event.title}</h4>
                    <p className="text-sm text-[var(--brand-red)]">
                      {formatDate(event.date, shortFormatter)} · {event.time}
                    </p>
                  </div>
                  <span className={`content-status ${statusTone[event.status]}`}>
                    {statusLabel[event.status]}
                  </span>
                </>
              }
              footer={
                <div className="flex w-full justify-end">
                  <button
                    className={`btn ${event.status === "PAST" ? "btn-ghost" : "btn-brand"}`}
                    onClick={() => rsvp(event)}
                  >
                    <Ticket size={16} /> {event.status === "PAST" ? "ดูสรุปกิจกรรม" : "RSVP"}
                  </button>
                </div>
              }
            >
              <p className="text-sm text-neutral-700">{event.blurb}</p>
              <dl className="content-meta">
                <div>
                  <dt>วันที่</dt>
                  <dd>{formatDate(event.date, longFormatter)}</dd>
                </div>
                <div>
                  <dt>เวลา</dt>
                  <dd>{event.time}</dd>
                </div>
                <div>
                  <dt>สถานที่</dt>
                  <dd>{event.location}</dd>
                </div>
              </dl>
            </ContentCard>
          ))}
        </div>
      </div>
    </section>
  );
}
