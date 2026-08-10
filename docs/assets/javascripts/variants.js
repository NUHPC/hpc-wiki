(function () {
  function installVariantNav() {
    const article = document.querySelector("article.md-content__inner");
    if (!article || article.querySelector(".wiki-variant-nav")) return;

    const path = window.location.pathname;
    const match = path.match(/^(.*)\/(new|old|compare)(?:\/([^/]+))?\/?$/);
    if (!match) return;

    const prefix = match[1];
    const current = match[2];
    const slug = match[3] || "";
    const nav = document.createElement("nav");
    nav.className = "wiki-variant-nav";
    nav.setAttribute("aria-label", "Article version");

    [["old", "Original"], ["new", "Current"], ["compare", "Changes"]].forEach(([variant, label]) => {
      const link = document.createElement("a");
      link.href = `${prefix}/${variant}/${slug ? `${slug}/` : ""}`;
      link.textContent = label;
      if (variant === current) link.setAttribute("aria-current", "page");
      nav.appendChild(link);
    });

    const title = article.querySelector("h1");
    if (title) title.insertAdjacentElement("afterend", nav);
  }

  if (window.document$) window.document$.subscribe(installVariantNav);
  else document.addEventListener("DOMContentLoaded", installVariantNav);
})();
