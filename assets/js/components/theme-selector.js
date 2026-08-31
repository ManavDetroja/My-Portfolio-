import { defaultThemeId, themes } from "../data/themes.js";
import { icon } from "./icons.js";
import { escapeHtml } from "../utils.js";

const storageKey = "detroja-manav-theme";

function findTheme(themeId) {
  return themes.find((theme) => theme.id === themeId) || themes[0];
}

export function applyTheme(themeId) {
  const theme = findTheme(themeId);

  Object.entries(theme.colors).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });

  document.documentElement.dataset.theme = theme.id;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.colors["--background"]);

  try {
    window.localStorage.setItem(storageKey, theme.id);
  } catch {
    // Theme selection still works if the browser blocks local storage.
  }

  document.querySelectorAll("[data-theme-option]").forEach((button) => {
    const isSelected = button.dataset.themeOption === theme.id;
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

export function restoreTheme() {
  let storedThemeId = defaultThemeId;

  try {
    storedThemeId = window.localStorage.getItem(storageKey) || defaultThemeId;
  } catch {
    // Use the default when storage is unavailable.
  }

  applyTheme(storedThemeId);
}

export function renderThemeSelector() {
  return `
    <div class="theme-selector">
      <button class="icon-button theme-trigger" type="button" data-theme-trigger aria-expanded="false" aria-controls="theme-menu" aria-label="Choose color theme">
        ${icon("palette")}
      </button>
      <div id="theme-menu" class="theme-menu" data-theme-menu hidden>
        <p class="theme-menu-title">Choose theme</p>
        <div class="theme-options" role="group" aria-label="Color themes">
          ${themes
            .map(
              (theme) => `
                <button class="theme-option" type="button" data-theme-option="${theme.id}" aria-pressed="false">
                  <span class="theme-swatch" style="--swatch-primary: ${theme.colors["--primary"]}; --swatch-accent: ${theme.colors["--accent"]}"></span>
                  <span>${escapeHtml(theme.name)}</span>
                  <span class="theme-check" aria-hidden="true">✓</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

export function setUpThemeSelector() {
  const trigger = document.querySelector("[data-theme-trigger]");
  const menu = document.querySelector("[data-theme-menu]");

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });

  document.querySelectorAll("[data-theme-option]").forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeOption);
      trigger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      trigger.focus();
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".theme-selector")) {
      trigger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }
  });
}
