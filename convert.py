import os
import re
import glob
import shutil

def main():
    print("Starting Hugo conversion process...")

    # Define directories
    root_dir = "."
    content_dir = os.path.join(root_dir, "content")
    layouts_dir = os.path.join(root_dir, "layouts")
    partials_dir = os.path.join(layouts_dir, "partials")
    default_layouts_dir = os.path.join(layouts_dir, "_default")
    static_dir = os.path.join(root_dir, "static")

    # Create directories
    for d in [content_dir, layouts_dir, partials_dir, default_layouts_dir, static_dir]:
        os.makedirs(d, exist_ok=True)
        print(f"Created/verified directory: {d}")

    # Move assets to static/assets if it exists in root
    assets_src = os.path.join(root_dir, "assets")
    assets_dest = os.path.join(static_dir, "assets")
    if os.path.exists(assets_src) and not os.path.exists(assets_dest):
        print(f"Moving assets from {assets_src} to {assets_dest}...")
        shutil.move(assets_src, assets_dest)
        print("Assets moved successfully.")
    elif os.path.exists(assets_src) and os.path.exists(assets_dest):
        print("Assets already exist in static/assets. Removing root assets folder...")
        shutil.rmtree(assets_src)

    refactored_pages = [
        "index", "who-we-are", "board-of-directors", "management-team", "isbn-faqs", 
        "isbn", "legal-deposit", "digitization", "data-center", "braille-library-services", 
        "study-and-discussion-rooms", "interlibrary-loans", "search-our-collections", 
        "reference-and-referral-services", "national-reading-day", "go-virtual", 
        "capacity-building", "american-corner-programs", "contacts",
        "strategic-plan", "careers", "service-charter", "e-resources", "media-center", 
        "partners-sponsors", "organizational-structure", "services", "sitemap", "tenders", 
        "knls-in-the-news", "newsletter", "apply-isbn-online", "ecitizen", "report-corruption", 
        "staff-login", "suppliers-portal", "donate", "historical-documents", "outreach-services", 
        "promoting-literacy", "rare-collections", "research-consultancy", "training-programs", 
        "national-library", "e-journals", "open-e-resources", "subscribed-e-resources", 
        "e-resources-search-engine", "kenya-national-bibliography", "events", "recognition-awards"
    ]

    # Clean old .md files from content directory to prevent duplicates
    for md_file in glob.glob(os.path.join(content_dir, "*.md")):
        name_without_ext = os.path.splitext(os.path.basename(md_file))[0]
        # Skip refactored md pages (checking both name and _name for home page)
        if name_without_ext.startswith("_") and name_without_ext[1:] in refactored_pages:
            continue
        if name_without_ext in refactored_pages:
            continue
        try:
            os.remove(md_file)
            print(f"Removed old markdown file: {md_file}")
        except Exception as e:
            print(f"Error removing {md_file}: {e}")

    # 1. Read index.html from backup to extract common layouts and partials
    index_path = os.path.join(root_dir, "_scraped_backup", "index.html")
    if not os.path.exists(index_path):
        print(f"Error: index.html not found in {index_path}. Cannot extract common layout.")
        return

    with open(index_path, "r", encoding="utf-8") as f:
        index_html = f.read()

    # Extract accessibility widget
    access_match = re.search(r'(<div class="accessibility-widget".*?<div aria-live="polite" class="sr-only" id="accessibilityStatus"></div>\s*</div>)', index_html, re.DOTALL)
    if access_match:
        access_html = access_match.group(1)
        access_html = replace_relative_links(access_html)
        write_file(os.path.join(partials_dir, "accessibility.html"), access_html)
        print("Extracted accessibility.html partial.")

    # Extract page loader
    loader_match = re.search(r'(<div aria-hidden="true" class="page-loader".*?</div>\s*</div>)', index_html, re.DOTALL)
    if loader_match:
        loader_html = loader_match.group(1)
        loader_html = replace_relative_links(loader_html)
        write_file(os.path.join(partials_dir, "page-loader.html"), loader_html)
        print("Extracted page-loader.html partial.")

    # Extract site header (top-strip + site-header + search dialog)
    header_match = re.search(r'(<div class="top-strip">.*?)(?=\s*<main)', index_html, re.DOTALL)
    if header_match:
        header_html = header_match.group(1)
        header_html = replace_relative_links(header_html)
        header_html = make_header_dynamic(header_html)
        write_file(os.path.join(partials_dir, "header.html"), header_html)
        print("Extracted and dynamized header.html partial.")

    # Extract chatbot
    chatbot_match = re.search(r'(<div aria-label="KNLS chatbot assistant".*?</div>)\s*<footer', index_html, re.DOTALL)
    if chatbot_match:
        chatbot_html = chatbot_match.group(1)
        chatbot_html = replace_relative_links(chatbot_html)
        write_file(os.path.join(partials_dir, "chatbot.html"), chatbot_html)
        print("Extracted chatbot.html partial.")

    # Extract public notice modal
    notice_match = re.search(r'(<section aria-hidden="true" aria-labelledby="knlsPublicNoticeTitle" class="public-notice-modal".*?</section>)', index_html, re.DOTALL)
    if notice_match:
        notice_html = notice_match.group(1)
        notice_html = replace_relative_links(notice_html)
        write_file(os.path.join(partials_dir, "public-notice.html"), notice_html)
        print("Extracted public-notice.html partial.")

    # Extract footer
    footer_match = re.search(r'(<footer class="site-footer.*?</footer>)', index_html, re.DOTALL)
    if footer_match:
        footer_html = footer_match.group(1)
        footer_html = replace_relative_links(footer_html)
        # Dynamize current year
        footer_html = re.sub(r'<span id="year"></span>', r'{{ now.Year }}', footer_html)
        
        # Append dynamic site search script
        footer_html += """\n\n<script>
  window.SITE_PAGES = [
    {{ range site.Pages }}
      {{ if and (not .Params.private) (ne .Type "json") (ne .Kind "section") (ne .Kind "taxonomy") (ne .Kind "term") }}
        {
          title: {{ .Title }},
          url: {{ .RelPermalink }},
          group: {{ .Params.body_class | default "Main" }},
          summary: {{ .Description | default .Summary | default "" }},
          {{ if .Params.data_expiry_date }}expiryDate: {{ .Params.data_expiry_date }},{{ end }}
        },
      {{ end }}
    {{ end }}
  ];
</script>"""
        write_file(os.path.join(partials_dir, "footer.html"), footer_html)
        print("Extracted and dynamized footer.html partial with search script.")

    # Create basehead partial (head.html)
    create_head_partial(partials_dir)

    # Create baseof.html layout
    create_baseof_layout(default_layouts_dir)

    # Create single.html layout
    create_single_layout(default_layouts_dir)

    # Create list.html layout (in case we have list sections, we inherit single)
    shutil.copy(os.path.join(default_layouts_dir, "single.html"), os.path.join(default_layouts_dir, "list.html"))

    # 2. Iterate through all HTML files in backup folder and extract content
    html_files = glob.glob(os.path.join(root_dir, "_scraped_backup", "*.html"))
    refactored_pages = [
        "index", "who-we-are", "board-of-directors", "management-team", "isbn-faqs", 
        "isbn", "legal-deposit", "digitization", "data-center", "braille-library-services", 
        "study-and-discussion-rooms", "interlibrary-loans", "search-our-collections", 
        "reference-and-referral-services", "national-reading-day", "go-virtual", 
        "capacity-building", "american-corner-programs", "contacts",
        "strategic-plan", "careers", "service-charter", "e-resources", "media-center", 
        "partners-sponsors", "organizational-structure", "services", "sitemap", "tenders", 
        "knls-in-the-news", "newsletter", "apply-isbn-online", "ecitizen", "report-corruption", 
        "staff-login", "suppliers-portal", "donate", "historical-documents", "outreach-services", 
        "promoting-literacy", "rare-collections", "research-consultancy", "training-programs", 
        "national-library", "e-journals", "open-e-resources", "subscribed-e-resources", 
        "e-resources-search-engine", "kenya-national-bibliography", "events", "recognition-awards"
    ]
    for file_path in html_files:
        filename = os.path.basename(file_path)
        name_without_ext = os.path.splitext(filename)[0]
        
        # Skip refactored pages which are now stored as .md
        if name_without_ext in refactored_pages:
            print(f"Skipping {filename} (already refactored to structured markdown/YAML).")
            continue
            
        dest_html = os.path.join(content_dir, f"{name_without_ext}.html")
        print(f"Processing {filename} -> {dest_html}...")
        convert_html_to_hugo_content(file_path, dest_html)

    # 3. Create config hugo.toml
    create_hugo_config(root_dir)

    # 4. Patch JS for search to support Hugo
    patch_search_js(static_dir)

    print("\nHugo conversion finished successfully!")

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def replace_relative_links(html):
    # 1. Normalize all single quotes in src/href to double quotes
    html = re.sub(r'href=[\']([^\']*)[\']', r'href="\1"', html)
    html = re.sub(r'src=[\']([^\']*)[\']', r'src="\1"', html)
    
    # 2. Replace index.html links
    html = re.sub(r'href="index\.html"', r'href="/"', html)
    html = re.sub(r'href="index\.html#([^"]*)"', r'href="/#\1"', html)
    
    # 3. Replace other .html links
    html = re.sub(r'href="([^":#\s]+)\.html"', r'href="/\1/"', html)
    html = re.sub(r'href="([^":#\s]+)\.html#([^"]*)"', r'href="/\1/#\2"', html)
    
    # 4. Replace assets paths
    html = re.sub(r'href="assets/', r'href="/assets/', html)
    html = re.sub(r'src="assets/', r'src="/assets/', html)
    return html

def create_head_partial(partials_dir):
    head_content = """<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, viewport-fit=cover" name="viewport"/>
<title>{{ if .IsHome }}Home | {{ .Site.Title }}{{ else }}{{ .Title }} | {{ .Site.Title }}{{ end }}</title>
<meta content="#10069F" name="theme-color"/>
<meta content="{{ .Description | default .Summary | default "Kenya National Library Service" }}" name="description"/>
<link rel="icon" type="image/png" href="/assets/images/knls-logo-official.png"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="/assets/css/styles.css" rel="stylesheet"/>
"""
    write_file(os.path.join(partials_dir, "head.html"), head_content)
    print("Created head.html partial.")

def create_baseof_layout(default_layouts_dir):
    baseof_content = """<!DOCTYPE html>
<html lang="en">
<head>
  {{ partial "head.html" . }}
</head>
<body class="{{ .Params.body_class | default "page" }}"
  {{ if .Params.data_timed_page }}data-timed-page="{{ .Params.data_timed_page }}"{{ end }}
  {{ if .Params.data_expiry_date }}data-expiry-date="{{ .Params.data_expiry_date }}"{{ end }}
  {{ if .Params.data_expired_redirect }}data-expired-redirect="{{ .Params.data_expired_redirect }}"{{ end }}>
  
  {{ partial "accessibility.html" . }}
  {{ partial "page-loader.html" . }}
  <a class="skip-link" href="#main-content">Skip to main content</a>
  
  {{ partial "header.html" . }}
  
  <main id="main-content" {{ with .Params.main_class }}class="{{ . }}"{{ end }}>
    {{ block "main" . }}{{ end }}
  </main>

  {{ partial "public-notice.html" . }}
  {{ partial "chatbot.html" . }}
  {{ partial "footer.html" . }}
  
  <script src="/assets/js/main.js"></script>
</body>
</html>
"""
    write_file(os.path.join(default_layouts_dir, "baseof.html"), baseof_content)
    print("Created baseof.html layout.")

def create_single_layout(default_layouts_dir):
    single_content = """{{ define "main" }}
  {{ .Content }}
{{ end }}
"""
    write_file(os.path.join(default_layouts_dir, "single.html"), single_content)
    print("Created single.html layout.")

def make_header_dynamic(header_html):
    # Find the start of primaryNav
    start_tag = '<ul class="nav__list" id="primaryNav">'
    start_idx = header_html.find(start_tag)
    if start_idx == -1:
        return header_html
        
    # Count balance of ul tags to find the exact closing tag
    balance = 0
    current_idx = start_idx
    end_idx = -1
    
    while current_idx < len(header_html):
        if header_html[current_idx:current_idx+3] == '<ul':
            balance += 1
            current_idx += 3
        elif header_html[current_idx:current_idx+5] == '</ul>':
            balance -= 1
            current_idx += 5
            if balance == 0:
                end_idx = current_idx
                break
        else:
            current_idx += 1
            
    if end_idx == -1:
        return header_html
        
    dynamic_loop = """<ul class="nav__list" id="primaryNav">
  <li><a href="/" class="{{ if .IsHome }}is-active{{ end }}">Home</a></li>
  {{ range site.Data.navigation.main_menu }}
    {{ if .dropdown }}
      <li class="nav__item nav__item--dropdown">
        <button aria-expanded="false" class="nav__trigger" type="button">{{ .name }}<span>▾</span></button>
        <ul class="dropdown">
          {{ range .dropdown }}
            {{ if .expiry }}
              <li data-event-expiry="{{ .expiry }}"><a href="{{ .url }}" class="{{ if eq $.RelPermalink .url }}is-active{{ end }}">{{ .name }}</a></li>
            {{ else }}
              <li><a href="{{ .url }}" class="{{ if eq $.RelPermalink .url }}is-active{{ end }}">{{ .name }}</a></li>
            {{ end }}
          {{ end }}
        </ul>
      </li>
    {{ else if .is_mega }}
      <li class="nav__item nav__item--dropdown">
        <button aria-expanded="false" class="nav__trigger" type="button">{{ .name }}<span>▾</span></button>
        <ul class="dropdown dropdown--services dropdown--services-compact">
          {{ range .groups }}
            <li class="dropdown__group dropdown__group--collapsible">
              <button aria-expanded="false" class="dropdown__group-title dropdown__group-toggle" type="button">{{ .title }} <span aria-hidden="true">▾</span></button>
              <ul aria-label="{{ .title }}" class="dropdown__sub">
                {{ range .items }}
                  <li><a href="{{ .url }}" class="{{ if eq $.RelPermalink .url }}is-active{{ end }}">{{ .name }}</a></li>
                {{ end }}
              </ul>
            </li>
          {{ end }}
          {{ range .flat_items }}
            <li><a href="{{ .url }}" class="{{ if eq $.RelPermalink .url }}is-active{{ end }}">{{ .name }}</a></li>
          {{ end }}
        </ul>
      </li>
    {{ else }}
      <li><a href="{{ .url }}" class="{{ if eq $.RelPermalink .url }}is-active{{ end }}">{{ .name }}</a></li>
    {{ end }}
  {{ end }}
</ul>"""
    
    header_html = header_html[:start_idx] + dynamic_loop + header_html[end_idx:]
    return header_html

def convert_html_to_hugo_content(html_path, hugo_content_path):
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Extract title
    title = "Kenya National Library Service"
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    if title_match:
        title = title_match.group(1).replace(" | Kenya National Library Service", "").strip()

    # Extract description
    description = ""
    meta_match = re.search(r'<meta[^>]+name=["\']description["\'][^>]*>', html, re.IGNORECASE)
    if meta_match:
        meta_tag = meta_match.group(0)
        content_match = re.search(r'content=["\']([^"\']*)["\']', meta_tag, re.IGNORECASE)
        if content_match:
            description = content_match.group(1)
    else:
        content_before_match = re.search(r'<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description["\'][^>]*>', html, re.IGNORECASE)
        if content_before_match:
            description = content_before_match.group(1)

    # Extract body attributes (class, data-*)
    body_attrs = {}
    body_match = re.search(r'<body([^>]*)>', html, re.IGNORECASE)
    if body_match:
        body_content = body_match.group(1)
        class_match = re.search(r'class=["\']([^"\']*)["\']', body_content, re.IGNORECASE)
        if class_match:
            body_attrs['body_class'] = class_match.group(1)
        
        data_matches = re.finditer(r'(data-[a-zA-Z0-9\-]+)=["\']([^"\']*)["\']', body_content)
        for dm in data_matches:
            key = dm.group(1).replace("data-", "").replace("-", "_")
            val = dm.group(2)
            if "redirect" in key and val.endswith(".html"):
                val = "/" + val.replace(".html", "/")
            body_attrs[key] = val

    # Extract main content and its class
    main_content = ""
    main_match = re.search(r'<main([^>]*)>(.*?)</main>', html, re.DOTALL | re.IGNORECASE)
    if main_match:
        main_attrs_str = main_match.group(1)
        main_content = main_match.group(2)
        
        # Extract main class if present
        main_class_match = re.search(r'class=["\']([^"\']*)["\']', main_attrs_str, re.IGNORECASE)
        if main_class_match:
            body_attrs['main_class'] = main_class_match.group(1)
    else:
        print(f"Warning: <main> tag not found in {html_path}. Content will be empty.")

    # Clean up internal links and assets inside main content
    main_content = replace_relative_links(main_content)

    # Generate YAML front matter
    front_matter = [
        "---",
        f'title: "{title}"',
        f'description: "{description}"',
    ]
    for k, v in body_attrs.items():
        val_escaped = str(v).replace('"', '\\"')
        front_matter.append(f'{k}: "{val_escaped}"')
    
    front_matter.append("---")
    front_matter_str = "\n".join(front_matter)

    # Write Content file
    with open(hugo_content_path, "w", encoding="utf-8") as f:
        f.write(front_matter_str + "\n\n" + main_content.strip() + "\n")

def create_hugo_config(root_dir):
    config_content = """title = "Kenya National Library Service"
baseURL = "/"
languageCode = "en-us"

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true

[params]
  description = "Kenya National Library Service"
  
  [params.contact]
    phone = "+254 202 739 893"
    phone_raw = "+254202739893"
    email_communications = "corporatecommunications@knls.ac.ke"
    email_complaints = "complaints@knls.ac.ke"
    address = "Maktaba Kuu Building, Upper Hill, Nairobi"
    hours = "Mon–Fri: 8:00AM–6:30PM | Sat: 8:30AM–5:00PM"

  [params.social]
    facebook = "https://www.facebook.com/KNLSKenya/"
    instagram = "https://www.instagram.com/knlsmedia/"
    linkedin = "https://www.linkedin.com/company/kenya-national-library-service/posts/?feedView=all"
    tiktok = "https://www.tiktok.com/@knlsmedia"
"""
    write_file(os.path.join(root_dir, "hugo.toml"), config_content)
    print("Created hugo.toml configuration.")

def patch_search_js(static_dir):
    main_js_path = os.path.join(static_dir, "assets", "js", "main.js")
    if not os.path.exists(main_js_path):
        print("Warning: main.js not found for patching search.")
        return

    with open(main_js_path, "r", encoding="utf-8") as f:
        js = f.read()

    js = js.replace(
        "const isHome = /(^|\\/)(index\\.html)?$/.test(window.location.pathname);",
        'const isHome = window.location.pathname === "/" || window.location.pathname === "/index.html" || /(^|\\/)(index\\.html)?$/.test(window.location.pathname);'
    )

    js = js.replace(
        "const SITE_PAGES = [",
        "const SITE_PAGES = window.SITE_PAGES || ["
    )

    js = re.sub(r"url:\s*['\"]index\.html['\"]", "url: '/'", js)
    js = re.sub(r"url:\s*['\"]([^'\"]+)\.html['\"]", r"url: '/\1/'", js)

    write_file(main_js_path, js)
    print("Patched assets/js/main.js for search and clean URLs.")

if __name__ == "__main__":
    main()
