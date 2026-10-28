'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { CertificateItem } from '@/lib/certificates';

export default function CertificatesCarousel({ certificates }: { certificates: CertificateItem[] }) {
  const [current, setCurrent] = useState(0);

  if (certificates.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % certificates.length);
  const prev = () => setCurrent((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-sage/10 shadow-xl">
        <Image
          src={certificates[current].image}
          alt={certificates[current].title}
          fill
          className="object-contain bg-white p-6"
        />
      </div>

      {/* Title */}
      <div className="text-center mt-6 mb-8">
        <p className="text-lg font-medium text-forest">
          {certificates[current].title}
        </p>
        <p className="text-sm text-charcoal/60 mt-1">
          Certificate {current + 1} of {certificates.length}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous certificate"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-sage/20 hover:bg-sage/5 transition"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Each dot sits in a 24px tap area (big enough for a finger); the dot itself stays small.
            Phones: dots hidden (12 finger-sized dots don't fit beside the arrows) —
            the arrows and the "Certificate 1 of 12" line above do the same job. */}
        <div className="hidden sm:flex">
          {certificates.map((certificate, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show certificate ${index + 1}: ${certificate.title}`}
              aria-current={index === current ? 'true' : undefined}
              className="flex h-6 min-w-6 items-center justify-center px-1"
            >
              <span
                aria-hidden="true"
                className={`block h-2.5 rounded-full transition-all ${
                  index === current ? 'w-8 bg-moss' : 'w-2.5 bg-sage/30'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next certificate"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-sage/20 hover:bg-sage/5 transition"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}