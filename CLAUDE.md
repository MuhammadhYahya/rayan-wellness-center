@AGENTS.md

# Project Context — Rayan's Recovery & Wellness Center SEO Engagement

This is the website for **Rayan's Recovery & Wellness Center**, a wellness/massage/yoga
business in Keeranthidiya, Sri Lanka (rayanwellness.com). Read this before doing any
SEO or website work here so you don't need to be re-briefed each month.

## Engagement basics

- **Developer & SEO provider:** Yahya (built this Next.js site; also running the client's SEO).
- **Client contact:** Rayan Vidumina Jayamanna, owner.
- **Business:** Sports massage, deep tissue, hot stone, Swedish, Thai massage therapy, Hawaiian
  Lomi Lomi, reflexology, and Hatha yoga. Target audience: athletes
  needing recovery, people with muscle tension, wellness/holistic-health seekers, local to
  Keeranthidiya / Sri Lanka.
- **SEO contract:** LKR 10,000/month, first 3 months = September, October, November 2026.
  Payable monthly in advance, by the 5th of each month. Total LKR 30,000 for the 3 months.
  Ongoing monthly support beyond Nov 2026 to be discussed based on results.
- **Proposal doc:** `D:\yahya\rayan\seo\Rayan_Wellness_SEO_Proposal_Sept-Nov2026.docx` — the
  client-facing plan. Written in plain, non-technical language on purpose: the client does
  not know SEO terminology, so explain things simply when reporting to them.
- This is Yahya's first SEO client/engagement — keep monthly scope realistic rather than
  packing too much into one month.

## Tech stack

- Next.js (App Router) + TypeScript, deployed on Vercel.
  - Vercel team: "yahya's projects" (`team_tyoJ0hbJSWSjHJHGupC6bt4r`), project `rayanwellness`
    (`prj_4K80VLMgZcDwuODvMy1NOGUIbWxt`). Note: this project has NOT been reachable via the
    Vercel MCP connector in past sessions (returned 404 / didn't list) — may need the
    dashboard directly, or a different linked Vercel account.
- Content/reviews backed by Sanity CMS (`sanity/` folder, `SANITY_*` env vars).
- Pages: `/`, `/about`, `/services`, `/gallery`, `/reviews`, `/contact`. Reviews page already
  has its own review collection system (Sanity-backed submission form + approved reviews
  display) — the client already gets reviews both on-site and on Google, so "set up reviews"
  is not a real Month-3 task; growing **Google** reviews specifically (for local ranking) is.

## SEO status (update this as work progresses)

Done before the paid engagement (free, since Yahya built the site):
- `app/robots.ts` and `app/sitemap.ts` — dynamic robots.txt / sitemap.xml, working.
- Site-wide `<title>`/description in `app/layout.tsx` (not yet unique per page — that's a
  planned Month 1 task).
- Google Search Console connected (property `sc-domain:rayanwellness.com`), sitemap
  submitted and processed, 4 pages indexed as of Aug 2026.
- Found a duplicate-URL issue: rayanwellness.com had multiple address variants
  (http/https, www/non-www) instead of one canonical `https://www.rayanwellness.com`.

Fixed so far (during the paid engagement):
- Added `metadataBase` + `alternates.canonical` to `app/layout.tsx`.
- Added a host-based redirect in `next.config.ts` sending `rayanwellness.com` →
  `https://www.rayanwellness.com`. **Deployed and confirmed working** (Yahya tested all
  address variants in his own browser, Aug 2026) — DONE, no need to redo. Search Console's
  "Page with redirect" entries should clear over the following weeks as Google re-crawls;
  worth a quick check in a few weeks but not an active task.
- Google Analytics (GA4) is NOT set up yet — `@vercel/analytics/next` import in
  `layout.tsx` is commented out. This is a planned Month 1 task.
- **Unique per-page titles/descriptions — DONE.** `app/layout.tsx` now uses a
  `title.default` + `title.template` pattern ("%s | Rayan's Recovery & Wellness Center").
  Each page (`services`, `about`, `gallery`, `reviews`, `contact`) exports its own
  `metadata` with a page-specific title/description built around real page content and
  the target keywords (massage, yoga, Thai massage, Matugama/Keeranthidiya, Sri Lanka). Needs
  deploy to go live, then re-check in Search Console after Google re-crawls.

Not started yet: keyword research (beyond what informed the titles above), basic
speed/mobile check, GA4 setup, Google Business Profile setup, local directory listings,
backlinks, content pieces.

## Monthly plan (from the proposal)

- **Month 1 (Sept 2026) — Fix & Fine-Tune the Foundation:** canonical redirect fix, unique
  page titles/descriptions, basic speed/mobile check, keyword research, turn on GA4, first
  progress update.
- **Month 2 (Oct 2026) — Get Found Locally:** full Google Business Profile setup, image alt
  text, internal linking, local directory listings, second progress update.
- **Month 3 (Nov 2026) — Build Trust & Review Results:** 1-2 content pieces, grow Google
  reviews specifically, feature best reviews on homepage, a couple of local backlinks,
  full 3-month review.

## Reporting

End-of-month client updates must stay in plain, non-technical language — translate SEO
jargon (meta description, canonical URL, backlink, etc.) into what it means for the
business, e.g. "how many people found you through Google search."
