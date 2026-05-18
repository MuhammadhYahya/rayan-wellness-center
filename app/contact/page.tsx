import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <section className="bg-forest px-5 py-24 text-ivory">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sage">
            Contact
          </p>
          <h1 className="font-display text-4xl md:text-6xl">
            Start Your Recovery Conversation
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sage/90">
            Contact details and booking flows can be expanded here.
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-sage/15 bg-white p-10 text-charcoal/80 shadow-sm">
          Contact page content has not been implemented yet.
        </div>
      </section>

      <Footer />
    </main>
  );
}
