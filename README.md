# ALYKEY — Website V1

A static, mobile-first marketing site: no build step, no framework, no dependencies beyond two Google Fonts. Five pages, plain HTML/CSS/JS, ready to deploy as-is.

## 1. Run it locally

No install needed — it's plain HTML/CSS/JS. Two options:

- **Simplest:** double-click `index.html` to open it in a browser. (The contact form and WhatsApp button both work; only relative navigation between pages needs a real file structure, which you already have.)
- **Recommended** (avoids occasional browser quirks with `file://` links): serve the folder locally.
  ```bash
  cd ALYKEY-web
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```
  Any static server works the same way (`npx serve`, VS Code's "Live Server" extension, etc.).

## 2. File structure

```
ALYKEY-web/
├── index.html            Home
├── services.html         Property Care / Services / Concierge in detail
├── property-check.html   The entry-point one-off service
├── about.html
├── contact.html          Form + direct contact
├── privacy.html          Privacy & cookies placeholder
├── legal.html            Legal notice & terms placeholder
├── robots.txt
├── sitemap.xml
├── css/
│   └── styles.css        The whole design system (colors, type, components)
└── js/
    ├── content.js         ← EDIT THIS to change phone, WhatsApp, email, prices
    └── main.js            Mobile menu, WhatsApp links, form validation
```

## 3. Editing content

**Phone, WhatsApp, email, prices, legal placeholders** — all in one place: `js/content.js`. Change a value there and it updates on every page automatically (footer, WhatsApp button, price cards, etc. all read from it).

```js
window.siteConfig = {
  email: "hello@alykey.es",
  phoneDisplay: "+34 620 255 933",   // TODO: confirmed Spanish mobile number
  phoneHref: "+34620255933",         // TODO: same number, digits only
  whatsappNumber: "34620255933",     // TODO: WhatsApp number, digits only, country code first, no +
  ...
  prices: { propertyCheck: "49", basic: "45", care: "79", concierge: "129" },
  ...
};
```

**Body copy, headlines, service bullets** — edit directly in the relevant `.html` file; it's plain readable markup, no templating.

**Images/logo** — there are no photos yet (see "Pending" below); the hero uses a hand-built inline SVG illustration instead of stock photography, so nothing implies work ALYKEY hasn't done. Swap it for a real photo later by replacing the `<svg>...</svg>` block inside `.hero-art` in `index.html` with an `<img>` tag.

There's no `.env` file: since this is a static site with no server, there's nothing to keep secret — `js/content.js` is the "configuration" and it's meant to be public (it's just phone/email/prices). If you later add a real backend (see below), that's where real environment variables and secrets would live.

## 4. Before you publish — pending items

- [ ] Confirm contact details in `js/content.js` (phone and WhatsApp are configured; email is hello@alykey.es)
- [ ] Confirm the four prices (Property Check, Basic, Care, Concierge) — they're V1 placeholders from the pricing model, not final
- [ ] **Wire up the contact form to a real backend.** Right now it only validates and shows a success message — nothing is sent anywhere. Options, roughly easiest first:
  - [Formspree](https://formspree.io) or [Getform](https://getform.io) — paste an action URL, no code
  - A simple serverless function (Netlify Forms, Vercel + a small API route) if you want data in your own database/Sheet later
  - Update the `fetch(...)` call inside `initContactForm()` in `js/main.js` once you pick one
- [ ] Fill in `[REGISTERED ADDRESS]` in `js/content.js` (used on `privacy.html` and `legal.html`) once available
- [ ] Have `privacy.html` and `legal.html` reviewed by someone qualified — they're structured placeholders, not legal advice
- [ ] Add real social links in `js/content.js` → `social` once the accounts exist (there's nowhere they display yet — add icons to the footer when they do)
- [ ] Add analytics if you want it (see below) — respecting GDPR/consent
- [ ] Replace the SVG hero illustration with real photography once you have some, if you'd like
- [ ] Point `alykey.com` (or whichever domain you register) at the hosting deployment

## 5. Hosting / deployment recommendations

This is a static site, so any static host works. Simplest, roughly in order:

1. **Netlify** or **Vercel** — drag-and-drop the `ALYKEY-web` folder, or connect a Git repo for auto-deploys. Both give you free HTTPS and a form-handling add-on if you want (Netlify Forms works with zero backend code).
2. **Cloudflare Pages** — similar, very fast, generous free tier.
3. **GitHub Pages** — free, fine for a brochure site like this, slightly more manual for custom domains.

Any of these will happily serve `robots.txt` and `sitemap.xml` as-is.

## 6. Analytics (optional, not wired up yet)

The structure is ready for it, but nothing is installed. If you add analytics, track:
`WhatsApp click` · `Contact form submit` · `Property Check click` · `Email click` · `Service page visit` · `Language switch`.
Add your analytics snippet just before `</head>` on each page, and if it sets cookies, update `privacy.html` and add a consent banner first.

## 7. Adding Spanish (`/es`)

English is the primary version for V1, as agreed. To add Spanish later:
1. Duplicate each `.html` file into an `es/` folder.
2. Translate the copy in each duplicate (the structure, classes and scripts stay identical).
3. Point the "ES" button in the header's `.lang-switch` to `es/index.html` (etc.) instead of `disabled`.
4. Add the `es/` URLs to `sitemap.xml`.

## 8. Launch checklist

- [ ] Open every page on desktop and mobile widths
- [ ] Click every nav link, footer link and CTA — nothing 404s
- [ ] Submit the contact form with empty required fields → see inline errors; fill it in → see the success message (then confirm it's actually wired to a backend, see §4)
- [ ] Tap the floating WhatsApp button and the "WhatsApp us" links → opens WhatsApp with the pre-filled message
- [ ] Tab through the whole page with a keyboard — focus should always be visible
- [ ] Check `<title>` and meta description on each page
- [ ] Search-replace any remaining `[PLACEHOLDER]` text
- [ ] Confirm no invented claims slipped in (testimonials, years of experience, "24/7", "fully insured", "we guarantee") unless they're true
- [ ] Run the site through Lighthouse (Chrome DevTools) for a quick performance/accessibility/SEO pass
