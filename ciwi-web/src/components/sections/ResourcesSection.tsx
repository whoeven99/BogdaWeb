import {NewsletterSubscriptionCard} from "@/components/sections/NewsletterSubscriptionCard";
import {ArticleCard} from "@/components/cards/ArticleCard";
import {SectionHeading} from "@/components/ui/SectionHeading";

type ResourcesSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    href: string;
    meta: string[];
  }[];
  subscription: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
    helperText: string;
    successMessage: string;
    errorMessage: string;
    highlights: string[];
  };
};

export function ResourcesSection({eyebrow, title, description, items, subscription}: ResourcesSectionProps) {
  return (
    <section className="page-section">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
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
        <NewsletterSubscriptionCard copy={subscription} />
      </div>
    </section>
  );
}
