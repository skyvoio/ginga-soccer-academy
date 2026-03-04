# Ginga Soccer Academy - gingasoccer.ca

## Overview
Premium soccer training academy website with a "Midnight Pitch" dark design aesthetic inspired by Equinox, Adidas, and SL Benfica. Located at 1197 Unit 5 Union Street, Kitchener, Ontario.

## Tech Stack
- **Frontend**: React 18 + TypeScript, Tailwind CSS, Framer Motion, Wouter (routing)
- **Backend**: Express.js with Passport.js (local strategy) for authentication
- **Storage**: In-memory (MemStorage) for user accounts
- **Styling**: Dark theme with amber/gold (#F5B041) accent, Montserrat for display text, Inter for body

## Architecture
- `client/src/pages/` — Home, Programs, GingaMax, Schedule, Booking, Login, Admin
- `client/src/components/` — Navbar, Footer, shadcn UI components
- `client/src/hooks/useAuth.ts` — Authentication hook using TanStack Query
- `server/routes.ts` — Auth API routes (register, login, logout, user check) + admin seeding
- `server/storage.ts` — In-memory user storage

## Key Features
- Full-screen hero with updated copy: "THE WAY TO SWAY FOR BEAUTIFUL PLAYS"
- Rising Stars section with FIFA-style player cards (Petra Bandula, Viktoria Brodar, Diago Delgado)
- Programs page with training, camps, and turf rentals (updated descriptions)
- GingaMax performance training page
- Weekly schedule grid
- Auth-gated booking wizard (4-step: Select → Verify → Register/Download → Payment)
- Real PDF registration form downloads (camps form vs programs form)
- Player card with mock stats shown after login
- Mobile-responsive design with animated mobile menu
- **Admin Dashboard** at `/admin` — full club management panel

## Admin Dashboard
- **Access**: Login with username `admin`, password `ginga2026`
- **Route**: `/admin` (no navbar/footer — self-contained layout with sidebar)
- **Tabs**: Dashboard (overview stats), Registrations (player management table with confirm/payment toggles, CSV export), Schedule Manager (edit session day/time), Trips (international scouting trips with add form), Settings (academy info)
- Admin user is seeded at server startup; "admin" username is blocked from public registration
- All admin data is stored in React component state (mock data for demo)

## Design System ("Midnight Pitch")
- Background: #0a0a0a (Rich Black)
- Surface: #171717 (Dark Charcoal)
- Primary Accent: Amber-500/600 (Ginga Gold gradient)
- Text: White + neutral-400/500 hierarchy
- Typography: Montserrat (uppercase headers), Inter (body), JetBrains Mono (labels)
- Sharp corners, thin borders, glass-morphism navbar
- Logo: `@assets/Ginga_Soccer_Logo_1772593615133.png` used in Navbar (h-12) and Footer (h-10)

## Auth Flow
- POST /api/auth/register — Create account (blocks "admin" username)
- POST /api/auth/login — Sign in
- POST /api/auth/logout — Sign out
- GET /api/auth/user — Check session (returns 401 if not logged in)
- Booking page requires authentication; shows "Members Only" gate if not logged in
- Admin page checks `user.username === "admin"` for access

## Content Data (Hardcoded)
- Programs: Justplay ($50+tax, 120m), Group ($50+tax, 90m), Turf Rental (from $70, 1h), Private ($175+tax, 2h)
- Camps: March Break ($500+HST, Mar 16-20), Summer ($500/wk+HST, August), Christmas ($300+HST, Dec 28-30)
- Turf Rentals: Full ($150/hr), 3/4 ($100/hr), Mini ($70/hr)
- Policy: "Strict No-Refund Policy — High Performance Commitment"
- PDFs: `/Ginga_2026_Camps_Registration_Form.pdf` and `/Ginga_2026_Programs_Registration_Form.pdf`

## Environment Variables
- `SESSION_SECRET` — Required, server throws if missing
