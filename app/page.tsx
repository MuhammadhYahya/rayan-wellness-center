// app/page.tsx
import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import ServicesGrid from '@/components/home/ServicesGrid';
import AboutTeaser from '@/components/home/AboutTeaser';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import GalleryPreview from '@/components/home/GalleryPreview';
import BookingTeaser from '@/components/home/BookingTeaser';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="bg-ivory min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <ServicesGrid />
       <AboutTeaser />
      <WhyChooseUs />
      <Testimonials />
      <GalleryPreview />
      <BookingTeaser />
      <Footer />
    </main>
  );
}