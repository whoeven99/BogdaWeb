import {z} from "zod";

// Content types select editorial structure, never a separate URL namespace.
export const templates = {
  faq: ["Short answer", "Before you start", "How to complete the task", "Verify the result", "Related questions"],
  guide: ["What you will achieve", "Before you start", "Steps", "Verify the result", "Related questions"],
  workflow: ["Goal", "Prerequisites", "Trigger and steps", "Approval and rollback", "Verify the outcome", "Related questions"],
  problem: ["Symptoms", "Possible causes", "Diagnosis", "Possible fixes", "Verify recovery", "Related questions"],
  error: ["Error and affected scope", "Checks", "Resolution", "Verification", "When to escalate", "Related questions"],
};
export const contentTypeLabels = {faq: "Question", guide: "How-to", workflow: "Workflow", problem: "Troubleshooting", error: "Error resolution"};
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().trim().min(1);
const date = z.iso.date();
const url = z.url().refine(value => /^https?:\/\//.test(value), "HTTP(S) URL required");
const rating = z.number().min(0).max(5).nullable();
export const signalSchema = z.object({
  id: slug, canonicalId: slug, canonicalProblem: text, originalQuery: text,
  category: slug, topic: slug, merchantGoal: text,
  intent: z.enum(["question", "how-to", "problem", "error", "automation"]),
  source: z.enum(["community", "search-console", "ads", "support", "conversation", "manual"]),
  sourceUrl: url.nullable(), sourceDate: date.nullable(), observedAt: date,
  evidence: z.enum(["search-result", "user-provided", "verified"]),
  keywordVariants: z.array(text).min(1),
}).strict();
export const sparkTaskSchema = z.object({
  prompt: text, prerequisites: text, executionScope: text, confirmationPoints: text,
  successCriteria: text, ctaLabel: text,
}).strict();
export const pageSchema = z.object({
  title: text, description: text, sections: z.array(z.object({heading: text, body: text}).strict()),
  reviewedBy: text.nullable(), reviewedAt: date.nullable(), references: z.array(url),
  sparkTask: sparkTaskSchema.nullable().default(null),
}).strict();
export const problemSchema = z.object({
  id: slug, canonicalProblem: text, category: slug, topic: slug, merchantGoal: text,
  contentType: z.enum(["faq", "guide", "problem", "error", "workflow"]),
  status: z.enum(["discovered", "validated", "queued", "published", "updated"]),
  keywordVariants: z.array(text), signalIds: z.array(slug).min(1),
  assessment: z.object({searchIntent: rating, commercialRelevance: rating, capabilityMatch: rating, serpWeakness: rating, evidenceNotes: z.string()}).strict(),
  capability: z.object({name: text, evidenceUrl: url}).nullable(),
  page: pageSchema.nullable(),
}).strict();
export const databaseSchema = z.object({version: z.literal(1), signals: z.array(signalSchema), problems: z.array(problemSchema)}).strict();
export const normalizeQuery = value => value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
export const targetUrl = problem => `/guides/${problem.id}`;
export const isPublished = problem => ["published", "updated"].includes(problem.status);
const route = {question: "faq", "how-to": "guide", problem: "problem", error: "error", automation: "workflow"};

export function validateGuideSlugs(problems, reservedSlugs) {
  const reserved = new Set(reservedSlugs);
  for (const problem of problems) {
    if (reserved.has(problem.id)) throw new Error(`Guide slug already exists: ${problem.id}`);
  }
}

export function validateDatabase(input) {
  const db = databaseSchema.parse(input);
  for (const collection of [db.signals, db.problems]) {
    if (new Set(collection.map(item => item.id)).size !== collection.length) throw new Error("Duplicate IDs");
  }
  const signals = new Map(db.signals.map(signal => [signal.id, signal]));
  for (const problem of db.problems) {
    if (new Set(problem.signalIds).size !== problem.signalIds.length) throw new Error(`Duplicate signal: ${problem.id}`);
    for (const id of problem.signalIds) {
      if (signals.get(id)?.canonicalId !== problem.id) throw new Error(`Invalid signal relationship: ${id}`);
    }
    if (problem.page?.sparkTask && !problem.capability) throw new Error(`Spark capability evidence required: ${problem.id}`);
    if (isPublished(problem)) {
      const page = problem.page;
      if (!page?.reviewedBy || !page.reviewedAt || !page.references.length) throw new Error(`Review and references required: ${problem.id}`);
      if (templates[problem.contentType].some(heading => !page.sections.some(section => section.heading === heading))) throw new Error(`Incomplete template: ${problem.id}`);
      if (/\bTODO\b|\[PLACEHOLDER\]/i.test(JSON.stringify(page))) throw new Error(`Unfinished page: ${problem.id}`);
    }
  }
  for (const signal of db.signals) {
    if (!db.problems.some(problem => problem.id === signal.canonicalId && problem.signalIds.includes(signal.id))) throw new Error(`Orphan signal: ${signal.id}`);
  }
  return db;
}

export function importSignals(input, rows) {
  const db = structuredClone(validateDatabase(input));
  for (const row of z.array(signalSchema).parse(rows)) {
    const previous = db.signals.find(signal => signal.id === row.id);
    if (previous) {
      if (JSON.stringify(previous) !== JSON.stringify(row)) throw new Error(`Conflicting signal ID: ${row.id}`);
      continue;
    }
    let problem = db.problems.find(item => item.id === row.canonicalId);
    if (!problem) {
      problem = {id: row.canonicalId, canonicalProblem: row.canonicalProblem, category: row.category, topic: row.topic, merchantGoal: row.merchantGoal,
        contentType: route[row.intent], status: "discovered", keywordVariants: [], signalIds: [],
        assessment: {searchIntent: null, commercialRelevance: null, capabilityMatch: null, serpWeakness: null, evidenceNotes: ""}, capability: null, page: null};
      db.problems.push(problem);
    }
    if (problem.topic !== row.topic || problem.category !== row.category || problem.canonicalProblem !== row.canonicalProblem) throw new Error(`Conflicting canonical assignment: ${row.id}`);
    problem.signalIds.push(row.id);
    problem.keywordVariants = [...new Set([...problem.keywordVariants, ...row.keywordVariants].map(normalizeQuery))];
    db.signals.push(row);
  }
  return validateDatabase(db);
}

export function opportunity(problem, signals, asOf) {
  const relevant = signals.filter(signal => problem.signalIds.includes(signal.id));
  // One thread counts once even when it was observed multiple times.
  const repetitions = new Set(relevant.map(signal => signal.sourceUrl?.replace(/\/$/, "") ?? signal.id)).size;
  const knownDates = relevant.flatMap(signal => signal.sourceDate ? [signal.sourceDate] : []);
  const latest = knownDates.sort().at(-1);
  const age = latest ? Math.max(0, (Date.parse(asOf) - Date.parse(latest)) / 86400000) : null;
  const factors = {...problem.assessment, repetition: Math.min(5, repetitions), recency: age === null ? null : age <= 30 ? 5 : age <= 90 ? 4 : age <= 180 ? 3 : age <= 365 ? 2 : 1};
  delete factors.evidenceNotes;
  const weights = {searchIntent: 25, repetition: 20, recency: 10, commercialRelevance: 15, capabilityMatch: 15, serpWeakness: 15};
  const score = Object.entries(weights).reduce((sum, [key, weight]) => sum + (factors[key] ?? 0) / 5 * weight, 0);
  const missing = Object.keys(weights).filter(key => factors[key] === null);
  return {score: Math.round(score), confidence: Math.round(Object.entries(weights).reduce((sum, [key, weight]) => sum + (factors[key] === null ? 0 : weight), 0)), missing, repetitions};
}
