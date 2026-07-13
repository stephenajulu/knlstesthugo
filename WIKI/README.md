# KNLS GoHugo Migration & CloudCannon CMS Integration Wiki

Welcome to the official documentation for the **Kenya National Library Service (KNLS)** website migration project. This wiki documents the steps taken, architecture details, and CMS integration to convert the scraped website into a high-performance, accessible, and easily maintainable static site powered by **Hugo v0.160.0+** and **CloudCannon CMS**.

## Table of Contents

1. [Architecture & Hugo Setup](architecture.md)
2. [Decap CMS Integration](decap_cms.md)
3. [Editorial Workflow & Concurrent Writing](editorial_workflow.md)
4. [SEO, Web Performance & Accessibility](seo_accessibility.md)
5. [Quality Assurance & Audit Results](audit_results.md)

---

## Project Overview

The goal of this project was to transition the KNLS website from a static scraped structure into a modern, production-grade **JAMstack** application using the GoHugo framework, adhering to high standards of web performance, SEO, web accessibility (WCAG), and seamless content management.

### Key Milestones Completed
- **Automated Extraction & Refactoring**: Designed and ran an automated parser (`convert.py`) that successfully extracted individual pages, metadata, and body classes from 51 raw HTML files, transforming them into Hugo content files.
- **Dynamic Site Structure**: Segmented shared components (head, header, footer, accessibility widget, loader, chatbot) into clean, reusable Hugo partial layouts.
- **Dynamic Active Navigation**: Re-engineered the multi-level navigation menu to dynamically highlight active items depending on the currently visited relative URL.
- **Dynamic Search Index**: Re-programmed the site-wide local search to inherit content files dynamically from Hugo instead of utilizing static, hardcoded entries.
- **Timed Event Configuration**: Migrated the National Reading Day countdown/redirection engine from hardcoded JS checks to front matter variables parsed directly by Hugo.
- **CloudCannon CMS Integration**: Deeply integrated the CloudCannon editing suite, defining page collections, asset upload pathways, and metadata editor controls in `cloudcannon.config.yml`.
- **WIKI Generation**: Documented the entire setup, configurations, templates, and architectural decisions under the `WIKI/` directory.

---

## Directory Structure

Following the migration, the project root exhibits a standard, clean Hugo directory structure:

```text
knlstest.netlify.app/
├── .hugo_build.lock       # Hugo build lock file
├── _scraped_backup/       # Original scraped .html files (for reference and archival)
├── cloudcannon.config.yml # CloudCannon CMS configuration
├── convert.py             # Python script used for automated migration
├── hugo.toml              # Primary Hugo configuration
├── content/               # Site markdown pages (Markdown + inline HTML)
│   ├── _index.md          # Home page
│   ├── who-we-are.md      # About Us
│   ├── isbn.md            # Issuance of ISBN
│   └── ... (51 pages)
├── layouts/               # Template layout folder
│   ├── _default/
│   │   ├── baseof.html    # Master skeleton layout
│   │   ├── single.html    # Standard page content template
│   │   └── list.html      # Section listing template
│   └── partials/          # Reusable UI partial blocks
│       ├── head.html      # Meta tags, preconnects, stylesheets
│       ├── header.html    # Top strip, primary navigation, search panel
│       ├── footer.html    # Dynamic copyright footer, contact, links
│       ├── chatbot.html   # Assistant floating panel
│       ├── accessibility.html # Accessibility toggle widget
│       ├── page-loader.html # Opening loader animation
│       └── public-notice.html # Notice modal
├── static/                # Static assets copied directly to build output
│   └── assets/            # Main styles, scripts, images, and documents
└── WIKI/                  # Project documentation folder
    ├── README.md          # Main landing page (this file)
    ├── architecture.md    # Code structure and templates details
    ├── decap_cms.md       # Decap CMS configurations and fields guides
    ├── editorial_workflow.md # Guidelines for concurrent editors & PR staging
    ├── seo_accessibility.md # Accessibility and SEO highlights
    └── audit_results.md   # Quality assurance and audit findings
```

To learn more about the layouts, dynamic features, or CMS editing, please select a section from the Table of Contents above.
