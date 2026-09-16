import {BackLink} from "@/components/ui/BackLink";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
import {CopyTaskButton} from "@/components/guides/CopyTaskButton";
import type {MerchantProblem} from "@/lib/merchant-intelligence/content";
import {contentTypeLabels, targetUrl} from "@/lib/merchant-intelligence/core.mjs";
import {sparkShopifyInstallUrl} from "@/lib/marketing-links";
import {toAbsoluteSiteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildGraphSchema, buildTechArticleSchema} from "@/lib/seo/schema";

export function MerchantGuide({problem, related}: {problem: MerchantProblem; related: MerchantProblem[]}) {
  const page = problem.page;
  if (!page) return null;
  const task = problem.capability ? page.sparkTask : null;
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([{name: "Guides", item: toAbsoluteSiteUrl("/guides")}, {name: page.title, item: toAbsoluteSiteUrl(targetUrl(problem))}]),
    buildTechArticleSchema({url: toAbsoluteSiteUrl(targetUrl(problem)), headline: page.title, description: page.description, dateModified: page.reviewedAt ?? undefined, keywords: problem.keywordVariants}),
  ]);
  const verificationIndex = page.sections.findIndex(section => /^(Verify|Verification)/.test(section.heading));

  return <main><PageContainer><article className="mx-auto max-w-3xl space-y-10 py-16">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData).replace(/</g, "\\u003c")}} />
    <BackLink href="/guides" label="All guides" />
    <header className="space-y-4"><p className="text-sm uppercase tracking-wide">{contentTypeLabels[problem.contentType]} · {problem.topic.replaceAll("-", " ")}</p><h1 className="text-4xl font-semibold tracking-tight">{page.title}</h1><p className="text-lg leading-8 text-slate-600">{page.description}</p></header>
    {page.sections.map((section, index) => <div key={section.heading} className="space-y-10">
      {task && index === verificationIndex && <section className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6" aria-labelledby="spark-task-title">
        <h2 id="spark-task-title" className="text-2xl font-semibold">Complete this task with Spark</h2>
        <p>Give Spark your goal so it can plan and carry out the supported steps using your connected store data.</p>
        <dl className="space-y-4">
          <div><dt className="font-semibold">What you need</dt><dd className="whitespace-pre-line">{task.prerequisites}</dd></div>
          <div><dt className="font-semibold">What Spark will do</dt><dd className="whitespace-pre-line">{task.executionScope}</dd></div>
          <div><dt className="font-semibold">When to confirm</dt><dd className="whitespace-pre-line">{task.confirmationPoints}</dd></div>
          <div><dt className="font-semibold">Expected result</dt><dd className="whitespace-pre-line">{task.successCriteria}</dd></div>
        </dl>
        <h3 className="font-semibold">Your task for Spark</h3>
        <blockquote className="whitespace-pre-line rounded-xl border border-slate-200 bg-white p-4 leading-7">{task.prompt}</blockquote>
        <CopyTaskButton prompt={task.prompt} />
        <Button href={sparkShopifyInstallUrl}>{task.ctaLabel}</Button>
        <p className="text-sm text-slate-600">Install Spark from the Shopify App Store, then paste the task into Spark. This link does not start the task automatically.</p>
      </section>}
      <section className="space-y-3"><h2 className="text-2xl font-semibold">{section.heading}</h2><p className="whitespace-pre-line leading-8 text-slate-700">{section.body}</p></section>
    </div>)}
    <section className="space-y-3"><h2 className="text-2xl font-semibold">References</h2><ul className="space-y-2 break-words">{page.references.map(url => <li key={url}><a href={url} className="underline">{url}</a></li>)}</ul><p className="text-sm text-slate-600">Reviewed by {page.reviewedBy} · {page.reviewedAt}</p></section>
    {related.length > 0 && <ResourceCollectionSection title="Related tasks and questions" items={related.map(item => ({title: item.page?.title ?? item.canonicalProblem, description: item.page?.description ?? item.merchantGoal, href: targetUrl(item), meta: [contentTypeLabels[item.contentType]]}))} className="py-6" />}
  </article></PageContainer></main>;
}
