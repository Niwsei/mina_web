import { Clock, MapPin, Phone, Mail, Accessibility, Navigation } from "lucide-react";

export function ContactLocation(){
  return (
  <section id="contact" className="section coffee-section bg-inherit text-[var(--brand-cream)]">
      <div className="pointer-events-none absolute left-10 top-8 hidden h-48 w-48 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(199,106,58,0.22),_rgba(11,7,5,0)_75%)] blur-[90px] lg:block" />
      <div className="container relative">
        <div className="section-shell pattern-grid overflow-hidden">
          <span className="shine-stripe" aria-hidden />
          <div className="grid gap-10 md:grid-cols-[minmax(0,430px)_1fr]">
            {/* Info card */}
            <div className="floating-card pattern-grid space-y-6 border border-white/10 p-6 anim-fadeUp">
              <span className="shine-stripe" aria-hidden />
              <div className="space-y-1">
                <div className="eyebrow text-[var(--brand-cream)]/80">visit us</div>
                <h2 className="section-title text-white drop-shadow-[0_10px_28px_rgba(0,0,0,.55)]">ติดต่อ & ที่ตั้ง</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Takeaway", "Dine-in", "Co-working"].map((pill)=>(
                  <span key={pill} className="taste-chip text-[var(--brand-cream)]/85">{pill}</span>
                ))}
              </div>

              <div className="grid gap-3 text-sm text-[var(--brand-cream)]/90">
                <Row icon={<Clock size={16}/>} title="เวลาเปิดทำการ">
                  ทุกวัน 08:00–21:00 <span className="text-xs text-[var(--brand-cream)]/60">(อัปเดตวันนี้)</span>
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
              <div className="space-y-2 text-sm text-[var(--brand-cream)]/85">
                <div className="font-medium text-white">การเดินทาง & จุดสังเกต</div>
                <ul className="list-disc space-y-1 pl-5 text-[var(--brand-cream)]/75">
                  <li>BTS/MRT ที่ใกล้สุด: …</li>
                  <li>ที่จอดรถ: มี … คัน</li>
                  <li>ใกล้สวนสาธารณะ … (เดิน 5 นาที)</li>
                </ul>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-2">
                <a className="btn btn-ghost btn-ghost-dark" href="tel:+66XXXXXXXXX"><Phone size={16}/> โทร</a>
                <a className="btn btn-ghost btn-ghost-dark" href="mailto:hello@yourcafe.com"><Mail size={16}/> อีเมล</a>
                <a className="btn btn-brand" href="https://maps.google.com" target="_blank" rel="noreferrer"><Navigation size={16}/> นำทาง</a>
              </div>
            </div>

            {/* Map with overlay */}
            <div className="relative anim-fadeUp anim-delay-2">
              <div className="card card-dark pattern-grid overflow-hidden p-0">
                <span className="shine-stripe" aria-hidden />
                <iframe
                  title="แผนที่ร้าน"
                  className="h-[380px] w-full grayscale hover:grayscale-0 transition"
                  src="https://maps.google.com/maps?q=Bangkok&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                />
              </div>
              <div className="absolute left-4 top-4 rounded-full bg-[rgba(18,10,6,0.78)] px-3 py-1 text-xs text-[var(--brand-cream)] shadow-lg">
                เปิดวันนี้ 08:00–21:00
              </div>
              <div className="absolute bottom-4 right-4 rounded-full bg-[rgba(255,255,255,0.08)] px-3 py-1 text-xs uppercase tracking-[0.3em] text-[var(--brand-cream)]/70">
                350 ม. จาก BTS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Row({ icon, title, children }:{ icon: React.ReactNode; title: string; children: React.ReactNode }){
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-[rgba(255,255,255,0.03)] p-3">
      <div className="mt-1 rounded-full bg-[rgba(199,106,58,0.18)] p-1.5 text-[var(--brand-gold)]">{icon}</div>
      <div className="space-y-0.5">
        <div className="text-[var(--brand-cream)]/80">{title}</div>
        <div className="tabular-nums text-[var(--brand-cream)]">{children}</div>
      </div>
    </div>
  );
}