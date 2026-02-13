# Clémence Dupont — Personal Website

**Live at:** [clemvst.github.io](https://clemvst.github.io)

Professional website with pages for education, experience, publications, and projects.

## Stack

Pure static site — **zero build tools, no frameworks, no dependencies to install**.

- HTML / CSS / vanilla JS
- [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- [Font Awesome 6](https://fontawesome.com/) via CDN
- Hosted on GitHub Pages

## Structure

```
index.html              ← Home page
education/index.html    ← Education timeline
experience/index.html   ← Professional experience
publications/index.html ← Scientific publications
projects/index.html     ← Side projects
css/style.css           ← All styles
js/main.js              ← Shared nav + footer
```

## How to Edit

All content is directly in the HTML files — just open, edit, commit, and push.
Navigation and footer are shared via `js/main.js` so you only update them once.

## Local Preview

Just open `index.html` in your browser, or use any static server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

## Deploy

Push to `main` — GitHub Pages publishes automatically. The `.nojekyll` file
tells GitHub Pages to skip Jekyll and serve files as-is.
