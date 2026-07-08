# WIKI Audit Report & Quality Assurance

This document details the quality assurance audit conducted on the **Kenya National Library Service (KNLS)** website migration. The audit reviews templating integrity, search correctness, accessibility conformance, and CMS editing capabilities.

---

## 1. Audit Checklists & Results

We reviewed the migrated site against the project requirements:

### A. Hugo & Static Site Framework Best Practices
- [x] **Unsafe HTML Allowed**: Verified Goldmark has `unsafe = true` configured in `hugo.toml` so inline HTML grids and structures render properly.
- [x] **Module loading errors resolved**: Omitted the empty `theme = ""` config from `hugo.toml` so Hugo compiles layouts from the local directory instead of trying to download external modules.
- [x] **No Duplicate Root HTML Files**: Checked that raw scraper HTML files are safely moved to `_scraped_backup/` to keep the root directory clean.
- [x] **Asset Paths Correctness**: Scanned all static asset paths and resolved them to root-relative `/assets/...` URLs. This prevents breaking resource linkages when navigating deep, clean URL structures like `/who-we-are/` or `/isbn-faqs/`.
- [x] **Image Fallback Console Error Fix**: 
  - **Identified Fault**: The original scraped site hardcoded `src="american-corner-programs.html"` and `src="capacity-building.html"` on `<img>` tags inside the image lightboxes, resulting in 404 image load warnings in the browser console.
  - **Resolution**: Replaced the invalid file extensions with a transparent SVG data URI: `src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'/%3E"`. When a thumbnail is clicked, the script dynamically overwrites the source with the correct image path.
- [x] **Markdown Indentation Rendering Bypass**: Converted all content files from `.md` to `.html` to bypass the Markdown parser's indented-code-block wrapper behavior. Indented raw HTML now displays as actual elements instead of raw tags.
- [x] **Preserved Container Styling**: Extracted dynamic `<main>` class parameters to page front matter (`main_class`), resolving layout alignment issues on service-related subpages (such as the ISBN page).


### B. Navigation & JavaScript Checks
- [x] **Relative Link Correction**: Tested link references to ensure internal `.html` files (e.g. `contacts.html`) resolve to tidy paths (e.g. `/contacts/`), while external HTTP/HTTPS and mailto links remain untouched.
- [x] **Dynamic active state**: Verified that links in `layouts/partials/header.html` render conditional styles using `{{ if eq .RelPermalink "/url/" }}is-active{{ end }}` block styling.
- [x] **Dynamic Search Auto-Updates**: Checked that the search index loads dynamically from `window.SITE_PAGES` defined in the layout at build time, rather than relying on a static array in `main.js`.
- [x] **Sticky navigation spacing**: Inspected persistent headers and verified they dynamically query heights from `main.js` to avoid overlapping elements.

### C. Web Accessibility (WCAG 2.1) & SEO
- [x] **Keyboard-Accessible Search**: Verified focus trapping when opening search (`openSearch`) and dismissal via the `Escape` key.
- [x] **Skip links**: Verified `<a class="skip-link" href="#main-content">Skip to main content</a>` targets the core page container.
- [x] **Aria roles**: Evaluated accessibility widget buttons (`aria-expanded` and `aria-live="polite"` states) for screen-readers.
- [x] **Page Title Structure**: Checked browser tab title structures to ensure page headers match standard conventions:
  - Home: `Kenya National Library Service`
  - Inner Pages: `Page Title | Kenya National Library Service`
- [x] **Preconnected Typography Domains**: Checked Google Fonts configurations to confirm DNS preconnection tags.

### D. CloudCannon CMS Integration
- [x] **Collection Target**: Confirmed that `cloudcannon.config.yml` targets the `content/` folder.
- [x] **Upload Targets**: Verified images upload directly to `static/assets/images/` and save as `/assets/images/...`.
- [x] **SEO & Layout Fields**: Inspected inputs schema config (SEO text areas, datetime picker for timed notices, dropdown menus for body classes).
- [x] **Editor Selection**: Configured the visual WYSIWYG editor as the default interface view for seamless inline text editing.
