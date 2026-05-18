# Frontend Sanity Reference

This folder documents the content model expected by the `rayanwellness` website.

## Current Document Types

- `service`
- `testimonial`

These files are plain schema-shaped exports so the website repo can show the expected content contract without bundling Sanity Studio code into production.

## Studio Sync Rule

The matching Studio implementation belongs in the published `rayan-studio` repo. In the current local workspace it lives under `rayan-recovery-and-wellness-center/schemaTypes/`.

If you change field names or required fields here, keep the Studio schemas and frontend queries in sync.

## Frontend Environment

Use these values in `.env.local`:

```bash
SANITY_PROJECT_ID=<your_sanity_project_id>
SANITY_DATASET=production
SANITY_API_VERSION=2026-05-14
SANITY_READ_TOKEN=
```
