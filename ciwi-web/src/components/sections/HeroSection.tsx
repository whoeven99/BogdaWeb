import Image from "next/image";

import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";

type HeroSectionProps = {
  title: string;
  description: string;
  proofItems: string[];
};

export function HeroSection({title, description, proofItems}: HeroSectionProps) {
  return (
    <section className="page-section page-hero">
      <div className="hero-grid">
        <div>
          <SectionHeading
            eyebrow="Shopify AI Growth"
            title={title}
            description={description}
            as="h1"
          />
          <div className="hero-proof">
            {proofItems.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
          <div className="inline-list space-top-lg">
            <Button href="https://apps.shopify.com/translator-by-ciwi">Install on Shopify</Button>
            <Button href="/demo" variant="secondary">
              View Demo
            </Button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel__badge">Product preview</div>
          <h2>覆盖商品、主题、FAQ 与品牌术语，而不只是翻译几段文本</h2>
          <p className="quote light-copy">
            对 Shopify 商家来说，真正影响增长的不是单次翻译结果，而是多语言内容能否长期保持自然、统一并持续同步。
          </p>
          <div className="hero-panel__demo">
            <div className="demo-row">
              <strong>Original</strong>
              <p>Bundle two scalp-care products and save 15% with auto-applied discount.</p>
            </div>
            <div className="demo-row">
              <strong>Localized</strong>
              <p>购买两件头皮护理产品，系统将自动套用 15% 套餐折扣，并保留品牌语气与优惠表达。</p>
            </div>
          </div>
          <div className="space-top-lg">
            <Image src="/shopify-developer.png" alt="Shopify developer" width={220} height={48} />
          </div>
        </div>
      </div>
    </section>
  );
}
