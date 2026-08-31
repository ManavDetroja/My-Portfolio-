import { profile } from "../data/profile.js";
import { route, escapeHtml } from "../utils.js";
import { icon } from "../components/icons.js";
import { renderResumeAction } from "../components/content.js";
import { renderSocialLinks } from "../components/social-links.js";

export function renderHomePage() {
  return `
    <section class="home-hero" aria-labelledby="home-title">
      <div class="container home-hero-layout">
        <div class="hero-copy reveal">
          <p class="eyebrow">Developer portfolio</p>
          <h1 id="home-title">${escapeHtml(profile.name)}</h1>
          <p class="hero-subtitle">${escapeHtml(profile.subtitle)}</p>
          <p class="hero-introduction">${escapeHtml(profile.heroIntroduction)}</p>
          <p class="hero-description">${escapeHtml(profile.heroDescription)}</p>
          <div class="hero-actions">
            ${renderResumeAction({ label: "View Resume" })}
            <a class="button button--secondary" href="${route("projects")}">${icon("code")}<span>Explore Projects</span></a>
          </div>
          ${renderSocialLinks({ featuredOnly: true, variant: "hero" })}
        </div>
        <div class="hero-visual reveal" aria-hidden="true">
          <div class="hero-orbit hero-orbit--wide"></div>
          <div class="hero-orbit hero-orbit--tall"></div>
          <div class="hero-monogram">${escapeHtml(profile.initials)}</div>
          <span class="hero-chip hero-chip--top">Full-stack developer</span>
          <span class="hero-chip hero-chip--bottom">AI engineering goal</span>
        </div>
      </div>
    </section>
  `;
}
