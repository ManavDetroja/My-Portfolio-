import { profile } from "../data/profile.js";
import { hasReducedMotion, route, escapeHtml } from "../utils.js";
import { icon } from "./icons.js";
import { renderSocialLinks } from "./social-links.js";
import { renderThemeSelector } from "./theme-selector.js";

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "journey", label: "Journey" },
];

function renderNavigation(currentPage) {
  return navigationItems
    .map(
      (item) => `
        <a href="${route(item.id)}" data-page-link${item.id === currentPage ? ' aria-current="page"' : ""}>
          ${item.label}
        </a>
      `,
    )
    .join("");
}

export function renderShell(currentPage, content) {
  const safeName = escapeHtml(profile.name);
  const initials = escapeHtml(profile.initials);

  return `
    <div class="cursor-spotlight" aria-hidden="true"></div>
    <header class="site-header">
      <div class="container navigation">
        <a class="brand" href="${route("home")}" aria-label="${safeName} home">
          <span class="brand-mark">${initials}</span>
          <span class="brand-name">${safeName}</span>
        </a>
        <nav class="site-navigation" aria-label="Primary navigation">
          ${renderNavigation(currentPage)}
        </nav>
        <div class="header-actions">
          ${renderThemeSelector()}
          <button class="icon-button menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" aria-label="Open navigation">
            <span class="menu-open" aria-hidden="true">${icon("menu")}</span>
            <span class="menu-close" aria-hidden="true">${icon("close")}</span>
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" class="mobile-navigation" aria-label="Mobile navigation" hidden>
        ${renderNavigation(currentPage)}
      </nav>
    </header>
    <main id="main-content" class="page-main page-enter">
      ${content}
    </main>
    <footer class="site-footer">
      <div class="container footer-content">
        <div>
          <a class="brand" href="${route("home")}" aria-label="${safeName} home">
            <span class="brand-mark">${initials}</span>
            <span class="brand-name">${safeName}</span>
          </a>
          <p>Developer portfolio of ${safeName}.</p>
        </div>
        ${renderSocialLinks({ featuredOnly: true, variant: "footer" })}
      </div>
    </footer>
    <div class="toast" role="status" aria-live="polite"></div>
  `;
}

export function setUpNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNavigation = document.querySelector(".mobile-navigation");

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNavigation.hidden = isOpen;
    document.body.classList.toggle("menu-open", !isOpen);
  });

  mobileNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileNavigation.hidden = true;
      document.body.classList.remove("menu-open");
    });
  });

  if (hasReducedMotion()) {
    return;
  }

  document.querySelectorAll("a[data-page-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.getAttribute("aria-current") === "page") {
        return;
      }

      event.preventDefault();
      document.body.classList.add("page-leaving");
      window.setTimeout(() => {
        window.location.assign(link.href);
      }, 140);
    });
  });
}
