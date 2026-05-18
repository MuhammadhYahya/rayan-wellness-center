import Image from 'next/image';
import Link from 'next/link';

import { getServiceIcon } from '@/lib/sanity/icons';
import { urlForImage } from '@/lib/sanity/image';
import type { Service } from '@/lib/sanity/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type ServicesGridProps = {
  services: Service[];
};

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 text-center">
          <h2 className="font-display mb-4 text-4xl text-forest md:text-5xl">
            What We Offer
          </h2>
          <p className="mx-auto max-w-md text-charcoal/70">
            Personalized healing therapies tailored to your body and goals
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = getServiceIcon(service.iconKey);
              const imageUrl = service.image
                ? urlForImage(service.image).width(720).height(480).fit('crop').url()
                : null;

              return (
                <Card
                  key={service._id}
                  className="group relative overflow-hidden rounded-3xl border border-sage/10 bg-white transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-moss/30 hover:shadow-2xl"
                >
                  {imageUrl ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={service.image?.alt || service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent" />
                    </div>
                  ) : null}

                  <CardHeader className="pb-4 pt-8">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-moss/10">
                      <Icon className="h-9 w-9 text-moss transition-transform duration-500 group-hover:rotate-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-forest transition-colors group-hover:text-moss">
                      {service.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="pb-8">
                    <p className="mb-8 text-[15px] leading-relaxed text-charcoal/80">
                      {service.shortDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-sage">
                        {service.duration}
                      </p>

                      <Button
                        asChild
                        variant="ghost"
                        className="text-moss transition-all duration-300 group-hover:gap-2 hover:text-moss/80"
                      >
                        <Link href="/services" className="flex items-center">
                          Learn More
                          <span className="transition group-hover:translate-x-1">-&gt;</span>
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
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
