# JEMS — Project Brain

Single-file context dump for this repo. For split-out reference docs see
[`docs/`](./docs/README.md) (setup, architecture, database, auth, API).

## What this is

JEMS is a career-platform web app connecting **students** and **companies**:
students build resumes, apply to jobs, do mock interviews, and follow
learning paths; companies post jobs and review/match candidates. Built with
Next.js App Router, MongoDB, Redis, NextAuth v5.

## Tech stack

- Next.js 16.2.9 (App Router), React 19.2.4, TypeScript
- MongoDB (`mongodb` driver, no ORM) — primary datastore
- Redis (`ioredis`) — rate limiting only, not durable data
- NextAuth v5 (beta) — credentials + GitHub OAuth
- Tailwind CSS 4, shadcn, `@base-ui/react`, lucide-react icons
- Nodemailer — transactional email (OTPs, password reset)

⚠️ **Read `AGENTS.md` before writing Next.js code** — this project pins a
Next.js version whose APIs/conventions may diverge from an LLM's training
data. Check `node_modules/next/dist/docs/` for the real behavior before
assuming.

## Current repo state (as of this writing)

Working tree has uncommitted changes on `main` — signup flow and OTP
verification are mid-development:

- New, not yet committed: `app/api/auth/send-signup-otp/`,
  `app/api/auth/verify-signup-otp/`, `lib/db/signup-otp.ts`, `docs/`
- Modified: most of `components/signup/*`, `components/resume/ResumeBuilder.tsx`,
  `components/GithubButton.tsx`, `lib/email/templates.ts`,
  `scripts/setupDatabase.js`, `app/globals.css`

Recent commit history (newest first): `ui changes` → `some cahnges` →
`password recovery` → `sb created` → `sb created` → initial Next.js
scaffold commits. No PRs/branches — everything lands on `main` directly.

## Data model (MongoDB, db `jems_production`)

Core collections: `users`, `studentProfiles`, `companyProfiles`, `resumes`,
`jobPostings`, `jobApplications`, `savedJobs`, `candidateMatches`,
`mockInterviews`, `learningPaths`, `scheduledInterviews`, `activityLogs`,
`notifications`, `studentAnalytics`, `companyAnalytics`, `feedback`.

Ephemeral, self-expiring (TTL index on `expiresAt`): `signupOtps`,
`passwordResets` — both store only an HMAC-SHA256 digest of the code, never
plaintext.

`users` doc shape (`lib/db/users.ts`): `{ name, email, role: "student"|"company",
authProvider: "credentials"|"github", passwordHash?, image?, phone?,
emailVerified?, createdAt, updatedAt }`. Creating a student also inserts a
paired `studentProfiles` doc (`userId` FK). GitHub OAuth sign-in
auto-upserts a `users` row via `upsertGithubStudent`.

Full collection/index list → [`docs/DATABASE.md`](./docs/DATABASE.md).

## Auth flows

1. **Credentials signup**: multi-step UI (`components/signup/SignupShell.tsx`
   + `StepCarousel.tsx`) → email OTP verification
   (`send-signup-otp` / `verify-signup-otp`, 10-min TTL, 5 attempts max) →
   `POST /api/register` creates the account. Passwords are strength-checked
   (`components/signup/password.ts`) and hashed (`lib/auth/password.ts`)
   before storage.
2. **GitHub OAuth**: `components/GithubButton.tsx` → NextAuth →
   `upsertGithubStudent` (always role `student`, `emailVerified` set
   immediately).
3. **Password reset**: mirrors the signup-OTP pattern via
   `lib/db/password-reset.ts` and `/api/auth/forgot-password` →
   `verify-reset-otp` → `reset-password`.

Details → [`docs/AUTH.md`](./docs/AUTH.md).

## Security conventions to preserve

These patterns are deliberate — keep them when touching this code:

- **NoSQL injection guard**: every value pulled from a JSON body is coerced
  to a primitive (`String(x ?? "")`, local `asString` helpers) *before* it
  touches a Mongo query or gets used anywhere else. Never pass raw
  `unknown`/body values straight into a `find`/`updateOne` filter.
- **OTP/reset codes are HMAC-SHA256 digests** (keyed by `AUTH_SECRET`),
  compared with `crypto.timingSafeEqual` — never store or log plaintext
  codes beyond the outbound email.
- **Rate limiting** (`lib/rate-limit.ts`) on abuse-prone endpoints
  (register, OTP send/verify, password reset), keyed by `clientIp(request)`.
  Redis-backed with an automatic per-process in-memory fallback if Redis is
  unreachable — the app must never hard-fail because Redis is down.
- **Bounded body parsing**: `lib/http.ts: readJsonLimited` caps request body
  size on every route handler.

## Environment variables (`.env.local`)

`MONGODB_URI`, `REDIS_URL`, `AUTH_SECRET`, `SMTP_HOST`, `SMTP_PORT`,
`SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`. Full detail →
[`docs/SETUP.md`](./docs/SETUP.md).

## Scripts

```bash
npm run dev         # dev server
npm run setup-db     # idempotent: create Mongo collections + indexes
npm run test-db       # connectivity check
npm run seed-demo      # seed demo data
npm run build / start / lint
```

## Open threads / things to watch

- Signup + OTP verification components are all mid-edit and uncommitted —
  don't assume the flow in `docs/AUTH.md` is fully wired end-to-end in the
  UI until this lands.
- `docs/` was just added and is not yet linked from the root `README.md`
  (which is still the default `create-next-app` boilerplate).
- No test suite currently exists in the repo (no `test` script beyond
  `test-db`, which only checks DB connectivity).
