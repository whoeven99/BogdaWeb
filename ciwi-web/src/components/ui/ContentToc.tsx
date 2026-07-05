import Link from "next/link";

import type {ContentSection} from "@/lib/content/sections";

type ContentTocProps = {
  items: ContentSection[];
  title?: string;
};

export function ContentToc({items, title = "On this page"}: ContentTocProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav className="surface-card section-stack toc-card" aria-label="Table of contents">
      <div>
        <h3>{title}</h3>
        <p className="quote">帮助用户快速定位重点，也让详情页结构更稳定。</p>
      </div>
      <div className="toc-list">
        {items.map((item) => (
          <Link key={item.id} href={`#${item.id}`} className="toc-link">
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
