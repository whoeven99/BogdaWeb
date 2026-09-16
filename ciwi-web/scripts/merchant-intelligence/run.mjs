import fs from "node:fs";
import path from "node:path";
import {importSignals, validateDatabase, opportunity, templates, targetUrl} from "../../src/lib/merchant-intelligence/core.mjs";

const [command, input] = process.argv.slice(2);
const location = path.resolve("data/merchant-intelligence/database.json");
let db = validateDatabase(JSON.parse(fs.readFileSync(location, "utf8")));
if (command === "import") {
  if (!input) throw new Error("Usage: npm run intelligence -- import <signals.json>");
  db = importSignals(db, JSON.parse(fs.readFileSync(input, "utf8")));
} else if (command === "draft") {
  const problem = db.problems.find(item => item.id === input);
  if (!problem) throw new Error("Unknown problem ID");
  if (problem.page) throw new Error("Page already exists; edit the existing draft");
  problem.page = {title: problem.canonicalProblem, description: problem.merchantGoal, reviewedBy: null, reviewedAt: null, references: [], sections: templates[problem.contentType].map(heading => ({heading, body: "[PLACEHOLDER] Write an original, evidence-backed answer."}))};
} else if (command === "report") {
  const asOf = new Date().toISOString().slice(0, 10);
  console.log(JSON.stringify({asOf, signals: db.signals.length, problems: db.problems.map(problem => ({id: problem.id, topic: problem.topic, contentType: problem.contentType, status: problem.status, targetUrl: targetUrl(problem), keywords: problem.keywordVariants, ...opportunity(problem, db.signals, asOf)})).sort((a, b) => b.score - a.score)}, null, 2));
} else if (command !== "validate") {
  throw new Error("Commands: import <file>, draft <id>, validate, report");
}
validateDatabase(db);
if (["import", "draft"].includes(command)) {
  fs.writeFileSync(`${location}.tmp`, `${JSON.stringify(db, null, 2)}\n`);
  fs.renameSync(`${location}.tmp`, location);
}
if (command !== "report") console.log(`Validated ${db.signals.length} signals and ${db.problems.length} problems.`);
