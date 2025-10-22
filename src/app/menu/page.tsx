import type { Metadata } from "next";
import { fetchMenu } from "@/lib/api";
import { MenuClient } from "./ui-client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "เมนู",
  description: "เมนูกาแฟและเบเกอรี่แบบอัปเดตเรียลไทม์",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu", title: "เมนู — YourCafe", description: "เมนูกาแฟและเบเกอรี่แบบอัปเดตเรียลไทม์", images: ["/og.jpg"] },
  twitter: { title: "เมนู — YourCafe", description: "เมนูกาแฟและเบเกอรี่แบบอัปเดตเรียลไทม์", images: ["/og.jpg"] }
};

export default async function MenuPage() {
  const menu = await fetchMenu();
  return (
    <main className="section">
      <div className="container space-y-6">
        <header className="space-y-1 anim-fadeUp">
          <h1 className="section-title">เมนู</h1>
          <p className="section-desc">เลือกหมวด ค้นหา และเพิ่มลงตะกร้าได้ทันที</p>
        </header>
        <MenuClient initialMenu={menu}/>
      </div>
    </main>
  );
}
