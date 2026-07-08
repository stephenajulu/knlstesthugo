# SEO, Web Accessibility & Performance Best Practices

This document outlines the standard configurations and structural improvements implemented on the KNLS website to ensure visual excellence, search engine indexability, high performance, and accessibility conformance (WCAG 2.1).

---

## 1. Search Engine Optimization (SEO)

We implemented standard metadata structures across all site pages to ensure maximum crawler readability and high discoverability:

- **Dynamic Browser Titles**:
  Implemented a dual-state title renderer in `head.html`:
  - Home Page: `Home | Kenya National Library Service`
  - Inner Pages: `Page Title | Kenya National Library Service`
  This guarantees that all indexed pages have descriptive titles in search results.
- **Custom Meta Descriptions**:
  Page descriptions are pulled directly from each markdown file's front-matter. If no description is specified, it falls back to the page summary or site default.
- **Preconnect Link Elements**:
  Added preconnect links to domains:
  - `https://fonts.googleapis.com`
  - `https://fonts.gstatic.com` (crossorigin)
  This resolves DNS lookups, TCP handshakes, and SSL negotiations beforehand, reducing the Time-to-First-Byte (TTFB) for typography resources.
- **Semantic HTML Hierarchy**:
  Each content layout defines a single `<h1>` tag matching the page name, followed by clean nested structures (`<h2>` down to `<h6>`), avoiding skipped header levels.

---

## 2. Web Accessibility (WCAG Conformance)

The website maintains accessibility conformance using semantic elements and user-controlled accessibility adjustments:

- **Skip to Content Link**:
  An invisible skip-to-content link is added at the top of the body:
  ```html
  <a class="skip-link" href="#main-content">Skip to main content</a>
  ```
  This allows keyboard-only or screen-reader users to skip navigation links directly to the core content.
- **Accessibility Options Widget**:
  Renders a floating accessibility controller (`layouts/partials/accessibility.html`):
  - **Screen Reader Mode**: Actively formats layouts and focus boundaries.
  - **Contrast Options**: Switches to a high-contrast theme class.
  - **Size Toggles**: Supports text resizing (A-, Reset, A+) for low-vision readers.
  - **Aria Attributes**: Synchronizes screen announcement states using `aria-live="polite"` and `aria-expanded` toggle states.
  - **Premium Floating Corner Tab**: Fixed to the bottom-left corner of the viewport (`bottom: 24px; left: 24px` on desktop, `bottom: 20px; left: 20px` on mobile). It uses a fully rounded toggle button that expands horizontally on hover, and opens the panel upwards (`bottom: 60px; left: 0`), preventing any overlap with navigation elements or the chatbot.
- **Search Panel Accessibility**:
  The site-wide search dialog uses proper `aria-labelledby`, `role="dialog"`, and `aria-modal="true"` tags to constrain keyboard focus when open. Pressing the `Escape` key closes the dialog automatically.
- **Keyboard Navigation Controls**:
  All custom dropdown menus and dialog buttons support focus-states, hover highlights, and are selectable via the `Tab` key.

---

## 3. Web Performance & Speed

By transitioning to the **JAMstack** model via Hugo:

- **100% Static HTML Output**:
  Pages compile instantly at build time. No database queries, server-side processing, or PHP files run on the hosting server, eliminating slow load times.
- **Optimized Assets**:
  All styles and JavaScript are served locally under `/assets/` and benefit from caching, reducing network overhead.
- **Low Page Overhead**:
  There are no large, client-side frameworks or dynamic runtimes (like React or Vue) required to render text, which keeps the page light and reduces Mobile CPU compilation times.
- **Zero layout shift**:
  The CSS layout styles and loaders prevent layout shifting (CLS) during page loading.
