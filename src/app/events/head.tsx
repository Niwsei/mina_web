import { fetchEvents } from "@/lib/api";
import { buildEvents, buildBreadcrumb, SITE } from "@/lib/seo";

export default async function Head() {
  const events = await fetchEvents();
  const graph = buildEvents(events);
  const crumbs = buildBreadcrumb([{ name: "Home", url: SITE.url }, { name: "Events", url: `${SITE.url}/events` }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </>
  );
}