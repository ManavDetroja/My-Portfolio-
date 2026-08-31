import { assetPath, escapeHtml, externalLinkAttributes } from "../utils.js";
import { icon } from "./icons.js";

export function renderProjectCard(project) {
  const visual = project.image
    ? `<img src="${assetPath(project.image)}" alt="${escapeHtml(project.title)} preview">`
    : `<div class="project-fallback" aria-hidden="true">${icon("code")}</div>`;
  const actions = [
    project.github
      ? `<a href="${escapeHtml(project.github)}"${externalLinkAttributes(project.github)}>GitHub ${icon("external")}</a>`
      : "",
    project.liveDemo
      ? `<a href="${escapeHtml(project.liveDemo)}"${externalLinkAttributes(project.liveDemo)}>Live demo ${icon("external")}</a>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="project-card interactive-card reveal">
      <div class="project-visual">${visual}</div>
      <div class="project-body">
        <h2>${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
        <details>
          <summary>Project details ${icon("arrow")}</summary>
          <p>${escapeHtml(project.details)}</p>
        </details>
        <ul class="tag-list" aria-label="${escapeHtml(project.title)} technology stack">
          ${project.techStack.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        ${actions ? `<div class="card-actions">${actions}</div>` : ""}
      </div>
    </article>
  `;
}

export function renderCertificateCard(certificate) {
  const preview = certificate.fileType === "image"
    ? `<img src="${assetPath(certificate.file)}" alt="${escapeHtml(certificate.name)} certificate preview">`
    : `<span class="certificate-filetype" aria-hidden="true">PDF</span>`;

  return `
    <article class="certificate-card interactive-card reveal">
      <div class="certificate-preview">${preview}</div>
      <div class="certificate-body">
        <h2>${escapeHtml(certificate.name)}</h2>
        ${certificate.issuer ? `<p class="certificate-issuer">${escapeHtml(certificate.issuer)}</p>` : ""}
        ${certificate.date ? `<p class="certificate-date">${escapeHtml(certificate.date)}</p>` : ""}
        ${certificate.credentialId ? `<p class="credential-id">Credential ID: ${escapeHtml(certificate.credentialId)}</p>` : ""}
        <div class="card-actions">
          <a href="${assetPath(certificate.file)}" target="_blank" rel="noreferrer">View certificate ${icon("external")}</a>
          ${certificate.credentialUrl ? `<a href="${escapeHtml(certificate.credentialUrl)}" target="_blank" rel="noreferrer">Verify ${icon("external")}</a>` : ""}
        </div>
      </div>
    </article>
  `;
}
