const basePath = document.body.dataset.base || ".";

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function route(page) {
  return page === "home" ? `${basePath}/` : `${basePath}/${page}/`;
}

export function assetPath(filePath) {
  return `${basePath}/${filePath}`;
}

export function externalLinkAttributes(url) {
  return /^https?:\/\//i.test(url) ? ' target="_blank" rel="noreferrer"' : "";
}

export function hasReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
