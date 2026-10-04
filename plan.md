## Approved Plan:
# Plan: Medical AI Landing Page, Waitlist, Clerk Auth (EN/AR)

## Context
Time-boxed take-home. Deliverables, and nothing beyond them:
1. Homepage for an invented medical AI product
2. Waitlist form (name, email) -> own backend endpoint -> Postgres
3. Clerk sign-up/sign-in using pre-built components
4. Protected page showing email + sign-up date, read from our own Postgres via our own backend (user record created by us, not read from Clerk client session)
5. EN/AR toggle on all pages, with genuine RTL mirroring
6. README (setup, env vars, own Clerk test project) + short "what I'd do differently" note

Out of scope: security hardening, extra product features, dashboards, tests beyond a smoke check, analytics, email sending.

## Decisions (confirmed)
- Architecture: Next.js (App Router) full-stack, route handlers as backend
- User sync: lazy upsert on first authenticated request (no webhook)
- DB: Docker Postgres + Drizzle ORM with SQL migrations
- Product concept: proposed by me, see Phase 1 (needs your approval)

## Phase 0: Scaffold and tooling
- `create-next-app` (TypeScript, Tailwind, App Router, src dir)
- Add deps: `@clerk/nextjs`, `@clerk/localizations`, `drizzle-orm`, `drizzle-kit`, `pg`, `next-intl`, `zod`
- `docker-compose.yml` with Postgres 16, `.env.example`, npm scripts (`db:generate`, `db:migrate`, `dev`)
- Output: app boots, Postgres runs via `docker compose up -d`

## Phase 1: Product concept and design system
- Concept (proposal): **Nabd** (Arabic for "pulse"), an AI assistant that turns patient intake conversations into structured, clinician-ready summaries before the visit
- Visual identity: calm clinical palette (deep teal + warm off-white + one coral accent), one Latin font and one Arabic font (e.g. Inter + IBM Plex Sans Arabic via `next/font`), pulse-line motif as inline SVG
- Tailwind tokens in one place; use **logical utilities only** (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `start-0`) so RTL needs no overrides
- Output: tokens, fonts, layout shell (header with logo, language toggle, auth buttons; footer)

## Phase 2: i18n and RTL foundation (done early so every later page inherits it)
- `next-intl` with `[locale]` route segment (`/en`, `/ar`), messages in `messages/en.json` and `messages/ar.json`
- `<html lang dir>` set from locale in the root layout
- Language toggle component: swaps locale while preserving the current path
- Clerk: pass `arSA` localization from `@clerk/localizations` when locale is `ar`
- Mixed-direction handling: wrap emails/dates/numbers in `<bdi>` or `dir="ltr"` spans so an email renders correctly inside Arabic text; format dates with `Intl.DateTimeFormat(locale)`
- Mirror directional icons (arrows, chevrons) with `rtl:-scale-x-100`
- Middleware: compose `next-intl` middleware with `clerkMiddleware`

## Phase 3: Landing page
- Sections: hero (headline, subcopy, CTA to waitlist), 3 feature cards, how-it-works (3 steps), waitlist section, footer
- All copy in both languages from message files (real Arabic copy, not machine placeholder; flag for native review in README)
- Responsive, mobile first

## Phase 4: Waitlist (form + endpoint + table)
- Drizzle schema `waitlist_entries`: `id` (uuid), `name`, `email` (unique, lowercased), `locale`, `created_at`
- `POST /api/waitlist`: zod validation, insert, `ON CONFLICT DO NOTHING` so duplicate email returns a friendly success rather than an error
- Client form component: name + email, loading/success/error states, localized validation messages
- Output: submitting writes a row; verify in psql

## Phase 5: Clerk auth and DB-backed user page (the part to explain well)
- Clerk setup: `ClerkProvider`, pre-built `<SignUp />` and `<SignIn />` on `/[locale]/sign-up` and `/[locale]/sign-in`, env vars for URLs
- Drizzle schema `users`: `id` (uuid), `clerk_id` (unique), `email`, `created_at