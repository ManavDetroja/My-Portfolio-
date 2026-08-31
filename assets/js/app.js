import { renderShell, setUpNavigation } from "./components/shell.js";
import { restoreTheme, setUpThemeSelector } from "./components/theme-selector.js";
import { hasReducedMotion } from "./utils.js";
import { renderCertificatesPage } from "./pages/certificates.js";
import { renderHomePage } from "./pages/home.js";
import { renderJourneyPage } from "./pages/journey.js";
import { renderProfilePage } from "./pages/profile.js";
import { renderProjectsPage } from "./pages/projects.js";

const pageRenderers = {
  home: renderHomePage,
  profile: renderProfilePage,
  projects: renderProjectsPage,
  certificates: renderCertificatesPage,
  journey: renderJourneyPage,
};

const app = document.querySelector("#app");
const currentPage = document.body.dataset.page || "home";
const renderPage = pageRenderers[currentPage] || renderHomePage;

function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4000);
}

function setUpResumeAction() {
  document.querySelectorAll("[data-resume-help]").forEach((button) => {
    button.addEventListener("click", () => {
      showToast("My resume will be available here soon.");
    });
  });
}

function setUpRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (hasReducedMotion()) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((element) => observer.observe(element));
}

function setUpCursorSpotlight() {
  if (hasReducedMotion() || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  let frameRequested = false;
  let pointerX = "50%";
  let pointerY = "25%";

  document.addEventListener("pointermove", (event) => {
    pointerX = `${event.clientX}px`;
    pointerY = `${event.clientY}px`;

    if (frameRequested) {
      return;
    }

    frameRequested = true;
    window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--pointer-x", pointerX);
      document.documentElement.style.setProperty("--pointer-y", pointerY);
      frameRequested = false;
    });
  }, { passive: true });
}

function setUpCardDepth() {
  if (hasReducedMotion() || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  document.querySelectorAll(".interactive-card").forEach((card) => {
    let frameRequested = false;
    let offsetX = 0;
    let offsetY = 0;

    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
      offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * -4;

      if (frameRequested) {
        return;
      }

      frameRequested = true;
      window.requestAnimationFrame(() => {
        card.style.setProperty("--tilt-x", `${offsetX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${offsetY.toFixed(2)}deg`);
        frameRequested = false;
      });
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });
}

app.innerHTML = renderShell(currentPage, renderPage());
restoreTheme();
setUpNavigation();
setUpThemeSelector();
setUpResumeAction();
setUpRevealAnimations();
setUpCursorSpotlight();
setUpCardDepth();

window.requestAnimationFrame(() => {
  document.querySelector(".page-enter")?.classList.add("page-visible");
});
