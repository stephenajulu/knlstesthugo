# Kenya National Library Service (knls) — GoHugo Website

A modern, high-performance static website inspired by the Kenya National Library Service (knls). Powered by **GoHugo**, built with **100% Zero-HTML Markdown content files**, custom layouts, and a Tailwind-free premium CSS styling system. It is fully pre-configured for visual editing in **CloudCannon CMS**.

---

## 🚀 Key Features

*   **100% Zero-HTML Markdown**: All 51 content pages are stored as clean Markdown (`.md`) files under `/content/`. Emojis, grids, lists, tables, and slideshows are managed as front-matter YAML parameters or Markdown syntax.
*   **Structured Hugo Layouts**: Page rendering, visual panels, and responsive styling wrappers are managed dynamically in `/layouts/_default/` templates.
*   **Local Dynamic Search**: A compiled client-side search autocomplete index automatically rebuilds at compile time to index new pages.
*   **Vector SVG Icon Partial**: Unicode emojis are replaced project-wide with clean, scalable, high-contrast inline outline SVGs mapped dynamically in `/layouts/partials/svg-icon.html`.
*   **Page-to-Page Exit Loaders**: Seamless screen-to-screen exit animations using deferred browser redirects (350ms) to enhance UX.
*   **Accessibility Widget**: A middle-left floating accessibility controller with screen reader formatting, contrast themes, text sizing, and mobile-responsive fallback positioning.
*   **CMS Enabled**: Pre-configured with `cloudcannon.config.yml` to allow non-technical authors to edit metadata and content visually.

---

## 🛠️ Local Development Setup

Follow these steps to run the website locally on your computer:

### 1. Prerequisites
*   **GoHugo (Extended Version)**: Ensure you have Hugo Extended installed (version `0.110.0` or higher).
    *   *Windows (via winget)*: `winget install Gohugo.Hugo.Extended`
    *   *Mac (via Homebrew)*: `brew install hugo`
*   **Git**: Required for version control and cloning.

### 2. Clone the Repository
```bash
git clone https://github.com/stephenajulu/knlstesthugo.git
cd knlstesthugo
```

### 3. Run the Development Server
Start the local server with page auto-reload and draft content rendering:
```bash
hugo server -D
```
The console will output the local server URL (usually `http://localhost:1313/`). Open this link in your web browser.

---

## 📝 Editing Content in CloudCannon CMS

The project is fully integrated with **CloudCannon CMS** for visual, non-technical content management:

*   **Config File**: Configuration resides in [cloudcannon.config.yml](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/knlstest.netlify.app/cloudcannon.config.yml).
*   **Visual Form Fields**: Front-matter parameters (SEO titles, meta descriptions, image uploads, document tables, or page settings) are rendered as friendly sidebar inputs (text boxes, drop-downs, date selectors).
*   **Visual Shortcodes (Snippets)**: Content managers can insert styled modules in the rich-text editor using visual components:
    *   `button`: Set text, link target, and style classes.
    *   `alert`: Insert operating banners (warning, success, info).
    *   `faq_item`: Add interactive, collapsible questions.
    *   `youtube`: Embed responsive videos by simply pasting the video ID.

---

## 🌐 Production Deployment

To publish this website live, we recommend deploying to **Netlify**, **Vercel**, or **CloudCannon Hosting**:

### Deployment Settings:
*   **Repository Source**: Linked GitHub/GitLab repository
*   **Build Command**: `hugo --gc --minify`
*   **Publish Directory**: `public`
*   **Environment Variable**: Set `HUGO_VERSION` to match your local version (e.g. `0.120.0` or higher) to ensure compile parity.

---

## 📚 Technical Documentation Index

For detailed guides on site templates, styling, and accessibility configurations, explore the project **WIKI**:

*   [WIKI/README.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/knlstest.netlify.app/WIKI/README.md) - WIKI overview.
*   [WIKI/architecture.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/knlstest.netlify.app/WIKI/architecture.md) - Templating, partials, dynamic navigation, search, and page loaders.
*   [WIKI/cloudcannon.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/knlstest.netlify.app/WIKI/cloudcannon.md) - CMS configurations, parameters, and visual snippets mapping.
*   [WIKI/seo_accessibility.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/knlstest.netlify.app/WIKI/seo_accessibility.md) - SEO tags, WCAG 2.1 conformance, keyboard control, and speed optimization.
*   [WIKI/audit_results.md](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/knlstest.netlify.app/WIKI/audit_results.md) - Roster listing alignments and menu duplication audit logs.
