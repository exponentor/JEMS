# Database

MongoDB database name: `jems_production` (see `scripts/setupDatabase.js`).

## Collections & indexes

| Collection | Indexes |
|---|---|
| `users` | `email` (unique), `role` |
| `studentProfiles` | `userId` (unique), `targetRole` |
| `companyProfiles` | `userId` (unique) |
| `resumes` | `studentId`, `atsScore` |
| `jobPostings` | `companyId`, `status` |
| `jobApplications` | `studentId`, `jobId`, `(studentId, jobId)` unique |
| `savedJobs` | `studentId`, `jobId` |
| `candidateMatches` | `jobId`, `studentId`, `matchScore` (desc) |
| `mockInterviews` | `studentId` |
| `learningPaths` | `studentId` |
| `scheduledInterviews` | `studentId` |
| `activityLogs` | `userId` |
| `notifications` | `userId` |
| `passwordResets` | `email` (unique); `expiresAt` TTL index (auto-deletes expired docs) |
| `signupOtps` | `email` (unique); `expiresAt` TTL index (auto-deletes expired docs) |

Collections created with no indexes beyond `_id`: `studentAnalytics`,
`companyAnalytics`, `feedback`.

## Ephemeral / short-lived collections

- **`signupOtps`** — one active OTP per email (`lib/db/signup-otp.ts`). Code
  is stored as an HMAC-SHA256 digest, 10-minute TTL, max 5 verify attempts.
- **`passwordResets`** — mirrors the same pattern for the forgot-password
  flow (`lib/db/password-reset.ts`).

Both rely on MongoDB's TTL index (`expireAfterSeconds: 0` on `expiresAt`) to
self-clean rather than a cron job.

## Redis

Used only for rate limiting (`lib/redis.ts`, `lib/rate-limit.ts`) — no
durable data is stored there.

## Setup

Run `npm run setup-db` (`scripts/setupDatabase.js`) to create all
collections and indexes idempotently. Safe to re-run.
