'use client';

import Link from "next/link";
import Image from "next/image";
import { Check, Coffee, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

export function About(){
  return (
    <section id="about" className="section coffee-section bg-inherit text-[var(--brand-cream)]">
      <div className="pointer-events-none absolute left-[12%] top-10 hidden h-48 w-48 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(199,106,58,0.24),_rgba(10,6,4,0)_70%)] blur-[90px] lg:block" />
      <div className="container relative">
        <div className="section-shell pattern-grid overflow-hidden">
          <span className="shine-stripe" aria-hidden />
          <div className="grid gap-12 md:grid-cols-[1.05fr_.95fr]">
            {/* Copy + bullets + stats */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <div className="eyebrow text-[var(--brand-cream)]/80 font-medium">our story</div>
                <h2 className="section-title text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_12px_32px_rgba(0,0,0,.45)]">เกี่ยวกับเรา</h2>
                <p className="section-desc max-w-[60ch] text-[var(--brand-cream)]/85">
                  เราซื่อสัตย์ต่อรสกาแฟตั้งแต่แหล่งปลูกถึงแก้วคุณ กลิ่นคั่วสดหอมกรุ่นตั้งแต่เช้า
                  โทนร้านอบอุ่น เรียบง่าย และออกแบบให้ทำงาน/พักผ่อนได้ยาว ๆ โดยไม่เสียโฟกัส
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["House Blend", "Honey Process", "Slow Bar"].map((pill)=>(
                  <span key={pill} className="taste-chip text-[var(--brand-cream)]/85">{pill}</span>
                ))}
              </div>

              <ul className="grid gap-3 text-sm">
                {[
                  "คัดสรรเมล็ดตามฤดูกาล พร้อมข้อมูลแหล่งที่มา",
                  "มาตรฐานการชงสม่ำเสมอทุกแก้ว",
                  "ใส่ใจสิ่งแวดล้อม รองรับแก้วส่วนตัว"
                ].map((t,i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(199,106,58,0.22)] text-[var(--brand-gold)]">
                      <Check size={14}/>
                    </span>
                    <span className="text-[var(--brand-cream)]/90">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="grid gap-4 rounded-2xl border border-white/10 bg-[rgba(15,9,6,0.65)] p-5 text-sm text-[var(--brand-cream)]/85">
                <div className="font-semibold uppercase tracking-[0.3em] text-[var(--brand-cream)]/60">journey to your cup</div>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    "คัดเลือกไร่คู่ค้าในเชียงใหม่ & น่าน",
                    "คั่ววันเว้นวัน ควบคุมค่าสี Agtron",
                    "พักเมล็ด 5 วัน ก่อนเสิร์ฟในร้าน"
                  ].map((text,idx)=>(
                    <div key={idx} className="rounded-xl border border-white/5 bg-[rgba(255,255,255,0.03)] p-3 shadow-[0_15px_40px_-32px_rgba(0,0,0,0.75)]">
                      <div className="text-xs uppercase tracking-[0.2em] text-[var(--brand-cream)]/55">ขั้นตอน {idx+1}</div>
                      <div className="mt-1 text-[var(--brand-cream)]">{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat k="ปีที่เปิด" v="2019" icon={<Coffee size={16}/>}/>
                <Stat k="เมล็ดคั่วเอง" v="100%" icon={<Users size={16}/>}/>
                <Stat k="เรตติ้ง" v="4.8/5" icon={<Star size={16}/>}/>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/menu" className="btn btn-ghost btn-ghost-dark border border-white/10 px-4 py-2 rounded-lg hover:brightness-110 transition">
                  ดูเมนู
                </Link>
                <Link href="/order" className="btn btn-brand">
                  สั่งออนไลน์
                </Link>
              </div>
            </motion.div>

            {/* Visual collage */}
            <div className="relative">
              <div className="pointer-events-none absolute -top-16 right-6 hidden h-36 w-36 rounded-full bg-[radial-gradient(circle_at_center,_rgba(224,173,99,0.26),_rgba(11,7,5,0)_70%)] blur-2xl lg:block" />
              <div className="card glass card-dark pattern-grid p-0 overflow-hidden rounded-2xl shadow-lg will-change-transform">
                <span className="shine-stripe" aria-hidden />
                <Image src="/home/angle_coffee.jpg" alt="บาร์กาแฟและทีม" width={1200} height={800} className="h-80 w-full object-cover" priority />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,6,4,0)_30%,rgba(10,6,4,0.75)_100%)]" />
              </div>
              <div className="absolute -left-8 -bottom-10 hidden md:block">
                <div className="floating-card pattern-grid overflow-hidden p-0">
                  <Image src="/home/view_coffee.jpg" alt="เมล็ดกาแฟ" width={320} height={240} className="h-32 w-48 rounded-[1.1rem] object-cover" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-[rgba(0,0,0,0.55)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">roastery</div>
                </div>
              </div>
              <div className="absolute -right-6 -top-8 hidden md:block">
                <div className="floating-card px-4 py-4 text-sm shadow-lg animate-float-slow">
                  <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-cream)]/60">team</div>
                  <div className="font-semibold text-white">Barista 4+</div>
                  <p className="text-xs text-[var(--brand-cream)]/65">ผ่านการเทรน SCA ทุกคน</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Stat({k, v, icon}: {k:string; v:string; icon?: React.ReactNode}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="pattern-grid relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(26,16,11,0.72)] p-5 text-center text-[var(--brand-cream)] shadow-[0_20px_45px_-24px_rgba(0,0,0,.65)] hover:shadow-[0_28px_55px_-22px_rgba(0,0,0,.7)] transition-all"
    >
      <span className="shine-stripe" aria-hidden />
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(199,106,58,0.18)] text-[var(--brand-gold)]">
        {icon}
      </div>
      <div className="mb-1 text-sm text-[var(--brand-cream)]/70">{k}</div>
      <div className="text-xl font-bold text-white">{v}</div>
    </motion.div>
  );
}