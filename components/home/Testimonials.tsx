// components/home/Testimonials.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Dimuthu Perera",
    role: "Professional Cricketer",
    quote: "Rayan's sports massage helped me recover faster from injuries. His knowledge of the body and precise technique is outstanding. Best in Sri Lanka.",
    rating: 5,
  },
  {
    name: "Nadeesha Silva",
    role: "Corporate Executive",
    quote: "After months of neck and shoulder pain from desk work, Deep Tissue sessions with Rayan gave me tremendous relief. I feel much more relaxed and energetic.",
    rating: 5,
  },
  {
    name: "Dr. Kamal Fernando",
    role: "Medical Doctor",
    quote: "As a doctor, I highly recommend Rayan. His combination of Ayurvedic Abhyanga and modern techniques is very effective. The peaceful environment is an added bonus.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 md:py-24 bg-forest text-ivory">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sage">Real stories from people who experienced real transformation</p>
        </div>

        <div className="relative">
          <div className="min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-sage text-sage" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl leading-relaxed mb-10 text-ivory/95">
                    “{testimonials[current].quote}”
                  </blockquote>

                  {/* Author */}
                  <div>
                    <p className="font-semibold text-lg">{testimonials[current].name}</p>
                    <p className="text-sage">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index 
                  ? 'bg-sage w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}