
// Opening loader animation.
// Shows briefly on page entry, then fades away. It is disabled quickly for reduced-motion users.
(function setupOpeningLoader() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minDelay = prefersReducedMotion ? 120 : 850;

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      document.body.classList.add("is-loaded");
    }, minDelay);
  });
})();

// Exit loader transition for functional loading page-to-page
(function setupExitLoader() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    
    const href = link.getAttribute("href");
    if (!href) return;
    
    // Ignore external, mailto, tel, anchor hashes, etc.
    if (
      (href.startsWith("http") && !href.includes(window.location.hostname)) ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#") ||
      link.getAttribute("target") === "_blank" ||
      e.metaKey || e.ctrlKey || e.shiftKey
    ) {
      return;
    }
    
    const loader = document.getElementById("pageLoader");
    if (loader) {
      e.preventDefault();
      document.body.classList.remove("is-loaded");
      
      window.setTimeout(() => {
        window.location.href = href;
      }, 350); // wait for fade-in transition
    }
  });
})();


/* =========================================================
   KNLS Official Theme Inspired Full Website
   JavaScript features:
   - Mobile navigation and dropdowns
   - Site-wide local page search
   - Newsletter and contact form demo validation
   - Scroll reveal animation
   ========================================================= */

const SITE_PAGES = window.SITE_PAGES || [
  { title: 'Home', url: '/', group: 'Main', summary: 'Modern homepage for KNLS services, digital access and national library information.' },
  { title: 'Careers', url: '/careers/', group: 'About Us', summary: 'Current opportunities, recruitment notices and how to check official KNLS career updates.' },
  { title: 'Suppliers Portal', url: '/suppliers-portal/', group: 'Top Links', summary: 'Guide users to the official KNLS suppliers portal for procurement-related supplier actions.' },
  { title: 'Apply ISBN', url: '/apply-isbn-online/', group: 'Top Links', summary: 'A quick route to the official ISBN application portal for Kenyan authors and publishers.' },
  { title: 'Browse our Catalog', url: 'http://librarycatalog.knls.ac.ke:8011/', group: 'Top Links', summary: 'Help users search the online library catalogue and discover available materials.' },
  { title: 'Staff Login', url: '/staff-login/', group: 'Top Links', summary: 'A staff-access page that routes authorised users to the official KNLS staff login.' },
  { title: 'Who We Are', url: '/who-we-are/', group: 'About Us', summary: 'KNLS institutional profile, legal basis, national library mandate and national documentary heritage role.' },
  { title: 'Service Charter', url: '/service-charter/', group: 'About Us', summary: 'Commitment to accessible service, customer feedback, complaints handling and downloadable charter resources.' },
  { title: 'Board of Directors', url: '/board-of-directors/', group: 'About Us', summary: 'Governance page for board leadership, institutional oversight and board profiles.' },
  { title: 'Management Team', url: '/management-team/', group: 'About Us', summary: 'Senior leadership page for management profiles and executive service responsibilities.' },
  { title: 'Strategic Plan', url: '/strategic-plan/', group: 'About Us', summary: 'Strategic priorities, downloadable plan documents and implementation focus areas.' },
  { title: 'Organizational Structure', url: '/organizational-structure/', group: 'About Us', summary: 'Institutional structure, departments and reporting relationships.' },
  { title: 'Recognition & Awards', url: '/recognition-awards/', group: 'About Us', summary: 'Awards, milestones and institutional recognition received by KNLS.' },
  { title: 'Partners & Sponsors', url: '/partners-sponsors/', group: 'About Us', summary: 'Development partners, sponsors and collaborators supporting library and knowledge access services.' },
  { title: 'Our Services', url: '/services/', group: 'Our Services', summary: 'Service hub covering national library, ISBN, bibliography, legal deposit, research, data centre and digitization.' },
  { title: 'Bibliographic Services', url: '/bibliographic-services/', group: 'Our Services', summary: 'Access Kenya’s national bibliographic services, including the Kenya National Bibliography, legal deposit and ISBN support.' },
  { title: 'Braille Library Services', url: '/braille-library-services/', group: 'Our Services', summary: 'Accessible reading and assistive technology services for visually impaired users.' },
  { title: 'Study & Discussion Rooms', url: '/study-and-discussion-rooms/', group: 'Information Access Services', summary: 'Quiet study spaces, reading rooms and bookable rooms for group learning and discussion.' },
  { title: 'Interlibrary Loans', url: '/interlibrary-loans/', group: 'Our Services', summary: 'Support for users who need access to materials across library collections.' },
  { title: 'Search Our Collections', url: '/search-our-collections/', group: 'Our Services', summary: 'Search KNLS collections and discover available library materials.' },
  { title: 'Preservation and Conservation Services', url: '/preservation-and-conservation-services/', group: 'Our Services', summary: 'Safeguarding documentary heritage, rare materials and important national collections.' },
  { title: 'Rare Collections', url: '/rare-collections/', group: 'Our Services', summary: 'Rare and unique collections that preserve Kenya’s cultural, historical and literary richness.' },
  { title: 'Reference and Referral Services', url: '/reference-and-referral-services/', group: 'Our Services', summary: 'Professional help for research enquiries, resource discovery and information access.' },
  { title: 'American Corner Programs', url: '/american-corner-programs/', group: 'Information Access Services', summary: 'Learning, innovation and cultural exchange programmes delivered through the American Corner.' },
  { title: 'Capacity Building', url: '/capacity-building/', group: 'Our Services', summary: 'Skills, training and empowerment programmes for staff, communities and institutions.' },
  { title: 'Promoting Literacy', url: '/promoting-literacy/', group: 'Our Services', summary: 'Reading culture and literacy initiatives for children, adults and communities.' },
  { title: 'National Library', url: '/national-library/', group: 'Our Services', summary: 'National Library Division services, legal deposit repository, reference services and national imprint preservation.' },
  { title: 'Issuance of ISBN', url: '/isbn/', group: 'Our Services', summary: 'ISBN and ISMN information for Kenyan publishers, authors and music publishers.' },
  { title: 'Kenya National Bibliography', url: '/kenya-national-bibliography/', group: 'Our Services', summary: 'Bibliographic control and annual records of Kenya’s published intellectual output.' },
  { title: 'Legal Deposit', url: '/legal-deposit/', group: 'Our Services', summary: 'Legal deposit requirements, preservation of national imprint and publisher obligations.' },
  { title: "ISBN FAQ's", url: '/isbn-faqs/', group: 'Our Services', summary: 'Frequently asked questions for ISBN applicants, publishers and authors.' },
  { title: 'Research & Consultancy', url: '/research-consultancy/', group: 'Our Services', summary: 'Research, training, library setup, cataloguing, automation, indexing and information packaging support.' },
  { title: 'Data Center', url: '/data-center/', group: 'Our Services', summary: 'Uvumbuzi Centre digital infrastructure, storage, VPS, SaaS and technical support services.' },
  { title: 'Digitization', url: '/digitization/', group: 'Our Services', summary: 'Uhifadhi Centre digitization services for maps, books, documents, newspapers, charts and records.' },
  { title: 'E-citizen', url: '/ecitizen/', group: 'Our Services', summary: 'Route users to KNLS online services on eCitizen for digital applications and payments.' },
  { title: 'Training Programs', url: '/training-programs/', group: 'Our Services', summary: 'Training support for library development, information management and institutional capacity building.' },
  { title: 'Outreach Services', url: '/outreach-services/', group: 'Our Services', summary: 'Reading culture, literacy campaigns, community outreach and public engagement programmes.' },
  { title: 'E-Resources', url: '/e-resources/', group: 'E-Resources', summary: 'Digital resource hub for e-journals, open access resources, subscribed databases and search tools.' },
  { title: 'E-Journals', url: '/e-journals/', group: 'E-Resources', summary: 'Research databases and journal platforms including agriculture, science, medicine, humanities and social sciences.' },
  { title: 'Open E-resources', url: '/open-e-resources/', group: 'E-Resources', summary: 'Open-access resources for broad public learning, research and reference use.' },
  { title: 'Subscribed E-resources', url: '/subscribed-e-resources/', group: 'E-Resources', summary: 'Subscribed academic and research databases available through KNLS access arrangements.' },
  { title: 'E-resources Search Engine', url: '/e-resources-search-engine/', group: 'E-Resources', summary: 'Official Google Programmable Search plus a local searchable browser for e-journals, open resources and subscribed resources.' },
  { title: 'Media Center', url: '/media-center/', group: 'Media Center', summary: 'Hub for news, events, historical documents, tenders, newsletters and FAQs.' },
  { title: 'KNLS in the News', url: '/knls-in-the-news/', group: 'Media Center', summary: 'Media mentions, press coverage and external news about KNLS.' },
  { title: 'Events Gallery', url: '/events/', group: 'Media Center', summary: 'Upcoming KNLS activities and clear event photo galleries organised by event.' },
  { title: 'National Reading Day', url: '/national-reading-day/', group: 'Media Center', summary: 'Event page for the 10 July Legal Deposit showcase, reading culture activities and featured publications.', expiryDate: '2026-07-10T23:59:59+03:00' },
  { title: 'Historical Documents', url: '/historical-documents/', group: 'Media Center', summary: 'Historical records and digitised heritage documents for public access.' },
  { title: 'Tenders', url: '/tenders/', group: 'Media Center', summary: 'Procurement notices, tender opportunities and supplier updates.' },
  { title: 'News-Letter', url: '/newsletter/', group: 'Media Center', summary: 'KNLS monthly news bulletin and public update archive.' },
  { title: 'FAQs', url: 'contacts.html#faqs', group: 'Media Center', summary: 'Frequently asked questions on membership, ISBN, legal deposit, e-resources and contact channels.' },
  { title: 'Go Virtual', url: '/go-virtual/', group: 'Main', summary: 'Virtual Library access page for digital content, databases, documents, media and learning resources.' },
  { title: 'Donate', url: '/donate/', group: 'Main', summary: 'Donation pathways for supporting library collections, reading programmes, equipment and access initiatives.' },
  { title: 'Contacts', url: '/contacts/', group: 'Main', summary: 'Contact form, head office details, opening hours and facility information.' },
  { title: 'Report Corruption', url: '/report-corruption/', group: 'Quick Links', summary: 'Integrity reporting information and safe routing to official anti-corruption reporting channels.' },
  { title: 'Sitemap', url: '/sitemap/', group: 'Main', summary: 'Complete local index of all pages included in this static website build.' }
];

function isKNLSEventExpired(expiryDate) {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  return !Number.isNaN(expiry.getTime()) && new Date() > expiry;
}

function hideExpiredEventContent() {
  document.querySelectorAll('[data-event-expiry]').forEach((element) => {
    const expiryDate = element.getAttribute('data-event-expiry');
    if (isKNLSEventExpired(expiryDate)) element.remove();
  });
}

function handleTimedEventPage() {
  const body = document.body;
  if (!body || !body.matches('[data-timed-page]')) return;
  const expiryDate = body.getAttribute('data-expiry-date');
  if (!isKNLSEventExpired(expiryDate)) return;
  const page = document.querySelector('.national-reading-day-page');
  const notice = document.querySelector('[data-nrd-expired-notice]');
  if (page) page.querySelectorAll(':scope > section:not(.nrd-expired-notice)').forEach((section) => section.hidden = true);
  if (notice) notice.hidden = false;
  const redirect = body.getAttribute('data-expired-redirect') || 'events.html#events-gallery';
  window.setTimeout(() => { window.location.href = redirect; }, 3500);
}


document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  hideExpiredEventContent();
  handleTimedEventPage();
  setupMobileNavigation();
  setupSearch();
  setupSearchHint();
  setupNewsletter();
  setupContactForm();
  setupDynamicContent();
  setupDynamicPublicNotice();
  setupEmailClientChooser();
  setupMessageRobotVerification();
  setupReveal();
});

function setCurrentYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

function setupMobileNavigation() {
  // Disabled: mobile navigation is handled by setupMobileNavigationCompatibility below.
}

function setupSearch() {
  const open = document.getElementById("openSearch");
  const close = document.getElementById("closeSearch");
  const dialog = document.getElementById("searchDialog");
  const input = document.getElementById("siteSearch");
  const results = document.getElementById("searchResults");

  if (!open || !close || !dialog || !input || !results) return;

  function renderResults(query = "") {
    const q = query.trim().toLowerCase();

    const matches = SITE_PAGES.filter((page) => {
      if (isKNLSEventExpired(page.expiryDate)) return false;
      const text = `${page.title} ${page.group} ${page.summary}`.toLowerCase();
      return !q || text.includes(q);
    }).slice(0, 12);

    results.innerHTML = matches.map((page) => `
      <a class="search-result" href="${page.url}" role="listitem">
        <strong>${page.title}</strong><br>
        <span>${page.group} — ${page.summary}</span>
      </a>
    `).join("");
  }

  open.addEventListener("click", () => {
    dialog.hidden = false;
    input.value = "";
    renderResults();
    setTimeout(() => input.focus(), 0);
  });

  close.addEventListener("click", () => {
    dialog.hidden = true;
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.hidden = true;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialog.hidden) dialog.hidden = true;
  });

  input.addEventListener("input", () => renderResults(input.value));
}


function setupSearchHint() {
  const searchButton = document.getElementById("openSearch");
  const isHome = window.location.pathname === "/" || window.location.pathname === "/index.html" || /(^|\/)(index\.html)?$/.test(window.location.pathname);
  const storageKey = "knlsSearchHintShown";
  if (!searchButton || !isHome || document.querySelector(".search-hint-toast")) return;
  if (window.localStorage && localStorage.getItem(storageKey) === "1") return;

  const tip = document.createElement("div");
  tip.className = "search-hint-toast";
  tip.setAttribute("role", "status");
  tip.setAttribute("aria-live", "polite");
  tip.innerHTML = `
    <button type="button" class="search-hint-toast__close" aria-label="Dismiss search tip">×</button>
    <strong>Search the website</strong>
    <span>Use the orange search icon to search anything on this KNLS website.</span>
  `;
  document.body.appendChild(tip);

  const close = () => {
    tip.classList.remove("is-visible");
    if (window.localStorage) localStorage.setItem(storageKey, "1");
  };

  const closeButton = tip.querySelector(".search-hint-toast__close");
  if (closeButton) closeButton.addEventListener("click", close);
  searchButton.addEventListener("click", close);

  window.setTimeout(() => tip.classList.add("is-visible"), 3600);
  window.setTimeout(close, 6600);
}




function generateCaptchaChallenge() {
  const first = Math.floor(Math.random() * 8) + 2;
  const second = Math.floor(Math.random() * 7) + 3;
  const answer = first + second;
  return {
    question: `${first} + ${second}`,
    answer: String(answer)
  };
}

function setupEntryRobotVerification() {
  // Entry CAPTCHA disabled.
  // CAPTCHA checks are now only used on forms that require user input/submission.
  return;
}

function ensureFormRobotCheck(form) {
  if (!form || form.querySelector("[data-form-captcha]")) return null;

  const captcha = generateCaptchaChallenge();
  const wrapper = document.createElement("div");
  wrapper.className = "form-captcha-box";
  wrapper.setAttribute("data-form-captcha", "");
  wrapper.dataset.captchaAnswer = captcha.answer;
  wrapper.innerHTML = `
    <label>
      <span>CAPTCHA check: what is <strong data-form-captcha-question>${captcha.question}</strong>?</span>
      <input type="text" inputmode="numeric" autocomplete="off" data-form-captcha-input placeholder="Enter answer">
    </label>
    <button type="button" class="form-captcha-box__refresh" data-form-captcha-refresh aria-label="Refresh CAPTCHA">↻</button>
    <small class="form-captcha-box__message" data-form-captcha-message aria-live="polite"></small>
  `;

  const submit = form.querySelector('[type="submit"]');
  if (submit) {
    submit.insertAdjacentElement("beforebegin", wrapper);
  } else {
    form.appendChild(wrapper);
  }

  const input = wrapper.querySelector("[data-form-captcha-input]");
  const question = wrapper.querySelector("[data-form-captcha-question]");
  const message = wrapper.querySelector("[data-form-captcha-message]");
  const refresh = wrapper.querySelector("[data-form-captcha-refresh]");

  refresh.addEventListener("click", () => {
    const next = generateCaptchaChallenge();
    wrapper.dataset.captchaAnswer = next.answer;
    question.textContent = next.question;
    input.value = "";
    message.textContent = "";
    wrapper.classList.remove("has-error");
    input.focus();
  });

  input.addEventListener("input", () => {
    message.textContent = "";
    wrapper.classList.remove("has-error");
  });

  return input;
}

function setupMessageRobotVerification() {
  document.querySelectorAll("form").forEach((form) => {
    if (form.id === "newsletterForm") return;
    if (form.closest(".search-dialog")) return;
    if (form.querySelector("textarea") || form.classList.contains("knls-chatbot__form") || form.id === "contactForm") {
      ensureFormRobotCheck(form);
    }
  });
}

function formRobotIsChecked(form) {
  const captcha = form ? form.querySelector("[data-form-captcha]") : null;
  if (!captcha) return true;
  const input = captcha.querySelector("[data-form-captcha-input]");
  const message = captcha.querySelector("[data-form-captcha-message]");
  const expected = captcha.dataset.captchaAnswer;
  const isValid = input && input.value.trim() === expected;

  captcha.classList.toggle("has-error", !isValid);
  if (!isValid && message) message.textContent = "Incorrect CAPTCHA answer. Please try again.";
  return isValid;
}

function showRobotFormError(form, messageEl) {
  const text = "Please complete the CAPTCHA check before sending.";
  if (messageEl) {
    messageEl.textContent = text;
    messageEl.classList.add("is-error");
  }

  const captcha = form ? form.querySelector("[data-form-captcha]") : null;
  const input = captcha ? captcha.querySelector("[data-form-captcha-input]") : null;
  if (input) input.focus();
  if (!messageEl && !input) alert(text);
}

function setupEmailClientChooser() {

  const modal = document.createElement("div");
  modal.className = "email-choice-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="email-choice-card" role="dialog" aria-modal="true" aria-labelledby="emailChoiceTitle">
      <button type="button" class="email-choice-card__close" aria-label="Close email options">×</button>
      <h2 id="emailChoiceTitle">Open email with</h2>
      <p>Choose how you want to compose this email.</p>
      <div class="email-choice-actions">
        <a data-email-gmail target="_blank" rel="noopener">Gmail</a>
        <a data-email-outlook target="_blank" rel="noopener">Outlook</a>
        <a data-email-default>Default mail app</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => { modal.hidden = true; };
  modal.querySelector(".email-choice-card__close").addEventListener("click", close);
  modal.addEventListener("click", (event) => { if (event.target === modal) close(); });

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const mailto = link.getAttribute("href");
      const email = mailto.replace(/^mailto:/, "").split("?")[0];
      const params = new URLSearchParams(mailto.split("?")[1] || "");
      const subject = params.get("subject") || "";
      const body = params.get("body") || "";

      modal.querySelector("[data-email-gmail]").href =
        "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email) +
        "&su=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      modal.querySelector("[data-email-outlook]").href =
        "https://outlook.live.com/mail/0/deeplink/compose?to=" + encodeURIComponent(email) +
        "&subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      modal.querySelector("[data-email-default]").href = mailto;
      modal.hidden = false;
    });
  });
}


function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  const message = document.getElementById("newsletterMessage");

  if (!form || !message) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "Submitting your subscription...";
    try {
      const response = await fetch("api/newsletter-submit.php", {
        method: "POST",
        body: new FormData(form)
      });
      const result = await response.json();
      message.textContent = result.message || "Thank you. Your subscription has been recorded.";
      if (result.ok) form.reset();
    } catch (error) {
      message.textContent = "We could not submit the subscription. Please try again later.";
    }
  });
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const message = document.getElementById("contactMessage");

  if (!form || !message) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!formRobotIsChecked(form)) {
      showRobotFormError(form, message);
      return;
    }
    let valid = true;

    form.querySelectorAll("[required]").forEach((field) => {
      const error = field.parentElement.querySelector(".error");
      if (!field.value.trim()) {
        valid = false;
        if (error) error.textContent = "This field is required.";
      } else if (field.type === "email" && !field.checkValidity()) {
        valid = false;
        if (error) error.textContent = "Enter a valid email address.";
      } else if (error) {
        error.textContent = "";
      }
    });

    if (valid) {
      message.textContent = "Sending your message...";
      try {
        const response = await fetch("api/contact-submit.php", {
          method: "POST",
          body: new FormData(form)
        });
        const result = await response.json();
        message.textContent = result.message || "Thank you. Your message has been submitted.";
        if (result.ok) form.reset();
      } catch (error) {
        message.textContent = "We could not send the message. Please try again later or email KNLS directly.";
      }
    }
  });
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function contentAction(item) {
  const href = item.link_url || item.file_url || "";
  if (!href) return "";
  const label = item.file_url ? "Download" : "Read more";
  return `<a class="btn btn--orange" href="${escapeHTML(href)}">${label}</a>`;
}

function renderDynamicCard(item) {
  const date = item.publish_date ? `<p class="kicker">${escapeHTML(item.publish_date)}</p>` : "";
  const image = item.image_url ? `<img src="${escapeHTML(item.image_url)}" alt="" loading="lazy" decoding="async">` : "";
  return `
    <article class="dynamic-content-card reveal">
      ${image}
      <div class="dynamic-content-card__body">
        ${date}
        <h3>${escapeHTML(item.title)}</h3>
        ${item.summary ? `<p>${escapeHTML(item.summary)}</p>` : ""}
        ${contentAction(item)}
      </div>
    </article>
  `;
}

async function setupDynamicContent() {
  const regions = document.querySelectorAll("[data-dynamic-content]");
  if (!regions.length || !window.fetch) return;

  regions.forEach(async (region) => {
    const type = region.getAttribute("data-dynamic-content");
    const limit = region.getAttribute("data-dynamic-limit") || "12";
    region.innerHTML = `<p class="dynamic-content-status">Loading latest content...</p>`;

    try {
      const response = await fetch(`api/content.php?type=${encodeURIComponent(type)}&limit=${encodeURIComponent(limit)}`);
      const result = await response.json();
      if (!result.ok || !result.items || !result.items.length) {
        region.innerHTML = `<p class="dynamic-content-status">No published updates are available yet.</p>`;
        return;
      }
      region.innerHTML = `<div class="dynamic-content-grid">${result.items.map(renderDynamicCard).join("")}</div>`;
      setupReveal();
    } catch (error) {
      region.innerHTML = `<p class="dynamic-content-status">Latest updates could not be loaded.</p>`;
    }
  });
}

async function setupDynamicPublicNotice() {
  if (!window.fetch || document.querySelector(".public-notice-modal:not([hidden])")) return;
  try {
    const response = await fetch("api/public-notice.php");
    const result = await response.json();
    const notice = result.notice;
    if (!result.ok || !notice) return;

    const key = `knlsDynamicNoticeDismissed:${notice.id}`;
    if (window.sessionStorage && sessionStorage.getItem(key) === "1") return;

    const modal = document.createElement("div");
    modal.className = "dynamic-notice-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="dynamic-notice-modal__backdrop" data-dynamic-notice-close></div>
      <section class="dynamic-notice-modal__panel">
        <button type="button" class="dynamic-notice-modal__close" data-dynamic-notice-close aria-label="Close notice">×</button>
        ${notice.image_url ? `<img src="${escapeHTML(notice.image_url)}" alt="">` : ""}
        <p class="kicker">Public Notice</p>
        <h2>${escapeHTML(notice.title)}</h2>
        ${notice.summary ? `<p>${escapeHTML(notice.summary)}</p>` : ""}
        ${notice.link_url ? `<a class="btn btn--orange" href="${escapeHTML(notice.link_url)}">Read more</a>` : ""}
      </section>
    `;
    document.body.appendChild(modal);

    modal.querySelectorAll("[data-dynamic-notice-close]").forEach((button) => {
      button.addEventListener("click", () => {
        if (window.sessionStorage) sessionStorage.setItem(key, "1");
        modal.remove();
      });
    });
  } catch (error) {}
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}


// Careers page tabs for vacancies, internships and attachment details.
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".career-tab");
  const panels = document.querySelectorAll(".career-panel");
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.careerTarget;
      tabs.forEach((item) => item.classList.remove("is-active"));
      panels.forEach((panel) => panel.classList.remove("is-active"));
      tab.classList.add("is-active");
      const panel = document.getElementById(`career-${target}`);
      if (panel) panel.classList.add("is-active");
    });
  });
});


// Desktop hover dropdown cleanup.
// Ensures only the hovered/focused menu is visible and previous dropdowns do not remain stuck open.

// setupDesktopDropdownHoverCleanup replaced by setupHoverAccessibleDropdowns below.






// Mobile navigation reliability patch.
// This is the single source of truth for the hamburger menu.
// It opens/closes the menu on tap, supports nested dropdowns, and closes cleanly on link click/Escape.
(function setupMobileNavigationCompatibility() {
  const menuButton = document.querySelector(".menu-toggle");
  const navList = document.getElementById("primaryNav");
  const dropdownItems = document.querySelectorAll(".nav__item--dropdown");
  const mobileQuery = window.matchMedia("(max-width: 1280px)");

  if (!menuButton || !navList) return;

  function setMenu(open) {
    navList.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    menuButton.classList.toggle("is-active", open);
    menuButton.setAttribute("aria-expanded", String(open));
  }

  menuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMenu(!navList.classList.contains("is-open"));
  });

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector(".nav__trigger");
    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      if (!mobileQuery.matches) return;

      event.preventDefault();
      event.stopPropagation();

      const willOpen = !item.classList.contains("is-open");

      dropdownItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const otherTrigger = other.querySelector(".nav__trigger");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileQuery.matches) return;
      setMenu(false);
      dropdownItems.forEach((item) => {
        item.classList.remove("is-open");
        const trigger = item.querySelector(".nav__trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!mobileQuery.matches) return;
    if (!navList.classList.contains("is-open")) return;

    const clickedInsideNav = navList.contains(event.target);
    const clickedButton = menuButton.contains(event.target);

    if (!clickedInsideNav && !clickedButton) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    setMenu(false);
    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      const trigger = item.querySelector(".nav__trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  });

  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) {
      setMenu(false);
      dropdownItems.forEach((item) => {
        item.classList.remove("is-open");
        const trigger = item.querySelector(".nav__trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });
})();


// Adds a subtle state to the sticky header after scrolling.
(function setupStickyHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function updateHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
})();


// Dynamically measure the fixed top bars so content is never hidden underneath them.
(function setupPersistentNavigationSpacing() {
  const topStrip = document.querySelector(".top-strip");
  const header = document.querySelector(".site-header");

  function updateSpacing() {
    const topHeight = topStrip ? Math.ceil(topStrip.getBoundingClientRect().height) : 0;
    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;

    document.documentElement.style.setProperty("--top-strip-fixed-height", `${topHeight}px`);
    document.documentElement.style.setProperty("--site-header-fixed-height", `${headerHeight}px`);
  }

  updateSpacing();
  window.addEventListener("resize", updateSpacing, { passive: true });
  window.addEventListener("load", updateSpacing);
})();



// Home page library slideshow.
// Runs automatically, supports manual thumbnail selection, and avoids hover prompts/tooltips.
(function setupHomeLibrarySlideshow() {
  const slideshow = document.querySelector("[data-library-slideshow]");
  if (!slideshow) return;

  const img = slideshow.querySelector("img");
  const thumbnails = document.querySelectorAll("[data-slide-target]");
  const images = (slideshow.dataset.images || "").split("|").filter(Boolean);
  const alts = (slideshow.dataset.alts || "").split("|").filter(Boolean);

  if (!img || images.length === 0) return;

  let index = 0;
  let timer = null;
  let isTransitioning = false;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setActiveThumb(activeIndex) {
    thumbnails.forEach((button, i) => {
      button.classList.toggle("is-active", i === activeIndex);
      button.setAttribute("aria-pressed", String(i === activeIndex));
    });
  }

  function showSlide(nextIndex) {
    if (isTransitioning) return;

    index = ((nextIndex % images.length) + images.length) % images.length;
    isTransitioning = true;
    slideshow.classList.add("is-changing");

    window.setTimeout(() => {
      img.src = images[index];
      img.alt = alts[index] || "KNLS library facility image";
      setActiveThumb(index);
      slideshow.classList.remove("is-changing");

      window.setTimeout(() => {
        isTransitioning = false;
      }, 260);
    }, 260);
  }

  function nextSlide() {
    showSlide(index + 1);
  }

  function startAutoPlay() {
    if (timer || prefersReducedMotion || images.length <= 1) return;
    slideshow.classList.add("is-running");
    timer = window.setInterval(nextSlide, 4000);
  }

  function resetAutoPlay() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
    startAutoPlay();
  }

  thumbnails.forEach((button) => {
    button.addEventListener("click", () => {
      const target = Number(button.dataset.slideTarget || 0);
      showSlide(target);
      resetAutoPlay();
    });
  });

  setActiveThumb(0);
  startAutoPlay();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && timer) {
      window.clearInterval(timer);
      timer = null;
      slideshow.classList.remove("is-running");
    } else {
      startAutoPlay();
    }
  });
})();



















// Clickable KNLS facilities slideshow.
// Autoplays every 3 seconds and keeps arrows available for manual browsing.
(function setupFacilitiesClickSlideshow() {
  function init() {
    const slideshow = document.querySelector("[data-facilities-click-slideshow]");
    if (!slideshow) return;

    const slides = Array.from(slideshow.querySelectorAll(".facilities-click-slide"));
    const thumbs = Array.from(document.querySelectorAll("[data-facility-target]"));
    const prev = slideshow.querySelector("[data-facility-prev]");
    const next = slideshow.querySelector("[data-facility-next]");
    const current = document.querySelector("[data-facility-current]");

    if (slides.length <= 1) return;

    let activeIndex = 0;
    let timer = null;
    const intervalMs = 3000;

    function showSlide(index) {
      activeIndex = ((index % slides.length) + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        const isActive = i === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.style.opacity = isActive ? "1" : "0";
        slide.style.pointerEvents = isActive ? "auto" : "none";
        slide.style.zIndex = isActive ? "1" : "0";
      });

      thumbs.forEach((thumb, i) => {
        thumb.classList.toggle("is-active", i === activeIndex);
        thumb.setAttribute("aria-current", i === activeIndex ? "true" : "false");
      });

      if (current) current.textContent = String(activeIndex + 1).padStart(2, "0");
    }

    function stopAutoPlay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = window.setInterval(() => showSlide(activeIndex + 1), intervalMs);
    }

    function restartAutoPlay() {
      startAutoPlay();
    }

    if (prev) {
      prev.addEventListener("click", () => {
        showSlide(activeIndex - 1);
        restartAutoPlay();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        showSlide(activeIndex + 1);
        restartAutoPlay();
      });
    }

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener("click", () => {
        showSlide(i);
        restartAutoPlay();
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoPlay();
      else startAutoPlay();
    });

    showSlide(0);
    startAutoPlay();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();




// Sitewide accessibility toolbar.
// Provides screen-reader support mode, optional read-aloud support, high contrast,
// font controls, and dark/light mode.
(function setupAccessibilityToolbar() {
  function init() {
    const widget = document.querySelector("[data-accessibility-widget]");
    if (!widget) return;

    const body = document.body;
    const toggle = widget.querySelector(".accessibility-toggle");
    const panel = widget.querySelector(".accessibility-panel");
    const close = widget.querySelector("[data-accessibility-close]");
    const status = document.getElementById("accessibilityStatus");

    let toast = document.querySelector("[data-accessibility-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "accessibility-toast";
      toast.setAttribute("data-accessibility-toast", "");
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    const storageKey = "knlsAccessibilitySettings";
    const defaultSettings = {
      fontScale: 1,
      screenReader: false,
      highContrast: false,
      theme: "light"
    };

    function loadSettings() {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "{}") || {};
        // Light mode is the default for first-time visitors, but user-selected dark mode
        // should persist when navigating between pages.
        return { ...defaultSettings, ...saved };
      } catch (error) {
        return { ...defaultSettings };
      }
    }

    let settings = loadSettings();
    let currentUtterance = null;

    function saveSettings() {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    }

    function announce(message) {
      if (status) status.textContent = message;

      if (toast) {
        toast.textContent = message;
        toast.classList.add("is-visible");
        window.clearTimeout(toast._timer);
        toast._timer = window.setTimeout(() => {
          toast.classList.remove("is-visible");
        }, 3500);
      }
    }

    function getReadablePageText() {
      const main = document.querySelector("main") || document.body;
      const clone = main.cloneNode(true);

      clone.querySelectorAll(
        "script, style, noscript, iframe, video, audio, svg, .accessibility-widget, .knls-hero-controls, .knls-hero-progress, .facilities-click-controls, .breadcrumbs"
      ).forEach((element) => element.remove());

      const headings = Array.from(clone.querySelectorAll("h1, h2, h3"))
        .map((heading) => heading.textContent.trim())
        .filter(Boolean);

      const paragraphs = Array.from(clone.querySelectorAll("p, li, a.btn, .btn"))
        .map((item) => item.textContent.trim())
        .filter(Boolean)
        .slice(0, 35);

      const title = document.title ? document.title.replace("| Kenya National Library Service", "").trim() : "KNLS website";
      const text = [title, ...headings.slice(0, 8), ...paragraphs].join(". ");

      return text.replace(/\s+/g, " ").slice(0, 3800);
    }

    function stopReading() {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      currentUtterance = null;
      body.classList.remove("is-reading-page");
    }

    function readPageAloud() {
      if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
        announce("Screen reader mode enabled. Your browser does not support built-in read aloud.");
        return;
      }

      stopReading();

      const text = getReadablePageText();
      if (!text) {
        announce("Screen reader mode enabled. No readable text was found on this page.");
        return;
      }

      currentUtterance = new SpeechSynthesisUtterance(text);
      currentUtterance.rate = 0.92;
      currentUtterance.pitch = 1;
      currentUtterance.volume = 1;
      currentUtterance.lang = document.documentElement.lang || "en-US";

      currentUtterance.onstart = () => {
        body.classList.add("is-reading-page");
        announce("Screen reader mode enabled. Reading the page aloud.");
      };

      currentUtterance.onend = () => {
        body.classList.remove("is-reading-page");
        currentUtterance = null;
        announce("Finished reading the page.");
      };

      currentUtterance.onerror = () => {
        body.classList.remove("is-reading-page");
        currentUtterance = null;
        announce("Screen reader mode enabled. Read aloud could not start in this browser.");
      };

      window.speechSynthesis.speak(currentUtterance);
    }

    function updatePressedStates() {
      widget.querySelectorAll("[data-access-action]").forEach((button) => {
        const action = button.dataset.accessAction;
        const active =
          (action === "screen-reader" && settings.screenReader) ||
          (action === "contrast" && settings.highContrast) ||
          (action === "dark" && settings.theme === "dark" && !settings.highContrast) ||
          (action === "light" && settings.theme === "light" && !settings.highContrast);

        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");

        if (action === "screen-reader") {
          button.textContent = settings.screenReader ? "Stop reader" : "Screen reader mode";
        }
      });
    }

    function applySettings() {
      document.documentElement.style.setProperty("--access-font-scale", settings.fontScale.toFixed(2));

      body.classList.toggle("screen-reader-mode", settings.screenReader);
      body.classList.toggle("high-contrast-mode", settings.highContrast);
      body.classList.toggle("dark-mode", !settings.highContrast && settings.theme === "dark");
      body.classList.toggle("light-mode", !settings.highContrast && settings.theme === "light");

      updatePressedStates();
      saveSettings();
    }

    function openPanel() {
      if (!panel || !toggle) return;
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    function closePanel() {
      if (!panel || !toggle) return;
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }

    if (toggle && panel) {
      toggle.addEventListener("click", () => {
        if (panel.hidden) openPanel();
        else closePanel();
      });
    }

    if (close) {
      close.addEventListener("click", closePanel);
    }

    widget.addEventListener("click", (event) => {
      const button = event.target.closest("[data-access-action]");
      if (!button) return;

      const action = button.dataset.accessAction;

      if (action === "screen-reader") {
        settings.screenReader = !settings.screenReader;

        if (settings.screenReader) {
          applySettings();
          readPageAloud();
        } else {
          stopReading();
          announce("Screen reader mode disabled.");
          applySettings();
        }

        return;
      }

      if (action === "contrast") {
        settings.highContrast = !settings.highContrast;
        announce(settings.highContrast ? "High contrast enabled." : "High contrast disabled.");
      }

      if (action === "dark") {
        settings.highContrast = false;
        settings.theme = "dark";
        announce("Dark mode enabled.");
      }

      if (action === "light") {
        settings.highContrast = false;
        settings.theme = "light";
        announce("Light mode enabled.");
      }

      if (action === "increase-font") {
        settings.fontScale = Math.min(1.35, Number((settings.fontScale + 0.05).toFixed(2)));
        announce("Text size increased.");
      }

      if (action === "decrease-font") {
        settings.fontScale = Math.max(0.90, Number((settings.fontScale - 0.05).toFixed(2)));
        announce("Text size decreased.");
      }

      if (action === "reset-font") {
        settings.fontScale = 1;
        announce("Text size reset.");
      }

      applySettings();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel && !panel.hidden) {
        closePanel();
      }

      // Keyboard shortcut: Alt + R toggles the screen reader mode.
      if (event.altKey && event.key.toLowerCase() === "r") {
        event.preventDefault();
        settings.screenReader = !settings.screenReader;
        if (settings.screenReader) {
          applySettings();
          readPageAloud();
        } else {
          stopReading();
          announce("Screen reader mode disabled.");
          applySettings();
        }
      }
    });

    document.addEventListener("click", (event) => {
      if (!widget.contains(event.target) && panel && !panel.hidden) {
        panel.hidden = true;
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });

    window.addEventListener("beforeunload", stopReading);

    // Ensure images without alt text do not become confusing in screen readers.
    document.querySelectorAll("img:not([alt])").forEach((img) => {
      img.setAttribute("alt", "");
    });

    // Do not auto-read on page load, even when the mode was saved.
    // Browsers require a user click before speaking.
    if (settings.screenReader) {
      body.classList.add("screen-reader-mode");
    }

    applySettings();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();



// First-visit accessibility tutorial.
// Highlights the top-right accessibility button and explains its key functions.
(function setupAccessibilityTutorial() {
  function initTutorial() {
    const widget = document.querySelector("[data-accessibility-widget]");
    const toggle = widget ? widget.querySelector(".accessibility-toggle") : null;
    const panel = widget ? widget.querySelector(".accessibility-panel") : null;
    if (!widget || !toggle || !panel) return;

    const tutorialKey = "knlsAccessibilityTutorialSeen";
    if (localStorage.getItem(tutorialKey) === "true") return;

    const backdrop = document.createElement("div");
    backdrop.className = "accessibility-tutorial-backdrop";
    backdrop.setAttribute("aria-hidden", "true");

    const card = document.createElement("section");
    card.className = "accessibility-tutorial-card";
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "true");
    card.setAttribute("aria-labelledby", "accessibilityTutorialTitle");
    card.innerHTML = `
      <h2 id="accessibilityTutorialTitle">Accessibility tools are here</h2>
      <p>Use this button anytime to make the website easier to read and navigate.</p>
      <ul>
        <li>Turn on screen-reader support and reduced motion.</li>
        <li>Switch to high contrast, dark mode or light mode.</li>
        <li>Increase, decrease or reset text size.</li>
      </ul>
      <div class="accessibility-tutorial-actions">
        <button type="button" data-tutorial-open>Open tools</button>
        <button type="button" data-tutorial-dismiss>Got it</button>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(card);
    toggle.classList.add("tutorial-highlight");

    const openButton = card.querySelector("[data-tutorial-open]");
    const dismissButton = card.querySelector("[data-tutorial-dismiss]");

    function closeTutorial(markSeen = true) {
      if (markSeen) localStorage.setItem(tutorialKey, "true");
      toggle.classList.remove("tutorial-highlight");
      backdrop.remove();
      card.remove();
    }

    function openAccessibilityPanel() {
      closeTutorial(true);
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      toggle.focus();
    }

    openButton.addEventListener("click", openAccessibilityPanel);
    dismissButton.addEventListener("click", () => {
      closeTutorial(true);
      toggle.focus();
    });

    backdrop.addEventListener("click", () => {
      closeTutorial(true);
    });

    document.addEventListener("keydown", function onTutorialKeydown(event) {
      if (!document.body.contains(card)) {
        document.removeEventListener("keydown", onTutorialKeydown);
        return;
      }

      if (event.key === "Escape") {
        closeTutorial(true);
        toggle.focus();
        document.removeEventListener("keydown", onTutorialKeydown);
      }
    });

    openButton.focus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTutorial);
  } else {
    initTutorial();
  }
})();


// CA-inspired KNLS homepage hero slideshow.
// Desktop-safe version: autoplays every 4 seconds on PC and mobile,
// supports next/previous arrows and dots, and avoids hover-pause issues.
(function setupKNLSHeroCarousel() {
  function init() {
    const carousel = document.querySelector("[data-knls-hero-carousel]");
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll(".knls-hero-slide"));
    const dots = Array.from(carousel.querySelectorAll(".knls-hero-dot"));
    const prev = carousel.querySelector("[data-hero-prev]");
    const next = carousel.querySelector("[data-hero-next]");

    if (slides.length <= 1) return;

    carousel.classList.add("is-js-ready");

    let activeIndex = 0;
    let timer = null;
    const intervalMs = 4000;

    function showSlide(index) {
      activeIndex = ((index % slides.length) + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        const isActive = i === activeIndex;
        slide.classList.toggle("is-active", isActive);

        // Inline values make the carousel reliable even if older CSS rules conflict.
        slide.style.opacity = isActive ? "1" : "0";
        slide.style.pointerEvents = isActive ? "auto" : "none";
        slide.style.zIndex = isActive ? "1" : "0";
      });

      dots.forEach((dot, i) => {
        const isActive = i === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    function stopAutoPlay() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
      carousel.classList.remove("is-autoplaying");
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = window.setInterval(() => {
        showSlide(activeIndex + 1);
      }, intervalMs);
      carousel.classList.add("is-autoplaying");
    }

    function restartAutoPlay() {
      startAutoPlay();
    }

    if (prev) {
      prev.addEventListener("click", () => {
        showSlide(activeIndex - 1);
        restartAutoPlay();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        showSlide(activeIndex + 1);
        restartAutoPlay();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        showSlide(i);
        restartAutoPlay();
      });
    });

    // Do not pause on desktop hover. Only pause when the browser tab is hidden.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });

    showSlide(0);
    startAutoPlay();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();





// Compact Kenya National Bibliography browser.
// Enables search, document-type filters, decade/year filters, and in-page PDF preview.
(function setupKNBBrowser() {
  function init() {
    const search = document.querySelector("[data-knb-search]");
    const cards = Array.from(document.querySelectorAll("[data-knb-card]"));
    const typeButtons = Array.from(document.querySelectorAll("[data-knb-filter-type]"));
    const decadeButtons = Array.from(document.querySelectorAll("[data-knb-filter-decade]"));
    const yearButtons = Array.from(document.querySelectorAll("[data-knb-filter-year]"));
    const resultCount = document.querySelector("[data-knb-result-count]");
    const previewFrame = document.querySelector("[data-knb-preview-frame]");
    const previewTitle = document.querySelector("[data-knb-preview-title]");
    const previewDownload = document.querySelector("[data-knb-preview-download]");

    if (!cards.length) return;

    let activeType = "all";
    let activeDecade = "all";
    let activeYear = "all";

    function updateActiveButtons(buttons, attr, value) {
      buttons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset[attr] === value);
      });
    }

    function applyFilters() {
      const query = search ? search.value.trim().toLowerCase() : "";
      let visibleCount = 0;

      cards.forEach((card) => {
        const matchesQuery = !query || card.dataset.title.includes(query) || String(card.dataset.year).includes(query);
        const matchesType = activeType === "all" || card.dataset.type === activeType;
        const matchesDecade = activeDecade === "all" || card.dataset.decade === activeDecade;
        const matchesYear = activeYear === "all" || card.dataset.year === activeYear;
        const visible = matchesQuery && matchesType && matchesDecade && matchesYear;

        card.classList.toggle("is-hidden", !visible);
        if (visible) visibleCount += 1;
      });

      if (resultCount) resultCount.textContent = String(visibleCount);
    }

    function selectCard(card) {
      cards.forEach((item) => item.classList.toggle("is-active", item === card));
    }

    function viewPdf(button) {
      const src = button.dataset.knbView;
      const title = button.dataset.knbTitle || "Kenya National Bibliography";
      if (!src) return;

      const card = button.closest("[data-knb-card]");
      if (card) selectCard(card);

      if (previewFrame) {
        previewFrame.src = src;
        previewFrame.title = title + " PDF preview";
      }

      if (previewTitle) previewTitle.textContent = title;

      if (previewDownload) {
        previewDownload.href = src;
        previewDownload.setAttribute("download", "");
      }

      const previewPanel = document.querySelector(".knb-preview-panel");
      if (previewPanel && window.matchMedia("(max-width: 1100px)").matches) {
        previewPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    typeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeType = button.dataset.knbFilterType || "all";
        updateActiveButtons(typeButtons, "knbFilterType", activeType);
        applyFilters();
      });
    });

    decadeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeDecade = button.dataset.knbFilterDecade || "all";
        activeYear = "all";
        updateActiveButtons(decadeButtons, "knbFilterDecade", activeDecade);
        updateActiveButtons(yearButtons, "knbFilterYear", activeYear);
        applyFilters();
      });
    });

    yearButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeYear = button.dataset.knbFilterYear || "all";
        activeDecade = "all";
        updateActiveButtons(yearButtons, "knbFilterYear", activeYear);
        updateActiveButtons(decadeButtons, "knbFilterDecade", activeDecade);
        applyFilters();
      });
    });

    if (search) {
      search.addEventListener("input", applyFilters);
    }

    document.addEventListener("click", (event) => {
      const viewButton = event.target.closest("[data-knb-view]");
      if (viewButton) viewPdf(viewButton);
    });

    applyFilters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// Braille slideshow for the visually impaired highlight.
(function setupBrailleAccessibilitySlideshow() {
  function init() {
    const slideshow = document.querySelector("[data-braille-slideshow]");
    if (!slideshow) return;

    const slides = Array.from(slideshow.querySelectorAll(".braille-access-slide"));
    if (slides.length <= 1) return;

    let activeIndex = 0;
    let timer = null;

    function showSlide(index) {
      activeIndex = ((index % slides.length) + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const isActive = i === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.style.opacity = isActive ? "1" : "0";
      });
    }

    function start() {
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(() => showSlide(activeIndex + 1), 3000);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && timer) {
        window.clearInterval(timer);
        timer = null;
      } else if (!document.hidden) {
        start();
      }
    });

    showSlide(0);
    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// Simple KNLS chatbot for common website questions.
(function setupKNLSChatbot() {
  function init() {
    const widget = document.querySelector("[data-knls-chatbot]");
    if (!widget) return;

    const toggle = widget.querySelector(".knls-chatbot__toggle");
    const panel = widget.querySelector(".knls-chatbot__panel");
    const close = widget.querySelector(".knls-chatbot__close");
    const messages = widget.querySelector(".knls-chatbot__messages");
    const form = widget.querySelector(".knls-chatbot__form");
    const input = widget.querySelector("#knlsChatInput");
    const quickButtons = widget.querySelectorAll("[data-chat-question]");

    if (!toggle || !panel || !messages || !form || !input) return;

    function openPanel() {
      panel.hidden = false;
      widget.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      setTimeout(() => input.focus(), 0);
    }

    function closePanel() {
      panel.hidden = true;
      widget.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }

    function addMessage(text, type) {
      const message = document.createElement("div");
      message.className = "knls-chatbot__message knls-chatbot__message--" + type;
      message.textContent = text;
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
    }

    function answerQuestion(question) {
      const q = question.toLowerCase().replace(/\s+/g, " ").trim();

      const includesAny = (terms) => terms.some((term) => q.includes(term));

      const faqAnswers = [
        {
          terms: ["location", "address", "where is", "headquarters", "head office", "branch", "branches", "buruburu", "nakuru", "maktaba kuu", "map"],
          answer: "KNLS Headquarters are at Maktaba Kuu Building, Upper Hill, Nairobi. The contact page also lists facility locations for the Buruburu facility in Buruburu, Nairobi, and the Nakuru facility in Nakuru, with embedded maps for each location. For complaints, use complaints@knls.ac.ke."
        },
        {
          terms: ["manual isbn", "isbn payment", "m-pesa", "mpesa", "paybill 522522", "522522", "1103249614", "proof of payment"],
          answer: "Manual ISBN payment: go to M-Pesa, use Paybill 522522, enter Account Number 1103249614 (KCB account), pay the amount based on your ISBN package, then forward proof of payment to rose.rono@knls.ac.ke and copy caroline.lenosingiran@knls.ac.ke and cate.muturi@knls.ac.ke. Include your full name, postal address, postal code, town, email and telephone number."
        },
        {
          terms: ["isbn price", "isbn prices", "current isbn prices", "cost of isbn", "how much is isbn", "single isbn", "10 isbns", "100 isbns", "1000 isbns"],
          answer: "Current ISBN prices are: Single ISBN KSh 1,500; 10 ISBNs KSh 10,000; 100 ISBNs KSh 50,000; and 1000 ISBNs KSh 100,000."
        },
        {
          terms: ["unused isbn", "previous isbn", "another isbn", "new isbn if", "haven't used", "have not used", "exhaust"],
          answer: "You must exhaust all previously issued ISBNs before applying for new ones. The system may give an error if you try to purchase more before using the existing ISBNs."
        },
        {
          terms: ["apply for isbn online", "isbn online", "isbn application", "where can i apply", "application portal", "apply isbn"],
          answer: "You can apply through the ISBN Application Portal. Use the Apply ISBN button or the Issuance of ISBN page on this website to get to the official application route."
        },
        {
          terms: ["isbn tutorial", "youtube tutorial", "watch tutorial", "video tutorial"],
          answer: "Yes. There is an ISBN YouTube tutorial. Check the ISBN FAQ or ISBN service page for the tutorial link."
        },
        {
          terms: ["different languages", "translated", "translation", "same title", "different language"],
          answer: "Yes. A translated version is considered a different edition and should be assigned a new ISBN."
        },
        {
          terms: ["Vtabu login", "vtabu login", "virtual library login", "log in", "login/register", "login register", "ecitizen account", "first-time user", "first time user"],
          answer: "To log in to the KNLS Virtual Library, visit the Vtabu portal, click Login/Register, continue through eCitizen, then log in to your eCitizen account. First-time users should complete the registration form using their email and password."
        },
        {
          terms: ["Vtabu", "vtabu", "virtual library", "membership", "membership plan", "membership prices", "Vtabu price", "vtabu price", "Vtabu prices", "vtabu prices"],
          answer: "Vtabu membership plans are KSh 20 per day, KSh 100 per week, KSh 500 per month, KSh 1,500 for 6 months and KSh 2,500 per year."
        },
        {
          terms: ["own laptop", "bring laptop", "personal laptop", "byod", "device"],
          answer: "Yes. Users may bring personal laptops but should check the devices in and out at the security desk. BYOD and Acceptable Use policies apply."
        },
        {
          terms: ["library access fee", "access fee", "entrance fee", "pay library", "paybill 222222", "222222", "nasd", "ecitizen payment", "library payment"],
          answer: "The adult daily library access fee is KSh 20 plus a KSh 5 eCitizen convenience fee, making KSh 25 total. Payment can be made via eCitizen using Paybill 222222 and Account Name NASD."
        },
        {
          terms: ["opening", "hours", "open", "closing", "saturday", "public holidays", "sunday"],
          answer: "KNLS opening hours are Monday to Friday, 8:00 AM to 6:30 PM, and Saturday, 8:30 AM to 5:00 PM. The library is closed on Sundays and public holidays."
        },
        {
          terms: ["internet", "wifi", "wi-fi", "wireless"],
          answer: "Yes. Free wireless internet is available during regular service hours, subject to the Acceptable Use Policy."
        },
        {
          terms: ["computers", "computer lab", "computer labs", "use computers", "computing resources"],
          answer: "Yes. KNLS libraries have computer labs where patrons can use computing resources. Users should follow the library's computing policies and seek guidance from the librarian when accessing the resources."
        },
        {
          terms: ["discussion", "group discussion", "discussion spaces", "study spaces"],
          answer: "Yes. Designated group discussion spaces are available. Ask at the information desk for directions."
        },
        {
          terms: ["catalog", "catalogue", "opac", "find books", "search books", "library catalog"],
          answer: "You can search for books through the KNLS Library Catalog or OPAC. Use the Browse our Catalog link on the website. It opens the official KNLS catalogue."
        },
        {
          terms: ["job", "jobs", "careers", "vacancies", "hr", "employment"],
          answer: "KNLS job opportunities are posted on the Careers page when available. You can also call 0202739893 and ask to be connected to HR, or email hodhr@knls.ac.ke."
        },
        {
          terms: ["supplier", "suppliers", "register as supplier", "supplier registration", "procurement"],
          answer: "To register as a KNLS supplier, use the Suppliers Portal or Supplier Registration Portal link on the website."
        },
        {
          terms: ["switchboard", "telephone", "phone number", "call", "contact number"],
          answer: "The KNLS switchboard number is 0202739893. You can call this number to be connected to the relevant department."
        },
        {
          terms: ["book launch", "book club", "events", "auditorium", "auditoriums", "hire", "spaces", "hosting"],
          answer: "For book launches, book clubs, events or hiring KNLS auditoriums and spaces, email corporatecommunications@knls.ac.ke. Complaints can be sent to complaints@knls.ac.ke."
        },
        {
          terms: ["legal deposit", "deposit"],
          answer: "Legal Deposit helps preserve Kenya’s documentary heritage. Visit the Legal Deposit page under Our Services for requirements and next steps."
        },
        {
          terms: ["bibliography", "knb", "kenya national bibliography"],
          answer: "Use the Kenya National Bibliography page to view and download bibliography documents by year."
        },
        {
          terms: ["accessibility", "blind", "visually impaired", "contrast", "font", "dark mode", "screen reader"],
          answer: "Use the accessibility button at the top right of the navigation bar for screen reader support, high contrast, font controls, dark mode and light mode."
        },
        {
          terms: ["data centre", "data center", "server", "storage", "cloud", "uvumbuzi"],
          answer: "The Data Centre page explains KNLS Uvumbuzi Centre services, including VPS, storage, SaaS, cloud support and digital infrastructure."
        },
        {
          terms: ["digitization", "digitisation", "digitize", "digitise", "uhifadhi"],
          answer: "The Digitization page explains Uhifadhi Centre services for converting physical materials into digital formats for preservation and access."
        }
      ];

      const match = faqAnswers.find((item) => includesAny(item.terms));
      if (match) return match.answer;

      if (q.includes("isbn")) return "For ISBN services, use the Issuance of ISBN page or the Apply ISBN button. You can apply online, check ISBN prices and review the ISBN FAQ from the ISBN pages.";

      return "I can help with ISBN, legal deposit, Kenya National Bibliography, Vtabu prices and login, contacts, branch locations, opening hours, library access fees, eCitizen payments, supplier registration, careers, accessibility, data centre and digitization.";
    }

    toggle.addEventListener("click", () => panel.hidden ? openPanel() : closePanel());
    if (close) close.addEventListener("click", closePanel);

    quickButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const question = button.dataset.chatQuestion || button.textContent;
        openPanel();
        addMessage(question, "user");
        window.setTimeout(() => addMessage(answerQuestion(question), "bot"), 220);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!formRobotIsChecked(form)) {
        showRobotFormError(form);
        return;
      }
      const question = input.value.trim();
      if (!question) return;
      input.value = "";
      addMessage(question, "user");
      window.setTimeout(() => addMessage(answerQuestion(question), "bot"), 220);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) closePanel();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


(function () {
  function initResourceFilters() {
    document.querySelectorAll('[data-resource-filter]').forEach((browser) => {
      const input = browser.querySelector('[data-resource-search]');
      const cards = Array.from(browser.querySelectorAll('[data-resource-card]'));
      const chips = Array.from(browser.querySelectorAll('[data-resource-filter-chip]'));
      const count = browser.querySelector('[data-resource-count]');
      const groups = Array.from(browser.querySelectorAll('[data-resource-group]'));
      browser.classList.add('e-resource-browser--multi-open', 'e-resource-browser--always-visible');
      let active = 'all';

      function buildCategoryNavigator() {
        // KNLS latest: category navigator removed per request.
        return;
        const list = browser.querySelector('.e-resource-category-list');
        if (!list || browser.querySelector('[data-resource-category-nav]') || !groups.length) return;

        const nav = document.createElement('div');
        nav.className = 'e-resource-category-nav';
        nav.setAttribute('data-resource-category-nav', '');
        nav.setAttribute('aria-label', 'Jump to resource category');

        groups.forEach((group, index) => {
          const title = group.querySelector('summary span')?.textContent?.trim() || `Category ${index + 1}`;
          const total = group.querySelector('summary small')?.textContent?.trim() || '';
          const button = document.createElement('button');
          button.type = 'button';
          button.innerHTML = `<span>${title}</span>${total ? `<small>${total}</small>` : ''}`;
          button.addEventListener('click', () => {
            group.open = true;
            nav.querySelectorAll('button').forEach((item) => item.classList.toggle('is-active', item === button));
            group.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
          nav.appendChild(button);
        });

        list.parentNode.insertBefore(nav, list);
      }

      function updateCategoryNav() {
        const navButtons = Array.from(browser.querySelectorAll('[data-resource-category-nav] button'));
        navButtons.forEach((button, index) => {
          const group = groups[index];
          if (!group) return;
          button.hidden = group.classList.contains('is-hidden');
          button.classList.toggle('is-active', group.open && !group.classList.contains('is-hidden'));
        });
      }

      function closeOtherGroups(openGroup) {
        if (browser.classList.contains('e-resource-browser--multi-open')) return;
        groups.forEach((group) => {
          if (group !== openGroup) group.open = false;
        });
        updateCategoryNav();
      }

      groups.forEach((group) => {
        group.open = true;
        group.addEventListener('toggle', () => {
          if (group.open) closeOtherGroups(group);
          else updateCategoryNav();
        });
      });

      function applyFilter() {
        const query = (input ? input.value : '').trim().toLowerCase();
        let visible = 0;
        cards.forEach((card) => {
          const haystack = card.textContent.toLowerCase();
          const tags = (card.dataset.tags || '').toLowerCase();
          const matchesQuery = !query || haystack.includes(query);
          const matchesTag = active === 'all' || tags.includes(active);
          const show = matchesQuery && matchesTag;
          card.classList.toggle('is-hidden', !show);
          if (show) visible += 1;
        });

        groups.forEach((group) => {
          const groupCards = Array.from(group.querySelectorAll('[data-resource-card]'));
          const groupVisible = groupCards.some((card) => !card.classList.contains('is-hidden'));
          group.classList.toggle('is-hidden', !groupVisible);

          if (query || active !== 'all') {
            group.open = groupVisible;
          } else if (!browser.classList.contains('e-resource-browser--multi-open')) {
            group.open = false;
          }
        });

        if (count) count.textContent = visible + (visible === 1 ? ' resource shown' : ' resources shown');
        updateCategoryNav();
      }

      buildCategoryNavigator();

      const expandButton = browser.querySelector('[data-resource-expand-all]');
      const collapseButton = browser.querySelector('[data-resource-collapse-all]');
      if (expandButton) {
        expandButton.addEventListener('click', () => {
          browser.classList.add('e-resource-browser--multi-open');
          groups.forEach((group) => {
            if (!group.classList.contains('is-hidden')) group.open = true;
          });
          updateCategoryNav();
        });
      }
      if (collapseButton) {
        collapseButton.addEventListener('click', () => {
          browser.classList.remove('e-resource-browser--multi-open');
          groups.forEach((group) => { group.open = false; });
          updateCategoryNav();
        });
      }

      if (input) input.addEventListener('input', applyFilter);
      chips.forEach((chip) => {
        chip.addEventListener('click', () => {
          active = chip.dataset.resourceFilterChip || 'all';
          chips.forEach((item) => item.classList.toggle('is-active', item === chip));
          browser.classList.add('e-resource-browser--multi-open', 'e-resource-browser--always-visible');
          applyFilter();
        });
      });

      applyFilter();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResourceFilters);
  } else {
    initResourceFilters();
  }
})();

// Recognition & Awards: keep the Maktaba Awards accordion exclusive.
// Opening one year closes the others so a single click never opens two panels.
(function setupExclusiveMaktabaAwardAccordions() {
  function init() {
    const awardCards = Array.from(document.querySelectorAll("body.awards-page .award-year-card"));
    if (!awardCards.length) return;

    awardCards.forEach((card) => {
      card.addEventListener("toggle", () => {
        if (!card.open) return;
        awardCards.forEach((otherCard) => {
          if (otherCard !== card) otherCard.open = false;
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// Our Services nested dropdown toggles.
// Keeps the Services menu compact: sections open only on hover/focus on desktop and by tap on mobile.
(function setupServicesNestedDropdowns() {
  function init() {
    const groups = document.querySelectorAll(".dropdown--services-compact .dropdown__group--collapsible");
    if (!groups.length) return;

    groups.forEach((group) => {
      const toggle = group.querySelector(".dropdown__group-toggle");
      if (!toggle) return;

      toggle.addEventListener("click", (event) => {
        event.preventDefault();

        const parentMenu = group.closest(".dropdown--services-compact");
        parentMenu?.querySelectorAll(".dropdown__group--collapsible.is-open").forEach((item) => {
          if (item !== group) {
            item.classList.remove("is-open");
            const otherToggle = item.querySelector(".dropdown__group-toggle");
            if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
          }
        });

        const isOpen = group.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest(".dropdown--services-compact")) return;
      groups.forEach((group) => {
        group.classList.remove("is-open");
        const toggle = group.querySelector(".dropdown__group-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// Navigation overlap fix.
// Ensures moving from one top navigation tab to another closes the previous menu immediately,
// including focus-stuck dropdowns and nested Our Services submenus.

// setupNavigationOverlapGuard replaced by setupHoverAccessibleDropdowns below.



// Mobile dropdown close guard.
// Fixes mobile menus that remain open because :focus-within keeps the dropdown visible.
// On mobile/tablet, tapping the same tab closes it; tapping another tab closes the previous one;
// tapping outside or pressing Escape closes all dropdowns.
(function setupMobileDropdownCloseGuard() {
  function init() {
    const navList = document.getElementById("primaryNav");
    const mobileQuery = window.matchMedia("(max-width: 1280px)");
    if (!navList) return;

    const topDropdownItems = Array.from(navList.querySelectorAll(".nav__item--dropdown"));

    function clearFocusInside(element) {
      const active = document.activeElement;
      if (active && element && element.contains(active) && typeof active.blur === "function") {
        active.blur();
      }
    }

    function closeNested(scope) {
      const root = scope || navList;
      root.querySelectorAll(".dropdown__group--collapsible.is-open, .dropdown__item--flyout.is-open").forEach((item) => {
        item.classList.remove("is-open");
        const toggle = item.querySelector(".dropdown__group-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        clearFocusInside(item);
      });
    }

    function closeTop(item) {
      if (!item) return;
      item.classList.remove("is-open");
      const trigger = item.querySelector(":scope > .nav__trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      closeNested(item);
      clearFocusInside(item);
    }

    function closeAllExcept(activeItem) {
      topDropdownItems.forEach((item) => {
        if (item !== activeItem) closeTop(item);
      });
    }

    topDropdownItems.forEach((item) => {
      const trigger = item.querySelector(":scope > .nav__trigger");
      if (!trigger) return;

      trigger.addEventListener("click", (event) => {
        if (!mobileQuery.matches) return;
        event.preventDefault();
        event.stopImmediatePropagation();

        const shouldOpen = !item.classList.contains("is-open");
        closeAllExcept(item);

        item.classList.toggle("is-open", shouldOpen);
        trigger.setAttribute("aria-expanded", String(shouldOpen));

        if (!shouldOpen) {
          closeNested(item);
          trigger.blur();
        }
      }, true);
    });

    // Nested group toggles inside Our Services should also close when tapped again.
    navList.querySelectorAll(".dropdown--services-compact .dropdown__group-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        if (!mobileQuery.matches) return;
        event.preventDefault();
        event.stopImmediatePropagation();

        const group = toggle.closest(".dropdown__group--collapsible");
        const menu = toggle.closest(".dropdown--services-compact");
        if (!group || !menu) return;

        const shouldOpen = !group.classList.contains("is-open");

        menu.querySelectorAll(".dropdown__group--collapsible.is-open").forEach((other) => {
          if (other !== group) {
            other.classList.remove("is-open");
            const otherToggle = other.querySelector(".dropdown__group-toggle");
            if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
            closeNested(other);
            clearFocusInside(other);
          }
        });

        group.classList.toggle("is-open", shouldOpen);
        toggle.setAttribute("aria-expanded", String(shouldOpen));

        if (!shouldOpen) {
          closeNested(group);
          toggle.blur();
        }
      }, true);
    });

    // Nested flyout items such as KNB decade list should close when tapped again.
    navList.querySelectorAll(".dropdown--services-compact .dropdown__item--flyout > a").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (!mobileQuery.matches) return;

        const flyout = link.closest(".dropdown__item--flyout");
        if (!flyout || !flyout.querySelector(".dropdown__flyout")) return;

        // First tap opens/closes the flyout; second tap can still be used after choosing a child link.
        event.preventDefault();
        event.stopImmediatePropagation();

        const shouldOpen = !flyout.classList.contains("is-open");
        flyout.parentElement?.querySelectorAll(".dropdown__item--flyout.is-open").forEach((other) => {
          if (other !== flyout) {
            other.classList.remove("is-open");
            clearFocusInside(other);
          }
        });
        flyout.classList.toggle("is-open", shouldOpen);
        if (!shouldOpen) link.blur();
      }, true);
    });

    document.addEventListener("click", (event) => {
      if (!mobileQuery.matches) return;
      if (event.target.closest("#primaryNav") || event.target.closest(".menu-toggle")) return;
      topDropdownItems.forEach(closeTop);
    }, true);

    document.addEventListener("keydown", (event) => {
      if (!mobileQuery.matches || event.key !== "Escape") return;
      topDropdownItems.forEach(closeTop);
    });

    mobileQuery.addEventListener?.("change", () => {
      topDropdownItems.forEach(closeTop);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// Service page top image slideshows.
// Cycles every 3 seconds and supports multiple slideshows safely.
(function setupServiceTopSlideshows() {
  function init() {
    document.querySelectorAll("[data-service-slideshow]").forEach((slideshow) => {
      const slides = Array.from(slideshow.querySelectorAll(".service-top-slideshow__slide"));
      if (slides.length <= 1) return;

      let index = slides.findIndex((slide) => slide.classList.contains("is-active"));
      if (index < 0) index = 0;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));

      window.setInterval(() => {
        slides[index].classList.remove("is-active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("is-active");
      }, 3000);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// Events Gallery: 2026 chain of events slideshow and month filters.
(function setupEventsDocumentSection() {
  function init() {
    document.querySelectorAll('[data-event-doc-slideshow]').forEach((slideshow) => {
      const slides = Array.from(slideshow.querySelectorAll('.event-doc-feature__slide'));
      if (slides.length <= 1) return;
      let index = slides.findIndex((slide) => slide.classList.contains('is-active'));
      if (index < 0) index = 0;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      window.setInterval(() => {
        slides[index].classList.remove('is-active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('is-active');
      }, 3000);
    });

    const chips = Array.from(document.querySelectorAll('[data-event-filter]'));
    const cards = Array.from(document.querySelectorAll('.event-doc-card[data-month]'));
    chips.forEach((chip) => {
      chip.addEventListener('click', (event) => {
        event.preventDefault();
        const filter = chip.dataset.eventFilter;
        chips.forEach((item) => item.classList.toggle('is-active', item === chip));
        cards.forEach((card) => {
          const show = filter === 'All' || card.dataset.month === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();







// Final Events Gallery: 3-second slideshows, clickable thumbnails, clear modal images and lightbox navigation.
(function(){function setupSlides(){document.querySelectorAll('[data-event-slideshow]').forEach(show=>{const sec=show.closest('[data-event-section]'),slides=[...show.querySelectorAll('.event-photo-slide')],thumbs=sec?[...sec.querySelectorAll('[data-event-thumb-index]')]:[];if(!slides.length)return;let i=Math.max(0,slides.findIndex(x=>x.classList.contains('is-active'))),timer=null;function set(n){i=((Number(n)||0)+slides.length)%slides.length;slides.forEach((x,j)=>x.classList.toggle('is-active',j===i));thumbs.forEach((x,j)=>{x.classList.toggle('is-active',j===i);x.setAttribute('aria-pressed',j===i?'true':'false')})}function start(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||slides.length<=1)return;if(timer)clearInterval(timer);timer=setInterval(()=>set(i+1),3000)}thumbs.forEach(x=>x.addEventListener('click',()=>{set(x.dataset.eventThumbIndex);start()}));set(i);start()})}function setupModal(){const modal=document.getElementById('eventGalleryModal');if(!modal)return;const title=document.getElementById('eventGalleryModalTitle'),caption=document.getElementById('eventGalleryModalCaption'),body=document.getElementById('eventGalleryModalBody'),light=document.getElementById('eventImageLightbox'),img=document.getElementById('eventImageLightboxImg'),counter=document.getElementById('eventImageLightboxCounter');let images=[],idx=0;function draw(){if(!images.length)return;img.src=images[idx].src;img.alt=images[idx].alt||'Event gallery image';counter.textContent=(idx+1)+' of '+images.length}function openImage(n){if(!images.length)return;idx=((Number(n)||0)+images.length)%images.length;draw();light.hidden=false;document.body.classList.add('event-image-lightbox-open');light.querySelector('.event-image-lightbox__close')?.focus()}function closeImage(){light.hidden=true;document.body.classList.remove('event-image-lightbox-open');img.removeAttribute('src')}function step(d){if(images.length){idx=(idx+d+images.length)%images.length;draw()}}function openGallery(slug){const src=document.getElementById('gallery-source-'+slug);if(!src)return;title.textContent=src.querySelector('h3')?.textContent||'Event gallery';caption.textContent=src.querySelector('p')?.textContent||'';body.innerHTML=src.querySelector('.event-full-gallery-source__items')?.innerHTML||'';images=[...body.querySelectorAll('img')].map(x=>({src:x.getAttribute('src'),alt:x.getAttribute('alt')}));modal.hidden=false;document.body.classList.add('event-gallery-modal-open');modal.querySelector('.event-gallery-modal__close')?.focus()}function closeGallery(){closeImage();modal.hidden=true;document.body.classList.remove('event-gallery-modal-open');body.innerHTML='';images=[];idx=0}document.querySelectorAll('[data-open-event-gallery]').forEach(x=>x.addEventListener('click',()=>openGallery(x.dataset.openEventGallery)));modal.querySelectorAll('[data-close-event-gallery]').forEach(x=>x.addEventListener('click',closeGallery));body.addEventListener('click',e=>{const x=e.target.closest('.event-full-gallery__item');if(x)openImage(x.dataset.fullImageIndex)});light.querySelectorAll('[data-close-event-image]').forEach(x=>x.addEventListener('click',closeImage));light.querySelector('[data-event-image-prev]')?.addEventListener('click',()=>step(-1));light.querySelector('[data-event-image-next]')?.addEventListener('click',()=>step(1));document.addEventListener('keydown',e=>{if(!light.hidden){if(e.key==='Escape')closeImage();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)}else if(!modal.hidden&&e.key==='Escape')closeGallery()})}function init(){setupSlides();setupModal()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();


// Events Gallery: make compact slideshow cards open the full gallery directly.
(function () {
  function initClickableEventSlideshows() {
    document.querySelectorAll('.event-news-card [data-event-slideshow][data-open-event-gallery]').forEach((slideshow) => {
      slideshow.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          slideshow.click();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClickableEventSlideshows);
  } else {
    initClickableEventSlideshows();
  }
})();


// Mobile-library bus slideshow on the Who We Are page.
(function () {
  function initMobileLibrarySlideshow() {
    const slideshow = document.querySelector('[data-mobile-library-slideshow]');
    if (!slideshow) return;
    const slides = Array.from(slideshow.querySelectorAll('.about-mobile-library-slide'));
    const dots = Array.from(slideshow.querySelectorAll('[data-mobile-library-to]'));
    if (!slides.length) return;
    let index = 0;
    let timer = null;
    function show(next) {
      index = ((Number(next) || 0) + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    }
    function start() {
      if (timer) window.clearInterval(timer);
      if (slides.length <= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = window.setInterval(() => show(index + 1), 4000);
    }
    dots.forEach((dot) => dot.addEventListener('click', () => { show(dot.dataset.mobileLibraryTo); start(); }));
    show(0);
    start();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMobileLibrarySlideshow);
  else initMobileLibrarySlideshow();
})();
