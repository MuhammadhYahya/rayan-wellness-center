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
        <div className="mx-auto max-w-6xl">
          {/* Filter */}
          <div className="mb-10">
            <ReviewsFilter
              services={services}
              selectedService={selectedService}
              selectedServiceTitle={selectedServiceTitle}
            />
          </div>

          {/* Reviews Grid */}
          <div className="space-y-8">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <article
                  key={review._id}
                  className="rounded-3xl border border-sage/10 bg-white p-8 md:p-10 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex items-start gap-4">
                      {review.imageUrl ? (
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-sage/20">
                          <Image
                            src={review.imageUrl}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-14 w-14 flex-shrink-0 rounded-full bg-forest/10 flex items-center justify-center text-2xl font-medium text-forest">
                          {review.name.charAt(0)}
                        </div>
                      )}

                      <div>
                        <p className="text-xl font-medium text-forest">{review.name}</p>
                        {review.role && (
                          <p className="text-sm text-moss">{review.role}</p>
                        )}
                        {review.service?.title && (
                          <p className="mt-1 text-xs text-charcoal/60">
                            {review.service.title}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? 'fill-sage text-sage' : 'text-sage/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-8 text-[17px] leading-relaxed text-charcoal/80">
                    “{review.quote}”
                  </blockquote>
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-sage/20 bg-white py-20 text-center">
                <p className="text-2xl text-forest">No reviews yet</p>
                <p className="mt-3 text-charcoal/60">
                  Be the first to share your experience after your session.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-3xl">
          <ReviewSubmissionForm services={services} isSubmissionEnabled={isReviewSubmissionEnabled} />
        </div>
      </section>

      <Footer />
    </main>
  );
}