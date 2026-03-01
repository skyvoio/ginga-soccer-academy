# Ginga Soccer Academy - gingasoccer.ca

## Overview
Premium soccer training academy website with a "Midnight Pitch" dark design aesthetic inspired by Equinox, Adidas, and SL Benfica. Located at 1197 Unit 5 Union Street, Kitchener, Ontario.

## Tech Stack
- **Frontend**: React 18 + TypeScript, Tailwind CSS, Framer Motion, Wouter (routing)
- **Backend**: Express.js with Passport.js (local strategy) for authentication
- **Storage**: In-memory (MemStorage) for user accounts
- **Styling**: Dark theme with amber/gold (#F5B041) accent, Montserrat for display text, Inter for body

## Architecture
- `client/src/pages/` — Home, Programs, GingaMax, Schedule, Booking, Login
- `client/src/components/` — Navbar, Footer, shadcn UI components
- `client/src/hooks/useAuth.ts` — Authentication hook using TanStack Query
- `server/routes.ts` — Auth API routes (register, login, logout, user check)
- `server/storage.ts` — In-memory user storage

## Key Features
- Full-screen hero with immersive imagery
- Programs page with training, camps, and turf rentals
- GingaMax performance training page
- Weekly schedule grid
- Auth-gated booking wizard (4-step: Select → Verify → Register/Download → Payment)
- Player card with mock stats shown after login
- Mobile-responsive design with animated mobile menu

## Design System ("Midnight Pitch")
- Background: #0a0a0a (Rich Black)
- Surface: #171717 (Dark Charcoal)
- Primary Accent: Amber-500/600 (Ginga Gold gradient)
- Text: White + neutral-400/500 hierarchy
- Typography: Montserrat (uppercase headers), Inter (body), JetBrains Mono (labels)
- Sharp corners, thin borders, glass-morphism navbar

## Auth Flow
- POST /api/auth/register — Create account
- POST /api/auth/login — Sign in
- POST /api/auth/logout — Sign out
- GET /api/auth/user — Check session (returns 401 if not logged in)
- Booking page requires authentication; shows "Members Only" gate if not logged in

## Content Data (Hardcoded)
- Programs: Private ($175+tax), Group ($50+tax), Just Play ($50+tax), GingaMax ($50+tax)
- Camps: March ($500), Summer ($500/wk), December ($500) — No August
- Turf Rentals: Full ($150/hr), 3/4 ($100/hr), Mini ($70/hr)
- Policy: "Strict No-Refund Policy — High Performance Commitment"
