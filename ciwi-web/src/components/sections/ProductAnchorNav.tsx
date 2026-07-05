type AnchorItem = {
  label: string;
  href: string;
};

type ProductAnchorNavProps = {
  items: AnchorItem[];
};

export function ProductAnchorNav({items}: ProductAnchorNavProps) {
  return (
    <section className="page-section page-section--compact">
      <div className="anchor-nav">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="anchor-nav__link">
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}
