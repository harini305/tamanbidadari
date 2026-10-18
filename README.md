# Taman Bidadari Eco House & Yoga — website (Phase 2, local)

Frontend redesign of https://tamanbidadari.com/. Next.js 16 (App Router, JavaScript), GSAP + ScrollTrigger, plain CSS / CSS Modules. No backend.

## Run
```bash
npm install
npm run dev      # http://localhost:3000 (or: npx next dev -p 3737)
npm run build && npm start
```

## Where things live
| Path | What |
|---|---|
| `src/content/site.js` | Brand name, address, WhatsApp, booking URL, social links, owner-pending values |
| `src/content/rooms.js` | The four rooms: text, facts, amenities, image choices |
| `src/content/services.js` | Experiences and facilities |
| `scripts/optimize-images.mjs` | Selects originals from `docs/source-audit/original-assets/` (never modified), writes WebP sizes to `public/images/`, share images to `public/share/`, and `src/content/images.json`. Run `npm run images` after changing it. The originals are kept locally only and are not in this repository; the optimised output in `public/` is |
| `src/components/Motion.js` | All GSAP/ScrollTrigger motion (data-attribute driven, reverted per route, off for reduced motion) |

Fonts (exactly two, self-hosted through `next/font`):
- **Montserrat**: the brand font, the closest match to the Taman Bidadari logo lettering. Used for the wordmark, headings, navigation, buttons, labels, captions, lists and the footer.
- **Lora**: the reading font. Used for paragraphs, page intros and addresses inside the page content (`main p, main address` in `globals.css`). The quoted brand statements (`.t-statement`) use Montserrat.
