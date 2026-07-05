import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  description: string;
  href: string;
  icon: string;
  metrics: string[];
};

export function ProductCard({name, description, href, icon, metrics}: ProductCardProps) {
  return (
    <article className="feature-card">
      <div className="feature-card__icon">
        <Image src={icon} alt={name} width={24} height={24} />
      </div>
      <h3>{name}</h3>
      <p className="quote">{description}</p>
      <div className="tag-list space-top-md">
        {metrics.slice(0, 2).map((metric) => (
          <span key={metric} className="pill">
            {metric}
          </span>
        ))}
      </div>
      <div className="space-top-lg">
        <Link href={href} className="site-nav__link">
          View details
        </Link>
      </div>
    </article>
  );
}
