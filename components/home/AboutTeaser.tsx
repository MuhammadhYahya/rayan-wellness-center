// components/home/AboutTeaser.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AboutTeaser() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Side - Image */}
          <div className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/assets/images/rayan-portrait.jpeg"   // ← Put Rayan's photo here
              alt="Rayan Jayamanna - Founder of Rayan's Recovery & Wellness"
              fill
              className="object-cover  hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/20 to-transparent" />
            
            {/* Small badge on image */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md text-forest px-4 py-2 rounded-full text-sm font-medium">
              22 Years Navy Experience
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div>
              <span className="uppercase tracking-widest text-sage text-sm font-medium">
                Meet Your Healer
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight mt-3">
                Rayan Jayamanna
              </h2>
            </div>

            <div className="space-y-6 text-lg text-charcoal/80 leading-relaxed">
              <p>
                After 22 years of honorable service as a Leading Seaman in the Sri Lanka Navy, 
                Rayan transitioned his discipline and precision into the healing arts.
              </p>
              <p>
                A certified Massage Therapist and Yoga Instructor, he combines sports science, 
                military-grade attention to detail, and ancient Ayurvedic wisdom to deliver 
                transformative wellness experiences.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                asChild 
                size="lg"
                className="bg-moss hover:bg-moss/90 text-white rounded-full px-8 group"
              >
                <Link href="/about" className="flex items-center gap-3">
                  Read Full Story
                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </Link>
              </Button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-sage/20">
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