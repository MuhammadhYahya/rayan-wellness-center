# Rayan Wellness Website

This repo is the public Next.js website for Rayan's Recovery and Wellness Center. The
application name is `rayanwellness`, and it is deployed on Vercel.

## Project Relationship

- `rayanwellness`: customer-facing website
- `rayan-studio`: separate Sanity Studio repo, deployed with `sanity deploy`
- current GitHub repository slug: `rayan-wellness-center`

The website currently reads CMS content for:

- homepage services
- homepage featured reviews
- `/services`
- `/reviews`

The `contact` route is a working booking flow powered by Web3Forms. The `about` and
`gallery` routes are still mostly presentation content and can be expanded later
without changing the deployment model.

## Environment Variables

Use `.env.local` for local development only.

```bash
SANITY_PROJECT_ID=<your_sanity_project_id>
SANITY_DATASET=production
SANITY_API_VERSION=2026-05-14
SANITY_READ_TOKEN=
SANITY_WRITE_TOKEN=<your_sanity_write_token>
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=<your_web3forms_access_key>
```

Commit only `.env.example`. Do not commit `.env` or `.env.local`.

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deployment

Production target: Vercel

1. Import the repo into Vercel.
2. Add the environment variables from `.env.example`.
3. Deploy first to the generated Vercel URL.
4. After verification, attach the production custom domain.

## Sanity Data Flow

- The frontend reads `service` and `review` documents from the separate Sanity Studio
  repo.
- Sanity read/write integration lives in `lib/sanity/`.
- Website review submissions are created in Sanity as `review` documents with
  `status: "pending"`.
- Only `approved` reviews are shown publicly.
- Only reviews with both `status: "approved"` and `featured: true` appear on the
  homepage.

## GitHub Push Checklist

1. Make sure `.env`, `.env.local`, `.next`, and `node_modules` are not staged.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Confirm the homepage loads services and featured reviews from Sanity.
5. Confirm `/reviews` shows approved reviews and the form only works when
   `SANITY_WRITE_TOKEN` is set.
6. Confirm `/contact` can submit when `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is configured.

## Verification

```bash
npm run lint
npm run build
```

When Sanity content is available, verify:

- services render on the homepage and `/services`
- featured approved reviews rotate on the homepage
- approved reviews render on `/reviews`
- review submissions create pending Sanity entries when `SANITY_WRITE_TOKEN` is
  configured
- Sanity-hosted images load from `cdn.sanity.io`
