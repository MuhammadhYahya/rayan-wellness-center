// components/home/GalleryPreview.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
  {
    src: "/assets/images/gallery/g-01.jpeg",
    alt: "Massage Therapy Session",
    category: "Massage"
  },
  {
    src: "/assets/images/gallery/g-02.jpeg",
    alt: "Hatha Yoga Session",
    category: "Yoga"
  },
  {
    src: "/assets/images/gallery/g-03.jpeg",
    alt: "Peaceful Treatment Room",
    category: "The Space"
  },
  {
    src: "/assets/images/gallery/g-04.jpeg",
    alt: "Outdoor Yoga Class",
    category: "Yoga"
  }
];

export default function GalleryPreview() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-forest mb-3">
              Glimpse of Our Space
            </h2>
            <p className="text-charcoal/70 text-lg">
              Where healing meets nature
            </p>
          </div>
          
          <Button 
            asChild 
            variant="outline"
            className="mt-6 md:mt-0 border-forest text-forest hover:bg-forest hover:text-ivory rounded-full"
          >
            <Link href="/gallery" className="flex items-center gap-2">
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Horizontal Carousel / Scrollable */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="min-w-[85%] sm:min-w-[70%] md:min-w-[48%] lg:min-w-[420px] 
                           snap-center group relative overflow-hidden rounded-3xl aspect-[4/3] 
                           shadow-md hover:shadow-xl transition-all duration-500 flex-shrink-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Category Label */}
                <div className="absolute bottom-6 left-6 bg-white/95 text-forest text-sm font-medium px-5 py-2.5 rounded-full backdrop-blur-sm">
                  {image.category}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {galleryImages.map((_, index) => (
              <div key={index} className="w-2 h-2 bg-sage/30 rounded-full" />
            ))}
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-sage">
          Swipe horizontally to explore • More photos in full gallery
        </div>
      </div>
    </section>
  );
}