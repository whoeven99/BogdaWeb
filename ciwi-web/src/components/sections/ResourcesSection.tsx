import {ArticleCard} from "@/components/cards/ArticleCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {featuredResources} from "@/content/home";

export function ResourcesSection() {
  return (
    <section className="page-section">
      <SectionHeading
        eyebrow="Resources"
        title="用博客、帮助文档和对比页，持续回答商家的真实问题"
        description="用户不一定会直接进入产品页。资源内容应该帮助他们先理解问题，再自然进入产品和演示。"
      />
      <div className="resource-grid">
        {featuredResources.map((item) => (
          <ArticleCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            meta={item.meta}
          />
        ))}
      </div>
    </section>
  );
}
