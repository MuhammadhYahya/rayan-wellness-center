import Link from 'next/link';
import { ArrowRight, BadgeCheck, CalendarDays, Sparkles } from 'lucide-react';

import Footer from '@/components/layout/Footer';
import { getServices } from '@/lib/sanity/queries';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-ivory">
      <section className="bg-forest px-5 py-16 text-ivory md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sage">
            Tailored healing
          </p>
          <h1 className="font-display text-4xl md:text-6xl">
            Services Rooted in Recovery, Strength, and Calm
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sage/90">
            Every treatment is now showcased in detail on the homepage. Use this page
            as your quick guide, then book the session that best supports your recovery.
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-sage/15 bg-white p-8 shadow-sm md:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-moss">Quick guide</p>
              <h2 className="mt-4 font-display text-3xl text-forest md:text-4xl">
                Browse all treatments on the homepage, then reserve the one that fits.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-charcoal/75">
                The homepage now gives each treatment a live detail preview with service
                image, duration, and a fuller explanation. This page stays lighter so
                you can move straight into booking when you are ready.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {services.length > 0 ? (
                  services.map((service) => (
                    <span
                      key={service._id}
                      className="rounded-full border border-sage/20 bg-ivory px-4 py-2 text-sm font-medium text-forest"
                    >
                      {service.title}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-dashed border-sage/30 px-4 py-2 text-sm text-charcoal/65">
                    Services will appear here once published in Sanity.
                  </span>
                )}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-base font-medium text-ivory transition hover:bg-forest/92"
                >
                  See Treatments in Detail
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-moss/20 bg-moss/10 px-7 py-4 text-base font-medium text-moss transition hover:bg-moss/15"
                >
                  Book a Session
                  <CalendarDays className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-forest p-8 text-ivory shadow-sm md:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-sage">Why book now</p>
              <div className="mt-6 space-y-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 text-sage">
                    <BadgeCheck className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-[0.22em]">
                      Guided selection
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ivory/80">
                    Use the homepage treatment previews to compare recovery, relaxation,
                    and mobility-focused sessions before booking.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 text-sage">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-[0.22em]">
                      Personalized care
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ivory/80">
                    Every session is adapted to your body, schedule, and recovery goals.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 text-sage">
                    <CalendarDays className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-[0.22em]">
                      Faster booking
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ivory/80">
                    Send your details through the booking form and continue on WhatsApp
                    if you want a faster confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
