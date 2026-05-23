import Footer from '@/components/layout/Footer';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { galleryImages } from '@/lib/gallery';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero Section - Better Mobile Spacing */}
      <section className="bg-forest px-5 pt-20 pb-12 md:pt-24 md:pb-16 text-ivory">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-sage">
            MOMENTS OF HEALING
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            A Glimpse Into Our Space
          </h1>
          <p className="mt-6 text-lg md:text-xl text-sage/90 max-w-2xl mx-auto">
            Peaceful corners, healing sessions, and the natural beauty that surrounds every experience.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-5 py-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-widest text-moss">Full Collection</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-forest">
              Explore the Gallery
            </h2>
          </div>

          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      {/* Simple Closing Note */}
      <section className="bg-sage/5 py-12 text-center">
        <div className="mx-auto max-w-md px-5">
          <p className="text-charcoal/70 text-base leading-relaxed">
            These moments reflect the calm, care, and connection you&apos;ll experience 
            when you visit us in Matugama.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}