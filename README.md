# Areesan

A complete black-and-gold gym website in Next.js, React, TypeScript, and Framer Motion, based on the two supplied design references.

## Development

Install dependencies with `npm install`, then run `npm run dev`. Run `npm run typecheck` to check TypeScript and `npm run build` to create the production static export in `out/`.

## Experience

- Responsive navigation and active section highlighting
- Scroll reveals, hero parallax, animated counters, and card interactions
- Program details, coach profiles, transformation stories, and facility dialogs
- Four-stop interactive gym photo tour
- Membership-specific trial enquiry form with field validation and downloadable summary
- Keyboard-accessible native dialogs and reduced-motion support

## Content and integration

The trial form is a browser-only demonstration. No bookings or personal information are transmitted or stored on a server. A backend or CRM connection is needed for live enquiries. Sample pricing, profiles, member stories, statistics, and contact details follow the design reference and must be verified before business launch. Social links currently open their platforms and the map opens Gulberg III, Lahore.

All 13 generated photographs are optimized and included in `public/images/`. See `ASSETS.md` for their prompts. Core content is in `app/page.tsx`; the responsive design is in `app/globals.css`.
