// app/page.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import GoogleReviews from '@/components/reviews/GoogleReviews';
import GalleryPreview from '@/components/home/GalleryPreview';
import Footer from '@/components/layout/Footer';
import { getCertificateCount, getServices } from '@/lib/sanity/queries';
import {
  BUSINESS_NAME,
  EMAIL,
  PHONE_TEL,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/site';

export default async function Home() {
  const [services, certificateCount] = await Promise.all([
    getServices(),
    getCertificateCount(),
  ]);

  // Structured data so Google understands the business (name, place, contact, services).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: BUSINESS_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/assets/images/hero-bg.jpg`,
    logo: `${SITE_URL}/assets/logo.png`,
    telephone: PHONE_TEL,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Keeranthidiya',
      addressRegion: 'Western Province',
      addressCountry: 'LK',
    },
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.tiktok],
    makesOffer: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title },
    })),
  };

  return (
    <main className="min-h-screen overflow-hidden bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <Stats certificateCount={certificateCount} />
      <ServicesGrid services={services} />
      <WhyChooseUs certificateCount={certificateCount} />
      {/* Live Google reviews (Trustindex) */}
      <section aria-labelledby="reviews-title" className="bg-ivory py-[4.5rem] text-center lg:py-28">
        <div className="site-container">
          <p className="eyebrow-lines text-xs font-medium uppercase tracking-[0.22em] text-moss">
            Client stories
          </p>
          <h2 id="reviews-title" className="mt-3.5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-forest">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-[1.125rem] max-w-[36rem] text-[clamp(1.0625rem,1.3vw,1.1875rem)] font-light leading-[1.85] text-charcoal/70">
            Real reviews from our clients on Google.
          </p>

          <div className="mt-11 text-left">
            <GoogleReviews />
          </div>

          <Link
            href="/reviews"
            className="mt-[1.875rem] inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-moss transition-colors hover:text-forest"
          >
            Read more reviews
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <GalleryPreview />
      <Footer />
    </main>
  );
}
