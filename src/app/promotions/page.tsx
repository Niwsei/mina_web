import type { Metadata } from "next";
import { fetchPromotions } from "@/lib/api";
import { PromoClient } from "./ui-client";

const og = (t: string, s?: string) => `/api/og?title=${encodeURIComponent(t)}${s ? `&subtitle=${encodeURIComponent(s)}` : ""}`;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "โปรโมชัน",
  description: "ข้อเสนอและส่วนลดล่าสุดจาก YourCafe",
  alternates: { canonical: "/promotions" },
  openGraph: { url: "/promotions", title: "โปรโมชัน — YourCafe", description: "ข้อเสนอและส่วนลดล่าสุดจาก YourCafe", images: [og("Promotions", "Deals & Coupons")] },
  twitter: { title: "โปรโมชัน — YourCafe", description: "ข้อเสนอและส่วนลดล่าสุดจาก YourCafe", images: [og("Promotions", "Deals & Coupons")] }
};

export default async function PromotionsPage() {
  const promos = await fetchPromotions();
  return (
    <main className="section bg-main-wrapper">
      <div className="container space-y-6">
        <header className="space-y-1">
          <h1 className="section-title text-white">โปรโมชัน</h1>
          <p className="section-desc">ข้อเสนอที่เลือกสรรเพื่อคุณลูกค้าประจำ</p>
        </header>
        <PromoClient initial={promos} />
      </div>
    </main>
  );
}
