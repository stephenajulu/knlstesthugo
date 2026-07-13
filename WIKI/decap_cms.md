# Decap CMS Integration & Editing Guide

Decap CMS (formerly Netlify CMS) is integrated into the KNLS Hugo website to provide a **100% free, open-source, unlimited-user** editing interface. It operates completely client-side in the browser and connects directly to the repository via Netlify Git Gateway.

---

## 🔑 1. Accessing the Content Manager

Editors can manage the site by visiting the administrator path:
`https://<your-live-domain>/admin/`

### Invitation & Authentication Workflow (Netlify Identity)
To ensure non-technical staff can access the CMS without needing GitHub accounts:
1.  **Invites**: The site administrator invites editors by email from the **Netlify Identity Dashboard**.
2.  **Confirmation Email**: The editor receives an invitation email, clicks the link, and is redirected to the website homepage where a password setup modal opens.
3.  **Login**: Once the password is set, the editor goes to `/admin/` and logs in using their email and password.

---

## 📂 2. Structured Collections & Widgets

Decap CMS collections are aligned with the project's visual structure. Each file maps parameters to simple input widgets, preventing editors from breaking metadata structures:

### A. Collection Groups
*   **Core Pages**: Homepage hero layouts, who-we-are bios, services directories, and contact forms.
*   **Library Services**: Individual detail pages (Braille services, interlibrary loans, outreach) using `list` and `object` cards.
*   **ISBN & Bibliography**: ISBN online applications, FAQs, legal deposits, and the **KNB PDF Archive upload grid** (uses the `file` widget to upload document files directly).
*   **Media & Updates**: Events photo galleries, tenders, and news bulletins.
*   **Corporate & Strategy**: Roster grids for the Board of Directors and Management team, Strategic Plan PDF downloads, and Careers vacancy tables.
*   **E-Resources Gateway**: Subscribed/open e-resources lists, Google search engines, and resource directories.
*   **Portal Access**: Quick portal links (eCitizen, Suppliers, Staff portal).
*   **Menus & Layouts**: Edits navigation lists and links inside `data/navigation.yml` visually.

### B. User-Friendly Editor Widgets
*   `string` / `text`: Plain text boxes for headlines and descriptions.
*   `markdown`: A visual Word-like WYSIWYG editor for page content bodies.
*   `image`: A drag-and-drop box to upload and preview images.
*   `file`: Document uploader for PDF bulletins, career postings, sitemaps, and tenders.
*   `list` / `object`: Collapsible sections for organizing repeating elements (e.g. FAQ items, roster members).

---

## 🚀 3. Automatic Deployment Pipeline

Behind the scenes, saving edits triggers the following automatic steps:
1.  **Git Commit**: Decap CMS communicates with Netlify Git Gateway to commit the updated Markdown/YAML files directly to the GitHub repository on behalf of the editor.
2.  **Netlify Compilation**: Netlify detects the new commit, runs `hugo --gc --minify`, and rebuilds the static files.
3.  **Live Updates**: The website updates automatically in about **1 to 2 minutes** after clicking "Save" in the CMS.

---

## 🎨 4. Premium Visual Customizations (CloudCannon Style)

To match the polished, high-fidelity experience of CloudCannon, the Decap CMS admin interface includes several visual custom overrides injected via [static/admin/index.html](file:///C:/Users/ajulu/Desktop/PROJECTS/Dev%20PROJECTS/knlstest.netlify.app/static/admin/index.html):

### A. Color Palette & Typography
*   **Deep Sidebar Theme**: The navigation sidebar uses a dark-mode theme (`#0f172a`), contrasting with KNLS official blue (`#2D2C8E`) active indicators.
*   **Typography**: Implements Google's **Inter** sans-serif font across the entire editing interface, inputs, and fields.
*   **Polished Cards & Inputs**: Input fields use light-bordered, rounded styling (`#cbd5e1`) with focused glow highlights. Primary save/publish buttons use the KNLS accent orange (`#ff6b00`).

### B. CloudCannon-style Collection Headings
Since Decap CMS renders collections as a flat list by default, custom CSS pseudo-element rules target child index elements of the sidebar:
*   `aside ul li:nth-child(1)::before`: Injects a **CONTENT MANAGEMENT** category heading above the Core Pages collection.
*   `aside ul li:nth-child(8)::before`: Injects a **SETTINGS & MENUS** category heading above the Menus & Layouts collection.

This visually splits the admin sidebar into organized, recognizable groups exactly like CloudCannon's collections configuration.

