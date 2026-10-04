# Nabd (نبض) — Clinical Intake AI

A bilingual (English / Arabic) medical AI landing page with early-access waitlist, Clerk authentication, and local PostgreSQL user synchronization.

## Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 (built with CSS logical properties for native RTL)
- **Internationalization**: `next-intl` (`/en` and `/ar` routes)
- **Authentication**: Clerk (with Arabic localization `@clerk/localizations`)
- **Database & ORM**: PostgreSQL 16 (Docker) + Drizzle ORM + Zod

---

## Getting Started

### 1. Environment Variables
Create `.env.local` (or copy `.env.example`):
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://nabd:nabd_local@localhost:5433/nabd
```
*(Clerk sign-in, sign-up, and redirection paths are handled dynamically in code per active locale, so static URL environment variables are not required).*

### 2. Start PostgreSQL
```bash
docker compose up -d
```
*Note: Bound to host port `5433` to prevent collisions with existing local PostgreSQL instances.*

### 3. Apply Database Migrations
```bash
npm run db:migrate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## Verification & Testing

Run the automated smoke test suite to verify database connectivity, schema tables, and endpoint health:
```bash
npm run smoke
```

Run code quality and type check:
```bash
npm run lint
```

### Route Summary
| Route | Access | Description |
|---|---|---|
| `/[locale]` | Public | Bilingual landing page with interactive clinical intake demo |
| `/[locale]/sign-in` | Public | Clerk localized sign-in |
| `/[locale]/sign-up` | Public | Clerk localized sign-up |
| `/[locale]/account` | Protected | Displays clinician data read directly from our local PostgreSQL |
| `POST /api/waitlist` | Public | Zod-validated waitlist submission with duplicate email handling |
| `GET /api/user` | Protected | Authenticated user DB record sync endpoint |

---

## Architecture Highlights

- **Lazy Upsert Pattern**: Rather than managing webhook endpoints (e.g. Svix tunnels in local dev), clinician user records are lazily synchronized into our local PostgreSQL `users` table on first authenticated request. Subsequent reads hit local PostgreSQL directly without duplicate writes or external Clerk API calls.
- **Genuine Bidirectional (RTL) Support**: Layout is styled using CSS logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `start-0`). Directional icons mirror automatically via `rtl:-scale-x-100`, and mixed-direction strings (emails, IDs, dates) use `<bdi>` and `<FormattedDate>`.

---

## What I'd Do Differently in Production

1. **Hybrid Webhook Sync**: Set up a background system to catch updates from Clerk (like when someone deletes an account or changes their email on the Clerk website) and automatically update your own database.
2. **Audit Logging & Encryption**: Encrypt sensitive patient data and maintain a strict audit log of all access, in line with privacy regulations such as HIPAA and GDPR.
3. **Multi-Tenant Organizations**: Implement Clerk Organizations to logically separate and manage users from different hospitals or clinics, ensuring data privacy and compliance.
4. **Native Medical Review**: Engage native Arabic-speaking healthcare professionals to review and refine all medical content, ensuring cultural relevance and clinical accuracy.
