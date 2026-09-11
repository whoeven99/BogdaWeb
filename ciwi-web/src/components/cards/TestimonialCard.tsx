type TestimonialCardProps = {
  name: string;
  tag: string;
  quote: string;
};

export function TestimonialCard({name, tag, quote}: TestimonialCardProps) {
  const avatarLabel = name
    .split(/[\s/-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <article className="testimonial-card h-full rounded-[28px] p-7 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
            {avatarLabel}
          </div>
          <div className="space-y-1">
            <div className="text-base font-semibold tracking-[-0.03em] text-slate-950">{name}</div>
            <div className="text-sm text-slate-500">{tag}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
          {Array.from({length: 5}).map((_, index) => (
            <svg key={index} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M10 1.75 12.55 6.92l5.7.83-4.13 4.03.98 5.68L10 14.78 4.9 17.46l.98-5.68L1.75 7.75l5.7-.83L10 1.75Z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="mt-6 text-[15px] leading-8 text-slate-600">“{quote}”</p>
    </article>
  );
}
