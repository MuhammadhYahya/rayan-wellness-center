import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { galleryImages } from '@/lib/gallery';
import SectionHeading from './SectionHeading';

// Four photos, no auto-playing slider: lighter page, nothing moving on its own.
export default function GalleryPreview() {
  const preview = galleryImages.slice(0, 4);

  const viewAll = (
    <Link href="/gallery" className="btn btn-ghost-light">
      View Full Gallery
      <ArrowRight aria-hidden="true" />
    </Link>
  );

  return (
    <section aria-labelledby="gallery-title" className="bg-ivory py-[4.5rem] lg:py-28">
      <div className="site-container">
        <SectionHeading id="gallery-title" eyebrow="Gallery" title="A Glimpse of Our Space" action={viewAll} />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {preview.map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#c9d6c3]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1023px) 50vw, 25vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-medium leading-tight text-forest">
                {image.category}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-[1.875rem] flex justify-center lg:hidden">{viewAll}</div>
      </div>
    </section>
  );
}
