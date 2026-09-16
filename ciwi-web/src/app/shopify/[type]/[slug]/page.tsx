import {notFound} from "next/navigation";
import {PageContainer} from "@/components/ui/PageContainer";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {getPublishedProblems} from "@/lib/merchant-intelligence/content";
import {targetUrl} from "@/lib/merchant-intelligence/core.mjs";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

type Props = {params: Promise<{type: string; slug: string}>};
async function getProblem(params: Props["params"]) {
  if (await getRequestLocale() !== "en") notFound();
  const {type, slug} = await params;
  const problem = getPublishedProblems().find(item => item.id === slug && item.contentType === type);
  if (!problem?.page) notFound();
  return {...problem, page: problem.page};
}
export async function generateMetadata({params}: Props) {
  const problem = await getProblem(params);
  return buildPageMetadata({title: problem.page.title, description: problem.page.description, path: targetUrl(problem), supportedLocales: ["en"]});
}
export default async function MerchantProblemPage({params}: Props) {
  const problem = await getProblem(params);
  const related = getPublishedProblems().filter(item => item.topic === problem.topic && item.id !== problem.id);
  return <PageContainer><article className="mx-auto max-w-3xl space-y-8 py-16">
    <LocalizedLink href="/shopify/">Shopify knowledge base</LocalizedLink>
    <header className="space-y-4"><p className="text-sm uppercase">{problem.contentType} · {problem.topic.replaceAll("-", " ")}</p><h1 className="text-4xl font-semibold">{problem.page.title}</h1><p>{problem.page.description}</p></header>
    {problem.page.sections.map(section => <section key={section.heading} className="space-y-3"><h2 className="text-2xl font-semibold">{section.heading}</h2><p className="whitespace-pre-line leading-8">{section.body}</p></section>)}
    <section className="space-y-3"><h2 className="text-2xl font-semibold">References</h2><ul>{problem.page.references.map(url => <li key={url}><a href={url} className="underline">{url}</a></li>)}</ul><p className="text-sm">Reviewed by {problem.page.reviewedBy} · {problem.page.reviewedAt}</p></section>
    {related.length > 0 && <section><h2 className="text-2xl font-semibold">Related questions and guides</h2><ul>{related.map(item => <li key={item.id}><LocalizedLink href={targetUrl(item)}>{item.canonicalProblem}</LocalizedLink></li>)}</ul></section>}
  </article></PageContainer>;
}
