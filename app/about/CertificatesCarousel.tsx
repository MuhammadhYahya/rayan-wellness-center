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
          onClick={prev}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-sage/20 hover:bg-sage/5 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === current ? 'bg-moss w-8' : 'bg-sage/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-sage/20 hover:bg-sage/5 transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}