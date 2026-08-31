# Detroja Manav Portfolio

A dependency-free, multi-page developer portfolio designed for GitHub Pages.

## Routes

- `/` - Home
- `/profile/` - About Me, Skills, Resume, and Contact
- `/projects/` - Projects
- `/certificates/` - Certificates generated from local files
- `/journey/` - Education, timeline, and achievements

## Run and build

Run the certificate build after adding or removing certificate files:

```powershell
npm run build
```

Serve the directory locally with any static web server, for example:

```powershell
npx --yes serve . -l 4173
```

Then open `http://localhost:4173/`.

## Content data

- `assets/js/data/profile.js` - name, hero copy, About Me, skills, phone, location, resume state
- `assets/js/data/social-links.js` - GitHub, LinkedIn, email, LeetCode, and any future professional links
- `assets/js/data/projects.js` - project cards and links
- `assets/js/data/education.js` - education and timeline
- `assets/js/data/achievements.js` - achievements
- `assets/js/data/certificate-details.json` - optional issuer, date, credential ID, and verification URL for certificate files

## Certificates

Put PDF, PNG, JPG, JPEG, or WebP files in `certificates/`, then run `npm run build`. The build script reads every supported file and writes `assets/js/data/certificates.data.js` automatically. The displayed title is always the original filename without its extension. Do not edit the generated file directly.

## Themes

Theme definitions live in `assets/js/data/themes.js`. Each entry contains an `id`, display name, and CSS-variable color values.

- Add a theme by adding another object to the `themes` array.
- Change a theme by editing its `colors` values.
- Change the default by updating `defaultThemeId`.
- Remove a theme by deleting its object. If it was the default, choose another `defaultThemeId`.

The selected theme is stored in the visitor's browser with `localStorage`.

## GitHub Pages

Publish this repository from its root. All route, CSS, JavaScript, social, and certificate paths are relative so the site works under `/My-Portfolio/`.
