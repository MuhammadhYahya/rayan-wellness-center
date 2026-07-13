import 'server-only';

import { getSanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import type { Review, Service } from '@/lib/sanity/types';

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
