import type {Locale} from "@/lib/i18n";
import importedGuides from "@/content/data/function_scenario_guides.json";

export type FunctionScenarioOverviewDriver = {
  title: string;
  description: string;
};

export type FunctionScenarioSolution = {
  name: string;
  advantages: string[];
  limitations: string[];
};

export type FunctionScenarioTranslationScope = {
  category: string;
  items: string[];
  priority: string;
};

export type FunctionScenarioMistake = {
  category: string;
  wrongExample: string;
  correct: string;
  impact: string;
  severity: string;
};

export type FunctionScenarioRecommendation = {
  title: string;
  description: string;
};

export type FunctionScenarioFaq = {
  question: string;
  answer: string;
};

export type FunctionScenarioGuide = {
  slug: string;
  href: string;
  year: number;
  title: string;
  description: string;
  industry: string;
  audience: string;
  segmentLabel: string;
  guideLabel: string;
  mainValue: string;
  topic: string;
  keywords: string[];
  overviewDrivers: FunctionScenarioOverviewDriver[];
  solutions: FunctionScenarioSolution[];
  translationScope: FunctionScenarioTranslationScope[];
  checklist: string[];
  mistakes: FunctionScenarioMistake[];
  features: string[];
  recommendations: FunctionScenarioRecommendation[];
  faq: FunctionScenarioFaq[];
};

export const functionScenarioGuides = importedGuides as FunctionScenarioGuide[];

const functionScenarioGuideMap = Object.fromEntries(functionScenarioGuides.map((guide) => [guide.slug, guide])) as Record<
  string,
  FunctionScenarioGuide
>;

export function getFunctionScenarioGuides(locale: Locale) {
  void locale;
  return functionScenarioGuides;
}

export function getFunctionScenarioGuideMap(locale: Locale) {
  void locale;
  return functionScenarioGuideMap;
}

export function getFunctionScenarioGuideTopics() {
  return [...new Set(functionScenarioGuides.map((guide) => guide.topic))];
}
