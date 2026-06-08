import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, MessageCircle, Star } from 'lucide-react';

import Footer from '@/components/layout/Footer';
import ReviewSubmissionForm from '@/components/reviews/ReviewSubmissionForm';
import ReviewsFilter from '@/components/reviews/ReviewsFilter';
import { getApprovedReviews, getServices } from '@/lib/sanity/queries';
import { hasSanityWriteToken } from '@/lib/sanity/client';

type ReviewsPageProps = {
  searchParams?: Promise<{ service?: string }>;
};

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const [reviews, services, params] = await Promise.all([
    getApprovedReviews(),
    getServices(),
    searchParams ? searchParams : Promise.resolve(undefined),
  ]);

  const selectedService = params?.service ?? '';
  const selectedServiceTitle = selectedService 
    ? services.find(s => s.slug === selectedService)?.title ?? null
    : null;
  const filteredReviews = selectedService
    ? reviews.filter((review) => review.service?.slug === selectedService)
    : reviews;

  const isReviewSubmissionEnabled = hasSanityWriteToken();

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero - Minimal */}
      <section className="bg-forest px-5 pt-20 pb-12 md:pt-24 md:pb-16 text-ivory">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-sage">CLIENT VOICES</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            Real Stories of Recovery
          </h1>
          <p className="mt-6 text-lg text-sage/90">
            Honest feedback from people who experienced healing with us.
          </p>
        </div>
      </section>

  <section className="px-5 py-12 md:py-16">
  <div className="mx-auto max-w-5xl">
    
    {/* Filter */}
    <div className="mb-10">
      <ReviewsFilter
        services={services}
        selectedService={selectedService}
        selectedServiceTitle={selectedServiceTitle}
      />
    </div>

    {/* "Write a Review" Button - Prominent */}
    <div className="mb-10 flex justify-center">
      <a
        href="#submit-review"
        className="inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-lg font-medium text-white transition hover:bg-forest/90"
      >
        <MessageCircle className="h-5 w-5" />
        Write Your Review
      </a>
    </div>

    {/* Reviews Grid - More Compact */}
    <div className="space-y-10">
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review) => {
          const hasImage = Boolean(review.imageUrl);
          
          return (
            <article
              key={review._id}
              className="rounded-3xl border border-sage/10 bg-white p-6 md:p-10 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-8 md:items-start">
                
                {/* Medium Image (Better for list) */}
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  {hasImage && review.imageUrl ? (
                    <div className="relative h-40 w-40 md:h-48 md:w-48 overflow-hidden rounded-3xl border border-sage/20 shadow-md">
                      <Image
                        src={review.imageUrl}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-40 w-40 md:h-48 md:w-48 rounded-3xl bg-forest/10 flex items-center justify-center text-5xl font-medium text-forest">
                      {review.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-2xl font-semibold text-forest">{review.name}</p>
                      {review.role && (
                        <p className="text-lg text-moss mt-1">{review.role}</p>
                      )}
                      {review.service?.title && (
                        <p className="text-sm text-charcoal/60 mt-1">{review.service.title}</p>
                      )}
                    </div>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < review.rating ? 'fill-sage text-sage' : 'text-sage/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-[17px] leading-relaxed text-charcoal/80">
                    “{review.quote}”
                  </blockquote>
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <div className="rounded-3xl border border-dashed border-sage/20 bg-white py-20 text-center">
          <p className="text-2xl text-forest">No reviews yet</p>
          <p className="mt-3 text-charcoal/60">
            Be the first to share your experience.
          </p>
        </div>
      )}
    </div>
  </div>
</section>

{/* Submission Form - Now Easier to Reach */}
<section id="submit-review" className="px-5 pb-20 bg-ivory/70">
  <div className="mx-auto max-w-3xl pt-12">
    <div className="text-center mb-10">
      <h2 className="font-display text-4xl text-forest">Share Your Experience</h2>
      <p className="mt-3 text-charcoal/70">Your feedback helps others choose the right care.</p>
    </div>
    <ReviewSubmissionForm services={services} isSubmissionEnabled={isReviewSubmissionEnabled} />
  </div>
</section>

      <Footer />
    </main>
  );
}