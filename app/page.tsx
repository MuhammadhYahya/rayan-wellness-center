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
import { getServices, getTestimonials } from '@/lib/sanity/queries';

export default async function Home() {
  const [services, testimonials] = await Promise.all([
    getServices(),
    getTestimonials(),
  ]);
  const featuredServices = services.slice(0, 8);

  return (
    <main className="bg-ivory min-h-screen overflow-hidden">
      <Hero />
      <Stats />
      <ServicesGrid services={featuredServices} />
      <AboutTeaser />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <GalleryPreview />
      <BookingTeaser />
      <Footer />
    </main>
  );
}
