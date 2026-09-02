# API Reference

All routes are Next.js App Router route handlers under `app/api/`.

| Route | Methods | Purpose |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth session, login, sign-out |
| `/api/auth/send-signup-otp` | POST | Issue an email-verification OTP during signup |
| `/api/auth/verify-signup-otp` | POST | Verify a signup OTP |
| `/api/auth/forgot-password` | POST | Issue a password-reset OTP |
| `/api/auth/verify-reset-otp` | POST | Verify a password-reset OTP |
| `/api/auth/reset-password` | POST | Set a new password after OTP verification |
| `/api/register` | POST | Create a student account (rate-limited: 5/IP/10min) |
| `/api/account` | — | Account management |
| `/api/student/profile` | — | Student profile read/update |
| `/api/student/resume` | — | Resume data read/update |

## Conventions

- Request bodies are parsed with `readJsonLimited` (`lib/http.ts`), which
  caps body size and returns a typed `{ error, status }` on failure.
- Every field pulled from a JSON body is coerced to a primitive (usually via
  a local `asString` helper) before being used in a DB query or business
  logic — never pass raw `unknown` values into a Mongo filter.
- Sensitive endpoints call `rateLimit(key, limit, windowMs)`
  (`lib/rate-limit.ts`, backed by Redis) keyed by `clientIp(request)`, and
  return `tooManyRequests(retryAfter)` on 429.
