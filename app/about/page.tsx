import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <section className="bg-forest px-5 py-24 text-ivory">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sage">
            About
          </p>
          <h1 className="font-display text-4xl md:text-6xl">
            About Rayan&apos;s Recovery &amp; Wellness Center
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sage/90">
            This page is ready for expanded brand and practitioner content.
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-sage/15 bg-white p-10 text-charcoal/80 shadow-sm">
          Detailed about-page content has not been implemented yet.
        </div>
      </section>

      <Footer />
    </main>
  );
}
