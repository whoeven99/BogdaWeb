type TestimonialCardProps = {
  name: string;
  tag: string;
  quote: string;
};

export function TestimonialCard({name, tag, quote}: TestimonialCardProps) {
  return (
    <article className="testimonial-card">
      <div className="article-meta">
        <span>{name}</span>
        <span>{tag}</span>
      </div>
      <p className="quote">“{quote}”</p>
    </article>
  );
}
