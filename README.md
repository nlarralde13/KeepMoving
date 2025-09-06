# KeepMoving
Keep Moving mobile fitness app

Got it ✅ — here’s a full regenerated README.md with the Media section integrated. You can copy-paste this straight into your repo or Google Drive.

⸻


# Keep Moving Fitness Platform

A cross-platform fitness and community app.  
**Phase 1:** Web (Next.js) MVP.  
**Future:** Native iOS + Android (Expo/React Native) using the same UI + API layers.

---

## Vision

The platform provides fitness professionals and their clients with tools for:

- **Client Management**: profiles, notes, history
- **Scheduling**: bookings, availability, calendar sync
- **Payments**: subscriptions, invoices, upsells
- **Communication**: chat, notifications, email
- **Dashboard**: basic reporting + analytics
- **Media**: upload & stream workout videos, images, and files

**Fitness-specific modules** layered on top:

- Workout library & progress tracking
- Nutrition library & macro tracking
- Habit tracking & weekly check-ins

---

## Architecture Overview

### Monorepo Structure (Turborepo)

keep-moving/
├─ apps/
│  ├─ web/                     # Next.js (App Router)
│  └─ mobile/                  # (future) Expo app
├─ services/
│  └─ api/                     # FastAPI + Postgres backend
├─ packages/
│  ├─ ui/                      # Shared RN-compatible components (Tamagui)
│  ├─ schema/                  # Shared validation schemas (Zod)
│  ├─ api-client/              # Generated TS SDK from FastAPI OpenAPI
│  ├─ utils/                   # Helpers (dates, formatting, auth guards)
│  └─ config/                  # Design tokens, tsconfig, lint rules
├─ infra/                      # Docker, deployment configs
└─ .github/workflows/          # CI pipelines

### Tech Stack

- **Frontend (web now, mobile later)**
  - Next.js 14 (App Router) + TypeScript
  - React Query + Zod
  - Tamagui (universal RN-compatible UI)
  - Clerk/Auth0 for authentication
  - Stripe Checkout + Billing Portal
- **Backend**
  - FastAPI + PostgreSQL + SQLAlchemy 2 + Alembic
  - Pydantic models → OpenAPI → generated TypeScript client
  - Redis + RQ/Celery for background jobs (webhooks, digests)
- **Dev Experience**
  - Turborepo workspaces
  - ESLint/Prettier, Ruff/Black
  - pytest + Playwright for tests
  - GitHub Actions CI/CD
- **Infra**
  - Vercel (web), Render/Fly/Railway (API), S3/Supabase (media storage)

---

## Core Feature Modules

### Universal Core
- **Users & Auth**: trainer + client roles
- **Client Management**: CRUD, notes
- **Scheduling**: availability, bookings
- **Payments**: subscriptions, invoices, Stripe integration
- **Communication**: chat, notifications, email
- **Dashboard**: KPIs, activity, adherence
- **Media**: upload & stream workout videos, images, and files

### Fitness Modules
- **Workout Library**: exercises, templates, scheduled workouts, logged sets
- **Nutrition**: foods, meals, macro targets, daily logs
- **Habits**: habit definitions, logs, streaks
- **Check-Ins**: weekly forms (weight, photos, sleep, mood, notes)

---

## Data Model (simplified)

**Core**
- `users` (id, email, name, role)
- `clients` (id, trainer_id, profile info)
- `notes` (id, client_id, author_id, body)
- `bookings` (id, trainer_id, client_id, start_at, end_at, status)
- `subscriptions` (id, client_id, stripe_sub_id, status, plan)
- `media` (id, owner_id, type[video|image|file], url, title, description, tags[], created_at)

**Fitness**
- `exercises`, `workout_templates`, `scheduled_workouts`, `completed_sets`
- `macro_targets`, `meals`
- `habits`, `habit_logs`
- `check_ins`

---

## API Endpoints (starter)

POST /auth/login
GET  /me

Clients

GET  /clients
POST /clients
GET  /clients/{id}
POST /clients/{id}/notes

Scheduling

GET  /availability
POST /bookings

Payments

POST /billing/checkout-session
POST /billing/webhook/stripe

Media

POST /media                 # upload new media
GET  /media                 # list media
GET  /media/{id}            # view metadata
DELETE /media/{id}          # delete media

Fitness

GET  /exercises
POST /workout-templates
POST /scheduled-workouts
POST /completed-sets

---

## Media Architecture Notes

- **Storage**: S3/Supabase bucket (or GCP/Azure equivalent)
- **Upload flow**: signed URL → client uploads directly
- **Metadata**: stored in Postgres (`media` table)
- **Access control**: trainers can share with clients or keep private
- **Streaming**: start with raw file links; later consider Cloudflare Stream or Mux for adaptive streaming + analytics

---

## Development Plan

### Phase 1: Web MVP
- Next.js web app with Clerk/Auth0
- Clients + Notes CRUD
- Bookings CRUD (manual; calendar sync later)
- Stripe Checkout for a single plan
- Dashboard showing today’s workout/habits
- Basic Media upload & playback

### Phase 2: Client Value
- Client home: workouts, habits, meal logs, chat
- Progress tracking: graphs, streaks, volume
- Better media support (categories, playlists, embedded in workouts)

### Phase 3: Integrations & Polish
- Calendar sync (Cronofy/Nylas)
- Billing portal
- Broadcast messaging
- Weekly check-in flow
- Advanced media (adaptive streaming, analytics)

---

## Security & Compliance

- JWT + short-lived sessions
- Row-level access checks
- Audit logging
- If future medical/health data → HIPAA posture (BAAs, encrypted storage, audit trails)

---

## Next Steps

1. Scaffold Turborepo with `apps/web`, `services/api`, `packages/ui/schema/api-client`
2. Set up FastAPI + Postgres with `users`, `clients`, `notes`, `bookings`, `media`
3. Generate `api-client` from OpenAPI
4. Build Next.js web MVP: Clients, Notes, Bookings, Stripe Checkout, Media upload
5. Deploy API (Render/Fly) + Web (Vercel)
6. Dogfood with test users, collect feedback
7. Add workouts, habits, nutrition modules
8. When ready: add `apps/mobile` with Expo, reuse UI + API layers

---

## License

TBD

