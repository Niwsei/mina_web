"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { 
  Check, Mail, Phone, ShoppingBag, X, 
  ChevronRight, Star, Clock, Users, ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PackageItem } from "@/lib/types";

// --- Types ---

type CategoryId = "ALL" | "CATERING" | "BREAKFAST" | "EVENT";

interface CategoryTab {
  id: CategoryId;
  label: string;
}

const CATEGORIES: CategoryTab[] = [
  { id: "ALL", label: "ทั้งหมด" },
  { id: "CATERING", label: "จัดเลี้ยง & สัมมนา" },
  { id: "BREAKFAST", label: "อาหารเช้า" },
  { id: "EVENT", label: "อีเวนต์ & งานแต่ง" },
];

/**
 * Helper to determine category from package data (mock logic for now).
 * in real app, this might come from the DB.
 */
function getCategory(pkg: PackageItem): CategoryId {
  if (pkg.title.includes("Catering")) return "CATERING";
  if (pkg.title.includes("Morning") || pkg.title.includes("Breakfast")) return "BREAKFAST";
  if (pkg.title.includes("Event") || pkg.title.includes("Wedding")) return "EVENT";
  return "ALL";
}

// --- Components ---

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2f1b10] via-[#1a100c] to-black px-6 py-16 md:px-12 md:py-24 shadow-2xl">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--brand-orange)]/30 blur-[100px]" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand-orange)] backdrop-blur-md">
            <Star size={12} className="fill-[var(--brand-orange)]" /> Premium Services
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-orange)] to-[#f97316]">Events</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-300/80 md:text-xl">
            บริการจัดเลี้ยงนอกสถานที่และ Snack Box ระดับพรีเมียม โดยทีมงานมืออาชีพจาก GoWhere
            พร้อมเสิร์ฟความประทับใจในทุกโอกาสพิเศษของคุณ
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://line.me/ti/p/@MinaCafe"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--brand-orange)] px-8 py-3.5 text-sm font-bold text-white shadow-[0_20px_40px_-15px_rgba(234,88,12,0.5)] transition hover:shadow-[0_20px_40px_-10px_rgba(234,88,12,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                สอบถามคิวงาน <ArrowRight size={16} />
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="tel:0812345678"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              <Phone size={16} /> 081-234-5678
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
  onClick,
}: {
  pkg: PackageItem;
  onClick: (p: PackageItem) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition-colors hover:bg-white/10"
      onClick={() => onClick(pkg)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        {pkg.imageUrl ? (
          <Image
            src={pkg.imageUrl}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-500">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
            <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-[var(--brand-orange)]">฿{(pkg.price / 100).toLocaleString()}</span>
                <span className="text-xs text-neutral-300">/ เริ่มต้น</span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-[var(--brand-orange)] transition-colors">
          {pkg.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-neutral-400">
          {pkg.description}
        </p>

        <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
            {pkg.features.slice(0, 2).map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check size={14} className="mt-0.5 shrink-0 text-[var(--brand-orange)]" />
                    <span className="line-clamp-1">{feat}</span>
                </div>
            ))}
             {pkg.features.length > 2 && (
                <p className="text-xs text-neutral-500 pl-6">+ อีก {pkg.features.length - 2} รายการ</p>
            )}
        </div>
        
        <div className="mt-6 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">ดูรายละเอียด</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-[var(--brand-orange)]">
                <ArrowRight size={14} />
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function PackageModal({
  pkg,
  onClose,
}: {
  pkg: PackageItem;
  onClose: () => void;
}) {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        layoutId={`modal-${pkg.id}`} // Advanced: shared layout id if we linked from card
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative col-span-1 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 w-full sm:h-80">
          {pkg.imageUrl && (
            <Image
              src={pkg.imageUrl}
              alt={pkg.title}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
             <h2 className="text-2xl font-bold text-white md:text-3xl">{pkg.title}</h2>
             <p className="text-lg font-medium text-[var(--brand-orange)]">เริ่มต้น ฿{(pkg.price / 100).toLocaleString()}</p>
          </div>
        </div>

        {/* content */}
        <div className="p-6 sm:p-8">
            <p className="mb-6 text-neutral-300">{pkg.description}</p>
            
            <div className="mb-8 rounded-2xl bg-white/5 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
                    <Check className="text-[var(--brand-orange)]" size={18} /> สิ่งที่จะได้รับ
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                    {pkg.features.map((feat, i) => (
                         <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                             <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600" />
                             {feat}
                         </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                 <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    เหมาะสำหรับ
                 </h4>
                 <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <Users size={16} /> {pkg.recommendedFor}
                 </div>
            </div>

            {/* Actions */}
            <div className="grid gap-3 sm:grid-cols-2">
                 <a 
                    href="https://line.me/ti/p/@MinaCafe"
                    target="_blank"
                    className="btn border-none bg-[#06C755] text-white hover:bg-[#05b24c] justify-center gap-2 rounded-xl py-3 font-semibold"
                 >
                    <span className="font-bold">LINE</span> สอบถามเพิ่มเติม
                 </a>
                 <a 
                    href="tel:0812345678"
                    className="btn border border-white/10 bg-white/5 text-white hover:bg-white/10 justify-center gap-2 rounded-xl py-3 font-semibold"
                 >
                    <Phone size={18} /> โทร 081-234-5678
                 </a>
            </div>
            
            <p className="mt-4 text-center text-xs text-neutral-500">
                * ราคาและรายละเอียดอาจมีการเปลี่ยนแปลงตามความต้องการพิเศษ
            </p>
        </div>
      </motion.div>
    </div>
  );
}

// --- Main Client ---

export function ExternalPackagesClient({ initial }: { initial: PackageItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("ALL");
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  const filteredPackages = useMemo(() => {
    if (selectedCategory === "ALL") return initial;
    return initial.filter((p) => getCategory(p) === selectedCategory);
  }, [initial, selectedCategory]);

  return (
    <div className="space-y-12 pb-20">
      <HeroSection />

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => {
           const active = selectedCategory === cat.id;
           return (
             <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                    active 
                    ? "text-black" 
                    : "text-neutral-400 hover:text-white"
                }`}
             >
                {active && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10">{cat.label}</span>
             </button>
           );
        })}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
           {filteredPackages.map((pkg) => (
             <PackageCard 
                key={pkg.id} 
                pkg={pkg} 
                onClick={(p) => setSelectedPackage(p)} 
             />
           ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPackage && (
            <PackageModal 
                pkg={selectedPackage} 
                onClose={() => setSelectedPackage(null)} 
            />
        )}
      </AnimatePresence>
    </div>
  );
}

