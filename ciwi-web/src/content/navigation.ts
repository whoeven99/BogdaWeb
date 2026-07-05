export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  {label: "Products", href: "/products"},
  {label: "Solutions", href: "/solutions"},
  {label: "Demo", href: "/demo"},
  {label: "Resources", href: "/resources"},
  {label: "Pricing", href: "/pricing"},
  {label: "About", href: "/about"},
];

export const footerNavigation = {
  products: [
    {label: "AI Translator", href: "/products/translator"},
    {label: "Bundle Discount", href: "/products/bundle-discount"},
    {label: "Content AI", href: "/products/content-ai"},
  ],
  resources: [
    {label: "Blog", href: "/blog"},
    {label: "Help Center", href: "/help-center"},
    {label: "Resources", href: "/resources"},
  ],
  company: [
    {label: "About", href: "/about"},
    {label: "Contact", href: "/contact"},
    {label: "Pricing", href: "/pricing"},
  ],
  legal: [
    {label: "Privacy Policy", href: "/privacy-policy"},
    {label: "Terms & Conditions", href: "/terms-and-conditions"},
  ],
};
