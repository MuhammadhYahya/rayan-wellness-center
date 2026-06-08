// import Link from 'next/link';
import { CalendarDays, Clock3, MessageCircle } from 'lucide-react';

import BookingForm from '@/components/contact/BookingForm';
import Footer from '@/components/layout/Footer';
import { getServices } from '@/lib/sanity/queries';

type ContactPageProps = {
  searchParams?: Promise<{ service?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const services = await getServices();
  const params = searchParams ? await searchParams : undefined;
  const requestedService = params?.service ?? '';

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-forest px-5 pt-20 pb-12 md:pt-24 md:pb-16 text-ivory">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-sage">GET IN TOUCH</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            Start Your Healing Journey
          </h1>
          <p className="mt-6 text-base md:text-lg text-sage/90 max-w-2xl mx-auto">
            Tell us about the session you need. We’ll respond quickly and guide you through the next step.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-5">
            
            {/* Left Column - Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-widest text-moss mb-4">Quick Options</p>
                
                <div className="space-y-6">
                  <a
                    href="https://wa.me/94762985339?text=Hi%20Rayan%2C%20I%27d%20like%20to%20book%20a%20session"
                    target="_blank"
                    className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-5 hover:bg-green-100 transition"
                  >
                    <div className="h-11 w-11 rounded-2xl bg-green-600 flex items-center justify-center text-white">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Chat on WhatsApp</p>
                      <p className="text-sm text-charcoal/70">Fastest way to book</p>
                    </div>
                  </a>

                  <a
                    href="tel:+94762985339"
                    className="flex items-center gap-4 rounded-2xl border border-sage/10 p-5 hover:bg-sage/5 transition"
                  >
                    <div className="h-11 w-11 rounded-2xl bg-forest flex items-center justify-center text-white">
                      <Clock3 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-charcoal/70">+94 76 298 5339</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-widest text-moss mb-4">Working Hours</p>
                <p className="text-charcoal/80">
                  Monday – Sunday<br />
                  9:00 AM – 7:00 PM
                </p>
                <p className="mt-6 text-xs text-charcoal/60">
                  We usually reply within a few hours during working hours.
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-3">
              <BookingForm services={services} initialService={requestedService} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}