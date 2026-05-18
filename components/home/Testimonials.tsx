'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

import type { Testimonial } from '@/lib/sanity/types';

type TestimonialsProps = {
  testimonials: Testimonial[];
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const hasTestimonials = testimonials.length > 0;
  const currentIndex = hasTestimonials ? current % testimonials.length : 0;

  useEffect(() => {
    if (!hasTestimonials) {
      return;
    }

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [hasTestimonials, testimonials.length]);

  if (!hasTestimonials) {
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
              Add testimonials in Sanity to populate this carousel.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const currentTestimonial = testimonials[currentIndex];
  const avatarUrl = currentTestimonial.imageUrl || null;

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

        <div className="relative">
          <div className="flex min-h-[320px] items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial._id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-center backdrop-blur-xl md:p-12">
                  <div className="mb-8 flex justify-center gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-sage text-sage" />
                    ))}
                  </div>

                  {avatarUrl ? (
                    <div className="mb-6 flex justify-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/20">
                        <Image
                          src={avatarUrl}
                          alt={currentTestimonial.image?.alt || currentTestimonial.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : null}

                  <blockquote className="mb-10 text-xl leading-relaxed text-ivory/95 md:text-2xl">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </blockquote>

                  <div>
                    <p className="text-lg font-semibold">{currentTestimonial.name}</p>
                    <p className="text-sage">{currentTestimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

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

        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial._id}
              onClick={() => setCurrent(index)}
              aria-label={`Show testimonial ${index + 1}`}
              className={`h-3 rounded-full transition-all ${
                currentIndex === index ? 'w-8 bg-sage' : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
