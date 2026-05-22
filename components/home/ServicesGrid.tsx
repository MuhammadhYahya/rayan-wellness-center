import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getServiceIcon } from '@/lib/sanity/icons';
import { urlForImage } from '@/lib/sanity/image';
import type { Service } from '@/lib/sanity/types';

type ServicesGridProps = {
  services: Service[];
};

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-4xl text-forest md:text-5xl">
            What We Offer
          </h2>
          <p className="mx-auto max-w-2xl text-charcoal/70">
            Personalized healing therapies tailored to your body and goals, delivered in
            a sanctuary of restorative calm.
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = getServiceIcon(service.iconKey);
              const imageUrl = service.image
                ? urlForImage(service.image).width(720).height(480).fit('crop').url()
                : null;

              return (
                <Card
                  key={service._id}
                  className="group relative overflow-hidden rounded-3xl border border-sage/10 bg-white transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={service.image?.alt || service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {service.duration ? (
                      <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-forest shadow-md">
                        {service.duration}
                      </div>
                    ) : null}

                    {Icon ? (
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 shadow-md">
                        <Icon className="h-6 w-6 text-moss" />
                      </div>
                    ) : null}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-semibold text-forest transition-colors group-hover:text-moss">
                      {service.title}
                    </h3>

                    <p className="mb-6 line-clamp-3 text-[15px] leading-relaxed text-charcoal/80">
                      {service.shortDescription}
                    </p>

                    <div className="flex justify-end">
                      <Button
                        asChild
                        variant="ghost"
                        className="group/link h-auto p-0 font-medium text-moss hover:text-moss/80"
                      >
                        <Link
                          href={`/contact?service=${encodeURIComponent(service.slug || service.title)}`}
                          className="flex items-center gap-1"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-moss to-sage transition-all duration-700 group-hover:w-full" />
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-sage/30 bg-white/70 px-6 py-10 text-center text-charcoal/70">
            Add services in Sanity to populate this section.
          </div>
        )}

        <div className="mt-14 text-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-forest px-10 py-7 text-base text-ivory hover:bg-forest/90"
          >
            <Link href="/contact">Book Session</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
