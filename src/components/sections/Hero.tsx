import Link from "next/link";
import Image from "next/image";
import { Coffee, Star, Flame } from "lucide-react";

export function Hero(){
  return (
    <section className="section relative bg-inherit text-white">
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* LEFT: Copy */}
          <div className="space-y-5 anim-fadeUp">
            <span className="badge badge-fire">คั่วสด • เมล็ดพิเศษ</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              กาแฟที่ <em className="not-italic text-(--brand-orange)">“ซื่อสัตย์”</em> กับต้นกำเนิด<br/>
              และจริงใจกับรสชาติ
            </h1>
            <p className="max-w-[52ch] text-(--brand-cream)/80">
              ดิจิทัลทวินของคาเฟ่คุณ — สั่งออนไลน์ เมนูเรียลไทม์ โปรฯ ส่วนตัวสำหรับลูกค้าประจำ
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/order" className="btn btn-brand">สั่งออนไลน์ทันที</Link>
              <Link href="/menu" className="btn btn-ghost">ดูเมนู</Link>
            </div>
            <div className="flex items-center gap-6 pt-1 text-sm text-(--brand-cream)/70">
              <span className="inline-flex items-center gap-1"><Star size={16}/> รีวิว 4.8/5</span>
              <span className="inline-flex items-center gap-1"><Flame size={16}/> ดริปร้อนฮิตสุด</span>
              <span className="inline-flex items-center gap-1"><Coffee size={16}/> คั่วเองในร้าน</span>
            </div>
          </div>

          {/* RIGHT: Visual */}
          <div className="relative anim-fadeUp anim-delay-2">
            <div className="card glass p-0 overflow-hidden will-change-transform transition-transform">
              <Image src="/home/angle_coffee.jpg" alt="บรรยากาศคาเฟ่" width={1200} height={800} className="h-80 w-full object-cover" priority />
            </div>

            {/* floating mini cards for depth */}
            <div className="hidden md:block">
              <div className="absolute -left-8 -bottom-6 card glass px-4 py-3 text-sm">
                ☕ Single Origin • Ethiopia
              </div>
              <div className="absolute -right-6 -top-6 card glass px-4 py-3 text-sm">
                ⚡ Roast on-site
              </div>
            </div>
          </div>
        </div>
      </div>

  {/* bottom wave accent removed so hero blends with following sections using the same bg-hero */}
    </section>
  );
}
