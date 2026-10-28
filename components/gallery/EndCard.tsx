import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type EndCardProps = {
  href: string;
  title: string;
  sub: string;
  /** Up to 4 photo paths for the small collage. */
  photos: string[];
  /** Extra classes for the card's width / shape inside its row. */
  className?: string;
};

const CORNERS = ['rounded-tl-3xl', 'rounded-tr-3xl', 'rounded-bl-3xl', 'rounded-br-3xl'];

// The card at the end of a gallery row: a 2x2 photo collage with a round arrow
// in the middle and one clear next step underneath.
export default function EndCard({ href, title, sub, photos, className = '' }: EndCardProps) {
  return (
    // The list item is a plain wrapper (a link itself can't be a list item for
    // screen readers); the link fills it.
    <div role="listitem" className={`flex shrink-0 snap-start ${className}`}>
    <Link
      href={href}
      className="group flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-white p-5 text-center text-forest shadow-[0_1rem_2.5rem_rgba(26,46,26,0.06)]"
    >
      <span className="relative grid grid-cols-2 gap-1.5" aria-hidden="true">
        {CORNERS.map((corner, index) => (
          <span key={corner} className={`relative block h-[4.25rem] w-[4.25rem] overflow-hidden rounded-xl bg-[#cdd8c8] ${corner}`}>
            {photos[index] ? (
              <Image src={photos[index]} alt="" fill sizes="4.25rem" className="object-cover" />
            ) : null}
          </span>
        ))}
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-moss text-white transition-transform group-hover:scale-105">
          <ArrowRight className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
        </span>
      </span>
      <span>
        <span className="inline-flex items-center gap-1.5 text-base font-semibold leading-[1.3]">
          {title}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="mt-1 block text-[0.8125rem] leading-[1.4] text-ink-muted">{sub}</span>
      </span>
    </Link>
    </div>
  );
}
