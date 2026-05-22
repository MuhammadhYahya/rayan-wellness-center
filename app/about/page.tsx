import Image from 'next/image';

import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <section className="bg-forest px-5 py-24 text-ivory">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sage">About Us</p>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            Meet Your Healer
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sage/90">
            Rayan Jayamanna | From Sri Lanka Navy to Healing Arts
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl lg:aspect-square">
              <Image
                src="/assets/images/rayan-portrait.jpeg"
                alt="Rayan Jayamanna"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-2 font-display text-4xl text-forest md:text-5xl">
                  Rayan Jayamanna
                </h2>
                <p className="font-medium text-moss">Founder &amp; Lead Therapist</p>
              </div>

              <div className="prose prose-lg leading-relaxed text-charcoal/80">
                <p>
                  After 22 years of honorable service as a Leading Seaman in the Sri
                  Lanka Navy, Rayan transitioned his discipline and precision into the
                  healing arts.
                </p>
                <p>
                  A certified Massage Therapist and Yoga Instructor, he combines sports
                  science, military-grade attention to detail, and ancient Ayurvedic
                  wisdom to deliver transformative wellness experiences.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-sage/20 pt-6">
                <div>
                  <div className="font-display text-5xl text-forest">15+</div>
                  <p className="mt-2 text-charcoal/70">Professional Certifications</p>
                </div>
                <div>
                  <div className="font-display text-5xl text-forest">8+</div>
                  <p className="mt-2 text-charcoal/70">Healing Therapies</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="italic text-charcoal/70">
                  &ldquo;Discipline, compassion, and deep knowledge are the pillars I
                  bring from my military service into every healing session.&rdquo;
                </p>
                <p className="mt-3 text-sm text-moss">- Rayan Jayamanna</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sage/5 px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-6 font-display text-3xl text-forest">
            A Journey of Service and Healing
          </h3>
          <p className="text-lg leading-relaxed text-charcoal/70">
            Rayan&apos;s unique background allows him to understand the human body from
            both a performance and recovery perspective. His approach is rooted in
            respect, precision, and genuine care for each individual&apos;s wellness
            journey.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
