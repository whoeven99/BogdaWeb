# Guides integration validation — 2026-09-16

## Scope verified

- Unified canonical task URLs at `/guides/{id}/`; no content-type segment.
- Existing localization/function-scenario guide routes retained. Guides hub and navigation now cover tasks and workflows.
- How-to, Workflow and Question templates share an outcome-oriented structure; problem/error templates remain available for targeted use.
- Optional Spark panel has prerequisites, execution scope, confirmation points, expected result, task text, copy button and installation CTA. Specific capability evidence is required.
- Spark English and Chinese positioning now describes goal-driven planning and execution, based on the product owner's description. Specific unsupported integrations have not been added as claims.
- Five real title signals still form three problems. Three editable scaffolds are present; none is published. Source dates, demand and task-specific Spark capability are unverified.

## Checks

- Eight automated core tests pass: grouping/idempotence, invalid imports, conservative scoring, all five publishing templates, relationships, URL stability across intent types, guide slug collisions and Spark capability requirements.
- Targeted ESLint, intelligence validation, SEO checks and whitespace checks pass.
- A full production build passed in the working tree, including type checks and generation of 233 pages. A later repeat in the isolated temporary copy passed compilation/type checking and page generation but failed standalone packaging because its symlinked node_modules traced outside the temporary directory (EACCES at /private/var/Users); this is a temporary-preview packaging limitation.
- HTTP integration checks passed in an isolated local copy using temporary published fixtures: existing guide 200; drafts 404 and absent from hub/sitemap; removed `/shopify/` routes 404; published guides 200; canonical URLs under `/guides/`; task-specific CTA only with capability evidence; related guides linked; English-only guide Chinese request 308 to English; only English canonical URLs in sitemap.
- Browser interaction confirmed that Copy task displays a success status. The CTA points to the existing Spark App Store listing, without task-prefill parameters.
- Temporary fixtures were restored and the draft route returned 404 afterward. No sample articles were published or deployed.

## Preview limitations

The existing global stylesheet logs `Cannot apply unknown utility class ui-btn--pagination` at the pagination styles in `src/app/globals.css`. Browser preview consequently renders without the site styling. Functional and HTML checks passed, but visual layout sign-off remains blocked by this pre-existing stylesheet issue. This task did not edit shared styles.

Multiple development processes were sharing `.next`, so final HTTP/browser checks ran in an isolated temporary copy. Turbopack also showed different locale behavior; the isolated standard Next development server returned the expected 308. The existing footer img warning remains unrelated to this change.

## Editorial next step

See `sample-report.json` for provisional scores and missing evidence. Complete an original task guide, verify the proposed Spark execution scope, add references and reviewer/date, then publish through the existing Git workflow. Task copy and installation are available now; automatic task-prefill awaits a real supported Spark interface.
