# Hugo Templating & Architecture Details

This document outlines the templating architecture, layout structures, and dynamic enhancements implemented during the Hugo migration.

---

## 1. Templates & Layouts

We utilized Hugo's **Base/Block** template architecture. This separates the global page skeleton from individual page content, avoiding code duplication and ensuring that global UI elements (e.g. Header, Navigation, Footer, Chatbot) remain consistent and maintainable.

### Master Skeleton: `layouts/_default/baseof.html`
Defines the overall HTML wrapper, body tag structure, and load order of dependencies:
- Loads `<head>` options via `partials/head.html`.
- Implements dynamic `<body>` classes and attributes based on page parameters.
- Invokes components: `accessibility.html`, `page-loader.html`, `header.html`, `public-notice.html`, `chatbot.html`, and `footer.html`.
- Uses a `{{ block "main" . }}{{ end }}` tag to let sub-templates inject their main page content.

### Page Renderer: `layouts/_default/single.html`
A lightweight template that defines the `main` block and renders the markdown body:
```html
{{ define "main" }}
  {{ .Content }}
{{ end }}
```

Currently, the project utilizes a **100% Zero-HTML Markdown structure** optimized for both content flexibility and strict structural preservation:
1. **Zero-HTML Markdown Content**: Every single page (51 total pages) is now stored as a clean `.md` Markdown file under `content/` (e.g. `content/strategic-plan.md`, `content/careers.md`, `content/_index.md`). Emojis, nested HTML sections, grids, lists, tables, and sliders have been completely removed from the content files and stored as structured YAML parameters or Markdown syntax.
2. **Modular Layout Templates**: The layout structure, visual templates, and styling wrappers are managed inside the `layouts/` directory:
   - **`layouts/_default/single.html`**: Default single page layout that automatically compiles a header hero if `.Params.hero` is defined and wraps text in a readable layout.
   - **`layouts/_default/document_list.html`**: Renders PDF covers, downloads, metadata labels, and summaries from list arrays (used for `strategic-plan.md`).
   - **`layouts/_default/careers.html`**: Handles tab selectors, nested descriptions, objective items, and applications (used for `careers.md`).
   - **`layouts/_default/service_charter.html`**: Compiles Kiswahili/English document downloads and YouTube embeds (used for `service-charter.md`).
   - **`layouts/_default/e_resources.html` & `e_resource_detail.html`**: Configures database grids, tags, and category lists while supporting live search.
   - **`layouts/_default/e_resources_search.html`**: Integrates Google Custom Search Engine frame.
   - **`layouts/_default/events.html`**: Powers visual slideshows, galleries, and lightbox sources.
   - **`layouts/_default/sitemap.html`**: Renders a dynamic, self-updating index of all pages by querying `site.RegularPages`.
   - **`layouts/_default/partners.html`**: Renders a marquee loop of partner logos and descriptions.
   - **`layouts/_default/organizational_structure.html`**: Compiles visual corporate organizational structure chart from hierarchical YAML nodes.
   - **`layouts/_default/services.html`**: Generates main service category index grid.
   - **`layouts/_default/bibliography.html`**: Creates interactive bibliographic archives filtered by year and decade.
   - **`layouts/_default/newsletter.html` & `layouts/_default/dynamic_list.html`**: Renders bulletins and external press highlight grids.
   - **`layouts/_default/recognition_awards.html`**: Visual national/international awards grid.

---

## 2. Shared Partials & Vector SVG Icons

All shared components are located in `layouts/partials/` for modular editing:

- **`head.html`**: Standardized SEO tags, preconnect domains, Google Fonts (`Inter`), and favicon links. Dynamically determines title and description from page front matter.
- **`header.html`**: Renders the top contact ribbon, logo branding, and main navigation menu dynamically by looping over data variables.
- **`footer.html`**: Handles contact details, link lists, copyright year, and search index generation.
- **`accessibility.html`**: Renders the floating Accessibility panel for screen-readers, contrast, and font adjustments.
- **`page-loader.html`**: Renders the page-transition loading bar.
- **`chatbot.html`**: Renders the floating chat guidance panel and quick actions.
- **`public-notice.html`**: Modal for important national announcements.
- **`svg-icon.html`**: Vector icon outline dictionary containing 39 inline SVG paths. Replaced all Unicode emojis project-wide to ensure clean visual consistency and scalable icons (e.g. `{{ partial "svg-icon.html" (dict "name" "mail") }}`).

---

## 3. Dynamic Menu Data File (`data/navigation.yml`)

To allow non-technical editors to manage the header and footer menus without touching code, the navigation links were refactored into a Hugo Data file at `data/navigation.yml`.

The menu template in `layouts/partials/header.html` loops over this data block dynamically:
```html
{{ range hugo.Data.navigation.main_menu }}
  {{ if .dropdown }}
    <li class="nav__item nav__item--dropdown">
      <button>{{ .name }}</button>
      <ul class="dropdown">
        {{ range .dropdown }}
          <li><a href="{{ .url }}">{{ .name }}</a></li>
        {{ end }}
      </ul>
    </li>
  {{ end }}
```

This renders active states (`is-active`) dynamically depending on the current relative URL, and allows visual menu sorting in the CMS data sidebar.

---

## 4. Dynamic Client-Side Search Index

The original website utilized a hardcoded JavaScript array (`SITE_PAGES`) inside `assets/js/main.js` to fuel its local search utility. In Hugo, this is made fully dynamic using one of two clean approaches:

1. **JS Fallback Integration**:
   `assets/js/main.js` was patched to fallback to a globally declared `window.SITE_PAGES` array:
   ```javascript
   const SITE_PAGES = window.SITE_PAGES || [ ... ];
   ```
2. **Hugo Compiler Generation**:
   We inject a compiled JSON array in the HTML layouts (like `layouts/partials/footer.html`) that parses all active site content files at build time:
   ```html
   <script>
     window.SITE_PAGES = [
       {{ range .Site.AllPages }}
         {{ if and (not .Params.private) (ne .Type "json") }}
           {
             title: {{ .Title }},
             url: {{ .RelPermalink }},
             group: {{ .Params.group | default "Main" }},
             summary: {{ .Description | default .Summary | default "" }},
             {{ if .Params.expiryDate }}expiryDate: {{ .Params.expiryDate }},{{ end }}
           },
         {{ end }}
       {{ end }}
     ];
   </script>
   ```

**Benefit**: Editors can add, rename, or delete pages in the CMS, and the local search autocomplete index automatically rebuilds at compile time to match the live pages!

---

## 5. Event Redirection & Expiry Parameters

Certain pages like the **National Reading Day** (`national-reading-day.md`) rely on event dates and redirections after expiry.
We moved these parameters out of raw javascript files and into page front-matter:
```yaml
body_class: "national-reading-day-body"
data_timed_page: "national-reading-day"
data_expiry_date: "2026-07-10T23:59:59+03:00"
data_expired_redirect: "/events/#events-gallery"
```
These parameters are injected into the `<body>` attributes via `baseof.html` and are evaluated by the script in `main.js` to redirect users and hide expired menu highlights dynamically.

---

## 6. Page-to-Page Exit Loaders

To create smooth page transitions, we integrated exit loader interception:
- Clicks on internal page links trigger a body fade-out class (`page-exit-loading`).
- The page-loader animation is triggered immediately.
- Redirects are deferred by **350ms** to allow the exit animation to complete smoothly.
- Safe exclusions are applied to bypass loaders on external links (`_blank`), mailto envelopes, call triggers (`tel:`), or keyboard modifiers (Command/Ctrl click).

---

## 7. Favicon, robots.txt & Custom 404 Routing

To ensure consistent branding and SEO compliance, we added these core improvements:
- **Favicon Integration**: Linked the official logo `/assets/images/knls-logo-official.png` inside `layouts/partials/head.html` to prevent console asset warnings and present consistent branding.
- **Sitemap and robots.txt**: Added a structured static `robots.txt` configuration pointing to the compiled sitemap.
- **Custom 404 Layout**: Created `layouts/404.html` inheriting from the master skeleton layout to handle broken routing paths visually and direct visitors back to the home page.

