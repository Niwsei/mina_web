import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Reviews } from "@/components/sections/Reviews";
import { ContactLocation } from "@/components/sections/ContactLocation";

export const metadata: Metadata = {
  title: "Home",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "YourCafe — Specialty Coffee" },
  twitter: { title: "YourCafe — Specialty Coffee" }
};

export default function LandingPage(){
  return (
    <main className="bg-main-wrapper">
      <Hero />
      <About />
      <Reviews />
      <ContactLocation />
    </main>
  );
}
