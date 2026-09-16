# Shopify Merchant Problem Intelligence MVP

## Direction

Prioritize How-to, Workflow and action-oriented Question content that helps merchants complete a task and, where supported, hand it to Spark for planning and execution. Keep diagnosis content when it leads to an actionable check or fix. Error-library expansion is deferred.

All articles live at `/guides/{id}/`, alongside existing localization and function-scenario guides. The Guides hub is now a broader Shopify how-to and automation hub. Content type selects a template and display label; it never changes the URL. Questions and keywords about the same task share one canonical record and page.

The MVP uses the existing Git-reviewed file publishing workflow. It has no scraper, scheduled collection, automatic publishing or invented search-volume metrics. Canonical assignments and keyword suggestions are editorial input, not an automatic semantic classifier.

## Storage schema

`data/merchant-intelligence/database.json` is the source of truth. Validation lives in `src/lib/merchant-intelligence/core.mjs`.

- Signal: id, canonicalId, canonicalProblem, originalQuery, category, topic, merchantGoal, intent, source, sourceUrl, sourceDate, observedAt, evidence, keywordVariants.
- Problem: id, canonicalProblem, category, topic, merchantGoal, contentType, status, keywordVariants, signalIds, assessment, capability, page.
- Assessment: searchIntent, commercialRelevance, capabilityMatch, serpWeakness (0–5 or null), evidenceNotes.
- Page: title, description, sections, reviewedBy, reviewedAt, references, sparkTask.
- Capability: name and evidenceUrl identifying a verified capability, otherwise null.
- Spark task: prompt, prerequisites, executionScope, confirmationPoints, successCriteria, ctaLabel. Null when no specific capability has been confirmed.

Repetition, normalized keyword union and URLs are derived. Each signal belongs to one canonical problem. Imports and build validation reject IDs already used by existing guide collections or static guide routes, including unpublished guide records. Topic membership connects related published guides.

## Templates

| Signal intent | Stored contentType | Display label | Required sections |
| --- | --- | --- | --- |
| question | faq | Question | Short answer; Before you start; How to complete the task; Verify the result; Related questions |
| how-to | guide | How-to | What you will achieve; Before you start; Steps; Verify the result; Related questions |
| automation | workflow | Workflow | Goal; Prerequisites; Trigger and steps; Approval and rollback; Verify the outcome; Related questions |
| problem | problem | Troubleshooting | Symptoms; Possible causes; Diagnosis; Possible fixes; Verify recovery; Related questions |
| error | error | Error resolution | Error and affected scope; Checks; Resolution; Verification; When to escalate; Related questions |

The optional Spark task panel appears immediately before result verification. It explains the required data, supported execution scope, confirmation points and expected result, then provides selectable task text, a copy button and a task-specific CTA. The CTA leads to the existing Spark Shopify App Store listing. It does not prefill or automatically execute a task. The task text is never put in a URL. Clipboard failure leaves the text available for manual copying.

A task panel requires capability evidence. A generic claim that Spark is an agent is not evidence that it supports every Shopify action. No panel is shown for unmatched tasks, and sample purchase-order automation must not be presented as a confirmed Spark capability.

## URL and language behavior

- `/guides/` contains existing guide collections and published task guides.
- `/guides/{id}/` is the only canonical task page URL. Changing contentType does not change it.
- New English-only task pages follow existing guide behavior: Chinese requests redirect to the English canonical page. The Chinese hub lists only content with Chinese versions.
- Drafts return 404 and are excluded from the hub, static params and sitemap.
- The earlier `/shopify/` route files were removed. No content was published there, so no legacy redirects are required.
- Existing localization and function-scenario article URLs remain unchanged.

## Opportunity score

Weighted sum, each factor on 0–5: search intent 25%, repetition 20%, recency 10%, commercial relevance 15%, capability match 15%, SERP weakness 15%. Repeat factor is unique source URL count capped at five. Recency uses source date, never observation date: <=30 days 5, <=90 4, <=180 3, <=365 2, older 1. Unknown dates remain unknown.

Unknown factors contribute zero to a conservative provisional score. Confidence is the sum of weights with known values, not statistical confidence. A zero capability score does not eliminate informational value. Editors should substantiate ratings in assessment.evidenceNotes. The score formula is unchanged; editorial priority is now task-oriented content with a supported Spark execution path.

## Operation

```sh
npm run intelligence -- import data/merchant-intelligence/sample-signals.json
npm run intelligence -- report
npm run intelligence -- draft <canonical-id>
npm run intelligence -- validate
npm run intelligence:test
npm run build
```

Import is append-only and atomic; identical IDs are skipped and conflicting IDs fail without changing the database. Assign canonicalId after checking existing records and guides. Do not import private customer information into this public repository.

Draft scaffolding creates the required sections and a null sparkTask. Edit original answers, add primary references, and fill capability plus sparkTask only when the proposed execution scope is verified. Record reviewer and review date, then set status to published. Published and updated are public states; discovered, validated and queued are not. Build validation rejects unfinished public content and unsupported task handoffs.

## Samples and validation

Five title signals were observed through search results on 2026-09-16 and grouped into three problems. Only titles, links and our problem/keyword labels are retained; no forum answers are copied. Exact source dates, search demand, SERP weakness and task-specific Spark capability remain unverified. Three editable drafts cover troubleshooting, workflow and how-to; no sample articles are published.

See `sample-report.json` for current URLs and provisional scores and `validation.md` for checks. Search Console/Ads data and task-specific product capability evidence are needed before commercial prioritization. These samples validate the pipeline, not market demand or semantic-classifier accuracy.
