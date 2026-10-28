import 'server-only';

import { getSanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import type { Certificate, Review, Service } from '@/lib/sanity/types';
import { fallbackCertificates } from '@/lib/certificates';

const certificatesQuery = `*[_type == "certificate" && defined(image.asset)] | order(order asc, _createdAt asc) {
  _id,
  title,
  order,
  image
}`;

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

// Only what the footer needs (name + link), so this request stays tiny.
const footerServicesQuery = `*[_type == "service"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current
}`;

const reviewFields = `
  _id,
  name,
  role,
  quote,
  rating,
  status,
  featured,
  featuredOrder,
  submittedAt,
  approvedAt,
  consentToPublish,
  submissionSource,
  image,
  service->{
    _id,
    title,
    "slug": slug.current
  }
`;

const featuredReviewsQuery = `*[_type == "review" && status == "approved" && featured == true] | order(featuredOrder asc, approvedAt desc, name asc) {
  ${reviewFields}
}`;

const approvedReviewsQuery = `*[_type == "review" && status == "approved"] | order(approvedAt desc, submittedAt desc, name asc) {
  ${reviewFields}
}`;
const latestApprovedReviewsQuery = `*[_type == "review" && status == "approved"] | order(approvedAt desc, submittedAt desc) [0...8] {
  ${reviewFields}
}`;

export async function getServices(): Promise<Service[]> {
  const client = getSanityClient();

  const services = await client.fetch<Service[]>(
    servicesQuery,
    {},                    // params
    { 
      cache: 'no-store',   // ← Force fresh data on every request
      // OR use ISR (recommended for production):
      // next: { revalidate: 60 }   // Revalidate every 60 seconds
    }
  );

  return services.map((service) => ({
    ...service,
    imageUrl: service.image
      ? urlForImage(service.image).width(1100).height(820).fit('crop').url()
      : undefined,
  }));
}

function mapReview(review: Review): Review {
  return {
    ...review,
    rating: Math.max(1, Math.min(5, Math.round(review.rating))),
    imageUrl: review.image
      ? urlForImage(review.image).width(240).height(240).fit('crop').url()
      : undefined,
  };
}

export async function getFeaturedReviews(): Promise<Review[]> {
  const client = getSanityClient();
  const reviews = await client.fetch<Review[]>(featuredReviewsQuery);

  if (reviews.length > 0) {
  return reviews.map(mapReview);
}

const fallbackReviews = await client.fetch<Review[]>(latestApprovedReviewsQuery);

return fallbackReviews.map(mapReview);
}

export async function getApprovedReviews(): Promise<Review[]> {
  const client = getSanityClient();
  const reviews = await client.fetch<Review[]>(approvedReviewsQuery);

  return reviews.map(mapReview);
}

export async function getCertificates(): Promise<Certificate[]> {
  const client = getSanityClient();
  const certificates = await client.fetch<Certificate[]>(
    certificatesQuery,
    {},
    { cache: 'no-store' }
  );

  return certificates.map((certificate) => ({
    ...certificate,
    imageUrl: certificate.image
      ? urlForImage(certificate.image).width(1600).fit('max').url()
      : undefined,
  }));
}

// Services listed in the footer on every page. Added or removed services in Sanity
// show up here automatically (within 5 minutes — the list is cached so pages stay
// fast). If Sanity can't be reached, the footer simply links to /services instead
// of breaking the page.
export async function getFooterServices(): Promise<Pick<Service, '_id' | 'title' | 'slug'>[]> {
  try {
    const client = getSanityClient();
    return await client.fetch<Pick<Service, '_id' | 'title' | 'slug'>[]>(
      footerServicesQuery,
      {},
      { next: { revalidate: 300 } }
    );
  } catch (error) {
    console.error('Failed to load footer services from Sanity:', error);
    return [];
  }
}

// Same certificates the About page shows (Sanity first, the built-in list if Sanity
// has none yet), so the number on Home / Gallery always matches the About page.
const certificateCountQuery = `count(*[_type == "certificate" && defined(image.asset)])`;

/** How many certificates Rayan has. Updates on its own within 5 minutes of adding one in Sanity. */
export async function getCertificateCount(): Promise<number> {
  try {
    const client = getSanityClient();
    const count = await client.fetch<number>(certificateCountQuery, {}, { next: { revalidate: 300 } });
    if (count > 0) return count;
  } catch (error) {
    console.error('Failed to load the certificate count from Sanity:', error);
  }
  return fallbackCertificates.length;
}
