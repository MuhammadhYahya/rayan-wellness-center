'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { MapPinned } from 'lucide-react';
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/hero-bg.jpg"   // Put your forest image here
        alt="Rayan's Recovery & Wellness Center - Forest Setting"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-forest/70" />

      {/* Subtle Leaf Pattern Overlay (optional) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3D6B35_1px,transparent_1px)] [background-size:50px_50px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
          <MapPinned className="w-6 h-6 text-sage"/>
          <span className="text-sm text-ivory tracking-widest uppercase">Matugama, Sri Lanka</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl md:text-7xl lg:text-8xl text-ivory leading-tight mb-6">
          Expert Healing.
          <br />
          <span className="text-sage italic"> Lasting Results. </span>

        </h1>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-ivory/90 font-light mb-10">
          Multi-certified massage therapy, yoga &amp; holistic treatments tailored to your body and goals.
        </p>

        {/* CTAs */}
   {/* CTAs */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <Button
    asChild
    size="lg"
    className="bg-moss hover:bg-moss/90 text-white 
    text-sm sm:text-lg 
    px-6 py-4 sm:px-10 sm:py-7 
    rounded-full font-medium group"
  >
    <Link href="/contact">
      Book a Session
      <ArrowRight className="ml-2 sm:ml-3 group-hover:translate-x-1 transition" />
    </Link>
  </Button>

  <Button
    asChild
    variant="outline"
    size="lg"
    className="border-2 border-ivory text-ivory hover:bg-white/10 
    text-sm sm:text-lg 
    px-6 py-4 sm:px-10 sm:py-7 
    rounded-full backdrop-blur-sm"
  >
    <Link href="/services">Explore Services</Link>
  </Button>
</div>

        {/* Trust Signals */}
        <div className="flex items-center justify-center gap-8 mt-16 text-sm text-ivory/70">
          <div>22 Years Navy Discipline</div>
          <div className="w-px h-4 bg-white/30" />
          <div>15+ Certifications</div>
          <div className="w-px h-4 bg-white/30" />
          <div>Nature-Based Healing</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/60">
        <span className="text-xs tracking-widest">SCROLL TO EXPLORE</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-ivory/40 to-transparent" />
      </div>

      {/* Floating Leaf Decoration */}
      <div className="absolute bottom-20 right-10 hidden lg:block text-[120px] opacity-10 pointer-events-none">
        🌿
      </div>
    </section>
  );
}