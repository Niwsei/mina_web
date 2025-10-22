import type {
  Category, ApplyPromoResponse, CreateOrderPayload, OrderResponse, Product, Promotion, EventItem
} from "./types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const IMG = {
  LATTE: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop",
  ESPRESSO: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1200&auto=format&fit=crop",
  CROISSANT: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?q=80&w=1200&auto=format&fit=crop",
  EVENT: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop"
};

const baseModifiers = {
  sizes: [
    { id: "S", label: "S", delta: 0 },
    { id: "M", label: "M", delta: 1000 },
    { id: "L", label: "L", delta: 2000 }
  ],
  milk: [
    { id: "WHOLE", label: "นมโค", delta: 0 },
    { id: "OAT", label: "นมโอ๊ต", delta: 800 },
    { id: "ALMOND", label: "อัลมอนด์", delta: 800 }
  ],
  extras: [
    { id: "SHOT", label: "เพิ่มช็อต", delta: 1500 },
    { id: "SYRUP", label: "ไซรัปเฮเซลนัท", delta: 1000 }
  ]
};

const MENU: Category[] = [
  {
    id: "espresso",
    name: "เอสเพรสโซ่",
    products: [
      { id: "esp1", name: "เอสเพรสโซ่", price: 7500, description: "ช็อตเข้มกลมกล่อม", imageUrl: IMG.ESPRESSO,
        modifiers: { sizes: [{ id: "S", label: "Single", delta: 0 }, { id: "D", label: "Double", delta: 1500 }] } },
      { id: "lat1", name: "ลาเต้", price: 9500, description: "บาลานซ์นมและช็อต", imageUrl: IMG.LATTE, modifiers: baseModifiers }
    ]
  },
  {
    id: "bakery",
    name: "เบเกอรี่",
    products: [{ id: "cro1", name: "ครัวซองต์เนยสด", price: 6500, description: "อบเช้า หอมเนย", imageUrl: IMG.CROISSANT }]
  }
];

export const REVIEWS = [
  { id: "r1", author: "Nok",  rating: 5, text: "ลาเต้นมโอ๊ตคือที่สุด หอมมาก!", source: "Google" },
  { id: "r2", author: "Bank", rating: 5, text: "บาริสต้าใส่ใจ รายละเอียดดีมาก", source: "Google" },
  { id: "r3", author: "Mew",  rating: 4, text: "เอสเพรสโซ่เข้มแต่คลีน บรรยากาศดี", source: "Google" },
  { id: "r4", author: "Tarn", rating: 5, text: "ครัวซองต์อบใหม่ กรอบนอกนุ่มใน", source: "Google" }
];

const PROMOS: Promotion[] = [
  {
    id: "p1", title: "WELCOME10", code: "WELCOME10", type: "PERCENT", value: 10,
    description: "ส่วนลด 10% สำหรับออเดอร์แรก", badge: "ใหม่",
    period: { start: "2025-01-01" }, status: "ACTIVE"
  },
  {
    id: "p2", title: "Happy Hour 14:00–17:00", type: "HAPPY_HOUR",
    description: "แต้ม x2 ทุกวันอังคาร ช่วง 14:00–17:00", period: { start: "2025-02-01" }, status: "UPCOMING"
  },
  {
    id: "p3", title: "BUNDLE: กาแฟ + ครัวซองต์ ฿150", type: "BUNDLE", value: 15000,
    description: "คอมโบสุดคุ้มตลอดทั้งเดือนที่ 1", period: { start: "2024-12-01", end: "2024-12-31" }, status: "EXPIRED"
  },
  {
    id: "p4", title: "FREESHOT", code: "FREESHOT", type: "FIXED", value: 1500,
    description: "ฟรีเพิ่มช็อต 1 ครั้ง เมื่อสั่งเมนูกาแฟ", badge: "ยอดนิยม",
    period: { start: "2025-01-15" }, status: "ACTIVE"
  }
];

const EVENTS: EventItem[] = [
  {
    id: "e1", title: "Coffee Cupping Night",
    date: "2025-11-10", time: "18:30–20:00", location: "YourCafe สาขาหลัก",
    blurb: "ชิมเมล็ด single origin 4 ตัว พร้อมพูดคุยโน้ตรส",
    imageUrl: IMG.EVENT, status: "UPCOMING"
  },
  {
    id: "e2", title: "Latte Art Workshop (Beginner)",
    date: "2025-12-02", time: "10:00–12:00", location: "YourCafe Lab",
    blurb: "พื้นฐานสตรีมนมและราดหัวใจ/ทิวลิป",
    imageUrl: IMG.EVENT, status: "UPCOMING"
  },
  {
    id: "e3", title: "Roasting Demo Recap",
    date: "2024-10-05", time: "15:00–16:00", location: "YourCafe Roastery",
    blurb: "ไฮไลต์จากกิจกรรมเดิม",
    imageUrl: IMG.EVENT, status: "PAST"
  }
];

export async function fetchMenu(): Promise<Category[]> { await delay(200); return JSON.parse(JSON.stringify(MENU)); }
export async function getMenuClient(): Promise<Category[]> { await delay(150); return JSON.parse(JSON.stringify(MENU)); }

export async function applyPromo(
  items: { productId: string; qty: number; unitPrice: number }[],
  subtotal: number,
  code?: string
): Promise<ApplyPromoResponse> {
  await delay(120);
  const normalized = (code || "").trim().toUpperCase();
  if (!normalized) return { discount: 0, applied: [], breakdown: [] };
  if (normalized === "WELCOME10") {
    const discount = Math.round(subtotal * 0.1);
    return { discount, applied: ["WELCOME10"], breakdown: ["ส่วนลด 10% สำหรับออเดอร์แรก"] };
  }
  if (normalized === "FREESHOT") {
    const discount = 1500; // free extra shot mock
    return { discount, applied: ["FREESHOT"], breakdown: ["ฟรีเพิ่มช็อต 1 ครั้ง"] };
  }
  return { discount: 0, applied: [], breakdown: ["โค้ดไม่ถูกต้อง"] };
}

export async function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
  await delay(220);
  const total = payload.items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  return { order: { id: "ORD-" + Math.random().toString(36).slice(2, 7).toUpperCase(), total } };
}

export async function fetchPromotions(): Promise<Promotion[]> { await delay(100); return JSON.parse(JSON.stringify(PROMOS)); }
export async function fetchEvents(): Promise<EventItem[]> { await delay(100); return JSON.parse(JSON.stringify(EVENTS)); }
