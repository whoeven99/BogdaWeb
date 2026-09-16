import {notFound} from "next/navigation";
import {PageContainer} from "@/components/ui/PageContainer";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {getPublishedProblems} from "@/lib/merchant-intelligence/content";
import {targetUrl} from "@/lib/merchant-intelligence/core.mjs";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export function generateMetadata() {
  return {...buildPageMetadata({title: "Shopify knowledge base", description: "Practical answers, troubleshooting and workflows for Shopify merchants.", path: "/shopify", supportedLocales: ["en"]}), robots: {index: getPublishedProblems().length > 0, follow: true}};
}
export default async function ShopifyKnowledgeBase() {
  if (await getRequestLocale() !== "en") notFound();
  const problems = getPublishedProblems();
  const topics = [...new Set(problems.map(problem => problem.topic))];
  return <PageContainer><main className="space-y-10 py-16"><header className="space-y-4"><h1 className="text-4xl font-semibold">Shopify knowledge base</h1><p>Practical answers, troubleshooting and workflows for your store.</p></header>
    {!problems.length && <p>Our first guides are being reviewed. Check back soon.</p>}
    {topics.map(topic => <section id={topic} key={topic} className="space-y-4"><h2 className="text-2xl font-semibold capitalize">{topic.replaceAll("-", " ")}</h2><ul className="grid gap-4 md:grid-cols-2">{problems.filter(problem => problem.topic === topic).map(problem => <li key={problem.id} className="rounded-xl border p-6"><p className="text-sm uppercase">{problem.contentType}</p><LocalizedLink href={targetUrl(problem)} className="text-xl font-semibold">{problem.page?.title}</LocalizedLink><p className="mt-2">{problem.page?.description}</p></li>)}</ul></section>)}
  </main></PageContainer>;
}
