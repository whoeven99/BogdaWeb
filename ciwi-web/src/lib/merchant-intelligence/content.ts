import database from "../../../data/merchant-intelligence/database.json";
import {isPublished, validateDatabase} from "./core.mjs";

export function getPublishedProblems() {
  return validateDatabase(database).problems.filter(isPublished);
}
