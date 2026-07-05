import {DemoShowcaseSection} from "@/components/sections/DemoShowcaseSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {FaqSection} from "@/components/sections/FaqSection";
import {HeroSection} from "@/components/sections/HeroSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {OutcomeSection} from "@/components/sections/OutcomeSection";
import {ProductMatrixSection} from "@/components/sections/ProductMatrixSection";
import {ResourcesSection} from "@/components/sections/ResourcesSection";
import {SocialProofSection} from "@/components/sections/SocialProofSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {heroProofItems, homeFaq} from "@/content/home";
import {homeDemoMediaBriefs, homeHeroMediaBriefs} from "@/content/media-briefs";
import {productMap} from "@/content/products";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Shopify AI Growth Platform",
  description: "Ciwi 面向 Shopify 商家提供翻译、本地化、内容效率和转化增长能力。",
  path: "/",
});

export default function HomePage() {
  const translatorProduct = productMap.translator;

  return (
    <main>
      <PageContainer>
        <HeroSection
          title="为 Shopify 商家打造的增长工具，不只讲功能，更直接回应转化问题"
          description="Ciwi 围绕翻译、本地化、内容效率和 AOV 提升，帮助 Shopify 品牌把商品表达、页面体验和增长能力真正接到一起。"
          proofItems={heroProofItems}
        />
        <MediaPlaceholderSection
          eyebrow="Hero media"
          title="首屏素材预留"
          description="这里建议放品牌主视觉或核心产品截图，让用户在首屏先看到产品形态。"
          items={homeHeroMediaBriefs}
        />
        <ProductMatrixSection />
        <OutcomeSection />
        <DemoShowcaseSection
          eyebrow="Demo preview"
          title="先让用户看懂能力，再决定是否深入了解产品"
          description="这里先展示两个最能代表 Translator 价值的场景：一是商品文案本地化，二是 glossary 对品牌术语的一致性控制。"
          items={translatorProduct.demoScenarios.slice(0, 2)}
        />
        <MediaPlaceholderSection
          eyebrow="Demo media"
          title="首页演示素材预留"
          description="首页更适合放一段短视频，快速展示真实效果，而不是完整教学。"
          items={homeDemoMediaBriefs}
        />
        <SocialProofSection />
        <ResourcesSection />
        <FaqSection items={homeFaq} />
        <FinalCtaSection
          title="让每一次访问都更接近判断和行动"
          description="从搜索到产品页、从文章到帮助文档，用户应该在同一套表达里理解 Ciwi。"
        />
      </PageContainer>
    </main>
  );
}
