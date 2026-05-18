import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

import ServicesGrid from '@/components/home/ServicesGrid';
import Footer from '@/components/layout/Footer';
import { getServiceIcon } from '@/lib/sanity/icons';
import { urlForImage } from '@/lib/sanity/image';
import { getServices } from '@/lib/sanity/queries';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-ivory">
      <section className="bg-forest px-5 py-16 text-ivory md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sage">
            Tailored healing
          </p>
          <h1 className="font-display text-4xl md:text-6xl">
            Services Rooted in Recovery, Strength, and Calm
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sage/90">
            Explore the full treatment menu managed in Sanity, from sports recovery
            work to restorative massage and mindful movement.
          </p>
        </div>
      </section>

      <ServicesGrid services={services} />

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <h2 className="font-display text-3xl text-forest md:text-4xl">
              Detailed service guide
            </h2>
            <p className="mt-3 max-w-2xl text-charcoal/70">
              Each item below uses the same Sanity dataset as the homepage cards.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="space-y-8">
              {services.map((service) => {
                const Icon = getServiceIcon(service.iconKey);
                const imageUrl = service.image
                  ? urlForImage(service.image).width(1200).height(720).fit('crop').url()
                  : null;

                return (
                  <article
                    key={service._id}
                    className="grid gap-6 overflow-hidden rounded-[2rem] border border-sage/15 bg-white shadow-sm lg:grid-cols-[1.2fr_1fr]"
                  >
                    <div className="p-8 md:p-10">
                      <div className="mb-5 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-moss/10 text-moss">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-forest md:text-3xl">
                            {service.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-sage">
                            {service.duration}
                          </p>
                        </div>
                      </div>

                      <p className="text-base leading-7 text-charcoal/80">
                        {service.longDescription || service.shortDescription}
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-moss/10 px-4 py-2 text-sm font-medium text-moss">
                        <BadgeCheck className="h-4 w-4" />
                        Bookable service
                      </div>
                    </div>

                    <div className="relative min-h-[260px] bg-forest/5">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={service.image?.alt || service.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-10 text-center text-charcoal/55">
                          Add a service image in Sanity to enrich this section.
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-sage/30 bg-white/80 px-8 py-16 text-center text-charcoal/70">
              No services have been published in Sanity yet.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
