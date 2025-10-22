import { fetchPromotions } from "@/lib/api";
import { buildOffers, buildBreadcrumb, SITE } from "@/lib/seo";

export default async function Head() {
  const promos = await fetchPromotions();
  const offers = buildOffers(promos);
  const crumbs = buildBreadcrumb([{ name: "Home", url: SITE.url }, { name: "Promotions", url: `${SITE.url}/promotions` }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offers) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </>
  );
}