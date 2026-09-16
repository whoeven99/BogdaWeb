import type {z} from "zod";
import database from "../../../data/merchant-intelligence/database.json";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getLocalizationGuides} from "@/content/localization-guides";
import {isPublished, problemSchema, validateDatabase, validateGuideSlugs} from "./core.mjs";

export type MerchantProblem = z.infer<typeof problemSchema>;

export function getPublishedProblems() {
  const db = validateDatabase(database);
  validateGuideSlugs(db.problems, ["shopify-translation", ...(["en", "zh-cn"] as const).flatMap(locale => [
    ...getFunctionScenarioGuides(locale).map(guide => guide.slug),
    ...getLocalizationGuides(locale).map(guide => guide.slug),
  ])]);
  return db.problems.filter(isPublished);
}
