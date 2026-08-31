import { socialLinks } from "../data/social-links.js";
import { externalLinkAttributes, escapeHtml } from "../utils.js";
import { icon } from "./icons.js";

export function renderSocialLinks({ featuredOnly = false, variant = "default" } = {}) {
  const links = featuredOnly ? socialLinks.filter((link) => link.featured) : socialLinks;

  return `
    <div class="social-links social-links--${variant}" aria-label="Professional accounts">
      ${links
        .map(
          (link) => `
            <a href="${escapeHtml(link.href)}"${externalLinkAttributes(link.href)} aria-label="${escapeHtml(link.label)}">
              ${icon(link.icon)}
              <span>${escapeHtml(variant === "contact" ? link.displayValue || link.label : link.label)}</span>
            </a>
          `,
        )
        .join("")}
    </div>
  `;
}
