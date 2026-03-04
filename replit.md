# Ginga Soccer Academy - gingasoccer.ca

## Overview
Premium soccer training academy website with a "Midnight Pitch" dark design aesthetic inspired by Equinox, Adidas, and SL Benfica. Located at 1197 Unit 5 Union Street, Kitchener, Ontario.

## Tech Stack
- **Frontend**: React 18 + TypeScript, Tailwind CSS, Framer Motion, Wouter (routing), Zustand (state)
- **Backend**: Express.js with Passport.js (local strategy) for authentication
- **Storage**: In-memory (MemStorage) for user accounts; Zustand store for CMS content
- **Styling**: Dark theme with amber/gold (#F5B041) accent, Montserrat for display text, Inter for body

## Architecture
- `client/src/pages/` — Home, Programs, GingaMax, Schedule, Booking, Login, Admin, About, Media, Contact
- `client/src/components/` — Navbar, Footer, shadcn UI components
- `client/src/stores/adminStore.ts` — Zustand store for Rising Stars, Media, News, Registrations
- `client/src/hooks/useAuth.ts` — Authentication hook using TanStack Query
- `server/routes.ts` — Auth API routes (register, login, logout, user check) + admin seeding
- `server/storage.ts` — In-memory user storage

## Pages
- **Home** (`/`) — Hero with YouTube video (plays once, cross-fades to still image), Rising Stars infinite carousel, Programs grid, News section
- **Programs** (`/programs`) — Training programs, camps, turf rentals
- **GingaMax** (`/gingamax`) — Speed & agility training page
- **Schedule** (`/schedule`) — Weekly schedule grid
- **About** (`/about`) — Kevin De Serpa (CEO) + Kenen Shadd (Co-Founder) profiles
- **Media** (`/media`) — Masonry gallery with category filters and lightbox
- **Contact** (`/contact`) — Split-screen contact form + info cards
- **Booking** (`/booking`) — Auth-gated 4-step booking wizard with PDF downloads
- **Login** (`/login`) — Authentication page
- **Admin** (`/admin`) — Full CMS dashboard

## Admin Dashboard
- **Access**: Login with username `admin`, password `ginga2026`
- **Route**: `/admin` (no navbar/footer — self-contained layout with sidebar)
- **Tabs**: Dashboard (overview stats), Rising Stars (add/delete players for carousel), Media (add/delete gallery images), News (write/delete posts), Registrations (confirm/payment toggles, CSV export)
- Admin user is seeded at server startup; "admin" username is blocked from public registration
- All CMS data stored in Zustand store (`client/src/stores/adminStore.ts`)

## Zustand Store (adminStore.ts)
- `risingStars[]` — id, name, position, club, bio, image (drives Home carousel)
- `media[]` — id, title, category, image (drives Media page gallery)
- `news[]` — id, title, date, excerpt, content, image (drives Home news section)
- `registrations[]` — id, name, program, status, payment, date

## Design System ("Midnight Pitch")
- Background: #0a0a0a (Rich Black)
- Surface: #171717 (Dark Charcoal)
- Primary Accent: Amber-500/600 (Ginga Gold gradient)
- Text: White + neutral-400/500 hierarchy
- Typography: Montserrat (uppercase headers), Inter (body), JetBrains Mono (labels)
- Sharp corners, thin borders, glass-morphism navbar
- Logo: `@assets/Ginga_Soccer_Logo_1772593615133.png` used in Navbar (h-12) and Footer (h-10)

## Hero Section
- YouTube video ID: `yB-thID2N9E` — plays once muted via IFrame API
- On video end, cross-fades (2s) to still image from Unsplash
- Headline: "THE WAY TO SWAY FOR BEAUTIFUL PLAYS"
- CTA: "View All Programs" (gold button)

## Auth Flow
- POST /api/auth/register — Create account (blocks "admin" username)
- POST /api/auth/login — Sign in
- POST /api/auth/logout — Sign out
- GET /api/auth/user — Check session (returns 401 if not logged in)
- Booking page requires authentication; shows "Members Only" gate if not logged in
- Admin page checks `user.username === "admin"` for access

## Content Data
- Programs: Justplay ($50+tax, 120m), Group ($50+tax, 90m), Turf Rental (from $70, 1h), Private ($175+tax, 2h)
- Camps: March Break ($500+HST, Mar 16-20), Summer ($500/wk+HST, August), Christmas ($300+HST, Dec 28-30)
- Turf Rentals: Full ($150/hr), 3/4 ($100/hr), Mini ($70/hr)
- Policy: "Strict No-Refund Policy — High Performance Commitment"
- PDFs: `/Ginga_2026_Camps_Registration_Form.pdf` and `/Ginga_2026_Programs_Registration_Form.pdf`
- Rising Stars: 7 players (Petra Bandula, Viktoria Brodar, Diago Delgado, Lucas Dias, Pol Rivera Lopez, Jayden Newberry, Carter Tavares/Roache)

## Environment Variables
- `SESSION_SECRET` — Required, server throws if missing
