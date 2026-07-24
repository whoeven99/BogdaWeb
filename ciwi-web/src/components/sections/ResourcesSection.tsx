import {NewsletterSubscriptionCard} from "@/components/sections/NewsletterSubscriptionCard";
import {ArticleCard} from "@/components/cards/ArticleCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {homePageCopy} from "@/content/home-page-copy";

export function ResourcesSection() {
  const copy = homePageCopy.resources;
  const items = homePageCopy.featuredResources;

  return (
    <section className="page-section">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="resource-grid">
        {items.map((item) => (
          <ArticleCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            meta={[...item.meta]}
          />
        ))}
      </div>
      <div className="space-top-xl">
        <NewsletterSubscriptionCard copy={copy.subscription} />
      </div>
    </section>
  );
}
