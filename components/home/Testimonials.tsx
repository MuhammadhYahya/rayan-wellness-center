import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

import type { Review } from '@/lib/sanity/types';

type TestimonialsProps = {
  reviews: Review[];
};

// No slider, timer or animation library: reviews are plain HTML. One review is a
// single centred card; 2–3 reviews swipe on phones/tablets and sit side by side
// on desktop (column count = number of reviews, so no empty cells).
// Cards in a row share one height; inside each card the quote and the person stay
// together and sit in the middle, so a short review never leaves a big gap
// between its text and the photo.
const LG_COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3' } as const;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-sage" aria-hidden="true">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, compact }: { review: Review; compact: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col justify-center rounded-3xl border border-line-dark text-center ${
        compact ? 'px-6 py-8 sm:px-8' : 'px-6 py-9 sm:px-[3.25rem] sm:py-11'
      }`}
    >
      <Quote className="mx-auto h-8 w-8 text-sage" aria-hidden="true" />
      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>
      <blockquote
        className={`mt-[1.125rem] font-display leading-[1.6] text-ivory ${
          compact ? 'line-clamp-6 text-lg lg:line-clamp-none' : 'text-[clamp(1.25rem,2vw,1.625rem)]'
        }`}
      >
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-center gap-3">
        {review.imageUrl ? (
          <Image
            src={review.imageUrl}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-line-dark font-display text-lg text-ivory"
          >
            {review.name.charAt(0)}
          </span>
        )}
        <span className="text-left leading-[1.4]">
          <span className="block text-[0.9375rem] font-medium text-ivory">{review.name}</span>
          {review.role ? (
            <span className="mt-0.5 block text-[0.8125rem] text-ivory-muted">{review.role}</span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const list = reviews.slice(0, 3);
  if (list.length === 0) return null;

  const single = list.length === 1;

  return (
    <section aria-labelledby="reviews-title" className="bg-forest py-[4.5rem] text-center text-ivory lg:py-28">
      <div className="site-container">
        <p className="eyebrow-lines text-xs font-medium uppercase tracking-[0.22em] text-sage">
          Client stories
        </p>
        <h2 id="reviews-title" className="mt-3.5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.15]">
          What Our Clients Say
        </h2>
        <p className="mx-auto mt-[1.125rem] max-w-[36rem] text-[clamp(1.0625rem,1.3vw,1.1875rem)] font-light leading-[1.85] text-ivory-muted">
          Real stories from people who experienced real transformation.
        </p>

        {single ? (
          <div className="mx-auto mt-11 max-w-[47.5rem]">
            <ReviewCard review={list[0]} compact={false} />
          </div>
        ) : (
          <div
            className={`scrollbar-hide -mx-5 mt-11 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:gap-6 lg:overflow-visible lg:px-0 ${
              LG_COLS[list.length as 2 | 3]
            }`}
          >
            {list.map((review) => (
              <div key={review._id} className="w-[86%] shrink-0 snap-start sm:w-[60%] lg:w-auto">
                <ReviewCard review={review} compact />
              </div>
            ))}
          </div>
        )}

        <Link
          href="/reviews"
          className="mt-[1.875rem] inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-leaf transition-colors hover:text-ivory"
        >
          Read more reviews
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
