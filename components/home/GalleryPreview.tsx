'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { galleryImages } from '@/lib/gallery';

export default function GalleryPreview() {
  const [current, setCurrent] = useState(0);
  const totalImages = galleryImages.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalImages);
    }, 4500);

    return () => clearInterval(timer);
  }, [totalImages]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % totalImages);
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 flex flex-col items-center justify-between md:flex-row">
          <div>
            <h2 className="mb-3 font-display text-4xl text-forest md:text-5xl">
              Glimpse of Our Space
            </h2>
            <p className="text-lg text-charcoal/70">Where healing meets nature</p>
          </div>

          <Button
            asChild
            variant="outline"
            className="mt-6 rounded-full border-forest text-forest hover:bg-forest hover:text-ivory md:mt-0"
          >
            <Link href="/gallery" className="flex items-center gap-2">
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem]">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {galleryImages.map((image) => (
                <div key={image.src} className="w-full flex-shrink-0">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-md md:mx-auto md:w-[88%] lg:w-[78%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 88vw, 78vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                      <div>
                        <div className="inline-flex rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-forest backdrop-blur-sm">
                          {image.category}
                        </div>
                        <p className="mt-4 max-w-xl text-lg text-white/90 md:text-xl">
                          {image.alt}
                        </p>
                      </div>
                      <div className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-md md:block">
                        {current + 1} / {totalImages}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous gallery image"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-white/90 p-3 text-forest shadow-lg transition hover:bg-forest hover:text-ivory md:left-6"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next gallery image"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-white/90 p-3 text-forest shadow-lg transition hover:bg-forest hover:text-ivory md:right-6"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Show gallery image ${index + 1}`}
                className={`h-3 rounded-full transition-all ${
                  current === index ? 'w-8 bg-forest' : 'w-3 bg-sage/35 hover:bg-sage/60'
                }`}
              />
            ))}
          </div>

          <div className="mt-6 hidden items-center justify-center gap-4 md:flex">
            {galleryImages.map((image, index) => (
              <button
                key={`${image.src}-thumb`}
                type="button"
                onClick={() => setCurrent(index)}
                className={`relative h-20 w-24 overflow-hidden rounded-2xl transition ${
                  current === index
                    ? 'scale-100 ring-2 ring-forest'
                    : 'scale-95 opacity-70 hover:scale-100 hover:opacity-100'
                }`}
                aria-label={`Preview ${image.category} image ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/15" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-sage">
          Explore the moving preview here, then open the full gallery for every image.
        </div>
      </div>
    </section>
  );
}
