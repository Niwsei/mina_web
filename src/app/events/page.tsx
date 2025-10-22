import type { Metadata } from "next";
import { fetchEvents } from "@/lib/api";
import { EventsClient } from "./ui-client";

const og = (t: string, s?: string) => `/api/og?title=${encodeURIComponent(t)}${s ? `&subtitle=${encodeURIComponent(s)}` : ""}`;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "อีเวนต์",
  description: "เวิร์กช็อปและกิจกรรมสำหรับคอกาแฟโดย YourCafe",
  alternates: { canonical: "/events" },
  openGraph: { url: "/events", title: "อีเวนต์ — YourCafe", description: "เวิร์กช็อปและกิจกรรมสำหรับคอกาแฟโดย YourCafe", images: [og("Events", "Workshops & Tastings")] },
  twitter: { title: "อีเวนต์ — YourCafe", description: "เวิร์กช็อปและกิจกรรมสำหรับคอกาแฟโดย YourCafe", images: [og("Events", "Workshops & Tastings")] }
};

export default async function EventsPage() {
  const events = await fetchEvents();
  return (
    <main className="section">
      <div className="container space-y-6">
        <header className="space-y-1">
          <h1 className="section-title">อีเวนต์</h1>
          <p className="section-desc">เวิร์กช็อป/กิจกรรมเพื่อคอกาแฟ</p>
        </header>
        <EventsClient initial={events} />
      </div>
    </main>
  );
}