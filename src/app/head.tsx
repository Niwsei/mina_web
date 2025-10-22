import { fetchMenu } from "@/lib/api";
import { buildOrganization, buildLocalBusiness, buildMenu, buildWebSite, buildBreadcrumb, SITE } from "@/lib/seo";

export default async function Head() {
  const categories = await fetchMenu();
  const org = buildOrganization();
  const lb  = buildLocalBusiness();
  const menu = buildMenu(categories);
  const web = buildWebSite();
  const crumbs = buildBreadcrumb([{ name: "Home", url: SITE.url }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menu) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(web) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </>
  );
}