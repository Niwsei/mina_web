// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Menu API
export async function fetchMenu() {
  const res = await fetch(`${API_BASE_URL}/menu`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch menu');
  const data = await res.json();
  return data.data;
}

export async function getMenuClient() {
  return fetchMenu();
}

// Promotions API
export async function fetchPromotions() {
  const res = await fetch(`${API_BASE_URL}/promotions`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch promotions');
  const data = await res.json();
  return data.data;
}

export async function applyPromo(items: any[], subtotal: number, code?: string) {
  const res = await fetch(`${API_BASE_URL}/promotions/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, subtotal, code }),
  });
  if (!res.ok) throw new Error('Failed to apply promo');
  const data = await res.json();
  return data.data;
}

// Orders API
export async function createOrder(items: any[], promoCode?: string) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, promoCode }),
  });
  if (!res.ok) throw new Error('Failed to create order');
  const data = await res.json();
  return data.data;
}

// Events API
export async function fetchEvents() {
  const res = await fetch(`${API_BASE_URL}/events`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch events');
  const data = await res.json();
  return data.data;
}

// Packages API
export async function fetchPackages() {
  const res = await fetch(`${API_BASE_URL}/packages`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch packages');
  const data = await res.json();
  return data.data;
}

// Keep REVIEWS from mock data for now
export { REVIEWS } from './mock';