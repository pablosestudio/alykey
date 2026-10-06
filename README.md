# ALYKEY website

Static multilingual website for property care, keyholding, inspections and concierge services in Alicante and the Costa Blanca. The site is published with GitHub Pages and has no build step.

## Pages and languages

- English pages are in the project root: `index.html`, `services.html`, `property-check.html`, `about.html`, `contact.html`.
- Spanish, French and Ukrainian equivalents are in `/es/`, `/fr/` and `/uk/`.
- Four localized second-home landing pages target the same service area. Their reciprocal `hreflang` annotations and canonicals are in each page head.
- `sitemap.xml` lists indexable pages. Privacy and legal pages intentionally have `noindex` while their business details and terms are being completed.

## Updating content

- Prices and contact details: `js/content.js`.
- Shared behaviour, contact form and responsive menu: `js/main.js`.
- Translations used by the remaining dynamic pages: `js/i18n.js`.
- Static page copy: edit the corresponding HTML in all four language folders. Update title, description, canonical, reciprocal `hreflang`, Open Graph values and `sitemap.xml` whenever adding a page.
- The website currently uses the GitHub Pages canonical host. Do not replace it with `alykey.es` until the domain resolves and the GitHub Pages custom-domain/HTTPS configuration is complete.

## Run locally

Serve the folder so nested language routes and relative assets behave as they do when published:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Current operational notes

- The contact form opens a prefilled email draft. The visitor still needs to press Send; the website does not submit form contents to a server.
- Prices are displayed in `js/content.js`; check that every language and service page matches it after a price change.
- Do not add a street address or `LocalBusiness` address markup: ALYKEY does not receive customers at a public storefront.
- Privacy and legal copy needs the actual operator details, retention/processing information and finalized service terms before those pages can be made indexable.
- Use real service photos and genuine customer reviews only. Do not add fabricated claims, ratings, certifications or guarantees.
