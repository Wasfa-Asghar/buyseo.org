const fs = require("fs");
const path = require("path");

const root = __dirname;
const base = "https://buyseo.org";
const today = new Date().toISOString().slice(0, 10);

function walk(dir, rel = "") {
  let urls = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const r = rel ? `${rel}/${f}` : f;
    if (fs.statSync(p).isDirectory()) {
      if (f === "node_modules" || f === ".git") continue;
      urls = urls.concat(walk(p, r));
    } else if (f.endsWith(".html")) {
      const webPath = r.replace(/\\/g, "/");
      const loc = f === "index.html" ? `${base}/` : `${base}/${webPath}`;
      const pri = f === "index.html" ? "1.0" : webPath.startsWith("tools/") ? "0.7" : "0.8";
      const ch =
        webPath.startsWith("tools/") ||
        ["faq.html", "blog.html", "about.html", "contact.html", "terms.html", "privacy.html", "refund.html"].includes(f)
          ? "monthly"
          : "weekly";
      urls.push({ loc, pri, ch });
    }
  }
  return urls;
}

const urls = walk(root).sort((a, b) => a.loc.localeCompare(b.loc));

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.ch}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`
    )
    .join("\n") +
  "\n</urlset>\n";

fs.writeFileSync(path.join(root, "sitemap.xml"), xml);
fs.writeFileSync(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
);

console.log(`Wrote sitemap.xml with ${urls.length} URLs`);