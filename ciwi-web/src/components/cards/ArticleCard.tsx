import Link from "next/link";

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
  meta: string[];
};

export function ArticleCard({title, description, href, meta}: ArticleCardProps) {
  return (
    <article className="resource-card">
      <div className="resource-card__meta">
        {meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <h3>{title}</h3>
      <p className="quote">{description}</p>
      <div className="space-top-lg">
        <Link href={href} className="site-nav__link">
          Open resource
        </Link>
      </div>
    </article>
  );
}
