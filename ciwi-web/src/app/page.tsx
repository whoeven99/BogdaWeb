"use client";

import Image from "next/image";
import { Avatar, Button, Carousel, Collapse, CollapseProps, Rate ,Flex} from "antd";
import { useState } from "react";
import styles from "./css/styles.module.css";
import Link from "next/link";
const ciwiDownLoadItems = [
  {
    title: "Ciwi-Translator",
    icon: "/shopify.png",
    link: "https://apps.shopify.com/translator-by-ciwi",
    stars: 4.9,
  },
];

const ciwiProducts = [
  {
    label: "AI Translation",
    icon: '/translate.svg',
    description:
      "One-click full translation of your Shopify store to increase conversion rates in different countries.",
  },
  {
    label: "AI Image Translation",
    icon: '/ai-generate-landscape-image-spark.svg',
    description:
      "Automatically detect text in images and replace it with the local language to enhance brand trust.",
  },
  {
    label: "AI Product Description",
    icon: '/ai-generate-2.svg',
    description:
      "Write hundreds of high-conversion product descriptions within seconds, supporting over 100 product description templates.",
  },
  {
    label: "AI Product Blog Writer",
    icon: '/create.svg',
    description:
      "Schedule the creation and publishing of promotional blogs related to your products.",
  },
  {
    label: "AI Product FAQ",
    icon: '/subscriptions-created-outlined.svg',
    description:
      "Generate more SEO traffic and AI search traffic by automatically creating FAQs.",
  },
];

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "auto",
  color: "#fff",
  lineHeight: "160px",
  justifyContent: "center",
  background: "#364d79",
};

const ciwiProductReviewinfo = [
  {
    avatar:"/avatar/avatar-1.png",
    name: "21Collagen",
    stars: 5,
    review:
      "This app is incredibly helpful for fast and accurate translations—practically error-free. Yes, you do pay credits for translations (unless you connect your own API), but in return, you avoid the hassle of dealing with human translators and wasted time. The support team is responsive and very professional. <br> In our case, we managed to translate an entire language in just 3 hours—a phenomenal speed compared to the 5–10 days it used to take us before. <br> Highly recommended if you value efficiency, speed, and reliability in your translation workflow.",
  },
  {
    avatar:"/avatar/avatar-2.png",
    name: "Dali Experience",
    stars: 5,
    review:
      "I tried this app，the great side is very easy to use. And the translation result is perfectly displayed, not feel like a third-party plug-in, pretty immpresive. I used it for my 4th and 5th language(shopify only provide 3 languages).",
  },
  {
    avatar:"/avatar/avatar-3.png",
    name: "HawkSling",
    stars: 5,
    review:
      "It's very user-friendly. The official translation app only supports two languages, which perfectly makes up for that shortcoming. Moreover, it's more convenient to use than other applications. The customer response is also very prompt, which has helped me solve a lot of problems.",
  },
  {
    avatar:"/avatar/avatar-4.png",
    name: "Tealibere",
    stars: 5,
    review:
      "I have tried many translation apps, and this one has a very high cost-effectiveness, accurate translation, simple interface, and comprehensive functions. Customer service is always available to provide support",
  },
  {
    avatar:"/avatar/avatar-5.png",
    name: "Orientaleaf",
    stars: 5,
    review:
      "We've been using this translation app for a while, and it's been excellent. The customer service is fast and very helpful — every time we had a question, they responded quickly and solved it efficiently. <br> One of the standout features is the ability to choose different LLMs for translation. The translations aren't just word-for-word; they take the context into account, which makes the final result much more natural and accurate. <br> Special thanks to Allen for his outstanding support — he’s been incredibly helpful throughout. Highly recommended!",
  },
  {
    avatar:"/avatar/avatar-6.png",
    name: "Mablebaby",
    stars: 5,
    review:
      "This is a very professional team. I encountered many issues, but their communication skills and service were highly professional and efficient. They resolved any problems quickly. I translated the content into Arabic, Spanish, and German, and it turned out great. I highly recommend them. If you have any doubts, I strongly suggest reaching out to their team for assistance.",
  },
  {
    avatar:"/avatar/avatar-7.png",
    name: "BeQueenWig FR",
    stars: 5,
    review:
      "This software is very easy to use. When you have a need, you can communicate with the technicians and get feedback immediately and handle it. The efficiency is very high and the fee is not high.",
  },
  {
    avatar:"/avatar/avatar-8.png",
    name: "Cooviphair",
    stars: 5,
    review:
      "Absolutely love this app! The support team is amazing — super friendly and always quick to respond whenever I have a question. The app itself is very easy to use and works perfectly for translating our store content.",
  },
  {
    avatar:"/avatar/avatar-9.png",
    name: "Orientaleaf",
    stars: 5,
    review:
      "We've been using this translation app for a while, and it's been excellent. The customer service is fast and very helpful — every time we had a question, they responded quickly and solved it efficiently.One of the standout features is the ability to choose different LLMs for translation. The translations aren't just word-for-word; they take the context into account, which makes the final result ...",
  },
];

const ciwiFAQItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "What is ciwi?",
    children: (
      <div style={{ fontSize: '16px', color: '#545c66',fontWeight:'400',lineHeight:'24px' }}>
        ciwi is an AI-powered technology brand focused on helping Shopify
        merchants grow conversions. We leverage large language models to assist
        e-commerce brands in acquiring new customers, increasing repeat
        purchases, and raising average order value—building trust and long-term
        success for every brand.
      </div>
    ),
  },
  {
    key: "2",
    label: "How do I use AI translation?",
    children: (
      <div style={{ fontSize: '16px', color: '#545c66',fontWeight:'400',lineHeight:'24px' }}>
        Simply search for “ciwi” on the Shopify App Store, install our app in
        your store, and click “Translate” to start translating your content
        instantly.
      </div>
    ),
  },
  {
    key: "3",
    label: "Can I use the product for free?",
    children: (
      <div style={{ fontSize: '16px', color: '#545c66',fontWeight:'400',lineHeight:'24px' }}>
        Yes, we offer a 5-day free trial and 200,000 credits for every store
        that installs the app, allowing you to explore AI-powered translations
        at no cost.
      </div>
    ),
  },
  {
    key: "4",
    label: "How does ciwi deliver higher quality translations at lower cost?",
    children: (
      <div style={{ fontSize: '16px', color: '#545c66',fontWeight:'400',lineHeight:'24px' }}>
        Our team comes from top tech companies and has extensive experience in
        large AI models. We’ve developed proprietary e-commerce translation
        strategies, fully adapted to Shopify’s data structure—covering both
        content and code protection. To reduce cost, we use a dedicated
        terminology database and compression technology to accelerate and
        optimize frequently used translations.
      </div>
    ),
  },
];

const link = 'translator';

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main
      style={{
        backgroundColor: "#fff",
      }}
    >
      <div className={styles.ciwiMainContainer}>
        <div className={styles.ciwiMainButton}>
          <div className={styles.ciwiMainText}>
            <h1 className={styles.ciwiMainTitle}>
              All-in-one Shopify AI Translation
            </h1>
            <span className={styles.ciwiMainSubtitle}>
              Our App auto-translates store content and continuously syncs
              updates, saving users time. We support top AI models like
              ChatGPT-4, DeepSeek, delivering native-level accuracy. Our
              proprietary multi-model recognition optimizes Shopify data,
              including metafields and Liquid.
            </span>
          </div>
          <Flex gap="middle" className={styles.freeTrybtns}>
            <Link href="https://apps.shopify.com/translator-by-ciwi">
              <Button
                type="primary"
                size="large"
                // icon={<ChromeOutlined />}
                className={styles.ciwiMainAddtoShopify}
              >
                Free to try
              </Button>
            </Link>
            <Link href={link}>
              <Button
                type="primary"
                size="large"
                // icon={<ChromeOutlined />}
                className={styles.learnMore}
              >
                Learn More
              </Button>
            </Link>
          </Flex>
          
          
        </div>
        <div className={styles.ciwiIntroduce}>
          <Image
            className={styles.ciwiIntroduceImg}
            src="/screenshots/1.png"
            alt="Ciwi"
            width={1200}
            height={762}
          />
          <video
            className={styles.ciwiIntroduceVideo}
            src="https://website-1327177217.cos.ap-shanghai.myqcloud.com/herovideo.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
      <div className={styles.ciwiDownLoad}>
        {ciwiDownLoadItems.map((item, index) => (
          <a href={item.link} key={index} target="_blank" rel="noreferrer">
            <div className={styles.ciwiDownLoadItem} key={index}>
              <div className={styles.ciwiDownLoadItemIcon}>
                <Image
                  className={styles.ciwiDownLoadItemIconImg}
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                />
              </div>
              <div className={styles.ciwiDownLoadItemInfo}>
                <div className={styles.ciwiDownLoadItemInfoStars}>
                  <div className={styles.ciwiDownLoadItemInfoStarsText}>
                    {item.stars} / 5
                  </div>
                  <Rate allowHalf value={item.stars} disabled />
                </div>
                <div className={styles.ciwiDownLoadItemInfoText}>
                  On Shopify
                </div>
              </div>
            </div>
          </a>
        ))}
        <a href="https://www.shopify.com/nz/become-a-partner  ">
          <div className={styles.ciwiDownLoadItem}>
            <div className={styles.ciwiDownLoadItemIcon}>
              <Image
                className={styles.ciwiDownLoadItemIconImg}
                src="/shopify-developer.png"
                alt="built for shopify"
                width={40}
                height={40}
              />
            </div>
            <div className={styles.ciwiDownLoadItemInfo}>
              {/* <Image
                src="/badge-built-for-shopify-light 1.png"
                alt="built for shopify"
                width={200}
                height={22}
              /> */}
              <Image 
                src="/20250813-132858.png"
                alt="built for shopify"
                width={100}
                height={100}
              />
              <div className={styles.ciwiDownLoadItemInfoText}>
                Shopify Partner
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className={styles.ciwiProduct}>
        <div className={styles.ciwiProductTitle}>
          <h1 className={styles.ciwiSecondaryTitle}>All-in-one AI assistant</h1>
        </div>
        <div className={styles.ciwiProductBar}>
          <div className={styles.ciwiProductBarItemContainer}>
            {ciwiProducts.map((item, index) => (
              <div
                className={`${styles.ciwiProductBarItem} ${
                  activeIndex === index ? styles.ciwiProductBarItemActive : ""
                }`}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                {/* <div className={styles.ciwiProductBarItemIcon}>{item.icon}</div> */}
                <Image className={styles.ciwiProductBarItemIcon} src={item.icon} alt="ciwiProductBarItemIcon" width={32} height={32}/>
                <div className={styles.ciwiProductBarItemLabel}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <span className={styles.ciwiMainSubtitle}>
            {ciwiProducts[activeIndex].description}
          </span>
        </div>
      </div>
      <div className={styles.ciwiProductDemoVideoContainer}>
        <div className={styles.ciwiProductDemoVideoCarousel}>
          <Carousel arrows={true} effect="fade">
            <div>
              <video
                src="https://website-1327177217.cos.ap-shanghai.myqcloud.com/herovideo.mp4"
                autoPlay
                loop
                muted
                style={contentStyle}
              />
            </div>
            <div>
              <video
                src="https://website-1327177217.cos.ap-shanghai.myqcloud.com/herovideo.mp4"
                autoPlay
                loop
                muted
                style={contentStyle}
              />
            </div>
            <div>
              <video
                src="https://website-1327177217.cos.ap-shanghai.myqcloud.com/herovideo.mp4"
                autoPlay
                loop
                muted
                style={contentStyle}
              />
            </div>
            <div>
              <video
                src="https://website-1327177217.cos.ap-shanghai.myqcloud.com/herovideo.mp4"
                autoPlay
                loop
                muted
                style={contentStyle}
              />
            </div>
          </Carousel>
        </div>
      </div>
      <div className={styles.ciwiProductIntroduction}>
        <h1 className={styles.ciwiSecondaryTitle}>
          How to Use AI to Boost Your Conversion Rate
        </h1>
        <div className={styles.ciwiProductIntroductionGrid}>
          <div className={styles.ciwiProductIntroductionCard}>
            <h2 className={styles.ciwiProductIntroductionCardTitle}>
              Based on the GPT-4 large language model
            </h2>
            <div className={styles.ciwiProductIntroductionCardDesc}>
              With just one click, you can use AI to translate content that
              matches your brand tone.
            </div>
            <div className={styles.placeholderImg}></div>
          </div>
          <div className={styles.ciwiProductIntroductionCard}>
            <h2 className={styles.ciwiProductIntroductionCardTitle}>
              Supports over 100 international currencies
            </h2>
            <div className={styles.ciwiProductIntroductionCardDesc}>
              Automatically switches language and currency based on visitor IP
              to boost conversion rates.
            </div>
            <div className={styles.placeholderImg}></div>
          </div>
          <div className={styles.ciwiProductIntroductionCard}>
            <h2 className={styles.ciwiProductIntroductionCardTitle}>
              Automatically updates translations
            </h2>
            <div className={styles.ciwiProductIntroductionCardDesc}>
              daily for new content—no manual action needed.
            </div>
            <div className={styles.placeholderImg}></div>
          </div>
          <div className={styles.ciwiProductIntroductionCard}>
            <h2 className={styles.ciwiProductIntroductionCardTitle}>
              Fully compatible with Shopify’s data structure
            </h2>
            <div className={styles.ciwiProductIntroductionCardDesc}>
              supports translation of HTML, Metafields, and other special
              formats.
            </div>
            <div className={styles.placeholderImg}></div>
          </div>
          <div
            className={`${styles.ciwiProductIntroductionCard} ${styles.ciwiProductIntroductionCardLast}`}
          >
            <h2 className={styles.ciwiProductIntroductionCardTitle}>
              Custom Prompts
            </h2>
            <div className={styles.ciwiProductIntroductionCardDesc}>
              Adjust prompts to ensure translations better match your store’s
              style.
            </div>
            <div className={styles.placeholderImg}></div>
          </div>
        </div>{" "}
      </div>
      <div className={styles.ciwiProductReview}>
        <h1
          className={styles.ciwiSecondaryTitle}
          style={{ marginBottom: "48px" }}
        >
          Trusted by 10 million users worldwide.
        </h1>
        {/* <div className={styles.ciwiProductReviewInfo}>
          <div className={styles.ciwiProductReviews}>
            <div className={styles.ciwiCountBold}>160,000+</div>
            <div className={styles.ciwiSecondaryText}>Reviews</div>
          </div>
          <div className={styles.ciwiProductAllStars}>
            <div className={styles.ciwiProductAllStarsText}>
              <div className={styles.ciwiCountBold}>4.9</div>
              <Rate allowHalf value={5} disabled />
            </div>
            <div className={styles.ciwiDownLoadItemInfoText}>On Shopify</div>
          </div>
          <div className={styles.ciwiProductAllUsers}>
            <div className={styles.ciwiCountBold}>10,000,000+</div>
            <div className={styles.ciwiSecondaryText}>Users</div>
          </div>
        </div> */}
        <div className={styles.ciwiProductReviewCards}>
          {ciwiProductReviewinfo.map((item, index) => (
            <div className={styles.ciwiProductReviewCard} key={index}>
              <div className={styles.ciwiProductReviewCardHeader}>
                <div className={styles.avatarBox}>
                  <Image
                    src={item.avatar}
                    alt={item.avatar}
                    width={100}
                    height={100}
                  />
                </div>
                <span className={styles.ciwiProductReviewCardName}>
                  {item.name}
                </span>
              </div>
              <Rate allowHalf value={item.stars} disabled />
              <div
                className={styles.ciwiProductReviewCardContent}
                dangerouslySetInnerHTML={{ __html: item.review }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.ciwiFAQ}>
        <h1 className={styles.ciwiSecondaryTitle}>
          Frequently asked questions
        </h1>
        <Collapse
          items={ciwiFAQItems}
          className={styles.my_collapse}
          style={{
            maxWidth: "1200px",
            width: "80%",
            fontSize:"20px",
            fontWeight:"600",
            lineHeight:"28px",
            backgroundColor: "white",
          }}
        />
      </div>
      {/* <div className={styles.ciwiGetNowCard}>
        <h2 className={styles.ciwiSecondaryTitle}>
          Unleash your true potential,
          <br />
          get Monica now!
        </h2>
        <Button
          type="primary"
          size="large"
          icon={<ChromeOutlined />}
          className={styles.ciwiMainAddtoShopify}
        >
          Add to Shopify
        </Button>
      </div> */}
    </main>
  );
};

export default Index;
