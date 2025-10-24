"use client";
import type { Promotion } from "@/lib/types";
import { toast } from "@/components/ui/toast";
import { Copy, Gift, Timer, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { ContentCard } from "@/components/shared/ContentCard";
import { ContentHero } from "@/components/shared/ContentHero";
import { useCartStore } from "@/components/cart/store";
import { applyPromo } from "@/lib/api";

type PromoTab = Promotion["status"] | "ALL";

const statusOrder: Record<Promotion["status"], number> = { ACTIVE: 0, UPCOMING: 1, EXPIRED: 2 };
const statusToneHero: Record<Promotion["status"], string> = {
  ACTIVE: "bg-emerald-100/20 text-emerald-100 border border-emerald-400/60",
  UPCOMING: "bg-amber-100/20 text-amber-100 border border-amber-300/70",
  EXPIRED: "bg-neutral-900/50 text-neutral-300 border border-white/10"
};
const statusToneCard: Record<Promotion["status"], string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  UPCOMING: "bg-amber-50 text-amber-700 border border-amber-200",
  EXPIRED: "bg-neutral-100 text-neutral-700 border border-neutral-200"
};
const statusLabel: Record<Promotion["status"], string> = {
  ACTIVE: "ใช้งานได้",
  UPCOMING: "เร็ว ๆ นี้",
  EXPIRED: "หมดเขต"
};

function formatValue(promo: Promotion): string | undefined {
  if (promo.type === "PERCENT" && promo.value) return `ลด ${promo.value}%`;
  if (promo.type === "FIXED" && promo.value) return `ลด ฿${(promo.value / 100).toFixed(0)}`;
  if (promo.type === "BUNDLE" && promo.value) return `ชุดสุดคุ้ม ฿${(promo.value / 100).toFixed(0)}`;
  if (promo.type === "BOGO") return "ซื้อ 1 แถม 1";
  if (promo.type === "HAPPY_HOUR") return "Happy Hour";
  return undefined;
}

function formatDateRange(range: Promotion["period"], formatter: Intl.DateTimeFormat) {
  const start = formatter.format(new Date(range.start));
  if (!range.end) return `${start} เป็นต้นไป`;
  const end = formatter.format(new Date(range.end));
  return `${start} – ${end}`;
}

export function PromoClient({ initial }: { initial: Promotion[] }) {
  const [tab, setTab] = useState<PromoTab>("ACTIVE");

  const formatter = useMemo(
    () => new Intl.DateTimeFormat("th-TH", { year: "numeric", month: "short", day: "numeric" }),
    []
  );

  const ordered = useMemo(
    () => [...initial].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]),
    [initial]
  );

  const stats = useMemo(
    () =>
      ordered.reduce(
        (acc, promo) => {
          acc.total += 1;
          if (promo.status === "ACTIVE") acc.active += 1;
          if (promo.status === "UPCOMING") acc.upcoming += 1;
          if (promo.status === "EXPIRED") acc.expired += 1;
          return acc;
        },
        { total: 0, active: 0, upcoming: 0, expired: 0 }
      ),
    [ordered]
  );

  const featured = useMemo(
    () => ordered.find((promo) => promo.status === "ACTIVE") ?? ordered[0],
    [ordered]
  );

  const filtered = useMemo(() => {
    const data = tab === "ALL" ? ordered : ordered.filter((promo) => promo.status === tab);
    return [...data];
  }, [ordered, tab]);

  async function copy(code?: string) {
    if (!code) {
      toast({ title: "โปรนี้ไม่มีโค้ด", variant: "info" });
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      toast({ title: "คัดลอกโค้ดแล้ว", description: code, variant: "success" });
    } catch {
      toast({ title: "คัดลอกไม่สำเร็จ", variant: "error" });
    }
  }

  async function apply(promo: Promotion) {
    // Basic guard: promo must be ACTIVE
    if (promo.status !== "ACTIVE") {
      toast({ title: "โปรโมชั่นไม่สามารถใช้ได้", description: "โปรโมชั่นนี้ยังไม่พร้อมใช้งาน", variant: "info" });
      return;
    }

    const items = useCartStore.getState().items;
    if (!items || items.length === 0) {
      toast({ title: "ตะกร้าว่าง", description: "กรุณาเพิ่มสินค้าในตะกร้าก่อนใช้โปรโมชั่น", variant: "info" });
      return;
    }

    // Basic eligibility checks for special promos (mock rules)
    if (promo.code === "FREESHOT") {
      // require at least one coffee-like product by name
      const hasCoffee = items.some(i => /กาแฟ|เอสเพรสโซ|ลาเต้|latte|espresso/i.test(i.name));
      if (!hasCoffee) {
        toast({ title: "ข้อกำหนดไม่ถูกต้อง", description: "โปรโมชั่นนี้ใช้ได้เฉพาะการสั่งเครื่องดื่มกาแฟ", variant: "info" });
        return;
      }
    }

    const subtotal = items.reduce((s, it) => s + it.unitPrice * it.qty, 0);
    try {
      const res = await applyPromo(items.map(i=>({ productId:i.productId, qty:i.qty, unitPrice:i.unitPrice })), subtotal, promo.code);
      if (res.discount && res.discount > 0) {
        useCartStore.getState().setDiscount(promo.code || "", res.discount);
        toast({ title: "โปรโมชั่นใช้ได้", description: res.breakdown.join('\n'), variant: "success" });
      } else {
        toast({ title: "ไม่สามารถใช้โปรโมชั่น", description: res.breakdown.join('\n'), variant: "error" });
      }
    } catch (err) {
      toast({ title: "เกิดข้อผิดพลาด", description: "ไม่สามารถตรวจสอบโปรโมชั่นได้", variant: "error" });
    }
  }

  if (!stats.total) {
    return (
      <section className="space-y-8">
        <ContentHero
          eyebrow={{ text: "โปรโมชัน" }}
          title="ยังไม่มีข้อเสนอในขณะนี้"
          description="กลับมาใหม่เร็ว ๆ นี้เพื่อรับส่วนลดและสิทธิพิเศษก่อนใคร"
          meta={<></>}
        />
      </section>
    );
  }

  return (
    <section className="space-y-6 md:space-y-10">
      {featured && (
        <ContentHero
          eyebrow={{ text: "Featured Offer" }}
          title={featured.title}
          description={featured.description}
          meta={
            <>
              <span className="content-pill">
                <Timer size={16} /> {formatDateRange(featured.period, formatter)}
              </span>
              <span className="content-pill">
                <Gift size={16} /> {formatValue(featured) ?? "ข้อเสนอพิเศษจากเรา"}
              </span>
              <span className={`content-pill ${statusToneHero[featured.status]}`}>
                <Trophy size={16} /> {statusLabel[featured.status]}
              </span>
            </>
          }
          side={
            <>
              <dl className="content-hero-stats">
                <div>
                  <dt>โปรทั้งหมด</dt>
                  <dd>{stats.total}</dd>
                </div>
                <div>
                  <dt>ใช้งานได้</dt>
                  <dd>{stats.active}</dd>
                </div>
                <div>
                  <dt>เร็ว ๆ นี้</dt>
                  <dd>{stats.upcoming}</dd>
                </div>
              </dl>
              <div className="flex flex-col gap-3">
                {featured.code ? (
                  <button className="btn btn-brand" onClick={() => copy(featured.code)}>
                    <Copy size={16} /> ใช้โค้ด {featured.code}
                  </button>
                ) : (
                  <button className="btn btn-ghost-dark" onClick={() => copy(undefined)}>
                    <Copy size={16} /> ดูรายละเอียด
                  </button>
                )}
                <p className="text-xs text-neutral-100/70">
                  กดปุ่มเพื่อคัดลอกโค้ดไปใช้งานที่หน้าเช็กเอาต์ได้ทันที
                </p>
              </div>
            </>
          }
        />
      )}

      <div className="surface-panel space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 md:text-xl">ข้อเสนอทั้งหมด</h3>
            <p className="text-sm text-neutral-600">
              เลือกดูโปรที่ใช่สำหรับคุณ ({stats.active} โปรใช้งานได้ในตอนนี้)
            </p>
          </div>
          <div className="tab-group">
            {["ACTIVE", "UPCOMING", "EXPIRED", "ALL"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t as PromoTab)}
                className={`tab ${tab === t ? "tab-active" : ""}`}
              >
                {t === "ALL" ? "ทั้งหมด" : statusLabel[t as Promotion["status"]]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((promo) => (
            <ContentCard
              key={promo.id}
              badge={promo.badge}
              header={
                <>
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-neutral-900">{promo.title}</h4>
                    {formatValue(promo) && (
                      <p className="text-sm font-medium text-[var(--brand-red)]">
                        {formatValue(promo)}
                      </p>
                    )}
                  </div>
                  <span className={`content-status ${statusToneCard[promo.status]}`}>
                    {statusLabel[promo.status]}
                  </span>
                </>
              }
              footer={
                <>
                  {promo.code ? (
                    <code className="promo-code">{promo.code}</code>
                  ) : (
                    <span className="text-sm text-neutral-500">ไม่ต้องใช้โค้ด</span>
                  )}
                  <button className="btn btn-ghost" onClick={() => copy(promo.code)}>
                    <Copy size={16} /> คัดลอก
                  </button>
                </>
              }
            >
              <p className="text-sm text-neutral-700">{promo.description}</p>
              <dl className="content-meta" data-type="flex">
                <div>
                  <dt>ช่วงเวลา</dt>
                  <dd>{formatDateRange(promo.period, formatter)}</dd>
                </div>
                <div>
                  <dt>ประเภท</dt>
                  <dd>{promo.type.replaceAll("_", " ")}</dd>
                </div>
              </dl>
            </ContentCard>
          ))}
        </div>
      </div>
    </section>
  );
}
