import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AboutTeaser() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl md:aspect-square">
            <Image
              src="/assets/images/rayan-portrait.jpeg"
              alt="Rayan Jayamanna - Founder of Rayan's Recovery & Wellness"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/20 to-transparent" />

            <div className="absolute bottom-6 left-6 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-forest backdrop-blur-md">
              22 Years Navy Experience
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-sage">
                Meet Your Healer
              </span>
              <h2 className="mt-3 font-display text-4xl leading-tight text-forest md:text-5xl">
                Rayan Jayamanna
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-charcoal/80">
              <p>
                After 22 years of honorable service as a Leading Seaman in the Sri Lanka
                Navy, Rayan transitioned his discipline and precision into the healing
                arts.
              </p>
              <p>
                A certified Massage Therapist and Yoga Instructor, he combines sports
                science, military-grade attention to detail, and ancient Ayurvedic
                wisdom to deliver transformative wellness experiences.
              </p>
            </div>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="group rounded-full bg-moss px-8 text-white hover:bg-moss/90"
              >
                <Link href="/about" className="flex items-center gap-3">
                  Read Full Story
                  <ArrowRight className="transition group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-sage/20 pt-8">
              <div>
                <p className="text-2xl font-semibold text-forest">15+</p>
                <p className="text-sm text-sage">Professional Certifications</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-forest">8+</p>
                <p className="text-sm text-sage">Healing Therapies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
