import Image from "next/image";
import type {ComponentPropsWithoutRef, ReactNode} from "react";

import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {Button} from "@/components/ui/Button";
import {isExternalHref} from "@/lib/i18n";

type ContentImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

type VideoEmbedProps = {
  title: string;
  src: string;
  caption?: string;
};

type CalloutProps = {
  title?: string;
  tone?: "default" | "success" | "warning";
  children: ReactNode;
};

type CtaCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  variant?: "primary" | "secondary" | "ghost" | "dark";
};

type FaqAccordionProps = {
  items: {question: string; answer: string}[];
};

type ComparisonTableProps = {
  columns: string[];
  rows: {label: string; values: string[]}[];
};

type FeatureGridProps = {
  items: {eyebrow?: string; title: string; description: string}[];
};

function ContentImage({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
  priority = false,
}: ContentImageProps) {
  return (
    <figure className="mdx-figure">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="mdx-figure__image"
      />
      {caption ? <figcaption className="mdx-figure__caption">{caption}</figcaption> : null}
    </figure>
  );
}

function VideoEmbed({title, src, caption}: VideoEmbedProps) {
  return (
    <figure className="mdx-video">
      <div className="mdx-video__frame">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {caption ? <figcaption className="mdx-video__caption">{caption}</figcaption> : null}
    </figure>
  );
}

function Callout({title, tone = "default", children}: CalloutProps) {
  return (
    <aside className={`mdx-callout mdx-callout--${tone}`}>
      {title ? <strong className="mdx-callout__title">{title}</strong> : null}
      <div className="mdx-callout__body">{children}</div>
    </aside>
  );
}

function CtaCard({eyebrow, title, description, href, buttonLabel, variant = "primary"}: CtaCardProps) {
  return (
    <section className="mdx-cta-card">
      {eyebrow ? <span className="section-heading__eyebrow">{eyebrow}</span> : null}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="mdx-cta-card__actions">
        <Button href={href} variant={variant}>{buttonLabel}</Button>
      </div>
    </section>
  );
}

function FaqAccordion({items}: FaqAccordionProps) {
  return (
    <div className="mdx-faq-list">
      {items.map((item) => (
        <details key={item.question} className="mdx-faq-item">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

function ComparisonTable({columns, rows}: ComparisonTableProps) {
  return (
    <div className="mdx-comparison-table">
      <table>
        <thead>
          <tr>
            <th>Criteria</th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th>{row.label}</th>
              {row.values.map((value, index) => (
                <td key={`${row.label}-${columns[index] ?? index}`}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureGrid({items}: FeatureGridProps) {
  return (
    <div className="mdx-feature-grid">
      {items.map((item) => (
        <article key={`${item.title}-${item.eyebrow ?? ""}`} className="mdx-feature-card">
          {item.eyebrow ? <span className="mdx-feature-card__eyebrow">{item.eyebrow}</span> : null}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function a(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";

  if (!href || isExternalHref(href)) {
    return (
      <a
        {...props}
        target={href.startsWith("http") ? "_blank" : props.target}
        rel={href.startsWith("http") ? "noreferrer" : props.rel}
      />
    );
  }

  return <LocalizedLink href={href} {...props} />;
}

export const mdxComponents = {
  ContentImage,
  VideoEmbed,
  Callout,
  CtaCard,
  FaqAccordion,
  ComparisonTable,
  FeatureGrid,
  a,
};
