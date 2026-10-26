import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { urlForImage } from '@/lib/sanity/image';
import type { Service } from '@/lib/sanity/types';
import { displayDuration, displayTitle, serviceAnchor } from '@/lib/service-display';
import SectionHeading from './SectionHeading';

type ServicesGridProps = {
  services: Service[];
};

// Static class names (Tailwind only ships classes it can see written out).
const FEATURED_COLS = {
  1: 'sm:mx-auto sm:max-w-md lg:max-w-md',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
} as const;
const SEE_ALL_SM = { 1: 'sm:col-span-1', 2: 'sm:col-span-2' } as const;
const SEE_ALL_LG = { 1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4' } as const;

const THUMB_COLOURS = ['#c9d6c3', '#b7c8b1', '#d6dfcf', '#aebfa8', '#c2d0bc', '#bccbb6', '#cfd9c9'];

// Home page: the first 3 services (by their Sanity "order") as full cards, the rest
// as a compact photo menu that links to the Services page. The "See all" item
// stretches to fill the last row, so no grid cell is ever left empty.
export default function ServicesGrid({ services }: ServicesGridProps) {
  const featured = services.slice(0, 3);
  const rest = services.slice(3);
  const total = services.length;

  // Menu items incl. "See all": below 1024px the 3rd service is in the menu too.
  const smItems = Math.max(total - 2, 0) + 1;
  const lgItems = rest.length + 1;
  const smSpan = (smItems % 2 === 1 ? 2 : 1) as 1 | 2;
  const lgRemainder = lgItems % 4;
  const lgSpan = (lgRemainder === 0 ? 1 : 5 - lgRemainder) as 1 | 2 | 3 | 4;

  return (
    <section aria-labelledby="services-title" className="bg-ivory py-[4.5rem] lg:py-28">
      <div className="site-container">
        <SectionHeading
          id="services-title"
          eyebrow="Treatments"
          title="What We Offer"
          intro="Personalized healing therapies tailored to your body and goals, delivered in a sanctuary of restorative calm."
        />

        {featured.length > 0 ? (
          <div
            className={`mt-11 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 lg:gap-7 ${
              FEATURED_COLS[featured.length as 1 | 2 | 3]
            }`}
          >
            {featured.map((service, index) => {
              const title = displayTitle(service.title);
              const duration = displayDuration(service.duration);
              const imageUrl = service.image
                ? urlForImage(service.image).width(900).height(600).fit('crop').url()
                : null;

              return (
                <article
                  key={service._id}
                  // Phones and tablets show 2 cards; the 3rd appears on desktop.
                  className={`flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1.5rem_5rem_rgba(26,46,26,0.08)] ${
                    index === 2 ? 'hidden lg:flex' : 'flex'
                  }`}
                >
                  <div className="relative aspect-[3/2] bg-[#c9d6c3]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={service.image?.alt || title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : null}
                    {duration ? (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-medium leading-tight text-forest">
                        {duration}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-3 p-[1.625rem] text-center lg:items-start lg:text-left">
                    <h3 className="font-display text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.3] text-forest">
                      {title}
                    </h3>
                    <div className="flex-1">
                      <p className="line-clamp-3 text-base leading-[1.8] text-ink-muted">
                        {service.shortDescription}
                      </p>
                    </div>
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.slug || service.title)}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-moss transition-colors hover:text-forest"
                    >
                      Book {title}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        {/* Mobile and tablet only show 2 full cards, so the 3rd joins the menu there. */}
        <div className="mt-6 rounded-[1.25rem] border border-line bg-white px-5 py-7 lg:mt-7 lg:px-12 lg:py-10">
          <div className="flex flex-col items-center gap-1.5 text-center lg:flex-row lg:items-baseline lg:justify-between lg:text-left">
            <h3 className="font-display text-[clamp(1.5rem,2.2vw,1.875rem)] leading-[1.25] text-forest">
              More treatments
            </h3>
            <p className="text-[0.9375rem] text-ink-muted">Tap any treatment to see details</p>
          </div>

          <ul className="mt-[1.125rem] grid grid-cols-1 sm:grid-cols-2 sm:gap-x-7 lg:mt-8 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-6">
            {services.map((service, index) => {
              // The 3rd service is a full card on desktop, so it only appears here below 1024px.
              if (index < 2) return null;
              if (index === 2 && featured.length < 3) return null;
              const title = displayTitle(service.title);
              const duration = displayDuration(service.duration);
              const thumbUrl = service.image
                ? urlForImage(service.image).width(120).height(120).fit('crop').url()
                : null;

              return (
                <li
                  key={service._id}
                  className={`border-b border-[#eef1ea] sm:border-b-0 ${index === 2 ? 'lg:hidden' : ''}`}
                >
                  <Link href={`/services#${serviceAnchor(service)}`} className="flex min-w-0 items-center gap-3 py-2.5 lg:py-0">
                    <span
                      className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full lg:h-[3.25rem] lg:w-[3.25rem]"
                      style={{ backgroundColor: THUMB_COLOURS[index % THUMB_COLOURS.length] }}
                    >
                      {thumbUrl ? (
                        <Image src={thumbUrl} alt="" fill sizes="3.25rem" className="object-cover" />
                      ) : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-medium leading-[1.3] text-forest">
                        {title}
                      </span>
                      {duration ? (
                        <span className="mt-0.5 block text-[0.8125rem] leading-[1.4] text-ink-muted">
                          {duration}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}

            <li className={`${SEE_ALL_SM[smSpan]} ${SEE_ALL_LG[lgSpan]}`}>
              <Link href="/services" className="flex min-w-0 items-center gap-3 py-2.5 lg:py-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss text-white lg:h-[3.25rem] lg:w-[3.25rem]">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[0.9375rem] font-medium leading-[1.3] text-moss">
                    See all {total} treatments
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-[1.4] text-ink-muted">
                    Details &amp; booking
                  </span>
                </span>
              </Link>
            </li>
          </ul>

          <p className="mt-[1.375rem] border-t border-line pt-5 text-center text-[0.9375rem] text-ink-muted">
            Not sure which one is right for you?{' '}
            <Link href="/contact" className="font-medium text-moss hover:text-forest">
              Book a Session
            </Link>{' '}
            and Rayan will guide you.
          </p>
        </div>
      </div>
    </section>
  );
}
