# Setup

## Prerequisites

- Node.js
- A MongoDB instance (Atlas or local)
- A Redis instance (used for rate limiting via `ioredis`)
- SMTP credentials for outbound email (OTPs, password reset)

## Environment variables (`.env.local`)

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `REDIS_URL` | Redis connection string |
| `AUTH_SECRET` | NextAuth secret; also used to HMAC-hash OTP codes |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP server port |
| `SMTP_SECURE` | `true`/`false` — use TLS |
| `SMTP_USER` | SMTP auth username |
| `SMTP_PASS` | SMTP auth password |
| `SMTP_FROM` | From address for outbound mail |

## Install & run

```bash
npm install
npm run setup-db   # creates Mongo collections + indexes (scripts/setupDatabase.js)
npm run dev        # start dev server on localhost:3000
```

## Other scripts

```bash
npm run test-db     # verify Mongo connectivity (scripts/testConnection.js)
npm run seed-demo   # seed demo data (scripts/seedDemo.js)
npm run build        # production build
npm run start        # run production build
npm run lint          # eslint
```
