import type { Metadata } from "next";
import { fetchPackages } from "@/lib/api";
import { ExternalPackagesClient } from "./ui-client";

const og = (t: string, s?: string) => `/api/og?title=${encodeURIComponent(t)}${s ? `&subtitle=${encodeURIComponent(s)}` : ""}`;

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Package ภายนอก",
  description: "บริการจัดเลี้ยงและชุดเบรคกาแฟจาก YourCafe",
  alternates: { canonical: "/external-packages" },
  openGraph: {
    url: "/external-packages",
    title: "Package ภายนอก — YourCafe",
    description: "บริการจัดเลี้ยงและชุดเบรคกาแฟจาก YourCafe",
    images: [og("External Packages", "Catering & Events")]
  },
  twitter: {
    title: "Package ภายนอก — YourCafe",
    description: "บริการจัดเลี้ยงและชุดเบรคกาแฟจาก YourCafe",
    images: [og("External Packages", "Catering & Events")]
  }
};

export default async function ExternalPackagesPage() {
  const packages = await fetchPackages();
  return (
    <main className="section bg-main-wrapper">
      <div className="container space-y-6">
        <header className="space-y-1">
          <h1 className="section-title text-white">Package ภายนอก</h1>
          <p className="section-desc">บริการจัดเลี้ยงนอกสถานที่และ Snack Box</p>
        </header>
        <ExternalPackagesClient initial={packages} />
      </div>
    </main>
  );
}
