/**
 * Generates one HTML page per tool/plan from products.js
 * Run: node generate-pages.js
 */
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "products.js"), "utf8");
const sandbox = { window: {} };
Function("window", src)(sandbox.window);
const products = sandbox.window.BUYSEO_PRODUCTS || [];
const cart = (id) => `https://seogroupsbuy.com/users/cart/index/product/id/${id}/c/`;
const logo = (domain) => `https://www.google.com/s2/favicons?sz=128&domain_url=https://${domain}`;

function slugify(name, id) {
  const base = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `${base}-${id}`;
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isPlan(p) {
  const n = p.name.toLowerCase();
  return /plan|pack|combo|mega|agency|team|extension tools/i.test(n);
}

function related(list, current, n = 6) {
  return list
    .filter((p) => p.id !== current.id && p.cat === current.cat)
    .slice(0, n);
}

const outDir = path.join(__dirname, "tools");
fs.mkdirSync(outDir, { recursive: true });

const map = {};
for (const p of products) {
  map[p.id] = slugify(p.name, p.id);
}

let count = 0;
for (const p of products) {
  const slug = map[p.id];
  const pageUrl = `https://buyseo.org/tools/${slug}.html`;
  const cartUrl = cart(p.id);
  const kind = isPlan(p) ? "Plan" : "Tool";
  const rel = related(products, p);
  const title = `${esc(p.name)} Group Buy — ${esc(p.price)} | BuySEO`;
  const desc = `Buy ${esc(p.name)} group buy access for ${esc(p.price)} (official ${esc(p.official)}). Instant cart checkout on BuySEO.`;

  const relHtml = rel
    .map(
      (r) => `
      <a class="rel-card" href="${map[r.id]}.html">
        <img src="${logo(r.domain)}" alt="" width="28" height="28" loading="lazy">
        <div>
          <strong>${esc(r.name)}</strong>
          <span>${esc(r.price)}</span>
        </div>
      </a>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">
  <meta property="og:type" content="product">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:site_name" content="BuySEO">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../product.css">
  <link rel="stylesheet" href="../chrome.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": ${JSON.stringify(p.name)},
    "description": ${JSON.stringify(`${p.name} — ${p.sub}. BuySEO price ${p.price}.`)},
    "brand": { "@type": "Brand", "name": "BuySEO" },
    "offers": {
      "@type": "Offer",
      "url": ${JSON.stringify(cartUrl)},
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "price": ${JSON.stringify(String(p.price).replace(/[^0-9.]/g, "") || "0")}
    }
  }
  </script>
</head>
<body>
  <main class="container page">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="../index.html">Home</a>
      <span>/</span>
      <a href="../index.html#tools">${kind === "Plan" ? "Plans" : "Tools"}</a>
      <span>/</span>
      <span>${esc(p.name)}</span>
    </nav>

    <section class="hero-card">
      <div class="hero-main">
        <div class="badge">${esc(kind)} · ${esc(p.cat)}</div>
        <div class="title-row">
          <div class="logo-box">
            <img src="${logo(p.domain)}" alt="${esc(p.name)} logo" width="48" height="48" loading="eager"
              onerror="this.style.display='none'">
          </div>
          <div>
            <h1>${esc(p.name)}</h1>
            <p class="sub">${esc(p.sub)}</p>
          </div>
        </div>
        <p class="desc">
          Get <strong>${esc(p.name)}</strong> through BuySEO group buy access.
          Official retail is about <strong>${esc(p.official)}</strong> — members pay
          <strong class="accent">${esc(p.price)}</strong>. Buy Now opens the same member cart link (no tracking params).
        </p>
        <ul class="ticks">
          <li>Instant cart checkout</li>
          <li>Cloud-based access after payment</li>
          <li>Same product ID members already use (#${p.id})</li>
        </ul>
        <div class="cta-row">
          <a class="btn btn-primary btn-lg" href="${cartUrl}" target="_blank" rel="noopener">Buy Now →</a>
          <a class="btn btn-secondary btn-lg" href="../index.html#pricing">See all plans</a>
        </div>
      </div>
      <aside class="price-box">
        <div class="price-label">BuySEO price</div>
        <div class="price-big">${esc(p.price)}</div>
        <div class="official"><span>OFFICIAL</span><s>${esc(p.official)}</s></div>
        <a class="btn btn-primary" href="${cartUrl}" target="_blank" rel="noopener" style="width:100%;margin-top:1rem">Buy Now →</a>
        <a class="btn btn-secondary" href="https://seogroupsbuy.com/users/login" target="_blank" rel="noopener" style="width:100%;margin-top:.5rem">Log in</a>
        <p class="fine">Cart: product id <strong>${p.id}</strong></p>
      </aside>
    </section>

    <section class="block">
      <h2>What’s included</h2>
      <p>
        This ${kind.toLowerCase()} is delivered through BuySEO’s secure access layer.
        After payment clears, open the tool from your member dashboard — no shared vendor passwords.
        Fair-use limits may apply so the shared plan stays healthy for everyone.
      </p>
      <div class="info-grid">
        <div class="info"><strong>Category</strong><span>${esc(p.cat)}</span></div>
        <div class="info"><strong>BuySEO price</strong><span class="accent">${esc(p.price)}</span></div>
        <div class="info"><strong>Official price</strong><span>${esc(p.official)}</span></div>
        <div class="info"><strong>Checkout</strong><span>Direct cart link</span></div>
      </div>
    </section>

    ${
      rel.length
        ? `<section class="block">
      <h2>Related in ${esc(p.cat)}</h2>
      <div class="rel-grid">${relHtml}</div>
    </section>`
        : ""
    }

    <section class="cta-band">
      <div>
        <h2>Ready for ${esc(p.name)}?</h2>
        <p>Buy Now uses the same cart URL long-time members use.</p>
      </div>
      <a class="btn btn-light" href="${cartUrl}" target="_blank" rel="noopener">Buy Now — ${esc(p.price)} →</a>
    </section>
  </main>
  <script src="../chrome.js" data-base="../"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
  count++;
}

// Write slug map for homepage linking
fs.writeFileSync(
  path.join(__dirname, "product-slugs.js"),
  `window.BUYSEO_SLUGS = ${JSON.stringify(map)};\nwindow.BUYSEO_PAGE = (id) => id && window.BUYSEO_SLUGS[id] ? ("tools/" + window.BUYSEO_SLUGS[id] + ".html") : null;\n`
);

console.log(`Generated ${count} pages in tools/`);
console.log(`Slug map: product-slugs.js`);
