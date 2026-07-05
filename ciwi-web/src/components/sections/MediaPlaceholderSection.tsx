import {SectionHeading} from "@/components/ui/SectionHeading";
import type {MediaAssetBrief} from "@/content/media-briefs";

type MediaPlaceholderSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: MediaAssetBrief[];
  compact?: boolean;
};

export function MediaPlaceholderSection({
  eyebrow = "Media placeholder",
  title,
  description,
  items,
  compact = false,
}: MediaPlaceholderSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className={`page-section ${compact ? "page-section--compact" : ""}`}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="media-placeholder-grid">
        {items.map((item) => (
          <article key={`${item.placement}-${item.title}`} className="media-placeholder-card">
            <div className="media-placeholder-card__frame">
              <span className="media-placeholder-card__label">{item.format}</span>
              <span className="media-placeholder-card__ratio">{item.aspectRatio}</span>
            </div>
            <div className="section-stack">
              <div>
                <h3>{item.title}</h3>
                <p className="quote">{item.description}</p>
              </div>
              <div className="media-placeholder-card__meta">
                <strong>Placement</strong>
                <p>{item.placement}</p>
              </div>
              <div>
                <strong className="media-placeholder-card__list-title">Asset brief</strong>
                <ul className="check-list">
                  {item.checklist.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
