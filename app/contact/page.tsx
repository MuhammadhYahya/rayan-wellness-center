import { CalendarDays, Clock3, MessageCircle, ShieldCheck } from 'lucide-react';

import BookingForm from '@/components/contact/BookingForm';
import Footer from '@/components/layout/Footer';
import { getServices } from '@/lib/sanity/queries';

type ContactPageProps = {
  searchParams?: Promise<{
    service?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const services = await getServices();
  const params = searchParams ? await searchParams : undefined;
  const requestedService = params?.service ?? '';

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
            Share the session you want, your preferred time, and how to reach you.
            We&apos;ll make booking feel simple from the first message.
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-forest p-8 text-ivory shadow-sm md:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-sage">Book with confidence</p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl">
                A calm, guided path to the right session.
              </h2>
              <p className="mt-5 text-base leading-7 text-ivory/80">
                Tell us the treatment you&apos;re interested in and the time that works
                for you. We&apos;ll receive the request by email, and you can continue on
                WhatsApp for quick confirmation.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 text-sage">
                    <CalendarDays className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-[0.24em]">
                      Preferred date and time
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ivory/75">
                    Choose a slot that suits your week and mention any flexibility in
                    your notes.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 text-sage">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-[0.24em]">
                      Direct request delivery
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ivory/75">
                    Your form request goes straight through Web3Forms so it reaches the
                    booking inbox immediately.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 text-sage">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-[0.24em]">
                      WhatsApp follow-up
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ivory/75">
                    Prefer faster coordination? Use WhatsApp after submitting and your
                    service details will already be ready to reference.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-sage/20 bg-sage/10 p-5 text-sm text-ivory/80">
                Sessions available Monday to Saturday. Response timing may vary slightly
                outside treatment hours.
              </div>
            </div>

            <div className="rounded-[2rem] border border-sage/15 bg-white p-8 shadow-sm md:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-moss">Fast contact</p>
              <h3 className="mt-4 text-2xl font-semibold text-forest">
                Need a quicker reply?
              </h3>
              <p className="mt-3 text-base leading-7 text-charcoal/70">
                You can also go straight to WhatsApp for urgent booking questions or
                same-week availability.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/94762985339?text=Hi%20Rayan%2C%20I%27d%20like%20to%20book%20a%20session"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+94762985339"
                  className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-ivory px-6 py-3 text-sm font-medium text-forest transition hover:bg-sage/10"
                >
                  <Clock3 className="h-4 w-4" />
                  Call +94 76 298 5339
                </a>
              </div>
            </div>
          </div>

          <BookingForm services={services} initialService={requestedService} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
