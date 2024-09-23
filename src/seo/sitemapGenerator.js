// Generera en sitemap

export const generateSitemap = (req) => {
  const pages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/favorites", changefreq: "weekly", priority: 0.8 },
    // Lägg till fler rutter här dynamiskt (vad betyder det) om det behövs (?)
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  pages.forEach((page) => {
    sitemap += `
    <url>
      <loc>${req.protocol}://${req.get("host")}${page.url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`;
  });

  sitemap += `\n</urlset>`;

  return sitemap;
};
