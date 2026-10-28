import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import Footer from '@/components/layout/Footer';
import { getServices } from '@/lib/sanity/queries';
import { BUSINESS_NAME, SITE_URL, WHATSAPP_BOOKING_URL } from '@/lib/site';
import {
  bookingHref,
  displayDuration,
  displayTitle,
  groupServices,
  serviceAnchor,
} from '@/lib/service-display';
import { shareTags } from '@/lib/seo';

const TITLE = 'Massage & Yoga Services';
const DESCRIPTION =
  'Sports massage, deep tissue, hot stone, Thai massage therapy, Hawaiian Lomi Lomi and Hatha yoga in Matugama, Sri Lanka. Book your session today.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Without this the page inherits the home page's canonical ("/") from the layout.
  alternates: { canonical: '/services' },
  // Link preview on WhatsApp, Facebook, etc.
  ...shareTags({ title: `${TITLE} | ${BUSINESS_NAME}`, description: DESCRIPTION, path: '/services' }),
};

// Design "C · Chapters": services grouped into chapters, each with one photo
// beside its list. Server-rendered, no animation; every service has its own
// anchor (/services#sports-massage) and a booking link.
export default async function ServicesPage() {
  const services = await getServices();
  const groups = groupServices(services);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Massage & yoga treatments',
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: displayTitle(service.title),
            description: service.shortDescription,
            url: `${SITE_URL}/services#${serviceAnchor(service)}`,
            provider: { '@type': 'HealthAndBeautyBusiness', name: BUSINESS_NAME, url: SITE_URL },
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Page intro (the fixed header is 4rem / 5rem tall, so the top padding includes it) */}
      <section aria-labelledby="services-title" className="bg-forest pb-12 pt-[6.5rem] text-ivory lg:pb-[4.5rem] lg:pt-32">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ivory-muted">
            <Link href="/" className="hover:text-ivory">
              Home
            </Link>{' '}
            / <span aria-current="page" className="text-ivory">Services</span>
          </nav>

          <div className="mt-7 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-20">
            <div className="text-center lg:text-left">
              <h1
                id="services-title"
                className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.12] text-ivory"
              >
                Massage &amp; yoga treatments in <em className="text-leaf">Keeranthidiya</em>
              </h1>
              <p className="mx-auto mt-[1.125rem] max-w-[34rem] text-[clamp(1.0625rem,1.3vw,1.1875rem)] font-light leading-[1.8] text-[#d5d6cd] lg:mx-0">
                {services.length} treatments for recovery, relaxation and movement — each one shaped
                around your body by Rayan.
              </p>
            </div>

            {groups.length > 0 ? (
              <nav aria-label="Treatment groups" className="border-t border-line-dark">
                {groups.map((group) => (
                  <a
                    key={group.id}
                    href={`#${group.id}`}
                    className="flex items-center gap-3 border-b border-line-dark py-4 font-display text-[1.1875rem] leading-[1.3] text-ivory hover:text-leaf"
                  >
                    {group.title}
                    <span className="ml-auto font-sans text-[0.8125rem] text-leaf">
                      {group.services.length} {group.services.length === 1 ? 'treatment' : 'treatments'}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
        </div>
      </section>

      {/* Chapters */}
      <div className="pb-[4.5rem] pt-12 lg:pb-24">
        <div className="site-container">
          {groups.length === 0 ? (
            <p className="py-12 text-center text-ink-muted">No services available yet.</p>
          ) : null}

          {groups.map((group, groupIndex) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className={`grid gap-6 py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch lg:gap-[4.5rem] lg:py-[4.5rem] ${
                groupIndex > 0 ? 'border-t border-line' : ''
              }`}
            >
              {/* Photo with the chapter title. It stretches to the list's height on desktop. */}
              <div
                className={`relative flex aspect-[16/10] items-end justify-center overflow-hidden rounded-2xl bg-forest p-5 text-center lg:aspect-auto lg:justify-start lg:text-left lg:min-h-96 lg:p-8 ${
                  groupIndex % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={group.photo.src}
                  alt={group.photo.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  // The first chapter photo is near the top of the page: load it straight
                  // away instead of waiting until it scrolls into view.
                  loading={groupIndex === 0 ? 'eager' : 'lazy'}
                  className="object-cover"
                  style={{ objectPosition: group.photo.position ?? '50% 50%' }}
                />
                <div aria-hidden="true" className="absolute inset-0" style={{ background: 'rgba(26,46,26,0.42)' }} />
                <div className="relative text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#d7e6d3]">
                    {String(groupIndex + 1).padStart(2, '0')} · {group.services.length}{' '}
                    {group.services.length === 1 ? 'treatment' : 'treatments'}
                  </p>
                  <h2 id={`${group.id}-title`} className="mt-1.5 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]">
                    {group.title}
                  </h2>
                </div>
              </div>

              <div>
                <p className="mx-auto max-w-[34rem] text-center text-[1.0625rem] font-light leading-[1.8] text-ink-muted lg:mx-0 lg:text-left lg:text-lg">
                  {group.intro}
                </p>
                <ul className="mt-2">
                  {group.services.map((service) => {
                    const title = displayTitle(service.title);
                    const duration = displayDuration(service.duration);
                    return (
                      <li
                        key={service._id}
                        id={serviceAnchor(service)}
                        className="border-t border-line py-[1.375rem] text-center last:border-b lg:grid lg:text-left lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-8 lg:py-[1.625rem]"
                      >
                        <div className="flex flex-col items-center gap-2 lg:contents">
                          <h3 className="font-display text-[1.3125rem] leading-[1.35] text-forest lg:col-start-1 lg:text-2xl">
                            {title}
                          </h3>
                          {duration ? (
                            <span className="shrink-0 rounded-full bg-[#eef2e9] px-2.5 py-1 text-sm font-medium leading-[1.3] text-moss lg:col-start-2 lg:row-start-1 lg:self-baseline lg:justify-self-end">
                              {duration}
                            </span>
                          ) : null}
                        </div>
                        {service.shortDescription ? (
                          <p className="mx-auto mt-2 max-w-[34rem] text-base leading-[1.75] text-ink-muted lg:col-start-1 lg:mx-0 lg:max-w-[36rem]">
                            {service.shortDescription}
                          </p>
                        ) : null}
                        <Link
                          href={bookingHref(service)}
                          // Name starts with the visible words, then says which treatment.
                          aria-label={`Book this treatment: ${title}`}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-moss hover:text-forest lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:mt-0 lg:self-end lg:justify-self-end"
                        >
                          Book this treatment
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Help choosing */}
      <section aria-labelledby="help-title" className="border-t border-line bg-white py-[4.5rem] text-center lg:py-24">
        <div className="site-container">
          <h2 id="help-title" className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] text-forest">
            Not sure which treatment is right for you?
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-[1.0625rem] font-light leading-[1.8] text-ink-muted">
            Tell Rayan where it hurts and how you want to feel afterwards — he will suggest the right
            session.
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
