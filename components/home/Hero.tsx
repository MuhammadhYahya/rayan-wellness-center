import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

// Server component: no JavaScript needed. The headline and text are in the HTML
// from the start (no fade-in), which keeps the page's main content fast to show.
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-screen relative flex flex-col overflow-hidden bg-forest text-ivory"
    >
      <Image
        src="/assets/images/hero-bg.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-[center_62%]"
      />
      {/* Plain rgba tint (works on older browsers) + a soft darker centre behind the text */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(26,46,26,0.38), rgba(26,46,26,0) 72%), rgba(26,46,26,0.5)',
        }}
      />

      <div className="site-container relative z-10 flex flex-1 flex-col items-center justify-center pb-7 pt-16 text-center lg:pt-20">
        <p className="inline-flex h-[2.125rem] items-center gap-2 rounded-full border border-ivory/30 bg-forest/40 px-4 text-xs font-medium uppercase tracking-[0.2em]">
          <MapPin className="h-4 w-4 text-sage" aria-hidden="true" />
          Keeranthidiya, Sri Lanka
        </p>

        <h1
          id="hero-title"
          className="hero-title mt-[1.875rem] font-display font-normal leading-[1.14] text-ivory"
        >
          Expert Healing.
          <span className="mt-1 block italic text-leaf">Lasting Results.</span>
        </h1>

        <p className="mt-7 max-w-[33rem] text-[clamp(1.0625rem,1.4vw,1.25rem)] font-light leading-[1.8] tracking-[0.01em] text-ivory/95">
          Multi-certified massage therapy, yoga &amp; holistic treatments tailored to your body
          and goals.
        </p>

        <div className="mt-10 flex w-full max-w-[21.25rem] flex-col gap-3.5 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center">
          {/* Phones/tablets: the top bar only has the menu icon, so Book stays here.
              Laptop/desktop: Book is already in the top bar, so the hero offers
              Explore Services as its one (solid) button. */}
          <Link href="/contact" className="btn btn-primary lg:hidden">
            Book a Session
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/services" className="btn btn-ghost-dark lg:hidden">
            Explore Services
          </Link>
          <Link href="/services" className="btn btn-primary hidden lg:inline-flex">
            Explore Services
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="hero-scroll-hint relative z-10 pb-[1.375rem] text-center text-[0.6875rem] tracking-[0.3em] text-ivory/75"
      >
        SCROLL TO EXPLORE
      </p>
    </section>
  );
}
