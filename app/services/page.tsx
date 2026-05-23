import Link from 'next/link';
import { ArrowRight, CalendarDays, Sparkles, BadgeCheck } from 'lucide-react';

import Footer from '@/components/layout/Footer';
import { getServices } from '@/lib/sanity/queries';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero Section - Compact */}
      <section className="bg-forest px-5 py-28  text-ivory">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-sage">
            OUR TREATMENTS
          </p>
          <h1 className="font-display text-3xl md:text-5xl leading-tight">
            Healing Therapies,<br />Crafted with Care
          </h1>
          <p className="mt-5 text-base md:text-lg text-sage/90 max-w-lg mx-auto">
            Browse all services below. Each one is designed to support your recovery and wellbeing.
          </p>
        </div>
      </section>

      {/* Services List - Compact & Light */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.length > 0 ? (
              services.map((service) => (
                <Link
                  key={service._id}
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="group rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-sm font-medium text-moss">
                      {service.duration}
                    </div>
                    <ArrowRight className="h-4 w-4 text-sage/50 group-hover:text-moss transition" />
                  </div>

                  <h3 className="text-xl font-semibold text-forest mb-3 group-hover:text-moss transition">
                    {service.title}
                  </h3>

                  <p className="text-charcoal/70 text-[15px] leading-relaxed line-clamp-3 flex-1">
                    {service.shortDescription}
                  </p>

                  <div className="mt-6 text-xs uppercase tracking-widest text-sage/70">
                    Tap to book →
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full py-12 text-center text-charcoal/60">
                No services available yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Why Book Section - Light & Compact */}
      <section className="bg-white py-12 md:py-16 border-t border-sage/10">
        <div className="mx-auto max-w-4xl px-5">
          <div className="text-center mb-10">
            <p className="text-moss uppercase tracking-widest text-sm mb-2">WHY CLIENTS CHOOSE US</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-forest">
              Experience the Difference
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center mb-4">
                <BadgeCheck className="h-6 w-6 text-moss" />
              </div>
              <h4 className="font-medium text-forest mb-2">Expert Care</h4>
              <p className="text-sm text-charcoal/70">22 years of disciplined service combined with professional certifications.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-moss" />
              </div>
              <h4 className="font-medium text-forest mb-2">Personalized</h4>
              <p className="text-sm text-charcoal/70">Every session is tailored to your body and specific goals.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center mb-4">
                <CalendarDays className="h-6 w-6 text-moss" />
              </div>
              <h4 className="font-medium text-forest mb-2">Easy Booking</h4>
              <p className="text-sm text-charcoal/70">Quick form + direct WhatsApp confirmation.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}