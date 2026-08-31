import { projects } from "../data/projects.js";
import { renderProjectCard } from "../components/cards.js";
import { emptyState, pageIntro } from "../components/content.js";

export function renderProjectsPage() {
  const content = projects.length > 0
    ? `<div class="project-grid">${projects.map(renderProjectCard).join("")}</div>`
    : emptyState("Projects are on the way", "This page will show selected work as soon as there are project details to share.");

  return `
    <section class="page-section page-section--tinted">
      <div class="container">
        ${pageIntro("Projects", "Work with context, not just screenshots.", "Each project includes its purpose, technology stack, and any available code or live links.")}
        ${content}
      </div>
    </section>
  `;
}
