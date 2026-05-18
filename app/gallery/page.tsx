import Footer from '@/components/layout/Footer';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <section className="bg-forest px-5 py-24 text-ivory">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sage">
            Gallery
          </p>
          <h1 className="font-display text-4xl md:text-6xl">
            Wellness Space and Session Highlights
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sage/90">
            This route is now build-safe and ready for a richer gallery experience.
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-sage/15 bg-white p-10 text-charcoal/80 shadow-sm">
          Gallery page content has not been implemented yet.
        </div>
      </section>

      <Footer />
    </main>
  );
}
