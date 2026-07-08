# CloudCannon CMS Integration Guide

This guide details how **CloudCannon CMS** (a git-based headless CMS) is integrated with the KNLS GoHugo website and how content managers can edit pages visually or through structured settings.

---

## 1. CMS Architecture & Flow

CloudCannon operates by reading the repository files, providing a visual and front-matter editor, and pushing changes back to the Git provider (GitHub, GitLab, etc.). This triggers a webhook build on the static hosting provider (e.g. Netlify, Vercel, or CloudCannon's hosting) to compile the live site.

```mermaid
graph LR
  A[Content Editor] -->|Edits in CloudCannon| B[CloudCannon CMS Interface]
  B -->|Commits Changes| C[Git Repository (GitHub/etc.)]
  C -->|Triggers Webhook| D[Static Host Build (Hugo)]
  D -->|Compiles Site| E[Live Public Website]
```

---

## 2. Configuration: `cloudcannon.config.yml`

The CMS configuration file `cloudcannon.config.yml` resides in the project root. It provides instructions to CloudCannon on how to parse collections, upload assets, and render fields.

### Key Sections:

- **Source & Output Directories**:
  ```yaml
  source: .
  output: public
  ```
  Points the CMS build script to compile in the root and read compiled assets from `/public/`.
- **Upload Configurations**:
  ```yaml
  paths:
    uploads: static/assets/images
    dam_uploads: static/assets/images
    static: static
  ```
  Specifies where uploaded images should be stored. When editors insert or upload an image in the CMS, CloudCannon saves the file inside `static/assets/images/` and links it as `/assets/images/filename.jpg`.
- **Collections Config**:
  ```yaml
  collections_config:
    pages:
      name: Website Pages
      path: content
      output: true
      icon: wysiwyg
      parser: front-matter
      filter:
        extensions:
          - html
  ```
  Defines the `Website Pages` collection. The path is set to `content/` and filters files to display only `.html` page content templates. The `wysiwyg` icon is shown in the sidebar.

---

## 3. Metadata & Parameters Input Styling

To prevent editors from breaking metadata structures, front-matter keys are linked to specialized editing inputs in the CloudCannon sidebar:

| Front Matter Key | Field Type | Display Label | Description / Action |
|---|---|---|---|
| `title` | Text | Page Title | The title tag rendered in the tab browser. |
| `description` | Textarea | Meta Description | SEO description snippet for search engines. |
| `body_class` | Select Dropdown | Body Styling Class | Selects style variants: `home-page`, `who-we-are-page`, `service-tab-page`, `data-center-page`, etc. |
| `data_timed_page` | Text | Event Key | Activates time-based checks (e.g. `national-reading-day`). |
| `data_expiry_date`| Datetime | Expiry Date & Time | Date/time picker to select when events expire. |
| `data_expired_redirect`| Text | Expired Redirect | Target URL route after expiration (e.g. `/events/#events-gallery`). |
| `main_class` | Select Dropdown | Main Element Class | Preserves custom page container CSS classes (e.g. `service-exact-main isbn-service-page`). |


---

## 4. Visual Editing & Real-time Previews

### Content Editor (WYSIWYG)
Allows editors to change the paragraph text, headings, list items, and links in a Word-like editor. Since Goldmark has unsafe HTML rendering enabled:
- HTML sections remain fully visible and rendered.
- Standard Markdown and text paragraphs can be edited inline.

### Front-Matter Sidebar
Allows changing page properties, custom classes, SEO titles, descriptions, and page expiration dates. All parameters in the front matter are displayed as form fields and validate inputs automatically (e.g. date selector for event expiration dates).

---

## 5. Visual Shortcodes for Non-Technical Editors

To enable non-technical content managers to add styled elements easily without writing raw HTML/CSS or markdown tags, we created custom Hugo shortcodes and mapped them inside `cloudcannon.config.yml` as **Snippets**:

- **Button Snippet (`button`)**: Allows editors to select link styles (orange fill, outline, standard) and edit destinations inside a form field.
- **Alert / Notice Box (`alert`)**: Allows inserting styled warning, success, or info banners on page, useful for library notices or operating changes.
- **FAQ / Collapsible Accordion (`faq_item`)**: Integrates directly with details/summary styling in `styles.css` to add collapsible questions.
- **YouTube Embed (`youtube`)**: Generates a responsive video player simply by pasting the YouTube video ID.

When editors click the **"+" (Insert Snippet)** menu in the visual editor toolbar, they can select these options, fill out simple form fields (URLs, titles, dropdowns), and the CMS will write the correct shortcode syntax behind the scenes automatically.

---

## 6. Site Dashboard Onboarding (.cloudcannon/README.md)

To provide a friendly, non-technical landing experience for content editors upon logging into CloudCannon, we configured a custom Site Dashboard README.

*   **Location**: `.cloudcannon/README.md`
*   **Behavior**: CloudCannon reads this file and automatically renders the formatted markdown instructions on the main **Summary** tab of the project dashboard.
*   **Content**: It contains step-by-step guidance on editing pages, modifying the navigation structure via `navigation.yml`, inserting visual shortcode Snippets, and how the automatic commit-and-deploy cycle triggers Netlify builds.


