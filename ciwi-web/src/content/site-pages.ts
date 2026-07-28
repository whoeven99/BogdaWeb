const supportEmail = "support@ciwi.ai";
const effectiveDate = "July 27, 2026";
const legalEntity = "BOGDA COMPANY LIMITED";
const legalAddress = "1A-1L Tung Choi Street, Unit 08, 15/F, Mong Kok, Hong Kong";

export const sitePages = {
  about: {
    title: "关于我们 Ciwi.ai",
    description:
      "让每一个小品牌，都有机会走向全球市场。",
    contentHtml: `
      <p><strong>我们是谁？</strong> 我们是从业电商平台业务数十年的专家产品经理和专家工程师组成的团队，诞生于 2025 年。我们的愿景是让每一个小的品牌，都能走向全球。我们的使命是致力于让更多中小商家获得先进的技术来参与全球化市场的竞争，帮助他们塑造自己的生意和品牌。我们的价值观是不与时间为敌，做长期正确有价值的事情。</p>
      <p><strong>我们想为中小品牌做什么？</strong> 我们希望利用我们丰富的电商经验和视角，把这些专家知识变成可以让每一个品牌运营者都可以开箱即用的工具，帮助他们思考和管理自己的生意和品牌，更高效，更有用。我们在经营过程中发现许多人的生意和品牌并不是死在了产品自身，而是不懂全球化的规则、不清楚平台的规则和玩法，没有办法很好地使用数据工具进行决策。我们希望利用自己的经验和能力，帮助大家不踩坑，不被这些陌生领域的游戏规则束缚和打败。我们希望每一个品牌都专注地发挥自己的优势，做好产品，剩下的工作我们会基于先进的 AI Agent 技术来实现，与各个品牌一起发展和闯关。</p>
      <p><strong>为什么我们可以这样做？</strong> 我们团队有来自 Amazon、Tiktok、Temu 等知名电商平台的专家，同时我们拥有 Microsoft、bytedance 等多家世界级互联网公司的技术专家。我们不仅有来自平台视角的经验，也有先进的技术理念和工程能力，帮助中小商家获得和头部品牌一样的技术支持和科技赋能。</p>
    `,
  },
  contact: {
    title: "Contact Us",
    description: "如果你有任何问题或建议，可以直接联系 Ciwi 团队。",
    paragraphs: [
      "不用担心，我们会在24小时内回复你。",
      "你也可以先从 Shopify App Store、产品页或帮助文档开始，再决定是否需要进一步沟通。",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "This Privacy Policy explains how Ciwi collects, uses, stores, and protects information when merchants visit our website, install our Shopify apps, or use our AI-powered ecommerce services.",
    effectiveDate,
    contentHtml: `
      <p><strong>Effective date:</strong> ${effectiveDate}</p>
      <p>This Privacy Policy describes how ${legalEntity} (“Ciwi”, “we”, “our”, or “us”) collects, uses, discloses, and protects information when you visit <code>ciwi.ai</code>, install a Ciwi Shopify app, contact our team, or use any related products, integrations, or services (collectively, the “Services”).</p>
      <p>We build tools for Shopify merchants, including AI-enabled localization, content, and ecommerce workflow products. Because our Services may connect to Shopify and may process merchant or customer-related information, we aim to follow data minimization, transparency, and security principles that align with applicable privacy laws and Shopify platform requirements.</p>

      <h2>1. Scope</h2>
      <p>This Privacy Policy applies to information collected through our website, product interfaces, Shopify app listings, support channels, and related business operations. It does not apply to information processed by Shopify itself or by third-party services that maintain their own privacy notices.</p>

      <h2>2. Information we collect</h2>
      <p>The categories of information we may collect depend on how you interact with us and which Services you use.</p>
      <ul>
        <li><strong>Merchant account and store information:</strong> store name, store domain, Shopify shop identifiers, app installation status, plan or subscription details, locale, theme or configuration metadata, and settings required to provide the Services.</li>
        <li><strong>Contact and business information:</strong> name, company name, business email address, billing contact details, support history, and other information you provide when requesting demos, support, or commercial discussions.</li>
        <li><strong>Content and configuration inputs:</strong> product content, translations, glossary terms, prompts, instructions, SEO content, metafield-related data, and other materials you choose to process through the Services.</li>
        <li><strong>Usage and technical information:</strong> log data, browser type, device information, approximate location based on IP, pages visited, feature usage, event timestamps, crash diagnostics, and similar telemetry used to operate and secure the Services.</li>
        <li><strong>Cookies and similar technologies:</strong> essential cookies or similar technologies used for session handling, security, and basic website functionality. We do not use third-party analytics tools on the website at this time.</li>
        <li><strong>Protected customer data:</strong> where a feature legitimately requires access to Shopify customer-related information, we seek to access only the minimum data needed to provide that feature and only where the relevant Shopify permissions and merchant authorizations are in place.</li>
      </ul>

      <h2>3. How we collect information</h2>
      <ul>
        <li>Directly from you, such as when you contact us, install an app, configure a feature, or submit content for processing.</li>
        <li>Automatically through your use of our website or Services.</li>
        <li>From Shopify, when a merchant installs or authorizes one of our apps and Shopify makes store data available through approved APIs and scopes.</li>
        <li>From service providers that help us deliver hosting, support, communications, payments, infrastructure, and AI processing.</li>
      </ul>

      <h2>4. How we use information</h2>
      <ul>
        <li>Provide, maintain, support, and secure the Services.</li>
        <li>Authenticate merchants and connect authorized Shopify stores.</li>
        <li>Process translations, generate outputs, apply glossary rules, and perform other requested AI or automation tasks.</li>
        <li>Respond to support requests, onboarding questions, and commercial inquiries.</li>
        <li>Improve product performance, reliability, and user experience, but not by using Shopify Merchant Data or Customer Data to train general-purpose AI models unless separately agreed and lawfully permitted.</li>
        <li>Comply with legal obligations, enforce our terms, detect misuse, and protect our rights, users, and platform integrity.</li>
        <li>Send service-related messages, billing notices, and product updates. We send marketing communications only where permitted by law, and you may opt out where available.</li>
      </ul>

      <h2>5. Shopify data, customer data, and AI processing</h2>
      <p>If you install a Ciwi Shopify app, we may process Merchant Data and, where applicable and properly authorized, certain Customer Data made available through Shopify APIs. We aim to request and retain only the data reasonably necessary to deliver the functionality you use. Access to shop data, product data, store settings, and related activity data is based on merchant authorization and the Shopify permissions granted to the app.</p>
      <p>We do not access protected customer data unless the merchant has authorized the relevant scopes and the applicable Shopify requirements have been satisfied. If a merchant does not grant those permissions, we do not access that data.</p>
      <p>Our AI features use customer and merchant inputs to generate requested outputs such as translations, rewritten copy, glossary-controlled content, or related ecommerce content. We do not use merchant inputs to improve general-purpose models by default, and we do not use Shopify Merchant Data or Customer Data obtained through Shopify to train general-purpose AI or machine learning models.</p>

      <h2>6. Cookies and analytics</h2>
      <p>We may use limited cookies or similar technologies that are necessary for website operation, session continuity, and security. We do not currently use third-party analytics or advertising tracking tools on the website. Disabling essential cookies may affect website functionality.</p>

      <h2>7. How we share information</h2>
      <p>We do not sell personal information in exchange for money. We may share information in the following circumstances:</p>
      <ul>
        <li><strong>With service providers and subprocessors</strong> that support infrastructure, hosting, communications, payment administration, customer support, and AI processing. Our current subprocessors may include Tencent Cloud for email-related services, Shopify for billing and platform operations, and AI providers such as OpenAI, Google, and DeepSeek for approved AI processing tasks.</li>
        <li><strong>With Shopify</strong> as needed to operate within Shopify’s platform, comply with app requirements, manage billing, or respond to platform reviews and merchant requests.</li>
        <li><strong>With your direction</strong> when you authorize integrations, exports, or other workflows.</li>
        <li><strong>For legal and security reasons</strong> when reasonably necessary to investigate fraud, enforce our agreements, respond to lawful requests, or protect rights, safety, and platform integrity.</li>
        <li><strong>In a business transfer</strong> such as a merger, acquisition, financing, or asset sale, subject to appropriate confidentiality and legal safeguards.</li>
      </ul>

      <h2>8. Data retention</h2>
      <p>We retain information only for as long as reasonably necessary to provide the Services, comply with contractual and legal obligations, resolve disputes, enforce agreements, and maintain security and business records.</p>
      <ul>
        <li><strong>Application and technical logs:</strong> generally retained for up to 14 days.</li>
        <li><strong>Billing, support, and operational records:</strong> generally retained for up to 60 days after uninstall or account termination, unless a longer period is required by law, dispute resolution, or a valid security reason.</li>
        <li><strong>Merchant-related service data:</strong> if the app is uninstalled or deletion is requested, data associated with that merchant is generally deleted within 60 days, subject to lawful exceptions.</li>
      </ul>

      <h2>9. International transfers</h2>
      <p>Our Services may be operated from and supported in multiple jurisdictions. Data may be processed or stored outside your local jurisdiction, including on servers located in the United States. Where required, we use appropriate safeguards for cross-border data transfers.</p>

      <h2>10. Security</h2>
      <p>We use administrative, technical, and organizational measures designed to protect information against unauthorized access, loss, misuse, alteration, or disclosure. No system is perfectly secure, and we cannot guarantee absolute security.</p>

      <h2>11. Your rights and choices</h2>
      <p>Depending on your jurisdiction, you may have rights to access, correct, delete, restrict, object to, or request portability of certain personal information. You may also have the right to withdraw consent where processing is based on consent.</p>
      <p>If you are a merchant using our Shopify apps, some requests may need to be handled in coordination with Shopify or with your own obligations to end customers. We may ask you to verify your identity before processing certain requests. To request access, correction, deletion, or other privacy support, please email <a href="mailto:${supportEmail}">${supportEmail}</a>. Merchants may also use this email address to request deletion of store data.</p>

      <h2>12. Data Processing Addendum</h2>
      <p>Where required for merchant compliance or enterprise review, we can provide a Data Processing Addendum (“DPA”) describing processing roles, security commitments, subprocessors, and related data protection terms.</p>

      <h2>13. Children’s privacy</h2>
      <p>Our Services are designed for businesses and are not directed to children. We do not knowingly collect personal information from children in a manner requiring parental consent under applicable law.</p>

      <h2>14. Changes to this Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time to reflect changes to our Services, legal obligations, security practices, or Shopify platform requirements. We will post the updated version on this page and revise the effective date above. Material changes may also be communicated through the Services or by email where appropriate.</p>

      <h2>15. Contact us</h2>
      <p>${legalEntity}<br />${legalAddress}</p>
      <p>If you have questions about this Privacy Policy, data protection matters, or requests regarding your information, please contact us at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
    `,
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "These Terms & Conditions govern your access to the Ciwi website, Shopify apps, and AI-powered ecommerce services, including rules for acceptable use, billing, intellectual property, and platform compliance.",
    effectiveDate,
    contentHtml: `
      <p><strong>Effective date:</strong> ${effectiveDate}</p>
      <p>These Terms & Conditions (“Terms”) govern your access to and use of the Ciwi website, Shopify applications, software, APIs, content, and related services provided by ${legalEntity} (“Ciwi”, “we”, “our”, or “us”). By accessing or using the Services, you agree to these Terms. If you are using the Services on behalf of a company or other entity, you represent that you have authority to bind that entity to these Terms.</p>

      <h2>1. The Services</h2>
      <p>Ciwi provides software and AI-enabled tools for Shopify merchants and ecommerce teams, including localization, translation, content operations, and related workflow capabilities. Some features may be available through the Ciwi website, embedded Shopify apps, custom implementations, APIs, support channels, or separately agreed commercial arrangements.</p>

      <h2>2. Eligibility and accounts</h2>
      <ul>
        <li>You must be legally able to enter into a binding agreement to use the Services.</li>
        <li>You are responsible for ensuring that account information, store details, and billing information remain accurate and up to date.</li>
        <li>You are responsible for activity that occurs under your accounts, API credentials, team seats, and store connections.</li>
        <li>You must keep login credentials and tokens confidential and promptly notify us of any suspected unauthorized access.</li>
      </ul>

      <h2>3. Shopify platform relationship</h2>
      <p>If you use a Ciwi Shopify app, you remain responsible for complying with your agreements with Shopify, including any Shopify merchant terms, platform rules, API restrictions, app billing requirements, and applicable store obligations. Shopify may independently enforce its own rules, review our app, or limit access to Shopify data or platform features.</p>
      <p>Nothing in these Terms modifies Shopify’s rights or obligations. If a Shopify rule or platform requirement requires us to change part of the Services, we may do so as needed to remain compliant.</p>

      <h2>4. Merchant responsibilities</h2>
      <ul>
        <li>You are responsible for the accuracy, legality, and rights clearance of content, prompts, product data, glossary terms, translations, and instructions you submit to the Services.</li>
        <li>You are responsible for reviewing outputs before publishing or relying on them in your storefront, ads, support materials, legal disclosures, or customer communications.</li>
        <li>You are responsible for configuring your Shopify store, themes, settings, and permissions in a lawful and commercially reasonable manner.</li>
        <li>You must ensure that your use of the Services complies with applicable law, including privacy, consumer protection, advertising, intellectual property, and export control laws.</li>
      </ul>

      <h2>5. AI features and generated output</h2>
      <p>Certain features use AI or machine-learning-assisted systems to generate, transform, summarize, classify, or optimize content. AI-generated output may be incomplete, inaccurate, biased, outdated, or unsuitable for your specific business context.</p>
      <p>You should not rely on the Services as your sole basis for legal, regulatory, tax, employment, medical, financial, or other high-risk decisions. You remain responsible for human review, merchant approval, and any final publication or operational use of outputs.</p>
      <p>Our Services may use your submitted inputs to generate outputs for your store or workflow. We do not use your Shopify Merchant Data or Customer Data for general-purpose model training by default.</p>

      <h2>6. Data use restrictions</h2>
      <p>You grant Ciwi a limited right to host, copy, transmit, process, and otherwise use data you submit to the Services only as necessary to provide, secure, maintain, and improve the Services, comply with law, and enforce these Terms.</p>
      <p>Where Services connect to Shopify, both parties acknowledge the sensitivity of Merchant Data and Customer Data. We aim to access only the minimum information needed for the requested functionality. Access to shop data, product data, and relevant store activity depends on merchant authorization and Shopify-approved permissions. We do not access protected customer data unless the merchant authorizes it and the applicable Shopify requirements are satisfied.</p>
      <p>Unless expressly agreed in writing and permitted by Shopify rules and applicable law, Ciwi will not use Merchant Data or Customer Data obtained through Shopify to train general-purpose AI or machine-learning models.</p>

      <h2>7. Fees, billing, and subscriptions</h2>
      <ul>
        <li>Paid features may be offered on a subscription, usage-based, project, or custom pricing basis.</li>
        <li>Where billing is handled through Shopify, the applicable Shopify billing flow, charges, taxes, renewals, approvals, and cancellation mechanics apply in addition to these Terms.</li>
        <li>You authorize us and our billing partners to charge applicable fees, taxes, and approved overages using your selected payment method or Shopify billing authorization.</li>
        <li>Monthly plans are generally billed in advance for each billing cycle. Annual plans, if offered, are billed in advance for the applicable annual period. Trial periods, if offered, end automatically unless the merchant cancels before the trial expires.</li>
        <li>If the app is uninstalled, Shopify may automatically cancel future recurring charges. In line with Shopify billing behavior, uninstalling does not automatically create a prorated refund or credit for the unused remainder of the current billing period unless otherwise required by law or expressly approved by us.</li>
        <li>Upgrades, downgrades, replacement subscriptions, prorations, deferrals, and app credits may be handled according to the applicable Shopify billing flow and configuration in effect at the time of the plan change.</li>
        <li>Unless otherwise stated in writing, fees are non-refundable except where required by law or expressly approved by us. Refund or billing review requests should be sent to <a href="mailto:${supportEmail}">${supportEmail}</a> with relevant store and invoice details.</li>
        <li>We may change pricing or packaging from time to time. Where required, we will provide advance notice before material pricing changes take effect.</li>
      </ul>

      <h2>8. Acceptable use</h2>
      <p>You may not, and may not permit others to:</p>
      <ul>
        <li>use the Services in violation of law, regulation, third-party rights, or Shopify platform rules;</li>
        <li>upload or process unlawful, infringing, deceptive, defamatory, abusive, or harmful content;</li>
        <li>attempt to reverse engineer, probe, disrupt, overload, or bypass security or usage limits of the Services;</li>
        <li>use the Services to build competing datasets or models from restricted Shopify data in a manner prohibited by contract, law, or platform policy;</li>
        <li>misrepresent generated content as verified fact when such representation would be deceptive or unlawful;</li>
        <li>use automated means to scrape the Services except where we expressly permit it in writing.</li>
      </ul>

      <h2>9. Intellectual property</h2>
      <p>Ciwi and its licensors retain all rights, title, and interest in and to the Services, including software, models, interfaces, documentation, branding, and related intellectual property. These Terms do not transfer ownership of our technology to you.</p>
      <p>Subject to these Terms and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, revocable right to use the Services for your internal business purposes.</p>
      <p>As between the parties, you retain your rights in your underlying content and store data. To the extent permitted by law and third-party terms, you may use outputs generated for you through the Services, but your rights in those outputs may be limited by the nature of third-party inputs, model behavior, or applicable law.</p>

      <h2>10. Confidentiality</h2>
      <p>Each party may receive confidential information from the other. The receiving party will use the other party’s confidential information only as needed to perform under these Terms and will protect it using reasonable safeguards. This section does not apply to information that is public without breach, independently developed, or rightfully received from another source without confidentiality obligations.</p>

      <h2>11. Termination and suspension</h2>
      <p>You may stop using the Services at any time, subject to any outstanding fees or plan commitments. We may suspend or terminate access immediately if we reasonably believe you have violated these Terms, created security or legal risk, failed to pay fees, or if continued provision would conflict with law, third-party obligations, or Shopify platform requirements.</p>
      <p>If the Services are uninstalled or terminated, merchant-related data is generally deleted within 60 days, subject to lawful retention obligations, dispute resolution needs, or valid security requirements. Upon termination, your right to use the Services ends, but provisions that by their nature should survive termination will remain in effect, including payment obligations, disclaimers, limitations of liability, indemnities, and intellectual property provisions.</p>

      <h2>12. Disclaimers</h2>
      <p>To the maximum extent permitted by law, the Services are provided “as is” and “as available.” Ciwi disclaims all warranties, whether express, implied, statutory, or otherwise, including warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted availability, accuracy, or error-free operation.</p>

      <h2>13. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, Ciwi will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, goodwill, data, or business opportunity, even if advised of the possibility of such damages.</p>
      <p>To the maximum extent permitted by law, Ciwi’s aggregate liability arising out of or relating to the Services or these Terms will not exceed the greater of: (a) the amount you paid to Ciwi for the Services in the twelve months before the event giving rise to the claim; or (b) USD $100.</p>

      <h2>14. Indemnity</h2>
      <p>You will defend, indemnify, and hold harmless Ciwi and its affiliates, officers, directors, employees, and agents from and against claims, damages, liabilities, losses, costs, and expenses arising out of or related to your content, your store operations, your misuse of the Services, or your breach of these Terms or applicable law.</p>

      <h2>15. Governing law and jurisdiction</h2>
      <p>These Terms are governed by the laws of Hong Kong, without regard to conflict of laws principles. Unless applicable law requires otherwise, the courts of Hong Kong will have exclusive jurisdiction over disputes arising out of or relating to these Terms or the Services.</p>

      <h2>16. Data Processing Addendum</h2>
      <p>Where required, we can provide a Data Processing Addendum describing relevant processing terms, subprocessors, and responsibilities for merchant data.</p>

      <h2>17. Changes to the Services or Terms</h2>
      <p>We may update the Services or these Terms from time to time to reflect new features, security needs, legal requirements, or Shopify platform changes. If we make a material change, we may provide notice by posting an updated version on our website, through the app, or by email where appropriate. Your continued use of the Services after the updated Terms become effective constitutes acceptance of the revised Terms.</p>

      <h2>18. Contact us</h2>
      <p>${legalEntity}<br />${legalAddress}</p>
      <p>If you have questions about these Terms, please contact us at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
    `,
  },
};
