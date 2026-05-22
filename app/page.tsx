// app/page.tsx
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import ServicesGrid from '@/components/home/ServicesGrid';
import AboutTeaser from '@/components/home/AboutTeaser';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import GalleryPreview from '@/components/home/GalleryPreview';
import BookingTeaser from '@/components/home/BookingTeaser';
import Footer from '@/components/layout/Footer';
import { getFeaturedReviews, getServices } from '@/lib/sanity/queries';

export default async function Home() {
  const [services, reviews] = await Promise.all([
    getServices(),
    getFeaturedReviews(),
  ]);

  return (
    <main className="bg-ivory min-h-screen overflow-hidden">
      <Hero />
      <Stats />
      <ServicesGrid services={services} />
      <AboutTeaser />
      <WhyChooseUs />
      <Testimonials reviews={reviews} />
      <GalleryPreview />
      <BookingTeaser />
      <Footer />
    </main>
  );
}
