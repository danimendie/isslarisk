# ISSLA Risk — Corporate Website

Static marketing website for [ISSLA Risk Global Services LLC](https://www.isslarisk.com) — a specialist corporate intelligence and risk advisory firm.

## Stack

- **HTML5** — 7 pages, no framework
- **CSS3** — single `css/main.css` (~3,000 lines), CSS variables, responsive design
- **Vanilla JS** — `js/main.js`, no dependencies
- **GSAP 3.12.5** — animations via CDN (ScrollTrigger, hero entrance, counters)
- **Google Fonts** — Outfit, Inter, JetBrains Mono

## Site Structure

```
isslarisk-site/
├── index.html            # Home page
├── services.html         # Four service offerings
├── about.html            # Firm background, methodology, offices
├── faq.html              # FAQ with accordion + sidebar navigation
├── contact.html          # Contact form + office info
├── privacy-policy.html   # GDPR/CCPA privacy policy
├── code-of-ethics.html   # 9-principle professional ethics framework
├── css/
│   └── main.css          # All styles (variables, components, responsive)
├── js/
│   └── main.js           # All interactivity (menu, animations, form, cookies)
├── sitemap.xml           # XML sitemap for search engines
├── robots.txt            # Crawl directives
├── .htaccess             # Apache: security headers, HTTPS redirect, caching
├── logo.png              # Main logo (2.1 MB — optimize to WebP before launch)
├── favicon-issla.png     # Favicon (PNG)
├── favicon.ico           # Favicon (ICO)
└── apple-touch-icon.png  # iOS home screen icon
```

## Local Development

No build process required. Open any HTML file in a browser or serve with any static server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using VS Code
# Install "Live Server" extension → right-click index.html → "Open with Live Server"
```

## Before Going Live

### Required
- [ ] Configure domain DNS to point to hosting
- [ ] Enable HTTPS on hosting (Let's Encrypt recommended)
- [ ] Uncomment HSTS line in `.htaccess` after confirming HTTPS works
- [ ] Set up contact form backend (Formspree, Netlify Forms, or custom API)
- [ ] Replace `https://www.isslarisk.com` with actual domain in all OG/canonical tags and `sitemap.xml`

### Recommended
- [ ] Compress `logo.png` (2.1 MB → target <200 KB) and add WebP variant
- [ ] Create `og-image.png` (1200×630px) for social sharing previews
- [ ] Set up Google Analytics or privacy-friendly alternative (Plausible, Fathom)
- [ ] Submit `sitemap.xml` to Google Search Console

## Key Features

- **Dark theme** with gold accent — premium intelligence firm aesthetic
- **GSAP animations** — hero entrance, counter animations, scroll reveals
- **Responsive** — mobile hamburger menu with focus trapping (keyboard accessible)
- **Accessible** — semantic HTML, ARIA attributes, skip-to-main link, `:focus-visible` styles
- **SEO** — meta descriptions, Open Graph, Twitter Cards, JSON-LD structured data on all pages
- **FAQ** — accordion + sidebar category navigation with IntersectionObserver highlighting
- **Theme toggle** — light/dark mode, persisted in localStorage
- **Cookie consent** — GDPR-compliant banner, stored in localStorage

## Contact

- **Email:** contact@isslarisk.com
- **US:** +1 (505) 637-0805
- **Panama:** +507 279-3242
- **LinkedIn:** [ISSLA Risk](https://www.linkedin.com/company/13987422/)
