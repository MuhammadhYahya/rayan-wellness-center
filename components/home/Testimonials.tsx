'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

import type { Review } from '@/lib/sanity/types';

type TestimonialsProps = {
  reviews: Review[];
};

export default function Testimonials({ reviews }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const hasReviews = reviews.length > 0;
  const currentIndex = hasReviews ? current % reviews.length : 0;

  useEffect(() => {
    if (!hasReviews) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [hasReviews, reviews.length]);

  if (!hasReviews) {
    return (
      <section className="bg-forest py-16 text-ivory md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-4xl md:text-5xl">
              What Our Clients Say
            </h2>
            <p className="text-sage">
              Real stories from people who experienced real transformation
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 px-8 py-12 text-center backdrop-blur-xl">
            <p className="text-ivory/85">
              Approve and feature reviews in Sanity to populate this carousel.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  const currentReview = reviews[currentIndex];
  const hasImage = Boolean(currentReview.imageUrl);

  return (
    <section className="bg-forest py-16 text-ivory md:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-12 text-center">
          <h2 className="font-display mb-4 text-4xl md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="text-sage">Real stories from people who experienced real transformation</p>
        </div>

        <div className="relative">
          <div className="flex min-h-[460px] items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview._id}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">

                  {/* Large Reviewer Photo */}
                  {hasImage && (
                    <div className="flex justify-center pt-10">
                      <div className="relative h-[230px] w-[230px] md:h-[260px] md:w-[260px]">
                        <Image
                          src={currentReview.imageUrl as string}
                          alt={currentReview.name}
                          fill
                          sizes="(max-width: 768px) 230px, 260px"
                          className="rounded-3xl object-cover shadow-2xl ring-8 ring-white/10"
                        />
                      </div>
                    </div>
                  )}

                  <div className={`px-8 pb-14 text-center ${hasImage ? 'pt-6' : 'pt-12'}`}>

                    {/* Stars */}
                    <div className="mb-10 flex justify-center gap-[10px]">
                      {[...Array(currentReview.rating)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-9 w-9 text-green-700 drop-shadow-sm"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Quote - Optimized */}
<blockquote className="mb-10 font-light text-[1.05rem] leading-[1.5] tracking-wide text-ivory md:text-[1.15rem] lg:text-[1.25rem]">
  &ldquo;{currentReview.quote}&rdquo;
</blockquote>

{/* Reviewer Info */}
<div className="space-y-1">
  <p className="font-display text-[1.3rem] md:text-[1.45rem] font-semibold tracking-tight text-white">
    {currentReview.name}
  </p>

  {currentReview.role && (
    <p className="text-[0.9rem] text-sage font-medium tracking-wide">
      {currentReview.role}
    </p>
  )}
</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-3">
          {reviews.map((review, index) => (
            <button
              key={review._id}
              onClick={() => setCurrent(index)}
              className={`h-3 rounded-full transition-all ${currentIndex === index ? 'w-8 bg-sage' : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}