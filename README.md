# NJVolunteens.org

A directory connecting New Jersey high school students with volunteer
opportunities. Organizations list themselves for free and keep their own
listings current via a private edit link — no accounts, no logins.

## What makes it different

- **Self-service listings.** Organizations submit a listing and receive a
  private edit link. Editing refreshes the listing's `last_verified_at`
  date, so freshness is maintained by the people who actually know.
- **Honest hour-eligibility.** Every listing is tagged either "Counts for
  service hours" or "Civic engagement — not hour-eligible." Most political
  and advocacy volunteering does not satisfy NJ school community service
  requirements, and students should know that before they show up.
- **Filters that match how teens search:** county, cause area, their own
  age, hour-eligibility, and whether the org is currently accepting.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Supabase (Postgres) for listings
- Deployed on Netlify, auto-deploying from `main`

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Key | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side secret key. Never exposed to the browser. |
| `NEXT_PUBLIC_SITE_URL` | Base URL used to build organization edit links |

These must also be set in Netlify under Project configuration →
Environment variables. Netlify reads them at **build** time, so changing
one requires a new deploy to take effect.

### Database setup

Run `supabase/schema.sql` once in the Supabase SQL Editor. Then:

```bash
npm run seed
```

`npm run seed` verifies the connection, inserts sample listings, and prints
their edit links for testing. It upserts on `slug`, so re-running it
refreshes the samples instead of duplicating them.

## How listings are moderated

New submissions are saved with `status = 'pending'` and are **not** public.
To approve one, open the `listings` table in the Supabase dashboard and
change `status` to `approved`. Set it to `archived` to retire a listing
without deleting it.

This is deliberately manual — it is the entire anti-spam and quality
system, and it costs about ten seconds per listing.

## Project layout

```
app/
  page.tsx                     home — browse by county / cause
  browse/                      filtered listing search
  listing/[slug]/              public listing detail
  list-your-organization/      submission form
  edit/[token]/                token-authenticated edit page
  resources/                   how NJ schools verify service hours
  api/listings/                POST create; PATCH /[token] update
components/                    FilterBar, ListingCard, ListingForm
lib/                           queries, constants, validation, types
supabase/schema.sql            database schema
scripts/seed.mjs               sample data seeder
```

## Notes

- The edit token is a 24-byte random string. It appears only in the link
  given to the organization — never in any public page or listing.
- The submission endpoint has a honeypot field and a per-IP rate limit
  (5/hour). The rate limit is in-memory, so it resets on redeploy.
