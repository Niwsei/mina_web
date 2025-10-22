import type { Metadata } from "next";
import { fetchMenu } from "@/lib/api";
import { OrderClient } from "./ui-client";

const og = (t: string, s?: string) => `/api/og?title=${encodeURIComponent(t)}${s ? `&subtitle=${encodeURIComponent(s)}` : ""}`;

export const metadata: Metadata = {
  title: "สั่งออนไลน์",
  description: "เลือกเมนู ปรับแต่ง และยืนยันออเดอร์ได้ทันที",
  alternates: { canonical: "/order" },
  openGraph: {
    url: "/order",
    title: "สั่งออนไลน์ — YourCafe",
    description: "เลือกเมนู ปรับแต่ง และยืนยันออเดอร์ได้ทันที",
    images: [og("Order Online", "YourCafe")]
  },
  twitter: {
    card: "summary_large_image",
    title: "สั่งออนไลน์ — YourCafe",
    description: "เลือกเมนู ปรับแต่ง และยืนยันออเดอร์ได้ทันที",
    images: [og("Order Online", "YourCafe")]
  }
};

export default async function OrderPage() {
  const initialMenu = await fetchMenu(); // SSR mock
  return <OrderClient initialMenu={initialMenu} />;
}
