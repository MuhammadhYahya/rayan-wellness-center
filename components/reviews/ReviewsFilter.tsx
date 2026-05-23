'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';

import type { Service } from '@/lib/sanity/types';

type ReviewsFilterProps = {
  services: Service[];
  selectedService: string;
  selectedServiceTitle: string | null;
};

export default function ReviewsFilter({
  services,
  selectedService,
  selectedServiceTitle,
}: ReviewsFilterProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleServiceChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('service', value);
    } else {
      params.delete('service');
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-moss">
          <Filter className="h-4 w-4" />
          {selectedServiceTitle ? `Showing ${selectedServiceTitle}` : 'Showing all reviews'}
        </div>

        <label className="flex flex-col gap-2 md:hidden">
          <span className="text-sm font-medium text-forest">Choose a service</span>
          <select
            value={selectedService}
            onChange={(event) => handleServiceChange(event.target.value)}
            className="rounded-2xl border border-sage/20 bg-ivory px-4 py-3 text-sm font-medium text-forest outline-none transition focus:border-moss"
          >
            <option value="">All reviews</option>
            {services.map((service) => (
              <option key={service._id} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 hidden flex-wrap gap-3 md:flex">
        <Link
          href="/reviews"
          className={`rounded-full px-5 py-3 text-sm font-medium transition ${
            !selectedService
              ? 'bg-forest text-ivory'
              : 'border border-sage/20 bg-ivory text-forest hover:bg-sage/10'
          }`}
        >
          All reviews
        </Link>
        {services.map((service) => (
          <Link
            key={service._id}
            href={`/reviews?service=${encodeURIComponent(service.slug)}`}
            className={`rounded-full px-5 py-3 text-sm font-medium transition ${
              selectedService === service.slug
                ? 'bg-forest text-ivory'
                : 'border border-sage/20 bg-ivory text-forest hover:bg-sage/10'
            }`}
          >
            {service.title}
          </Link>
        ))}
      </div>
    </>
  );
}
