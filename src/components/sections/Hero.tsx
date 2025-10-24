import Link from "next/link";
import Image from "next/image";
import { Coffee, Star, Flame } from "lucide-react";

export function Hero(){
  return (
    <section className="section coffee-section bg-inherit text-[var(--brand-cream)]">
      <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(135,62,32,0.28),_rgba(12,7,5,0)_70%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-220px] top-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,208,170,0.16),_rgba(10,6,4,0)_70%)] blur-3xl" />

      <div className="container relative">
        <div className="pointer-events-none absolute -top-24 right-24 hidden h-32 w-32 rotate-12 rounded-full border border-white/10 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.15)_0deg,rgba(199,106,58,0.35)_120deg,rgba(255,255,255,0)_320deg)] blur-[60px] md:block" />

        <div className="section-shell pattern-grid overflow-hidden">
          <span className="shine-stripe" aria-hidden />
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
            {/* LEFT: Copy */}
            <div className="space-y-6 anim-fadeUp">
              <span className="badge badge-fire">คั่วสด • เมล็ดพิเศษ • รสเข้มชัด</span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
              กาแฟที่ <em className="not-italic text-[var(--brand-gold)]">เข้มทุกหยด</em> จากโรงคั่วของเรา<br/>
              ซื่อสัตย์ต่อถ้วยที่อยู่ตรงหน้า
              </h1>
              <p className="max-w-[60ch] text-[var(--brand-cream)]/85">
              เชิญสัมผัสบรรยากาศอบอุ่นและกลิ่นกาแฟคั่วสดที่อบอวลทุกมุมร้าน
              ทั้งเมนูซิกเนเจอร์เข้มข้น และบริการสั่งออนไลน์ที่ใส่ใจเหมือนเสิร์ฟเองถึงโต๊ะ
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/order" className="btn btn-brand">สั่งออนไลน์ทันที</Link>
                <Link href="/menu" className="btn btn-ghost btn-ghost-dark">ดูเมนู</Link>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 text-xs uppercase tracking-[0.2em] text-[var(--brand-cream)]/70">
                {[
                  "Dark Chocolate",
                  "Toffee",
                  "Roasted Almond"
                ].map((note)=> (
                  <span key={note} className="taste-chip bg-[rgba(255,255,255,0.08)] text-[11px] font-semibold text-[var(--brand-cream)]">
                    {note}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-3 text-sm text-[var(--brand-cream)]/70">
                <span className="inline-flex items-center gap-1"><Star size={16}/> รีวิว 4.8/5</span>
                <span className="inline-flex items-center gap-1"><Flame size={16}/> ดริปร้อนฮิตสุด</span>
                <span className="inline-flex items-center gap-1"><Coffee size={16}/> คั่วเองในร้าน</span>
              </div>
            </div>

            {/* RIGHT: Visual */}
            <div className="relative anim-fadeUp anim-delay-2">
              <div className="pointer-events-none absolute -left-6 top-12 hidden h-36 w-36 rounded-full bg-[radial-gradient(circle_at_center,_rgba(231,200,167,0.25),_rgba(12,7,5,0)_70%)] blur-2xl md:block" />
              <div className="card glass card-dark pattern-grid p-0 overflow-hidden will-change-transform transition-transform">
                <span className="shine-stripe" aria-hidden />
                <Image src="/home/angle_coffee.jpg" alt="บรรยากาศคาเฟ่" width={1200} height={800} className="h-80 w-full object-cover" priority />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,7,5,0)_40%,rgba(11,7,5,0.65)_100%)]" />
              </div>

              {/* floating mini cards for depth */}
              <div className="hidden md:block">
                <div className="absolute -left-10 -bottom-12 floating-card px-5 py-4 text-sm shadow-lg animate-float-slow">
                  <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-cream)]/55">seasonal beans</div>
                  <div className="font-semibold text-white">Guji Uraga</div>
                  <p className="text-xs text-[var(--brand-cream)]/65">ลอตพิเศษ เข้ม ฟรุ๊ตตี้เล็กน้อย</p>
                </div>
                <div className="absolute -right-8 -top-10 floating-card px-4 py-3 text-sm shadow-lg">
                  ⚡ Roast on-site
                </div>
              </div>

              <div className="coffee-steam pointer-events-none hidden md:block" />
            </div>
          </div>
        </div>
      </div>

  {/* bottom wave accent removed so hero blends with following sections using the same bg-hero */}
    </section>
  );
}
