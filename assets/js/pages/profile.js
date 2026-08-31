import { profile } from "../data/profile.js";
import { escapeHtml } from "../utils.js";
import {
  pageIntro,
  renderContactDetails,
  renderResumeAction,
  renderSkillGroups,
} from "../components/content.js";

export function renderProfilePage() {
  return `
    <section class="page-section">
      <div class="container">
        ${pageIntro("Profile", "A practical foundation, built with curiosity.", "An overview of my current focus, technical skills, and professional contact details.")}
        <div class="profile-layout">
          <article class="content-card about-card reveal">
            <p class="card-label">About Me</p>
            <p class="about-copy">${escapeHtml(profile.about)}</p>
          </article>
          <section class="content-card skills-card">
            <p class="card-label">Skills</p>
            ${renderSkillGroups()}
          </section>
          <article class="content-card resume-card reveal">
            <p class="card-label">Resume</p>
            <h2>My profile in one document.</h2>
            <p>${escapeHtml(profile.resume.note)}</p>
            ${renderResumeAction({ label: "View Resume" })}
          </article>
          <section class="content-card contact-card">
            <p class="card-label">Contact</p>
            <h2>Let’s connect.</h2>
            <p>${escapeHtml(profile.contact.note)}</p>
            ${renderContactDetails()}
          </section>
        </div>
      </div>
    </section>
  `;
}
