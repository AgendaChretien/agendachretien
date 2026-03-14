import { fetchEvents } from "~/lib/events.server";

export async function loader() {
  // Fetch all events for the sitemap
  const allEvents = await fetchEvents({ token: undefined, page: 1 });

  const baseUrl = "https://agendachretien.fr";

  // Static pages
  const staticPages = [{ url: baseUrl, changefreq: "daily", priority: 1.0 }];

  // Dynamic event pages
  const eventPages = (allEvents || []).map((event) => ({
    url: `${baseUrl}/events/${event.documentId}`,
    changefreq: "weekly" as const,
    priority: 0.8,
  }));

  const pages = [...staticPages, ...eventPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
