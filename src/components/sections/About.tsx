'use client';

import Link from "next/link";
import Image from "next/image";
import { Check, Coffee, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

export function About(){
  return (
    <section id="about" className="section relative bg-inherit text-white">
      <div className="container grid gap-10 md:grid-cols-[1.1fr_.9fr]">
        {/* Copy + bullets + stats */}
          <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
            <div className="space-y-3">
            <div className="eyebrow text-(--brand-cream)/80 font-medium">our story</div>
            <h2 className="section-title text-3xl md:text-4xl font-extrabold text-white">เกี่ยวกับเรา</h2>
              <p className="section-desc max-w-[60ch] text-(--brand-cream)/80">
              เราซื่อสัตย์ต่อรสกาแฟตั้งแต่แหล่งปลูกถึงแก้วคุณ โทนร้านอบอุ่น เรียบง่าย
              และออกแบบให้ทำงาน/พักผ่อนได้ยาว ๆ โดยไม่เสียโฟกัส
            </p>
          </div>

          <ul className="grid gap-3 text-sm">
            {[
              "คัดสรรเมล็ดตามฤดูกาล พร้อมข้อมูลแหล่งที่มา",
              "มาตรฐานการชงสม่ำเสมอทุกแก้ว",
              "ใส่ใจสิ่งแวดล้อม รองรับแก้วส่วนตัว"
            ].map((t,i)=>(
                <li key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange/10">
                  <Check className="text-brand-orange" size={14}/>
                </span>
                <span className="text-(--brand-cream)/90">{t}</span>
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Stat k="ปีที่เปิด" v="2019" icon={<Coffee size={16}/>}/>
            <Stat k="เมล็ดคั่วเอง" v="100%" icon={<Users size={16}/>}/>
            <Stat k="เรตติ้ง" v="4.8/5" icon={<Star size={16}/>}/>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/menu" className="btn btn-ghost text-[var(--brand-cream)]/90 border border-white/10 px-4 py-2 rounded-lg hover:brightness-105 transition">
              ดูเมนู
            </Link>
            <Link href="/order" className="btn btn-brand">
              สั่งออนไลน์
            </Link>
          </div>
        </motion.div>

        {/* Visual collage */}
        <div className="relative">
            <div className="card glass p-0 overflow-hidden rounded-2xl shadow-md will-change-transform">
              <Image src="/home/angle_coffee.jpg" alt="บาร์กาแฟและทีม" width={1200} height={800} className="h-80 w-full object-cover" priority />
            </div>
          <div className="absolute -left-6 -bottom-6 hidden md:block">
            <div className="card p-0 overflow-hidden rounded-lg shadow-md">
              <Image src="/home/view_coffee.jpg" alt="เมล็ดกาแฟ" width={300} height={240} className="h-32 w-44 object-cover" />
            </div>
          </div>
          <div className="absolute -right-6 -top-6 hidden md:block">
            <div className="card p-0 overflow-hidden rounded-lg shadow-md">
              <Image src="/home/spoon_coffee.jpg" alt="บาริสต้า" width={280} height={224} className="h-28 w-40 object-cover" />
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
      className="rounded-xl border border-white/10 bg-[rgba(15,10,8,0.6)]/60 p-4 text-center shadow-md hover:shadow-2xl transition-all"
    >
      <div className="flex items-center justify-center mb-2">
        <div className="w-8 h-8 rounded-full bg-[rgba(234,88,12,0.12)] flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-sm text-(--brand-cream)/70 mb-1">{k}</div>
      <div className="text-xl font-bold text-white">{v}</div>
    </motion.div>
  );
}