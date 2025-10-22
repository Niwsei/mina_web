// components/Header.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Coffee, Menu, X } from "lucide-react";

// --- 1. Data-Driven Navigation ---
// กำหนดโครงสร้างข้อมูลสำหรับเมนู
type PageLink = {
  type: "page";
  href: string;
  label: string;
  isCta?: boolean;
};
type AnchorLink = {
  type: "anchor";
  id: "about" | "contact"; // จำกัด type ให้แคบลง
  label: string;
};
type NavItem = PageLink | AnchorLink;

// กำหนดเมนูทั้งหมดในที่เดียว
const navItems: NavItem[] = [
  { type: "anchor", id: "about", label: "เกี่ยวกับ" },
  { type: "anchor", id: "contact", label: "ติดต่อ" },
  { type: "page", href: "/menu", label: "เมนู" },
  { type: "page", href: "/promotions", label: "โปรโมชัน" },
  { type: "page", href: "/events", label: "อีเวนต์" },
  { type: "page", href: "/order", label: "สั่งออนไลน์", isCta: true },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<"about" | "contact" | null>(
    null
  );

  const pathname = usePathname();
  const router = useRouter();

  // --- 2. Effects ---

  /* Shadow/opacity on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scrollspy เฉพาะหน้า Home (ดึง id จาก navItems) */
  const anchorIds = useMemo(
    () =>
      navItems
        .filter((item): item is AnchorLink => item.type === "anchor")
        .map((item) => item.id),
    [] // navItems เป็นค่าคงที่, ทำงานแค่ครั้งเดียว
  );

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const els = anchorIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) {
          setActiveSection(vis[0].target.id as "about" | "contact");
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, anchorIds]);

  // --- 3. Handlers (แก้ไขปัญหา async onClick) ---

  /* สถานะ active ของเมนู page-level */
  const isPage = useCallback((p: string) => pathname === p, [pathname]);

  /* โลโก้: ถ้าอยู่หน้า Home ให้เลื่อนขึ้นบนสุดแทน reload */
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault(); // ทำ sync ทันที
      const navigate = async () => {
        await smoothScrollToTop();
        if (open) setOpen(false);
      };
      navigate().catch(console.error); // เรียก async logic
    }
    // ถ้าอยู่หน้าอื่น ปล่อยให้ Link ทำงานตามปกติ (ไปหน้า "/")
  };

  /* แองเคอร์: จัดการการเลื่อน/เปลี่ยนหน้า */
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: "about" | "contact"
  ) => {
    e.preventDefault(); // ทำ sync ทันที
    const navigate = async () => {
      if (pathname === "/") {
        await smoothScrollToId(id);
        if (open) setOpen(false);
      } else {
        router.push(`/#${id}`);
        if (open) setOpen(false);
      }
    };
    navigate().catch(console.error); // เรียก async logic
  };

  // --- 4. Prop Getters (สำหรับ .map()) ---

  /* สร้าง props สำหรับ Anchor Link */
  const getAnchorProps = (item: AnchorLink) => {
    const active = activeSection === item.id;
    return {
      "data-active": active ? "true" : "false",
      "aria-current": active && pathname === "/" ? ("location" as const) : undefined,
      className: "nav-link focus-ring",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
        handleAnchorClick(e, item.id),
      href: `/#${item.id}`,
    };
  };

  /* สร้าง props สำหรับ Page Link */
  const getPageProps = (item: PageLink) => {
    const active = isPage(item.href);
    const ctaClass = item.isCta
      ? "nav-link-cta border-none bg-gradient-to-r from-[#431f10] via-[var(--brand-orange)] to-[#f97316] px-5 py-1.5 font-semibold shadow-[0_20px_48px_-24px_rgba(234,88,12,.6)] transition hover:brightness-110"
      : "";

    return {
      "data-active": active ? "true" : "false",
      "aria-current": active ? ("page" as const) : undefined,
      "data-cta": item.isCta ? "true" : undefined,
      className: `nav-link focus-ring ${ctaClass}`.trim(),
      href: item.href,
    };
  };

  // --- 5. Render JSX ---
  return (
    <>
      {/* Skip link เพื่อข้ามเมนูด้วยคีย์บอร์ด */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] h-[var(--header-h)] border-b border-white/10 header-glass ${
          scrolled ? "scrolled" : ""
        }`}
        role="banner"
      >
        <div className="container h-full">
          <div className="flex h-[var(--header-h)] items-center justify-between gap-6">
            {/* Brand */}
            <Link
              href="/"
              prefetch
              onClick={handleLogoClick}
              className="focus-ring inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white backdrop-blur-sm transition hover:bg-white/10"
              aria-label="Go to home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2f1b10] via-[#3f1d0d] to-[var(--brand-orange)] shadow-[0_18px_30px_-18px_rgba(234,88,12,.55)]">
                <Coffee size={18} strokeWidth={1.6} />
              </span>
              <span className="flex flex-col leading-tight text-left">
                <span className="text-lg font-semibold uppercase tracking-[0.12em] text-white">
                  YourCafe
                </span>
                <span className="text-[10px] uppercase tracking-[0.38em] text-[var(--brand-cream)]/70">
                  Dark roast studio
                </span>
              </span>
            </Link>

            <div className="ml-auto hidden items-center gap-6 md:flex">
              <div className="hidden items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[var(--brand-cream)]/60 lg:flex">
                <span className="inline-flex h-2.5 w-2.5 items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-orange)] shadow-[0_0_0_5px_rgba(234,88,12,.28)]" />
                </span>
                <span className="font-medium">Roasting daily • 8.00–21.00</span>
              </div>

              {/* Desktop Nav (Render from loop) */}
              <nav aria-label="Primary">
                <ul className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-1.5 py-1 shadow-[0_18px_46px_-28px_rgba(0,0,0,.6)] backdrop-blur">
                  {navItems.map((item) => {
                    const linkProps =
                      item.type === "page"
                        ? getPageProps(item)
                        : getAnchorProps(item);
                    return (
                      <li key={item.type === "page" ? item.href : item.id}>
                        <Link prefetch {...linkProps}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Mobile button */}
            <button
              className="ml-2 inline-flex items-center justify-center rounded-xl p-2 text-white focus-ring md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile sheet (Render from loop) */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-[max-height,opacity] duration-300 overflow-hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-white/10 bg-[rgba(15,10,8,0.96)] backdrop-blur-sm">
            <div className="container space-y-3 py-3">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--brand-cream)]/70 shadow-sm">
                <span className="font-semibold tracking-[0.36em] text-[var(--brand-cream)]/80">
                  Roasting daily
                </span>
                <span className="text-[var(--brand-orange)]">8.00–21.00</span>
              </div>
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => {
                  if (item.type === "page") {
                    const pageProps = getPageProps(item);
                    return (
                      <li key={item.href}>
                        <Link
                          prefetch
                          {...pageProps}
                          className={`${pageProps.className} w-full justify-start text-base text-white md:w-auto md:justify-center md:text-sm`}
                          // ปิดเมนูเมื่อคลิก link page ธรรมดา
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const anchorProps = getAnchorProps(item);
                  return (
                    <li key={item.id}>
                      <Link
                        prefetch
                        {...anchorProps}
                        className={`${anchorProps.className} w-full justify-start text-base text-white md:w-auto md:justify-center md:text-sm`}
                        // getAnchorProps มี onClick ที่ปิดเมนูในตัวอยู่แล้ว
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* กัน header fixed ทับเนื้อหา */}
      <div aria-hidden className="h-[var(--header-h)]" />
    </>
  );
}

// --- Utility Functions (ย้ายมาไว้ข้างล่าง) ---

/* รอจน scroll หยุด เพื่อปิดเมนูมือถืออัตโนมัติ */
function waitForSmoothScrollEnd(timeoutMs = 2000): Promise<void> {
  return new Promise((resolve) => {
    const start = Date.now();
    let lastY = window.scrollY;
    let idle = 0;
    const tick = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 0.5) {
        idle += 16;
        if (idle >= 120) return resolve();
      } else {
        idle = 0;
        lastY = y;
      }
      if (Date.now() - start > timeoutMs) return resolve();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

async function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  await waitForSmoothScrollEnd();
}
async function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  await waitForSmoothScrollEnd();
}
