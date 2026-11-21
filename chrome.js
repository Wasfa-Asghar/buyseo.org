/**
 * Injects shared BuySEO header + footer on every page.
 * Usage: <script src="chrome.js" data-base=""></script>
 * Tools pages: data-base="../"
 */
(function () {
  var script = document.currentScript;
  var base = (script && script.getAttribute("data-base")) || "";
  var home = base + "index.html";
  var year = new Date().getFullYear();

  var starSvg =
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.5H20l-4.5 3.3 1.7 5.4L12 13.8 6.8 16.2 8.5 10.8 4 7.5h6.2z"/></svg>';

  var headerHtml =
    '<header class="site-header" id="siteHeader">' +
    '<div class="container nav">' +
    '<a class="logo" href="' +
    home +
    '" aria-label="BuySEO home">' +
    '<span class="logo-mark" aria-hidden="true">' +
    starSvg +
    "</span> BuySEO</a>" +
    '<nav class="nav-links" aria-label="Primary">' +
    '<a href="' +
    home +
    '#tools">All tools</a>' +
    '<a href="' +
    home +
    '#pricing">Pricing</a>' +
    '<a href="' +
    home +
    '#free-tools">Free tools</a>' +
    '<a href="' +
    base +
    'blog.html">Blog</a>' +
    "</nav>" +
    '<div class="nav-actions">' +
    '<button class="icon-btn" type="button" id="themeToggle" aria-label="Switch theme" title="Theme">' +
    '<svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z"/></svg>' +
    '<svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
    "</button>" +
    '<a class="login-link" href="https://seogroupsbuy.com/users/login" target="_blank" rel="noopener">Log in</a>' +
    '<a class="btn btn-primary btn-sm" href="https://seogroupsbuy.com/users/signup" target="_blank" rel="noopener">Start free</a>' +
    '<button class="icon-btn menu-btn" type="button" id="menuBtn" aria-label="Open menu" aria-expanded="false">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
    "</button>" +
    "</div></div>" +
    '<div class="container mobile-menu" id="mobileMenu">' +
    '<a href="' +
    home +
    '#tools">All tools</a>' +
    '<a href="' +
    home +
    '#pricing">Pricing</a>' +
    '<a href="' +
    home +
    '#free-tools">Free tools</a>' +
    '<a href="' +
    base +
    'blog.html">Blog</a>' +
    '<a href="' +
    base +
    'contact.html">Contact</a>' +
    '<a href="https://seogroupsbuy.com/users/login" target="_blank" rel="noopener">Log in</a>' +
    "</div></header>";

  var footerHtml =
    '<footer class="site-footer">' +
    '<div class="container">' +
    '<div class="footer-grid">' +
    '<div class="footer-brand">' +
    '<a class="logo" href="' +
    home +
    '">' +
    '<span class="logo-mark" aria-hidden="true">' +
    starSvg +
    "</span> BuySEO</a>" +
    "<p>Premium tool access for marketers, freelancers, and agencies since 2019. Have questions? We’re here through the channels below.</p>" +
    '<div class="footer-contact">' +
    "<span>24/7 support · Tucson, AZ</span>" +
    '<a href="mailto:support@seotoolsgroupbuy.us">✉ support@seotoolsgroupbuy.us</a>' +
    '<a href="https://wa.me/447845432224" target="_blank" rel="noopener">💬 WhatsApp chat</a>' +
    '<a href="tel:+15207335652">☎ 520-733-5652</a>' +
    "</div></div>" +
    '<div class="footer-col"><h4>PRODUCT</h4>' +
    '<a href="' +
    home +
    '#tools">All Tools</a>' +
    '<a href="' +
    home +
    '#pricing">Pricing</a>' +
    '<a href="' +
    home +
    '#free-tools">Free Tools</a>' +
    '<a href="https://seogroupsbuy.com/users/login" target="_blank" rel="noopener">Login</a>' +
    "</div>" +
    '<div class="footer-col"><h4>COMPANY</h4>' +
    '<a href="' +
    base +
    'about.html">About Us</a>' +
    '<a href="' +
    base +
    'contact.html">Contact</a>' +
    '<a href="' +
    base +
    'blog.html">Blog</a>' +
    '<a href="' +
    base +
    'faq.html">FAQ</a>' +
    '<a href="https://seogroupsbuy.com/users/login" target="_blank" rel="noopener">Reseller Panel</a>' +
    "</div>" +
    '<div class="footer-col"><h4>LEGAL</h4>' +
    '<a href="' +
    base +
    'terms.html">Terms of Service</a>' +
    '<a href="' +
    base +
    'privacy.html">Privacy Policy</a>' +
    '<a href="' +
    base +
    'refund.html">Refund Policy</a>' +
    "</div></div>" +
    '<div class="pay-row"><span>We accept</span>' +
    '<div class="pay-pills">' +
    "<span>Visa</span><span>Mastercard</span><span>PayPal</span><span>UPI</span>" +
    "<span>Paytm</span><span>JazzCash</span><span>Crypto</span><span>Bank transfer</span>" +
    "</div></div>" +
    '<div class="footer-bottom">' +
    "<span>© " +
    year +
    " BuySEO. All rights reserved.</span>" +
    "<span>50,000+ customers · Trusted since 2019</span>" +
    "</div></div></footer>" +
    '<a class="support-fab" href="https://seogroupsbuy.com/users/login" target="_blank" rel="noopener">Support</a>';

  function removeOldChrome() {
    document.querySelectorAll(".site-header, .site-footer, .support-fab").forEach(function (el) {
      el.remove();
    });
    document.querySelectorAll(".top").forEach(function (el) {
      el.remove();
    });
    document.querySelectorAll("footer.footer, footer.container.footer").forEach(function (el) {
      el.remove();
    });
  }

  function inject() {
    removeOldChrome();
    document.body.insertAdjacentHTML("afterbegin", headerHtml);
    document.body.insertAdjacentHTML("beforeend", footerHtml);
    wireChrome();
  }

  function wireChrome() {
    var header = document.getElementById("siteHeader");
    var menuBtn = document.getElementById("menuBtn");
    var mobileMenu = document.getElementById("mobileMenu");
    var themeToggle = document.getElementById("themeToggle");

    if (header) {
      window.addEventListener(
        "scroll",
        function () {
          header.classList.toggle("scrolled", window.scrollY > 8);
        },
        { passive: true }
      );
    }

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", function () {
        var open = mobileMenu.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    var stored = localStorage.getItem("buyseo-theme");
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
    }
    syncThemeIcons();

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        var next =
          document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("buyseo-theme", next);
        syncThemeIcons();
      });
    }
  }

  function syncThemeIcons() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    document.querySelectorAll(".icon-moon").forEach(function (el) {
      el.style.display = dark ? "none" : "";
    });
    document.querySelectorAll(".icon-sun").forEach(function (el) {
      el.style.display = dark ? "" : "none";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
