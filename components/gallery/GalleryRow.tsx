'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryRowProps = {
  /** Heading area shown above the row (left side). */
  heading: ReactNode;
  /** Accessible name for the scrolling list, e.g. "Yoga photos". */
  label: string;
  /** Laptop classes used when everything fits in one row (a grid that fills the width, no scrolling). */
  fitClass?: string;
  children: ReactNode;
};

// A side-scrolling row. Phones/tablets swipe (works without JavaScript);
// laptops also get small previous/next buttons beside the heading, because a
// mouse cannot swipe. When everything fits (fitClass), laptops show a grid that
// fills the width instead, without buttons.
export default function GalleryRow({ heading, label, fitClass, children }: GalleryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      setCanPrev(row.scrollLeft > 4);
      setCanNext(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      row.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const move = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  const buttonClass =
    'flex h-9 w-9 items-center justify-center rounded-full border border-[#c9d3c5] bg-white text-forest transition-opacity disabled:cursor-default disabled:opacity-40';

  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-4 lg:mb-6">
        <div>{heading}</div>
        <div className={fitClass ? 'hidden' : 'hidden gap-2 lg:flex'}>
          <button type="button" onClick={() => move(-1)} disabled={!canPrev} aria-label="Previous photos" className={buttonClass}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} disabled={!canNext} aria-label="Next photos" className={buttonClass}>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={rowRef}
        role="list"
        aria-label={label}
        className={`scrollbar-hide -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3.5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:gap-[1.125rem] lg:px-0 ${fitClass ?? ''}`}
      >
        {children}
      </div>
    </>
  );
}
