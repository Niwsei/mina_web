import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Noto_Sans_Thai } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { SITE } from "@/lib/seo";

const noto = Noto_Sans_Thai({ subsets: ["thai", "latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "YourCafe — Specialty Coffee", template: "%s — YourCafe" },
  description: "สั่งออนไลน์ เมนูอัปเดตเรียลไทม์ • Digital Twin ของคาเฟ่คุณ",
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "th_TH",
    url: SITE.url,
    title: "YourCafe — Specialty Coffee",
    description: "สั่งออนไลน์ เมนูอัปเดตเรียลไทม์ • Digital Twin ของคาเฟ่คุณ",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "YourCafe" },
      { url: "/hero.jpg", width: 1200, height: 800, alt: "YourCafe Hero" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourcafe",
    creator: "@yourcafe",
    title: "YourCafe — Specialty Coffee",
    description: "สั่งออนไลน์ เมนูอัปเดตเรียลไทม์ • Digital Twin ของคาเฟ่คุณ",
    images: ["/og.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={noto.className}>
        <Header />
        <div /* className="pt-[var(--header-h)]" */>{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
