import Image from 'next/image';
import Link from 'next/link';

import EndCard from '@/components/gallery/EndCard';
import { galleryImages, visibleGallerySections } from '@/lib/gallery';
import SectionHeading from './SectionHeading';

// Static class names (Tailwind only ships classes it can see written out).
// Laptop: one column per section + the "See full gallery" card, so the row is always full.
const LG_COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6' } as const;

// One photo per gallery section; each opens that section on the Gallery page
// (/gallery#yoga). Phones swipe sideways; laptops show the whole row.
export default function GalleryPreview() {
  const sections = visibleGallerySections;
  if (sections.length === 0) return null;

  const columns = Math.min(sections.length + 1, 6) as keyof typeof LG_COLS;
  const collage = [
    ...sections.map((section) => section.photos[0].src),
    ...galleryImages.map((photo) => photo.src),
  ]
    .filter((src, index, all) => all.indexOf(src) === index)
    .slice(0, 4);

  return (
    <section aria-labelledby="gallery-title" className="bg-ivory py-[4.5rem] lg:py-28">
      <div className="site-container">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="Moments from Rayan’s sessions"
          intro="Tap a photo to see more from that part of Rayan’s work."
        />

        <div
          role="list"
          aria-label="Gallery sections"
          className={`scrollbar-hide -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3.5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:mt-12 lg:grid lg:gap-5 lg:overflow-visible lg:px-0 ${LG_COLS[columns]}`}
        >
          {sections.map((section) => {
            const cover = section.photos[0];
            return (
              <div key={section.id} role="listitem" className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-auto">
              <Link href={`/gallery#${section.id}`} className="group block text-forest">
                <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#cdd8c8]">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(max-width: 639px) 72vw, (max-width: 1023px) 42vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: cover.focus ?? '50% 50%' }}
                  />
                </span>
                <span className="mt-3 block font-display text-xl leading-[1.3]">{section.title}</span>
                <span className="mt-0.5 block text-sm text-ink-muted">
                  {section.photos.length} {section.photos.length === 1 ? 'photo' : 'photos'}
                </span>
              </Link>
              </div>
            );
          })}
          <EndCard
            href="/gallery"
            title="See full gallery"
            sub="Yoga, massage & training"
            photos={collage}
            className="w-[72%] sm:w-[42%] lg:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
