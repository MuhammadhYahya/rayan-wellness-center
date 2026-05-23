import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin } from 'lucide-react';

import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-forest px-5 pt-20 pb-12 md:pt-24 md:pb-16 text-ivory">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-sage">OUR STORY</p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Meet Your Healer
          </h1>
          <p className="mt-6 text-lg md:text-xl text-sage/90 max-w-2xl mx-auto">
            From 22 years in the Sri Lanka Navy to a life dedicated to healing
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Photo */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl lg:aspect-square">
              <Image
                src="/assets/images/rayan-portrait.jpeg"
                alt="Rayan Jayamanna"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Bio */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-4xl md:text-5xl text-forest mb-2">
                  Rayan Jayamanna
                </h2>
                <p className="text-moss font-medium">Founder & Lead Therapist</p>
              </div>

              <div className="prose prose-lg max-w-none text-charcoal/80 leading-relaxed">
                <p>
                  After 22 years of honorable service as a Leading Seaman in the Sri Lanka Navy, 
                  Rayan transitioned his discipline and precision into the healing arts.
                </p>
                <p>
                  A certified Massage Therapist and Yoga Instructor, he brings together sports science, 
                  military-grade attention to detail, and ancient Ayurvedic wisdom to create truly 
                  transformative wellness experiences.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 border-t border-sage/20 pt-8">
                <div>
                  <div className="text-5xl font-semibold text-forest">15+</div>
                  <p className="text-sm text-charcoal/70 mt-1">Professional Certifications</p>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-forest">8+</div>
                  <p className="text-sm text-charcoal/70 mt-1">Healing Therapies</p>
                </div>
              </div>

              {/* Quote */}
              <div className="italic border-l-4 border-moss pl-6 text-charcoal/80">
                “Discipline, compassion, and deep knowledge are the pillars I bring from my military service into every healing session.”
                <p className="mt-4 text-sm text-moss">- Rayan Jayamanna</p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-moss hover:text-forest transition font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-sage/5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h3 className="font-display text-3xl md:text-4xl text-forest mb-6">
            A Journey of Service and Healing
          </h3>
          <p className="text-lg leading-relaxed text-charcoal/75">
            Rayan&apos;s unique background allows him to understand the human body from both 
            a performance and recovery perspective. His approach is rooted in respect, precision, 
            and genuine care for each individual&apos;s wellness journey.
          </p>
        </div>
      </section>

  {/* Location Section */}
<section className="px-5 py-16 md:py-20">
  <div className="mx-auto max-w-5xl">
    <div className="text-center mb-10">
      <p className="uppercase tracking-widest text-sm text-moss mb-2">Visit Us</p>
      <h3 className="font-display text-3xl md:text-4xl text-forest">
        Our Healing Space
      </h3>
      <p className="mt-3 text-charcoal/70">
        Keeranthidiya, Matugama, Sri Lanka
      </p>
    </div>

    <div className="overflow-hidden rounded-[2rem] border border-sage/15 shadow-sm bg-white">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3964.3612922007496!2d80.059968!3d6.47584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjgnMzMuMCJOIDgwwrAwMyczNS45IkU!5e0!3m2!1sen!2slk!4v1779545711805!5m2!1sen!2slk"
        width="100%"
        height="460"
        className="w-full border-0"
        style={{ minHeight: '380px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      
      <div className="flex items-center justify-center gap-3 bg-white py-5 text-sm text-charcoal/70 border-t border-sage/10">
        <MapPin className="h-4 w-4 text-moss" />
        <span>Keeranthidiya, Matugama, Sri Lanka</span>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </main>
  );
}