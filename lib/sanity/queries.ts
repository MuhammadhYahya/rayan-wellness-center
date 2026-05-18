import 'server-only';

import { getSanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import type { Service, Testimonial } from '@/lib/sanity/types';

const servicesQuery = `*[_type == "service"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  longDescription,
  duration,
  order,
  iconKey,
  image
}`;

const testimonialsQuery = `*[_type == "testimonial"] | order(order asc, name asc) {
  _id,
  name,
  role,
  quote,
  rating,
  order,
  image
}`;

export async function getServices(): Promise<Service[]> {
  const client = getSanityClient();
  return client.fetch<Service[]>(servicesQuery);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const client = getSanityClient();
  const testimonials = await client.fetch<Testimonial[]>(testimonialsQuery);

  return testimonials.map((testimonial) => ({
    ...testimonial,
    rating: Math.max(1, Math.min(5, Math.round(testimonial.rating))),
    imageUrl: testimonial.image
      ? urlForImage(testimonial.image).width(160).height(160).fit('crop').url()
      : undefined,
  }));
}
