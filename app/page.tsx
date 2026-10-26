// app/page.tsx
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import GalleryPreview from '@/components/home/GalleryPreview';
import Footer from '@/components/layout/Footer';
import { getFeaturedReviews, getServices } from '@/lib/sanity/queries';
import {
  BUSINESS_NAME,
  EMAIL,
  PHONE_TEL,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/site';

export default async function Home() {
  const [services, reviews] = await Promise.all([
    getServices(),
    getFeaturedReviews(),
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
      <Stats />
      <ServicesGrid services={services} />
      <WhyChooseUs />
      <Testimonials reviews={reviews} />
      <GalleryPreview />
      <Footer />
    </main>
  );
}
