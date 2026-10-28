import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import Footer from '@/components/layout/Footer';
import EndCard from '@/components/gallery/EndCard';
import GalleryRow from '@/components/gallery/GalleryRow';
import { galleryImages, visibleGallerySections } from '@/lib/gallery';
import { BUSINESS_NAME, SITE_URL, WHATSAPP_BOOKING_URL } from '@/lib/site';
import { getCertificateCount } from '@/lib/sanity/queries';
import { shareTags } from '@/lib/seo';

const TITLE = 'Photo Gallery';
const DESCRIPTION =
  'Photos of Rayan’s yoga, massage and training — chosen moments from his sessions in Keeranthidiya, Matugama. See what to expect before you book.';

export const metadata: Metadata = {
  // Own address for Google (otherwise the page inherits the home page's "/").
  alternates: { canonical: '/gallery' },
  title: TITLE,
  description: DESCRIPTION,
  // Link preview on WhatsApp, Facebook, etc.
  ...shareTags({ title: `${TITLE} | ${BUSINESS_NAME}`, description: DESCRIPTION, path: '/gallery' }),
};

const ITEM_WIDTH = 'w-[72%] sm:w-[42%] lg:w-[calc((100%_-_3.9375rem)/4.5)]';
const FIT_COLS = {
  2: 'lg:grid lg:grid-cols-2 lg:overflow-visible',
  3: 'lg:grid lg:grid-cols-3 lg:overflow-visible',
  4: 'lg:grid lg:grid-cols-4 lg:overflow-visible',
  5: 'lg:grid lg:grid-cols-5 lg:overflow-visible',
} as const;


function collageFor(own: string[]) {
  const others = galleryImages.map((photo) => photo.src).filter((src) => !own.includes(src));
  return [...own, ...others].slice(0, 4);
}

export default async function GalleryPage() {
  const sections = visibleGallerySections;
  const certificateCount = await getCertificateCount();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${SITE_URL}/gallery` },
    ],
  };

  return (
    <main className="min-h-screen bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Page intro (same pattern as the Services page) */}
      <section aria-labelledby="gallery-title" className="bg-forest pb-12 pt-[6.5rem] text-ivory lg:pb-[4.5rem] lg:pt-32">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ivory-muted">
            <Link href="/" className="hover:text-ivory">
              Home
            </Link>{' '}
            / <span aria-current="page" className="text-ivory">Gallery</span>
          </nav>

          <div className="mt-7 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-20">
            <div className="text-center lg:text-left">
              <h1 id="gallery-title" className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.12] text-ivory">
                Moments from <em className="text-leaf">Rayan’s sessions</em>
              </h1>
              <p className="mx-auto mt-[1.125rem] max-w-[34rem] text-[clamp(1.0625rem,1.3vw,1.1875rem)] font-light leading-[1.8] text-[#d5d6cd] lg:mx-0">
                Yoga, massage and the training behind it — a few chosen photos from each.
              </p>
            </div>

            <nav aria-label="Gallery sections" className="border-t border-line-dark">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 border-b border-line-dark py-4 font-display text-[1.1875rem] leading-[1.3] text-ivory hover:text-leaf"
                >
                  {section.title}
                  <span className="ml-auto font-sans text-[0.8125rem] text-leaf">
                    {section.photos.length} {section.photos.length === 1 ? 'photo' : 'photos'}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* One side-scrolling row per section */}
      <div className="pb-[4.5rem] pt-12 lg:pb-24">
        <div className="site-container">
          {sections.map((section, sectionIndex) => {
            const items = section.photos.length + 1;
            const fits = items <= 5;
            const fitClass = fits ? FIT_COLS[items as keyof typeof FIT_COLS] : undefined;
            // Few items -> wider tiles, so use a landscape shape to keep them from getting too tall.
            const itemClass = fits
              ? `w-[72%] sm:w-[42%] lg:w-auto ${items <= 3 ? 'lg:aspect-[4/3]' : ''}`
              : ITEM_WIDTH;
            return (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className={`py-9 lg:py-14 ${sectionIndex > 0 ? 'border-t border-line' : ''}`}
            >
              <GalleryRow
                label={`${section.title} photos`}
                fitClass={fitClass}
                heading={
                  <>
                    <h2 id={`${section.id}-title`} className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.2] text-forest">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-[0.9375rem] leading-[1.6] text-ink-muted">
                      {section.photos.length} {section.photos.length === 1 ? 'photo' : 'photos'} ·{' '}
                      {section.line.replace('{certificates}', `${certificateCount}+`)}
                    </p>
                  </>
                }
              >
                {section.photos.map((photo, photoIndex) => (
                  <div
                    key={photo.src}
                    role="listitem"
                    className={`relative aspect-square shrink-0 snap-start overflow-hidden rounded-2xl bg-[#cdd8c8] ${itemClass}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={`(max-width: 639px) 72vw, (max-width: 1023px) 42vw, ${fits ? Math.ceil(100 / items) : 22}vw`}
                      // Only the first row's first photos are likely on screen at load.
                      loading={sectionIndex === 0 && photoIndex < 2 ? 'eager' : 'lazy'}
                      className="object-cover"
                      style={{ objectPosition: photo.focus ?? '50% 50%' }}
                    />
                  </div>
                ))}
                <EndCard
                  href={section.end.href}
                  title={section.end.title}
                  sub={section.end.sub}
                  photos={collageFor(section.photos.map((photo) => photo.src))}
                  className={`aspect-square ${itemClass}`}
                />
              </GalleryRow>
            </section>
            );
          })}
        </div>
      </div>

      {/* Closing booking strip */}
      <section aria-labelledby="gallery-book-title" className="border-t border-line bg-white py-[4.5rem] text-center lg:py-24">
        <div className="site-container">
          <h2 id="gallery-book-title" className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] text-forest">
            Like what you see? Book your own session.
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-[1.0625rem] font-light leading-[1.8] text-ink-muted">
            Message Rayan on WhatsApp or book online — he will help you choose the right treatment.
          </p>
          <div className="mx-auto mt-8 flex max-w-[21rem] flex-col gap-3.5 sm:max-w-none sm:flex-row sm:justify-center">
            <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <FaWhatsapp aria-hidden="true" />
              Ask on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-ghost-light">
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
