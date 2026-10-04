# AGENTS.md

## Project Overview

This repository is a time-boxed take-home project for a medical AI landing page called **Nabd** ("pulse").

Nabd is an AI assistant that turns patient intake conversations into structured, clinician-ready summaries before a visit.

The implementation must remain focused on the approved deliverables. Do not introduce additional product features or unnecessary infrastructure.

---

# 1. Approved Scope

The project consists of exactly these deliverables:

1. Homepage for the invented medical AI product
2. Waitlist form:
   - Name
   - Email
   - Own backend endpoint
   - PostgreSQL persistence
3. Clerk sign-up/sign-in using pre-built Clerk components
4. Protected page displaying:
   - User email
   - Sign-up date
   - Data must come from our own PostgreSQL database through our own backend
   - Do not read these values directly from the Clerk client session
5. EN/AR language toggle on all pages
6. Genuine RTL mirroring for Arabic
7. README containing:
   - Setup instructions
   - Environment variables
   - Own Clerk test project instructions
   - Short "what I'd do differently" note

The project is time-boxed. Prefer simple, clear solutions over elaborate abstractions.

---

# 2. Explicitly Out of Scope

Do NOT add:

- Security hardening beyond fixing fundamental security defects
- Additional product features
- Dashboards
- Analytics
- Email sending
- Extensive automated test suites
- Unrequested integrations
- Admin panels
- Production infrastructure
- Unnecessary state-management libraries
- Unnecessary API layers
- Unnecessary abstractions

The approved plan explicitly keeps these outside the scope.

If a requested change expands scope, explain the trade-off before implementing it.

---

# 3. Technology Stack

Use the following architecture unless there is a compelling reason documented in the code/review:

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- Clerk
- `@clerk/localizations`
- `next-intl`
- Drizzle ORM
- PostgreSQL
- Docker Compose
- Zod
- `next/font`

Backend functionality should use Next.js route handlers.

Do not introduce another backend framework.

---

# 4. Architecture

## Application

Use the Next.js App Router.

Prefer:

- Server Components by default
- Client Components only when client-side interaction/state is required
- Route handlers for backend endpoints
- Shared layouts for common UI
- Centralized translation messages
- Server-side authentication checks for protected resources

Avoid turning large parts of the application into Client Components unnecessarily.

---

# 5. Database

Use:

- PostgreSQL
- Docker PostgreSQL 16
- Drizzle ORM
- SQL migrations

## Waitlist

The `waitlist_entries` table should contain:

- `id` — UUID
- `name`
- `email`
- `locale`
- `created_at`

Email must be stored lowercased.

Email must be unique.

The waitlist endpoint should use:

- Zod validation
- Database uniqueness
- `ON CONFLICT DO NOTHING`

A duplicate email should result in a friendly success response rather than an application error.

## Users

The `users` table should contain:

- `id` — UUID
- `clerk_id` — unique
- `email`
- `created_at`

User synchronization uses **lazy upsert on the first authenticated request**.

Do not add a Clerk webhook unless explicitly requested.

---

# 6. Authentication

Use Clerk's pre-built components:

- `<SignUp />`
- `<SignIn />`

Routes should exist under:

- `/[locale]/sign-up`
- `/[locale]/sign-in`

Use `ClerkProvider`.

When Arabic is selected, use the Arabic Clerk localization.

Authentication must be enforced server-side where protected data is accessed.

Never trust client-provided user IDs or emails for authorization.

---

# 7. Protected User Page

The protected page must show:

- User email
- Sign-up date

These values must be retrieved from:

**Authenticated Clerk identity → our backend → our PostgreSQL users table**

Do NOT use the Clerk client session as the source of truth for the displayed database record.

The user's Clerk ID should be used to identify their corresponding database record.

Do not expose another user's data.

---

# 8. Internationalization

Use `next-intl`.

Supported locales:

- `en`
- `ar`

Routes should use:

```text
/[locale]
```

Translations belong in:

```text
messages/en.json
messages/ar.json
```

All user-facing copy must come from translation resources.

Do not hardcode user-facing English or Arabic strings inside components unless there is a specific technical reason.

---

# 9. RTL Requirements

Arabic must have genuine RTL support.

The root HTML element must receive the correct:

- `lang`
- `dir`

Use logical CSS/Tailwind utilities wherever possible:

- `ms-*`
- `me-*`
- `ps-*`
- `pe-*`
- `text-start`
- `start-*`

Avoid writing separate LTR/RTL styles when a logical utility can solve the problem.

Directional icons such as arrows and chevrons should mirror where appropriate.

For example:

```text
rtl:-scale-x-100
```

Do not simply change text alignment and call the application RTL-compatible.

---

# 10. Mixed Direction Content

Arabic UI can contain:

- Emails
- Dates
- Numbers
- IDs
- Other Latin-direction content

Use `<bdi>` or an appropriate `dir="ltr"` wrapper when necessary.

Example:

```tsx
<bdi>{email}</bdi>
```

Dates must use locale-aware formatting:

```ts
Intl.DateTimeFormat(locale)
```

Do not manually construct localized dates.

---

# 11. Middleware

Middleware must correctly compose:

- `next-intl`
- Clerk middleware

Do not create conflicting middleware implementations.

Verify that:

- Locale routing works
- Authentication works
- Protected routes remain protected
- EN/AR navigation works
- Sign-in/sign-up routes work correctly

---

# 12. Design System

The visual direction is:

- Calm clinical aesthetic
- Deep teal
- Warm off-white
- One coral accent
- Latin font + Arabic font
- Pulse-line visual motif

Use:

- Inter or an equivalent Latin font
- IBM Plex Sans Arabic or an equivalent Arabic font
- `next/font`

Tailwind design tokens should be centralized.

Avoid scattering arbitrary color values and spacing values throughout the application.

---

# 13. Landing Page

The landing page should contain:

1. Hero
2. Headline
3. Supporting copy
4. Waitlist CTA
5. Three feature cards
6. How-it-works section with three steps
7. Waitlist section
8. Footer

All copy must exist in both languages.

Arabic copy should be genuine content, not placeholder machine-generated text.

The README should flag Arabic copy for native review.

The page should be responsive and mobile-first.

---

# 14. Waitlist Form

The waitlist form contains:

- Name
- Email

Required states:

- Idle
- Loading
- Success
- Error

Validation should happen using Zod on the backend.

Client-side validation may be used for UX but must not replace server-side validation.

The API should be:

```text
POST /api/waitlist
```

A successful submission should write a row to PostgreSQL.

Duplicate emails should not cause an unfriendly error.

---

# 15. Code Quality Rules

## Readability

Prefer:

- Descriptive names
- Small focused functions
- Small focused components
- Straightforward control flow
- Explicit types
- Minimal nesting

Avoid:

- Clever one-liners that reduce clarity
- Giant components
- Deeply nested conditionals
- Unnecessary abstractions
- Unexplained magic values

---

## Maintainability

Keep responsibilities separated.

For example:

- UI components handle presentation
- Validation handles input validation
- Route handlers handle HTTP concerns
- Database modules handle persistence
- Authentication logic handles identity
- Translation files handle localized copy

Do not mix database queries directly into unrelated UI components.

Avoid duplication when the duplicated behavior is genuinely shared.

Do not create abstractions merely for theoretical future requirements.

---

# 16. Reliability

Every important flow should handle reasonable failure cases.

Pay particular attention to:

- Database failures
- Invalid form input
- Duplicate waitlist submissions
- Missing users
- Authentication failures
- Missing environment variables
- Network failures
- Locale switching
- Unexpected null/undefined values

Do not silently swallow errors.

Errors shown to users should be useful but must not expose secrets or internal implementation details.

---

# 17. Performance

Prefer simple, efficient implementations.

Check:

- Server vs. Client Component usage
- Unnecessary client JavaScript
- Duplicate API calls
- Duplicate database queries
- Unnecessary re-renders
- Font loading
- Bundle size
- Middleware overhead

Do not introduce caching, state-management systems, or optimization layers without a demonstrated need.

Avoid premature optimization.

---

# 18. Security

Security hardening is not a primary deliverable, but fundamental vulnerabilities must still be fixed.

Always protect against:

- SQL injection
- Unauthorized access
- IDOR
- Trusting client-provided identity
- Exposing secrets
- Unsafe redirects
- XSS where applicable
- Sensitive information in error messages

Authentication and authorization must be checked on the server.

Environment secrets must never be exposed to the browser unless intentionally public.

Do not commit `.env` secrets.

---

# 19. Accessibility

Use semantic HTML.

Forms must have:

- Proper labels
- Accessible inputs
- Useful validation messages
- Keyboard accessibility

Interactive elements must be usable without a mouse.

Do not use ARIA when semantic HTML already provides the correct behavior.

Ensure language and direction attributes are correct.

---

# 20. TypeScript

Prefer strict, explicit typing.

Avoid:

```ts
any
```

unless there is a documented reason.

Do not use type assertions to hide actual type problems.

Prefer narrowing and proper types.

Types should describe actual domain/data structures.

---

# 21. React Rules

Prefer Server Components.

Use Client Components only where needed for:

- Form interaction
- Local UI state
- Browser APIs
- Event handlers
- Interactive controls

Avoid unnecessary:

```tsx
"use client"
```

Avoid unnecessary `useEffect`.

Do not use effects for computations that can happen during rendering.

Use stable keys when rendering lists.

---

# 22. API Rules

Route handlers must:

- Validate incoming data
- Return appropriate HTTP status codes
- Avoid exposing internal errors
- Keep database operations server-side
- Have predictable response structures

Do not trust:

- Client-provided user IDs
- Client-provided authentication claims
- Client-provided authorization information

---

# 23. Environment Variables

Maintain:

```text
.env.example
```

Document all required variables.

Never commit real secrets.

Separate public variables from server-only secrets.

Server secrets must not be exposed through `NEXT_PUBLIC_*`.

---

# 24. Dependencies

Before adding a dependency, ask:

1. Is it actually required?
2. Can the existing stack solve the problem?
3. Does it materially increase complexity?
4. Is it justified for this time-boxed project?

Avoid adding libraries for trivial functionality.

---

# 25. Testing

The approved scope requires only a smoke-check level of testing.

At minimum verify:

### Application

- App starts successfully
- Landing page loads
- EN works
- AR works
- RTL works
- Language switching works

### Waitlist

- Valid submission succeeds
- Data reaches PostgreSQL
- Invalid input is rejected
- Duplicate email behaves correctly

### Authentication

- Sign-up works
- Sign-in works
- Protected page rejects unauthenticated users
- Authenticated user sees their own database-backed information

### Database

- Migrations run
- Tables are created
- User upsert works
- Waitlist insertion works

Do not build an extensive automated testing framework unless explicitly requested.

---

# 26. Documentation

README must document:

- Project overview
- Prerequisites
- Installation
- Environment variables
- Starting PostgreSQL
- Running migrations
- Starting development server
- Clerk setup
- Clerk test project
- Available scripts
- EN/AR behavior
- Short "what I'd do differently" section

Documentation should describe the actual implementation, not an intended future architecture.

---
# 27. Change Management Rules

Before making a change:

1. Understand the existing implementation.
2. Check whether the change is within approved scope.
3. Prefer the smallest correct change.
4. Avoid unrelated refactoring.
5. Preserve existing behavior unless the behavior is explicitly wrong.
6. Run the relevant smoke checks after the change.
7. Update documentation when behavior/configuration changes.

Do not rewrite working code simply because you prefer a different style.

---

# 28. Definition of Done

A feature is complete when:

- It satisfies the approved plan.
- It works in both EN and AR where applicable.
- RTL behavior is correct.
- It handles normal failure cases.
- It does not introduce obvious security vulnerabilities.
- It does not unnecessarily expand the architecture.
- It follows the existing project's conventions.
- Relevant smoke checks pass.
- Documentation is updated when necessary.

---

# 29. Agent Behavior

When working on this repository:

**DO**

- Keep changes focused.
- Follow the approved architecture.
- Prefer simple solutions.
- Reuse existing utilities and components.
- Validate assumptions against the codebase.
- Call out uncertainty.
- Fix root causes rather than symptoms.
- Preserve the time-boxed nature of the project.

**DO NOT**

- Add features that were not requested.
- Build production infrastructure.
- Introduce unnecessary libraries.
- Add dashboards or analytics.
- Add email functionality.
- Build extensive test infrastructure.
- Perform broad refactors unrelated to the task.
- Replace Clerk with another auth system.
- Replace Drizzle/PostgreSQL with another database solution.
- Remove EN/AR or simplify RTL requirements.
- Read protected user data directly from the Clerk client session.

---

# 30. Priority Order

When trade-offs are necessary, prioritize:

1. Correctness
2. Security fundamentals
3. Approved requirements
4. Reliability
5. Accessibility
6. Readability
7. Maintainability
8. Performance optimization
9. Optional improvements

The goal is a **small, correct, understandable take-home project**, not an over-engineered production platform.