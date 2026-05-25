// components/home/BookingTeaser.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Phone } from 'lucide-react';

export default function BookingTeaser() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-forest to-forest/95 text-ivory relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6">
          <Clock className="w-5 h-5" />
          <span className="uppercase tracking-widest text-sm">Limited Slots Available</span>
        </div>

        <h2 className="font-display text-4xl md:text-6xl leading-tight mb-6">
          Ready to Begin Your<br />Healing Journey?
        </h2>

        <p className="text-lg md:text-xl text-ivory/80 max-w-2xl mx-auto mb-10">
          Book your personalized session with Rayan. Experience the perfect blend of discipline, expertise, and care.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild 
            size="lg"
            className="bg-moss hover:bg-moss/90 text-white rounded-full px-10 py-7 text-lg font-medium flex items-center gap-3 group"
          >
            <Link href="/contact">
              Book Your Session Now
              <Calendar className="group-hover:rotate-12 transition" />
            </Link>
          </Button>

          <Button 
            asChild 
            variant="outline"
            size="lg"
            className="border-ivory text-ivory hover:bg-white/10 rounded-full px-10 py-7 text-lg"
          >
            <a 
              href="https://wa.me/94762985339?text=Hi%20Rayan%2C%20I%27d%20like%20to%20book%20a%20session"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Message on WhatsApp
            </a>
          </Button>
        </div>

        <p className="text-sage/70 text-sm mt-8">
          Sessions available Monday to Sunday • Keeranthidiya, Sri Lanka
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-10 text-[180px] opacity-5 pointer-events-none hidden lg:block">
        🌿
      </div>
    </section>
  );
}