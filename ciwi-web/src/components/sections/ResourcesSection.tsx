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
    source: string;
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
    <section className="py-12 sm:py-14 lg:py-16">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
      <div className="mt-8">
        <NewsletterSubscriptionCard source={subscription.source} copy={subscription} />
      </div>
    </section>
  );
}
