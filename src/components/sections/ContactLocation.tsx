import { Clock, MapPin, Phone, Mail, Accessibility, Navigation } from "lucide-react";

export function ContactLocation(){
  return (
  <section id="contact" className="section bg-inherit text-white">
      <div className="container grid gap-8 md:grid-cols-[460px_1fr]">
        {/* Info card */}
        <div className="card glass space-y-5 anim-fadeUp">
          <div className="space-y-1">
            <div className="eyebrow text-(--brand-cream)/80">visit us</div>
            <h2 className="section-title text-white">ติดต่อ & ที่ตั้ง</h2>
          </div>

          <div className="grid gap-3 text-sm text-(--brand-cream)/90">
            <Row icon={<Clock size={16}/>} title="เวลาเปิดทำการ">
              ทุกวัน 08:00–21:00 <span className="text-xs text-neutral-500">(อัปเดตวันนี้)</span>
            </Row>
            <Row icon={<MapPin size={16}/>} title="ที่อยู่">
              123 ถนนสุขุมวิท แขวง/เขต… กรุงเทพฯ 10xxx
            </Row>
            <Row icon={<Phone size={16}/>} title="โทร">
              <a className="underline" href="tel:+66XXXXXXXXX">+66-XXX-XXX-XXX</a>
            </Row>
            <Row icon={<Mail size={16}/>} title="อีเมล">
              <a className="underline" href="mailto:hello@yourcafe.com">hello@yourcafe.com</a>
            </Row>
            <Row icon={<Accessibility size={16}/>} title="การเข้าถึง">
              ทางเข้าเรียบ • ห้องน้ำรองรับรถเข็น
            </Row>
          </div>

          <div className="divider-gradient" />

          {/* Guidance */}
          <div className="space-y-2 text-sm text-(--brand-cream)/85">
            <div className="font-medium text-white">การเดินทาง & จุดสังเกต</div>
            <ul className="list-disc pl-5">
              <li>BTS/MRT ที่ใกล้สุด: …</li>
              <li>ที่จอดรถ: มี … คัน</li>
              <li>ใกล้สวนสาธารณะ … (เดิน 5 นาที)</li>
            </ul>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2">
            <a className="btn btn-ghost text-(--brand-cream)/90" href="tel:+66XXXXXXXXX"><Phone size={16}/> โทร</a>
            <a className="btn btn-ghost text-(--brand-cream)/90" href="mailto:hello@yourcafe.com"><Mail size={16}/> อีเมล</a>
            <a className="btn btn-brand" href="https://maps.google.com" target="_blank" rel="noreferrer"><Navigation size={16}/> นำทาง</a>
          </div>
        </div>

        {/* Map with overlay */}
        <div className="relative anim-fadeUp anim-delay-2">
          <div className="card p-0 overflow-hidden">
            <iframe
              title="แผนที่ร้าน"
              className="h-[380px] w-full grayscale hover:grayscale-0 transition"
              src="https://maps.google.com/maps?q=Bangkok&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs shadow">
            เปิดวันนี้ 08:00–21:00
          </div>
        </div>
      </div>
    </section>
  );
}
function Row({ icon, title, children }:{ icon: React.ReactNode; title: string; children: React.ReactNode }){
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-full bg-(--brand-orange)/15 p-1.5 text-(--brand-orange)">{icon}</div>
      <div>
        <div className="text-neutral-700">{title}</div>
        <div className="tabular-nums">{children}</div>
      </div>
    </div>
  );
}