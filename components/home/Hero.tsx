'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPinned } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/assets/images/hero-bg.jpg"
        alt="Rayan's Recovery & Wellness Center - Forest Setting"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-forest/70" />
      <div className="absolute inset-0 bg-[radial-gradient(#3D6B35_1px,transparent_1px)] opacity-10 [background-size:50px_50px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <MapPinned className="h-6 w-6 text-sage" />
          <span className="text-sm uppercase tracking-widest text-ivory">
            Keeranthidiya, Sri Lanka
          </span>
        </div>

        <h1 className="mb-6 font-display text-4xl leading-tight text-ivory md:text-7xl lg:text-8xl">
          Expert Healing.
          <br />
          <span className="italic text-sage">Lasting Results.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-xl font-light text-ivory/90 md:text-2xl">
          Multi-certified massage therapy, yoga &amp; holistic treatments tailored to
          your body and goals.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group rounded-full bg-moss px-6 py-4 text-sm text-white hover:bg-moss/90 sm:px-10 sm:py-7 sm:text-lg"
          >
            <Link href="/contact">
              Book a Session
              <ArrowRight className="ml-2 transition group-hover:translate-x-1 sm:ml-3" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-ivory px-6 py-4 text-sm text-ivory backdrop-blur-sm hover:bg-white/10 sm:px-10 sm:py-7 sm:text-lg"
          >
            <Link href="/services">Explore Services</Link>
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-ivory/70">
          <div>22 Years Navy Discipline</div>
          <div className="h-4 w-px bg-white/30" />
          <div>15+ Certifications</div>
          <div className="h-4 w-px bg-white/30" />
          <div>Nature-Based Healing</div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/60">
        <span className="text-xs tracking-widest">SCROLL TO EXPLORE</span>
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-ivory/40 to-transparent" />
      </div>
    </section>
  );
}
