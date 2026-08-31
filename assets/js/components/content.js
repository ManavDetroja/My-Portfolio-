import { profile, skillGroups } from "../data/profile.js";
import { socialLinks } from "../data/social-links.js";
import { assetPath, escapeHtml, externalLinkAttributes } from "../utils.js";
import { icon } from "./icons.js";
import { renderSocialLinks } from "./social-links.js";

export function pageIntro(eyebrow, title, description) {
  return `
    <header class="page-intro reveal">
      <p class="eyebrow">${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
    </header>
  `;
}

export function emptyState(title, description) {
  return `
    <section class="empty-state reveal" aria-label="${escapeHtml(title)}">
      <span class="empty-state-icon" aria-hidden="true">${icon("code")}</span>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(description)}</p>
    </section>
  `;
}

export function renderResumeAction({ label = "View Resume", compact = false } = {}) {
  const classes = compact ? "button button--compact" : "button button--primary";

  if (profile.resume.available && profile.resume.path) {
    return `<a class="${classes}" href="${assetPath(profile.resume.path)}" download>${icon("resume")}<span>${escapeHtml(label)}</span></a>`;
  }

  return `<button class="${classes}" type="button" data-resume-help>${icon("resume")}<span>${escapeHtml(label)}</span></button>`;
}

export function renderSkillGroups() {
  return `
    <div class="skill-groups">
      ${skillGroups
        .map(
          (group) => `
            <section class="skill-group reveal">
              <h2>${escapeHtml(group.title)}</h2>
              <ul class="tag-list" aria-label="${escapeHtml(group.title)}">
                ${group.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("")}
              </ul>
            </section>
          `,
        )
        .join("")}
    </div>
  `;
}

export function renderContactDetails() {
  const contactDetails = [
    profile.contact.phone
      ? `<a class="contact-row" href="tel:${escapeHtml(profile.contact.phone.replace(/[^+\d]/g, ""))}">${icon("phone")}<span>${escapeHtml(profile.contact.phone)}</span></a>`
      : "",
    profile.contact.location
      ? `<div class="contact-row">${icon("location")}<span>${escapeHtml(profile.contact.location)}</span></div>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const emailLink = socialLinks.find((link) => link.icon === "email");
  const email = emailLink
    ? `<a class="contact-row" href="${escapeHtml(emailLink.href)}">${icon("email")}<span>${escapeHtml(emailLink.displayValue)}</span></a>`
    : "";

  return `
    <div class="contact-details reveal">
      ${email}
      ${contactDetails}
      <div class="contact-accounts">
        <p>Professional accounts</p>
        ${renderSocialLinks({ variant: "contact" })}
      </div>
    </div>
  `;
}

export function renderTimeline(items) {
  if (items.length === 0) {
    return emptyState("Nothing to show yet", "This part of the journey will appear when there is information to share.");
  }

  return `
    <ol class="timeline-list">
      ${items
        .map(
          (item) => `
            <li class="timeline-item reveal">
              <p class="timeline-date">${escapeHtml(item.year || item.date)}</p>
              <h2>${escapeHtml(item.title)}</h2>
              ${item.institution ? `<p class="timeline-place">${escapeHtml(item.institution)}</p>` : ""}
              <p>${escapeHtml(item.description)}</p>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}

export function renderTextLink(label, href) {
  return `<a class="text-link" href="${escapeHtml(href)}"${externalLinkAttributes(href)}>${escapeHtml(label)}${icon("arrow")}</a>`;
}
