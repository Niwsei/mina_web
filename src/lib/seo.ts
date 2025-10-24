import type { Category, EventItem, Promotion } from "@/lib/types";

export const SITE = {
  name: "YourCafe",
  url: "https://yourcafe.example.com",
  logo: "https://yourcafe.example.com/logo.png",
  telephone: "+66-XXX-XXX-XXX",
  sameAs: [
    "https://www.facebook.com/yourcafe",
    "https://www.instagram.com/yourcafe",
    "https://line.me/R/ti/p/@yourcafe"
  ],
  address: {
    streetAddress: "123 ถนนสุขุมวิท",
    addressLocality: "กรุงเทพฯ",
    postalCode: "10xxx",
    addressCountry: "TH"
  },
  geo: { latitude: 13.7563, longitude: 100.5018 },
  timezoneOffset: "+07:00",
};

export function toISO(date: string, hhmm?: string, tz: string = SITE.timezoneOffset) {
  if (!hhmm) return `${date}T00:00:00${tz}`;
  const [h, m] = hhmm.split(":");
  return `${date}T${h.padStart(2,"0")}:${m.padStart(2,"0")}:00${tz}`;
}

export function buildOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}#organization`,
    name: SITE.name, url: SITE.url, logo: SITE.logo, sameAs: SITE.sameAs,
    contactPoint: [{ "@type": "ContactPoint", telephone: SITE.telephone, contactType: "customer service", areaServed: "TH" }]
  };
}

export function buildLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${SITE.url}#localbusiness`,
    name: SITE.name,
    image: [`${SITE.url}/hero.jpg`, `${SITE.url}/about.jpg`],
    url: SITE.url, telephone: SITE.telephone,
    address: { "@type": "PostalAddress", streetAddress: SITE.address.streetAddress, addressLocality: SITE.address.addressLocality, postalCode: SITE.address.postalCode, addressCountry: SITE.address.addressCountry },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.latitude, longitude: SITE.geo.longitude },
    priceRange: "$$", servesCuisine: ["Coffee", "Bakery"],
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "08:00", closes: "21:00" }],
    hasMenu: `${SITE.url}/menu`, sameAs: SITE.sameAs
  };
}

export function buildMenu(categories: Category[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE.url}#menu`,
    name: `${SITE.name} Menu`,
    hasMenuSection: categories.map(c => ({
      "@type": "MenuSection",
      name: c.name,
      hasMenuItem: c.products.map(p => ({
        "@type": "MenuItem",
        name: p.name,
        description: p.description,
        image: p.imageUrl,
        offers: { "@type": "Offer", price: (p.price/100).toFixed(2), priceCurrency: "THB", url: `${SITE.url}/order` }
      }))
    }))
  };
}

interface SchemaOffer {
  "@type": "Offer";
  name: string;
  url: string;
  availabilityStarts?: string;
  availabilityEnds?: string;
  category: string;
  description: string;
  couponCode?: string;
  discount?: string;
  price?: string;
  priceCurrency?: string;
}

export function buildOffers(promos: Promotion[]) {
  const offers = promos.map(p => {
    const base: SchemaOffer = {
      "@type": "Offer", name: p.title, url: `${SITE.url}/promotions`,
      availabilityStarts: p.period?.start, ...(p.period?.end ? { availabilityEnds: p.period.end } : {}),
      category: p.type, description: p.description
    };
    if (p.code) base["couponCode"] = p.code;
    if (typeof p.value === "number") {
      if (p.type === "PERCENT") base["discount"] = `${p.value}%`;
      else {
        base["price"] = (p.value/100).toFixed(2);
        base["priceCurrency"] = "THB";
      }
    }
    return base;
  });
  return { "@context": "https://schema.org", "@graph": [{ "@type":"AggregateOffer", url:`${SITE.url}/promotions`, offerCount: offers.length, offers }, ...offers] };
}

export function buildEvents(events: EventItem[]) {
  const graph = events.map(e => {
    const [startT, endT] = (e.time || "").split(/–|-/).map(s => s.trim());
    const startDate = toISO(e.date, startT);
    const endDate = endT ? toISO(e.date, endT) : undefined;
    return {
      "@type": "Event",
      name: e.title, image: e.imageUrl,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: e.status === "PAST" ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
      startDate, ...(endDate ? { endDate } : {}),
      location: { "@type": "Place", name: SITE.name, address: { "@type":"PostalAddress", streetAddress: SITE.address.streetAddress, addressLocality: SITE.address.addressLocality, postalCode: SITE.address.postalCode, addressCountry: SITE.address.addressCountry } },
      organizer: { "@type":"Organization", name: SITE.name, url: SITE.url },
      description: e.blurb, url: `${SITE.url}/events`
    };
  });
  return { "@context": "https://schema.org", "@graph": graph };
}

/* NEW: WebSite + SearchAction (site links search box) */
export function buildWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/menu?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

/* NEW: BreadcrumbList helper */
export function buildBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem", position: idx + 1,
      name: it.name, item: it.url
    }))
  };
}
