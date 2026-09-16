import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {importSignals, validateDatabase, opportunity, templates, isPublished, targetUrl} from "../../src/lib/merchant-intelligence/core.mjs";
const rows = JSON.parse(fs.readFileSync(new URL("../../data/merchant-intelligence/sample-signals.json", import.meta.url)));
const empty = {version: 1, signals: [], problems: []};

test("real signals group into three canonical problems and imports are idempotent", () => {
  const db = importSignals(empty, rows);
  assert.equal(db.signals.length, 5);
  assert.equal(db.problems.length, 3);
  assert.equal(db.problems[0].signalIds.length, 3);
  assert.deepEqual(importSignals(db, rows), db);
  assert.equal(db.problems[0].keywordVariants.filter(query => query === "shopify traffic but no sales").length, 1);
  assert.equal(db.problems.filter(isPublished).length, 0);
});
test("conflicting IDs and invalid input fail without mutating input", () => {
  const db = importSignals(empty, rows);
  const before = structuredClone(db);
  assert.throws(() => importSignals(db, [{...rows[0], canonicalId: "other"}]), /Conflicting/);
  assert.throws(() => importSignals(db, [{...rows[0], id: "..\/bad"}]));
  assert.throws(() => importSignals(db, [{...rows[0], id: "new", sourceUrl: "javascript:alert(1)"}]));
  assert.throws(() => importSignals(db, [{...rows[0], id: "new", topic: "other"}]), /canonical/);
  assert.deepEqual(db, before);
});
test("score preserves unknown evidence and counts source URLs once", () => {
  const db = importSignals(empty, [...rows, {...rows[0], id: "second-observation"}]);
  const score = opportunity(db.problems[0], db.signals, "2026-09-16");
  assert.equal(score.repetitions, 3);
  assert.equal(score.score, 12);
  assert.equal(score.confidence, 20);
  assert.ok(score.missing.includes("recency"));
  db.problems[0].assessment = {searchIntent: 5, commercialRelevance: 5, capabilityMatch: 0, serpWeakness: 5, evidenceNotes: "test"};
  assert.ok(opportunity(db.problems[0], db.signals, "2026-09-16").score > 0);
});
test("all five templates require reviewed, complete pages before publication", () => {
  for (const type of Object.keys(templates)) {
    const db = importSignals(empty, [rows[0]]);
    const problem = db.problems[0];
    problem.contentType = type;
    problem.status = "published";
    assert.throws(() => validateDatabase(db), /Review/);
    problem.page = {title: "Example", description: "Example description", reviewedBy: "Editor", reviewedAt: "2026-09-16", references: ["https://help.shopify.com/"], sections: []};
    assert.throws(() => validateDatabase(db), /Incomplete/);
    problem.page.sections = templates[type].map(heading => ({heading, body: "Reviewed original explanation."}));
    assert.equal(validateDatabase(db).problems.filter(isPublished).length, 1);
    assert.equal(targetUrl(problem), `/shopify/${type}/${problem.id}`);
    problem.page.sections[0].body = "[PLACEHOLDER]";
    assert.throws(() => validateDatabase(db), /Unfinished/);
  }
});
test("orphan and duplicate relationships fail validation", () => {
  const db = importSignals(empty, rows);
  db.problems[0].signalIds.push(rows[0].id);
  assert.throws(() => validateDatabase(db), /Duplicate signal/);
  db.problems[0].signalIds = [rows[0].id];
  assert.throws(() => validateDatabase(db), /Orphan/);
});
