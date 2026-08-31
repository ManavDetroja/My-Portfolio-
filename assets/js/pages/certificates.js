import { certificates } from "../data/certificates.data.js";
import { renderCertificateCard } from "../components/cards.js";
import { emptyState, pageIntro } from "../components/content.js";

export function renderCertificatesPage() {
  const content = certificates.length > 0
    ? `<div class="certificate-grid">${certificates.map(renderCertificateCard).join("")}</div>`
    : emptyState("No certificates found", "Certificate files placed in the certificates folder are listed here during the build.");

  return `
    <section class="page-section">
      <div class="container">
        ${pageIntro("Certificates", "Verified learning, collected in one place.", "Certificate titles are generated from the files stored in the certificates folder.")}
        ${content}
      </div>
    </section>
  `;
}
