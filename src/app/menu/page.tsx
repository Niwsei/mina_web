import type { Metadata } from "next";
import { fetchMenu } from "@/lib/api";
import { MenuClient } from "./ui-client";
import type { MenuCategory, MenuProduct } from "./ui-client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "เมนู",
  description: "เมนูกาแฟและเบเกอรี่แบบอัปเดตเรียลไทม์",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu", title: "เมนู — YourCafe", description: "เมนูกาแฟและเบเกอรี่แบบอัปเดตเรียลไทม์", images: ["/og.jpg"] },
  twitter: { title: "เมนู — YourCafe", description: "เมนูกาแฟและเบเกอรี่แบบอัปเดตเรียลไทม์", images: ["/og.jpg"] }
};

export default async function MenuPage() {
  const rawMenu = await fetchMenu();
  const categories = (Array.isArray(rawMenu) ? rawMenu : []) as MenuCategory[];
  const normalizedCategories = categories.map((category) => ({
    ...category,
    products: Array.isArray(category.products) ? category.products : [],
  }));
  const categoryCount = normalizedCategories.length;
  const totalProducts = normalizedCategories.reduce(
    (acc: number, category) => acc + category.products.length,
    0
  );
  const signatureSuggestions: MenuProduct[] = normalizedCategories
    .flatMap((category) => category.products.slice(0, 1))
    .slice(0, 3);

  return (
    <main className="section coffee-section bg-red-950/60">
      <div className="container">
  <div className="section-shell pattern-grid overflow-hidden space-y-10 text-[var(--brand-cream)]">
          <div className="relative">
            <span className="shine-stripe" aria-hidden="true" />
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-6 anim-fadeUp">
                <div className="flex flex-wrap items-center gap-3 text-[var(--brand-cream)]/70">
                  <span className="eyebrow">กาแฟเข้มข้นประจำบาร์</span>
                  <span className="badge badge-fire">อัปเดตทุกวัน</span>
                </div>
                <h1 className="section-title text-3xl md:text-4xl text-[var(--brand-cream)]">เมนู</h1>
                <p className="max-w-xl text-base text-[var(--brand-cream)]/80">
                  เลือกหมวด ค้นหารสชาติที่ใช่ และเพิ่มลงตะกร้าได้แบบเรียลไทม์ — ทั้งเมล็ดคั่วสด เครื่องดื่มซิกเนเจอร์
                  และขนมอบที่จับคู่กันได้ลงตัว
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="taste-chip">Signature Espresso</span>
                  <span className="taste-chip">Slow Bar</span>
                  <span className="taste-chip">Seasonal Beans</span>
                </div>
                <ul className="grid gap-4 text-sm text-[var(--brand-cream)]/75 md:grid-cols-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-orange)]" aria-hidden="true" />
                    <span>{categoryCount} หมวดหมู่ พร้อมจัดเรียงตามบรรยากาศร้าน</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-orange)]" aria-hidden="true" />
                    <span>{totalProducts} รายการให้เลือก ทั้งร้อน เย็น และขนมอบ</span>
                  </li>
                  <li className="flex items-start gap-3 md:col-span-2">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-orange)]" aria-hidden="true" />
                    <span>ระบบเชื่อมต่อออร์เดอร์สด ๆ กับตะกร้าออนไลน์ เพิ่มลดได้ทันที</span>
                  </li>
                </ul>
              </div>
              <aside className="floating-card animate-float-slow space-y-5 overflow-hidden border-white/10 bg-[rgba(18,10,6,0.85)] p-6 text-[var(--brand-cream)]/85">
                <span className="taste-chip">Barista Picks</span>
                <p className="text-sm leading-relaxed text-[var(--brand-cream)]/75">
                  เริ่มต้นด้วยเมนูแนะนำจากบาริสต้า — ผสมผสานโน้ตช็อกโกแลต มอลต์ และผลไม้ตามฤดูกาลให้เข้ากันพอดี
                </p>
                <div className="space-y-3">
                  {signatureSuggestions.length > 0 ? (
                    signatureSuggestions.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[calc(var(--radius)-4px)] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--brand-cream)]/85"
                      >
                        <p className="font-semibold text-[var(--brand-cream)]">{item.name}</p>
                        <p>จิบแบบไม่ใส่น้ำเชื่อมเพื่อสัมผัสรสชาติเต็มที่</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[calc(var(--radius)-4px)] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--brand-cream)]/85">
                      <p className="font-semibold text-[var(--brand-cream)]">พร้อมเสิร์ฟ</p>
                      <p>เมนูสุดฮิตจะปรากฏที่นี่ทันทีที่ข้อมูลโหลดสำเร็จ</p>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
          <MenuClient initialMenu={normalizedCategories} />
        </div>
      </div>
    </main>
  );
}
