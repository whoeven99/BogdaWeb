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
  description: "Ciwi 帮 Shopify 商家提升多语言转化、降低内容维护成本，并用更清晰的页面表达带动增长。",
  path: "/",
});

export default function HomePage() {
  const translatorProduct = productMap.translator;

  return (
    <main>
      <PageContainer>
        <HeroSection
          title="让 Shopify 商家更快上线多语言，也更容易把访问变成下单"
          description="Ciwi 围绕翻译、本地化、内容效率和 AOV 提升，帮助品牌把商品表达讲清楚，把页面体验做顺，把增长动作真正落到前台。"
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
          title="先看结果，再判断这套能力是否适合你的店铺"
          description="这里先展示两个最能直接影响转化体验的场景：商品文案本地化，以及 glossary 对品牌术语一致性的控制。"
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
          title="把多语言、内容和转化动作接成一条更顺的增长链路"
          description="从搜索进入、看到产品、理解方案到决定安装，前台每一步都应该更容易让用户做判断。"
        />
      </PageContainer>
    </main>
  );
}
