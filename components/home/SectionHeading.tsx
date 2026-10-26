import type { ReactNode } from 'react';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Shown beside the heading on desktop only (e.g. "View Full Gallery"). */
  action?: ReactNode;
};

// Centred label with lines; on desktop the heading sits left and the intro
// (or an action button) right, so there is no empty space beside the heading.
export default function SectionHeading({ id, eyebrow, title, intro, action }: SectionHeadingProps) {
  return (
    <div className="text-center lg:text-left">
      <p className="eyebrow-lines text-xs font-medium uppercase tracking-[0.22em] text-moss">
        {eyebrow}
      </p>
      <div
        className={`mt-4 flex flex-col items-center gap-[1.125rem] lg:mt-[1.375rem] lg:grid lg:grid-cols-2 lg:gap-16 ${
          action ? 'lg:items-center' : 'lg:items-end'
        }`}
      >
        <h2 id={id} className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-forest">
          {title}
        </h2>
        {intro ? (
          <p className="sh-intro max-w-[34rem] text-[clamp(1.0625rem,1.3vw,1.1875rem)] font-light leading-[1.85] text-ink-muted lg:max-w-[31rem] lg:justify-self-end">
            {intro}
          </p>
        ) : null}
        {action ? <div className="hidden lg:block lg:justify-self-end">{action}</div> : null}
      </div>
    </div>
  );
}
