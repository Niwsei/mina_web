import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/order`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/promotions`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
}