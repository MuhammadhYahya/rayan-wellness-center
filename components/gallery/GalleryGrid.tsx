import Image from 'next/image';

import type { GalleryItem } from '@/lib/gallery';

type GalleryGridProps = {
  images: GalleryItem[];
};

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <article
          key={image.src}
          className={`group relative overflow-hidden rounded-[2rem] bg-white shadow-sm ${
            index % 5 === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
          }`}
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="inline-flex rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              {image.category}
            </div>
            <p className="mt-3 max-w-md text-base text-white/90 md:text-lg">{image.alt}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
