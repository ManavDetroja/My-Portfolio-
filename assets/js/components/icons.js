const icons = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  code: '<path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  external: '<path d="M14 5h5v5M19 5l-8 8"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  github: '<path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.56c.43.08.58-.18.58-.41v-1.61c-2.36.51-2.86-1-2.86-1-.38-.98-.94-1.24-.94-1.24-.77-.52.06-.51.06-.51.85.06 1.3.87 1.3.87.75 1.29 1.98.92 2.46.7.08-.55.3-.93.53-1.14-1.89-.22-3.88-.95-3.88-4.2 0-.93.33-1.69.87-2.29-.09-.21-.38-1.08.08-2.25 0 0 .71-.23 2.34.87a8.1 8.1 0 0 1 4.26 0c1.63-1.1 2.34-.87 2.34-.87.46 1.17.17 2.04.08 2.25.54.6.87 1.36.87 2.29 0 3.26-1.99 3.98-3.89 4.19.31.26.58.75.58 1.51v2.24c0 .23.15.5.59.41A8.5 8.5 0 0 0 12 3.5Z"/>',
  leetcode: '<path d="m14.3 4.2 2.1 2.1-5.7 5.7M10.2 8.3l-4.8 4.8a3 3 0 0 0 4.2 4.2l3.5-3.5M14.8 14.2H9"/>',
  linkedin: '<path d="M6.4 8.2v10.2M6.4 5.8v.1M10.3 18.4v-5.7a3.1 3.1 0 0 1 6.2 0v5.7M10.3 12.3V8.2"/>',
  location: '<path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  palette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17h1.2a1.8 1.8 0 0 0 1.57-2.68 1.8 1.8 0 0 1 1.57-2.68H17a3.5 3.5 0 0 0 0-7H12Z"/><circle cx="7.5" cy="11" r=".8"/><circle cx="10" cy="7.5" r=".8"/><circle cx="14.5" cy="7.5" r=".8"/>',
  phone: '<path d="M7.6 4.5 5.5 6.6c-.5.5-.7 1.3-.4 2 1.8 4.5 5.3 8 9.8 9.8.7.3 1.5.1 2-.4l2.1-2.1-3-3-1.5 1.5a10.9 10.9 0 0 1-4.9-4.9L11.1 8l-3-3.5Z"/>',
  resume: '<path d="M7 3.8h7l3 3V20H7zM14 3.8V7h3M9.5 11h5M9.5 14h5M9.5 17h3"/>',
};

export function icon(name, label = "") {
  const labelMarkup = label ? `<title>${label}</title>` : "";
  const path = icons[name] || icons.external;

  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="${label ? "false" : "true"}"${label ? ' role="img"' : ""}>${labelMarkup}${path}</svg>`;
}
