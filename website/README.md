# Hair Apparent Barbershop — Professional Website

A professional redesign of the CSC271 product site for **Hair Apparent Barbershop** (Newport, RI).

## Contents

- **index.html** — Home: hero, welcome, why choose us, hours & location, about, contact
- **appointment.html** — Services, pricing table, booking form, haircut recommender, video
- **hair.html** — Hairstyle gallery (fade, curly top, crew cut, long textured)
- **css/style.css** — Typography (Cormorant Garamond + DM Sans), color system, layout, responsive rules
- **js/booking.js** — Booking object, validation, confirmation message
- **js/decision.js** — Decision tree recommender, featured services loop, countdown loop
- **images/** — Logo and gallery images (copied from `product_site/images`)

## How to view

Open `index.html` in a browser, or serve the folder locally, for example:

```bash
cd website
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Design

- Sticky header with logo, nav, and “Book Appointment” CTA
- Hero section with dark green background and gold accent
- Card layout for hours and location
- About section with left border accent
- Footer with contact and copyright
- Responsive layout for mobile and tablet

All content and behavior from the original CSC271 product site are preserved; only layout and styling have been updated for a more professional look.
