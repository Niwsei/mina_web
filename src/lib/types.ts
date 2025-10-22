export type ModifierOption = { id: string; label: string; delta: number };
export type Modifiers = { sizes?: ModifierOption[]; milk?: ModifierOption[]; extras?: ModifierOption[] };

export type Product = {
  id: string;
  name: string;
  price: number; // satang
  description?: string;
  imageUrl?: string;
  modifiers?: Modifiers;
};

export type Category = { id: string; name: string; products: Product[] };

export type CartItem = { productId: string; name: string; unitPrice: number; qty: number };

export type ApplyPromoResponse = { discount: number; applied: string[]; breakdown: string[] };

export type CreateOrderPayload = {
  serviceType: "PICKUP" | "DELIVERY";
  items: Pick<CartItem, "productId" | "unitPrice" | "qty" | "name">[];
  promoCode?: string;
};
export type OrderResponse = { order: { id: string; total: number } };

export type Promotion = {
  id: string;
  title: string;
  code?: string;
  type: "PERCENT" | "FIXED" | "BOGO" | "BUNDLE" | "HAPPY_HOUR";
  value?: number;            // percent or fixed satang
  description: string;
  period: { start: string; end?: string };
  status: "ACTIVE" | "UPCOMING" | "EXPIRED";
  badge?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;            // ISO
  time: string;            // "18:00–20:00"
  imageUrl?: string;
  location: string;
  blurb: string;
  status: "UPCOMING" | "PAST";
};
