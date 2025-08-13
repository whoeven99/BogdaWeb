"use client";

import { Footer } from "antd/es/layout/layout";
import styles from "../css/styles.module.css"; 
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link'
// 定义 section 的类型，label 为可选属性
interface Item {
  name:string,
  src:string
}

interface Section {
  label?: string;
  items: Item[];
}

interface FooterColumn {
  title: string;
  sections: Section[];
}
// 这里根据图片示例，调整列名和对应链接项
const footerColumns: FooterColumn[] = [
  {
    title: "特色功能",
    sections: [
      {
        label: "AI Module",
        items: [
          { name: "GPT-4.1", src: "/gpt-4-1" },
          { name: "GPT-4o", src: "/gpt-4o" },
          { name: "Gemini 2.5 pro", src: "/gemini-2-5-pro" },
          { name: "Qwen", src: "/qwen" },
          { name: "DeepSeek", src: "/deepseek" },
          { name: "Hunyuan", src: "/hunyuan" },
          { name: "Grok", src: "/grok" },
          { name: "Kimi", src: "/kimi" }
        ]
      },
      {
        label: "Machine Translation",
        items: [
          { name: "Google translation", src: "/google-translation" },
          { name: "DeepL", src: "/deepl" },
        ]
      },
      {
        label: "Translation Tools",
        items: [
          { name: "Store Theme Translation", src: "/store-theme-translation" },
          { name: "Product Content Translation", src: "/product-content-translation" },
          { name: "Product Image Translation", src: "/product-image-translation" },
          { name: "Shopify App Translation", src: "/shopify-app-translation" },
          { name: "Glossary", src: "/glossary" }
        ]
      },
      {
        label: "Localization",
        items: [
          { name: "Currency Exchange Rate Inquiry", src: "/currency-exchange-rate-inquiry" },
          { name: "Supported Languages List", src: "/supported-languages-list" },
          { name: "IP-based Automatic Switching", src: "/ip-based-automatic-switching" }
          // 其余为空
        ]
      },
      {
        label: "Product Content Generation Tools",
        items: [
          { name: "Product Title Generation", src: "/product-title-generation" },
          { name: "Product Description Generation", src: "/product-description-generation" },
          { name: "Product Image Generation", src: "/product-image-generation" },
          { name: "Product SEO Information Generation", src: "/product-seo-information-generation" },
          { name: "Collection Description Generation", src: "/collection-description-generation" },
          { name: "Product FAQ Generation", src: "/product-faq-generation" },
          { name: "Image Alt Text Generation", src: "/image-alt-text-generation" }
        ]
      },
      {
        label: "Compare",
        items: [
          { name: "VS Transcy", src: "/vs-transcy" },
          { name: "VS Langwill", src: "/vs-langwill" },
          { name: "VS Locales.ai", src: "/vs-locales-ai" },
          { name: "VS Langshop", src: "/vs-langshop" },
          { name: "VS Transtor", src: "/vs-transtor" },
          { name: "VS G-translate", src: "/vs-g-translate" }
        ]
      }
    ]
  },
  {
    title: "Learn More",
    sections: [
      {
        items: [
          { name: "Help Center", src: "http://ciwi.ai/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app" },
          { name: "Pricing", src: "/pricing" },
          { name: "Ciwi Blog", src: "https://blog.ciwi.ai/" },
          { name: "Contact Us", src: "/contact-us" },
        ]
      }
    ]
  },
  {
    title: "About",
    sections: [
      {
        items: [
          { name: "Privacy Policy", src: "/privacy-policy" },
          { name: "Terms & Conditions", src: "/terms-and-conditions" },
          { name: "About Us", src: "/about-us" }
        ]
      }
    ]
  }
];
const socialContacts = [
  {type:"小红书",src:"https://www.xiaohongshu.com/explore"},
  {type:"微信公众号",src:"https://mp.weixin.qq.com/"},
  {type:"Shopify App Store",src:"https://apps.shopify.com/"}
]
export const FooterLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Footer className={styles.ciwiFooter}>
      <div className={styles.ciwiFooterContainer}>
        {/* 左侧 Logo */}
        <div className={styles.ciwiFooterLeft}>
          <a href="https://ciwi.ai" className={styles.ciwiFooterLeftLogo}>
            <Image
              src="/logo-150.png"
              alt="Ciwi"
              width={isMobile ? 20 : 48}
              height={isMobile ? 20 : 48}
            />
            <span className={styles.ciwilogotext}>Ciwi  </span>
          </a>
        </div>

        {/* 右侧多列内容 */}
        <div className={styles.ciwiFooterRight}>
          {footerColumns.map((col) => (
            <div key={col.title} className={styles.ciwiFooterColumn}>
              <h4 className={styles.ciwiFooterColumnTitle}>{col.title}</h4>
              <span className={styles.hr__footer}></span>
              <div className={styles.ciwiFooterFun}>
                {col.sections.map((section, i) =>
                  section.label ? (
                    <div key={i} className={styles.ciwiFooterSection}>
                      <h5 className={styles.ciwiFooterSectionTitle}>{section.label}</h5>
                      <ul className={styles.ciwiFooterList}>
                        {section.items.map((item) => (
                          <li key={item.src}>
                            <Link
                              href={item.src} 
                              className={styles.ciwiFooterLink} 
                              target="_self">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul key={i} className={styles.ciwiFooterList}>
                      {section.items.map((item) => (
                        <li key={item.src}>
                          <Link 
                            href={item.src} 
                            className={styles.ciwiFooterLink} 
                            target="_self"
                            rel="noopener noreferrer"
                          >  
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )
                )}          
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 底部跳转社交链接 */}
      <div className={styles.bottom_inner}>
        <div className={styles.ciwi_bottom}>  
          <div>©️2025 Bogda limited Company</div>
            <div className={styles.ciwi_socialContacts}>
              {socialContacts.map(item=>{
                return (
                  <a href={item.src} key={item.type}>
                    <span>{item.type}</span>
                  </a>
                )
              })}
            </div>
        </div>
      </div>
    </Footer>
  );
};
