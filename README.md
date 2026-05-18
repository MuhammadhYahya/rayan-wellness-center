# Rayan Wellness Website

This repo is the public Next.js website for Rayan's Recovery and Wellness Center. The application name is `rayanwellness`, and it is deployed on Vercel.

## Project Relationship

- `rayanwellness`: customer-facing website
- `rayan-studio`: separate Sanity Studio repo, deployed with `sanity deploy`
- current GitHub repository slug: `rayan-wellness-center`

The website currently reads CMS content for:

- homepage services
- homepage testimonials
- `/services`

The `about`, `contact`, and `gallery` routes are still placeholder pages and can be expanded later without changing the deployment model.

## Environment Variables

Use `.env.local` for local development only.

```bash
SANITY_PROJECT_ID=<your_sanity_project_id>
SANITY_DATASET=production
SANITY_API_VERSION=2026-05-14
# Optional for private datasets or preview work
SANITY_READ_TOKEN=
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
2. Add the Sanity environment variables from `.env.example`.
3. Deploy first to the generated Vercel URL.
4. After verification, attach the production custom domain.

## Content Source

The frontend expects `service` and `testimonial` document types from Sanity. Query and client code live under `lib/sanity/`.

Schema reference files are kept in `sanity/schemas/` so the content contract remains visible from the website repo.

## Verification

```bash
npm run lint
npm run build
```

When Sanity content is available, verify:

- services render on the homepage and `/services`
- testimonials rotate on the homepage
- Sanity-hosted images load from `cdn.sanity.io`
