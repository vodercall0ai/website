# AGENTS.md — Vodercall Website

## Project Overview

**Vodercall** (`vodercall.ai`) is an AI-powered restaurant booking service for international travelers. The AI voice agent calls restaurants in Hong Kong and Thailand on behalf of users. This repo is the **landing/marketing site** for the iOS app.

## Tech Stack

- **Pure static site** — HTML5, CSS3, vanilla JavaScript. No frameworks, no bundlers, no `package.json`.
- **Hosting**: GitHub Pages (deployed from `main` branch via `.github/workflows/static.yml`)
- **Custom domain**: `vodercall.ai` (see `CNAME` file)
- **Fonts**: Google Fonts — Inter (weights 300–700), loaded via CDN `<link>`
- **No backend** in this repo. The mobile app backend (Firebase, Twilio, Google Gemini, Azure OpenAI) is separate.

## File Structure

```
website/
├── index.html              # Homepage / landing page
├── our-story.html          # Founder story page
├── faq.html                # Full FAQ (25 questions, accordion)
├── privacy-policy.html     # Legal
├── terms-of-service.html   # Legal
├── style.css               # Main stylesheet (~800+ lines)
├── app.js                  # All JavaScript (~500 lines)
├── assets/                 # App screenshots & team photos
├── .github/workflows/      # GitHub Actions deploy
├── CNAME, robots.txt, sitemap.xml
└── *.png                   # Loose image assets in root (should be in assets/)
```

**⚠️ Abandoned/draft files**: `faq1`, `testi.html`, `point 2.html` — partial pages, not linked from the main site. Do not modify unless explicitly asked.

## CSS Conventions

- **Design tokens** in `:root` (see `style.css`):
  - `--primary-color: #1E3A8A` (deep blue)
  - `--secondary-color: #3B82F6` (royal blue)
  - `--accent-color: #10B981` (emerald green)
  - `--warning-color: #F59E0B` (amber)
  - `--neutral-light: #F8FAFC` / `--neutral-dark: #1F2937`
- **Class naming**: BEM-like (`nav-container`, `section-header`, `benefit-card`). Use existing patterns.
- **Responsive breakpoints**: 900px, 768px, 600px, 480px (mobile-first).
- **Animations**: CSS `@keyframes` + `IntersectionObserver` for scroll-triggered fade-in (class `fade-in-up`).
- **Known typo**: `.step p` has `text-align: cente;` (missing 'r') — fix if touching that rule.

## JavaScript Patterns

- **Vanilla JS only** — no jQuery, no modules.
- **Init pattern**: All features initialized from a single `DOMContentLoaded` handler calling `init*()` functions.
- **Feature functions**: `initMobileNavigation()`, `initSmoothScrolling()`, `initAnimations()`, `initFormHandling()`, `initHeaderScroll()`, `initCategoriesNavigation()`, `initCarousel()`.
- **Carousel**: Uses `requestAnimationFrame` (not CSS animation or `setInterval`) — intentionally chosen to prevent pausing in app WebViews.
- **Form handling**: Client-side only. `showThankYouPopup()` on submit. No actual backend endpoint.
- **⚠️ Known bug**: Line ~140 in `app.js` has a stray `t666665` after a closing brace — remove if editing that area.

## HTML Conventions

- **No templating** — nav and footer are copy-pasted across all `.html` files. When adding a new page, copy the full `<nav>` and `<footer>` from `index.html`.
- **SEO**: Every page has `<meta name="description">`, Open Graph tags, canonical URL, and structured data (`application/ld+json`).
- **Accessibility**: `aria-expanded` on FAQ accordions, `alt` text on all images, semantic heading hierarchy.
- **Inline styles**: Many sections in `index.html` use inline `style=""` attributes. Prefer moving new styles to `style.css` or page-level `<style>` blocks.

## Deploy

- Push to `main` → GitHub Actions deploys to GitHub Pages automatically.
- No build step — the entire repo root is served as-is.
- Custom domain: `vodercall.ai` (managed via `CNAME` file and GitHub Pages settings).

## When Editing

1. **CSS changes** → edit `style.css`. Use existing CSS custom properties. Follow existing breakpoints.
2. **JS changes** → edit `app.js`. Follow the `init*()` pattern. Use `DOMContentLoaded` for initialization.
3. **HTML changes** → if adding a new page, copy nav/footer from `index.html`. Include SEO meta tags.
4. **Images** → place new images in `assets/`, not the root directory.