"use client";
import { useMemo, useState } from "react";
import { applyPromo, createOrder } from "@/lib/api";
import { useCartStore } from "@/components/cart/store";
import { ApplyPromo } from "@/components/cart/ApplyPromo";
import { CartSummary } from "@/components/cart/CartSummary";
import { ProductModal } from "@/components/modals/ProductModal";
import type { Category, Product } from "@/lib/types";
import { ShoppingCart, X } from "lucide-react";
import { toast } from "@/components/ui/toast";

export function OrderClient({ initialMenu }: { initialMenu: Category[] }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const add = useCartStore((s) => s.add);
  const items = useCartStore((s) => s.items);
  const code = useCartStore((s) => s.promoCode);
  const setDiscount = useCartStore((s) => s.setDiscount);
  const discount = useCartStore((s) => s.discount);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.unitPrice * i.qty, 0), [items]);
  const total = Math.max(0, subtotal - discount);

  async function onApplyPromo(c: string) {
    try {
      const res = await applyPromo(items, subtotal, c);
      setDiscount(c, res.discount || 0);
      if (res.discount > 0)
        toast({ title: "ใช้โค้ดสำเร็จ", description: `ลด ฿${(res.discount / 100).toFixed(2)}`, variant: "success" });
      else toast({ title: "โค้ดไม่ถูกต้อง", variant: "error" });
    } catch {
      toast({ title: "ไม่สามารถตรวจโค้ดได้", variant: "error" });
    }
  }

  async function onCheckout() {
    if (items.length === 0) return;
    try {
      const order = await createOrder({ serviceType: "PICKUP", items, promoCode: code || undefined });
      toast({ title: "ออเดอร์สำเร็จ", description: `หมายเลข ${order.order.id}`, variant: "success" });
      alert(`ออเดอร์สำเร็จ • หมายเลข: ${order.order.id} • รวม: ฿${(order.order.total / 100).toFixed(2)}`);
      useCartStore.getState().reset();
      setCartOpen(false);
    } catch {
      toast({ title: "ชำระเงินไม่สำเร็จ", variant: "error" });
    }
  }

  return (
    <main className="section">
      <div className="container space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="section-title">สั่งออนไลน์</h1>
            <p className="section-desc">แตะรายการเพื่อปรับแต่ง • เพิ่มลงตะกร้า • ใช้โค้ด (ถ้ามี) • ยืนยัน</p>
          </div>
          <span className="hidden lg:inline-flex badge badge-dark items-center gap-1">
            <ShoppingCart size={14} /> {items.length} รายการ
          </span>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="min-h-40">
            <ProductListOrder
              menu={initialMenu}
              onSelect={(p) => {
                setActiveProduct(p);
                setModalOpen(true);
              }}
            />
          </section>

          <aside className="card sticky top-20 h-max space-y-3 hidden lg:block">
            <CartBlock
              items={items}
              subtotal={subtotal}
              discount={discount}
              onDec={(i) => useCartStore.getState().dec(i)}
              onInc={(i) => useCartStore.getState().inc(i)}
              onRemove={(i) => useCartStore.getState().remove(i)}
              onApplyPromo={onApplyPromo}
              onCheckout={onCheckout}
              disabled={items.length === 0}
            />
          </aside>
        </div>
      </div>

      <OrderMobileBar total={total} onOpen={() => setCartOpen(true)} />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)}>
        <div className="space-y-3">
          <CartBlock
            items={items}
            subtotal={subtotal}
            discount={discount}
            onDec={(i) => useCartStore.getState().dec(i)}
            onInc={(i) => useCartStore.getState().inc(i)}
            onRemove={(i) => useCartStore.getState().remove(i)}
            onApplyPromo={onApplyPromo}
            onCheckout={onCheckout}
            disabled={items.length === 0}
          />
        </div>
      </CartModal>

      <ProductModal
        product={activeProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={({ label, unitPrice, qty }) => {
          for (let i = 0; i < qty; i++) add({ productId: activeProduct!.id, name: label, unitPrice });
          toast({ title: "เพิ่มลงตะกร้าแล้ว", description: label, variant: "success" });
          setModalOpen(false);
        }}
      />
    </main>
  );
}

/* local UI pieces */
function ProductListOrder({ menu, onSelect }: { menu: Category[]; onSelect: (p: Product) => void }) {
  return (
    <div className="space-y-6 anim-fadeUp">
      {menu.map((cat: Category) => (
        <section key={cat.id} className="space-y-2">
          <h3 className="text-lg font-semibold">{cat.name}</h3>
          <div className="divide-y rounded-[var(--radius)] border">
            {cat.products.map((p: Product) => (
              <button
                key={p.id}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50"
                onClick={() => onSelect(p)}
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{p.name}</div>
                  {p.description && <div className="truncate text-xs text-neutral-500">{p.description}</div>}
                </div>
                <div className="tabular-nums">฿{(p.price / 100).toFixed(2)}</div>
                <span className="btn btn-ghost">ปรับแต่ง</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function OrderMobileBar({ total, onOpen }: { total: number; onOpen: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 px-4 py-3 lg:hidden">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <div className="text-sm">
          <div className="text-neutral-600">รวมทั้งสิ้น</div>
          <div className="text-lg font-semibold tabular-nums">฿{(total / 100).toFixed(2)}</div>
        </div>
        <button className="btn btn-brand" onClick={onOpen}>
          <ShoppingCart size={16} /> เปิดตะกร้า
        </button>
      </div>
    </div>
  );
}
function CartModal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-[20px] bg-white p-4 shadow-2xl">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">ตะกร้าของคุณ</h3>
          <button aria-label="close" onClick={onClose} className="p-1 text-neutral-600 hover:text-black">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}
function CartBlock({
  items,
  subtotal,
  discount,
  onDec,
  onInc,
  onRemove,
  onApplyPromo,
  onCheckout,
  disabled
}: {
  items: { name: string; unitPrice: number; qty: number }[];
  subtotal: number;
  discount: number;
  onDec: (i: number) => void;
  onInc: (i: number) => void;
  onRemove: (i: number) => void;
  onApplyPromo: (c: string) => Promise<void>;
  onCheckout: () => void;
  disabled: boolean;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">ตะกร้า</h3>
        <span className="text-xs text-neutral-600">{items.length} รายการ</span>
      </div>
      {items.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-dashed p-6 text-center text-neutral-600">ตะกร้าว่าง — เลือกรายการจากด้านซ้าย</div>
      ) : (
        <div className="space-y-2">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="flex-1 truncate">{it.name}</div>
              <div className="tabular-nums">฿{(it.unitPrice / 100).toFixed(2)}</div>
              <div className="flex items-center gap-2">
                <button aria-label="decrement" className="px-2 py-1 border rounded" onClick={() => onDec(idx)}>
                  -
                </button>
                <span aria-live="polite" className="tabular-nums">
                  {it.qty}
                </span>
                <button aria-label="increment" className="px-2 py-1 border rounded" onClick={() => onInc(idx)}>
                  +
                </button>
              </div>
              <button aria-label="remove" className="p-1 text-neutral-500 hover:text-neutral-800" onClick={() => onRemove(idx)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      <hr />
      <ApplyPromo onApply={onApplyPromo} />
      <CartSummary subtotal={subtotal} discount={discount} />
      <button className="btn btn-brand w-full" disabled={disabled} onClick={onCheckout}>
        ยืนยันคำสั่งซื้อ
      </button>
    </>
  );
}
