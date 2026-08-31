import { achievements } from "../data/achievements.js";
import { education, timeline } from "../data/education.js";
import { escapeHtml } from "../utils.js";
import { pageIntro, renderTimeline } from "../components/content.js";

function renderAchievements() {
  if (achievements.length === 0) {
    return "";
  }

  return `
    <section class="journey-achievements" aria-labelledby="achievements-title">
      <p id="achievements-title" class="card-label">Achievements</p>
      <div class="achievement-grid">
        ${achievements
          .map(
            (achievement) => `
              <article class="achievement-card reveal">
                <span aria-hidden="true">✦</span>
                <h2>${escapeHtml(achievement.title)}</h2>
                ${achievement.date ? `<p>${escapeHtml(achievement.date)}</p>` : ""}
                <p>${escapeHtml(achievement.description)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

export function renderJourneyPage() {
  return `
    <section class="page-section page-section--tinted">
      <div class="container">
        ${pageIntro("Journey", "Learning with intention, one stage at a time.", "A focused record of my education and the milestones that shape my growth.")}
        <div class="journey-grid">
          <section class="journey-panel" aria-labelledby="education-title">
            <p id="education-title" class="card-label">Education</p>
            ${renderTimeline(education)}
          </section>
          <section class="journey-panel" aria-labelledby="timeline-title">
            <p id="timeline-title" class="card-label">Timeline</p>
            ${renderTimeline(timeline)}
          </section>
        </div>
        ${renderAchievements()}
      </div>
    </section>
  `;
}
