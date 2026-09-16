# Shopify Merchant Problem Intelligence MVP

## Scope and acceptance

1. Design: a versioned, validated problem database, stable URLs, five templates and transparent opportunity scoring.
2. Implementation: manual JSON import, explicit canonical grouping, normalized keyword union, idempotent re-import, draft scaffolding, publishing gate and public hub/detail routes.
3. Validation: traceable real title signals, sample report, automated checks for duplicate imports, invalid records, missing evidence and unpublished pages.

The MVP uses the existing Git-reviewed file publishing workflow. No affiliate database migration, scraper, scheduled collection, automatic publishing or invented search-volume metrics. Canonical assignments and keyword suggestions are editorial input; this is not an embedding classifier. The initial language is English; Chinese routes return 404 until translations exist.

## Storage schema

`data/merchant-intelligence/database.json` is the source of truth. Runtime validation lives in `src/lib/merchant-intelligence/core.mjs`.

- Signal: id, canonicalId, canonicalProblem, originalQuery, category, topic, merchantGoal, intent, source, sourceUrl, sourceDate, observedAt, evidence, keywordVariants.
- Problem: id, canonicalProblem, category, topic, merchantGoal, contentType, status, keywordVariants, signalIds, assessment, capability, page.
- Assessment: searchIntent, commercialRelevance, capabilityMatch, serpWeakness (0–5 or null), evidenceNotes.
- Page: title, description, sections, reviewedBy, reviewedAt, references.
- Capability: verified name and evidenceUrl, otherwise null. No automatic product claims or CTA.

Repetition, normalized keywords and target URLs are derived. Each signal belongs to exactly one canonical problem. One canonical problem produces one target page, preventing multiple competing URLs for equivalent phrases. Topic groups provide the first knowledge-graph edges; separate pillar articles can follow once the corpus supports them.

## URL and template architecture

Hub: `/shopify/`; topic groups are anchored on the hub.

| Intent | Type | URL | Required sections |
| --- | --- | --- | --- |
| question | faq | /shopify/faq/{id}/ | Short answer; When this matters; Available options; Related questions |
| how-to | guide | /shopify/guide/{id}/ | Before you start; Steps; Verify the result; Common mistakes |
| problem | problem | /shopify/problem/{id}/ | Symptoms; Possible causes; Diagnosis; Possible fixes; Verify recovery |
| error | error | /shopify/error/{id}/ | Error and affected scope; Checks; Resolution; Verification; When to escalate |
| automation | workflow | /shopify/workflow/{id}/ | Goal; Prerequisites; Trigger and steps; Approval and rollback; Verify the outcome |

These namespaced URLs avoid collisions with existing `/guides/`. Content type is selected on first import and can be editorially corrected before publication. Once published, keep IDs and type stable; URL changes require redirects.

## Opportunity score

Weighted sum, each factor on 0–5: search intent 25%, repetition 20%, recency 10%, commercial relevance 15%, capability match 15%, SERP weakness 15%. Repeat factor is unique source URL count capped at five (not repeated imports or views). Recency uses source date, never observation date: <=30 days 5, <=90 4, <=180 3, <=365 2, older 1. Unknown dates remain unknown.

Unknown factors contribute zero to a conservative provisional score. Confidence is the sum of weights with known values, not statistical confidence. A zero capability score never eliminates informational value. Scores require editorial evidence in assessment.evidenceNotes; they are prioritization aids, not search volume predictions.

## Operation

```sh
npm run intelligence -- import data/merchant-intelligence/sample-signals.json
npm run intelligence -- report
npm run intelligence -- draft shopify-traffic-no-sales
npm run intelligence -- validate
npm run intelligence:test
npm run build
```

Import is append-only and atomic; identical IDs are skipped and conflicting IDs fail without changing the database. Assign canonicalId explicitly after checking existing records. Do not import customer-identifying or private conversation text into this public repository.

Edit generated drafts in the database. Complete every section, add primary references, reviewer and review date, then set status to published. Both published and updated are public states; discovered/validated/queued are not. Build validation rejects unfinished public content. Public routes exclude drafts and return 404 for unpublished IDs; sitemap includes only published content. The empty hub is noindex.

## Sample boundaries

Samples were observed through search results on 2026-09-16. Only titles, links and our own problem/keyword labels are retained; no forum answers are copied. Exact source dates, demand, SERP weakness and ciwi capability remain unverified. This small corpus validates the pipeline, not market demand or semantic-classifier accuracy. Test fixtures exercise all five templates; real samples only populate types supported by their intent. Search Console/Ads data and primary product capability evidence are required before commercial prioritization.
