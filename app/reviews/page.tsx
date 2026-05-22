import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Filter, MessageCircle, Star } from 'lucide-react';

import ReviewSubmissionForm from '@/components/reviews/ReviewSubmissionForm';
import Footer from '@/components/layout/Footer';
import { hasSanityWriteToken } from '@/lib/sanity/client';
import { getApprovedReviews, getServices } from '@/lib/sanity/queries';

type ReviewsPageProps = {
  searchParams?: Promise<{
    service?: string;
  }>;
};

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const [reviews, services, params] = await Promise.all([
    getApprovedReviews(),
    getServices(),
    searchParams ? searchParams : Promise.resolve(undefined),
  ]);

  const selectedService = params?.service ?? '';
  const filteredReviews = selectedService
    ? reviews.filter((review) => review.service?.slug === selectedService)
    : reviews;
  const selectedServiceTitle =
    services.find((service) => service.slug === selectedService)?.title ?? null;
  const isReviewSubmissionEnabled = hasSanityWriteToken();

  return (
    <main className="min-h-screen bg-ivory">
      <section className="bg-forest px-5 py-24 text-ivory">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sage">Reviews</p>
          <h1 className="font-display text-4xl md:text-6xl">
            Trusted recovery stories from real clients
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sage/90">
            Browse approved feedback from clients, filter by service, and share your
            own experience for future visitors.
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="rounded-[2rem] border border-sage/15 bg-white p-8 shadow-sm md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-moss">
                  Filter reviews
                </p>
                <h2 className="mt-4 font-display text-3xl text-forest md:text-4xl">
                  Find feedback by treatment focus
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-charcoal/72">
                  Filter by service to see experiences closer to the treatment you are
                  considering, or view everything together.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-moss">
                <Filter className="h-4 w-4" />
                {selectedServiceTitle ? `Showing ${selectedServiceTitle}` : 'Showing all reviews'}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
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
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-forest p-8 text-ivory shadow-sm md:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-sage">
                  Client voices
                </p>
                <h2 className="mt-4 font-display text-3xl md:text-4xl">
                  Recovery stories that make the next step easier
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-ivory/80">
                  These reviews are approved before publishing so visitors can read
                  genuine experiences with clarity and confidence.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-3xl font-semibold text-ivory">{reviews.length}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-sage">
                      Approved reviews
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-3xl font-semibold text-ivory">
                      {services.length}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-sage">
                      Services covered
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-3xl font-semibold text-ivory">
                      {filteredReviews.length}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-sage">
                      Currently visible
                    </p>
                  </div>
                </div>
              </div>

              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <article
                    key={review._id}
                    className="rounded-[2rem] border border-sage/15 bg-white p-8 shadow-sm md:p-10"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start gap-4">
                        {review.imageUrl ? (
                          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-sage/15">
                            <Image
                              src={review.imageUrl}
                              alt={review.image?.alt || review.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-lg font-semibold text-ivory">
                            {review.name.charAt(0)}
                          </div>
                        )}

                        <div>
                          <p className="text-xl font-semibold text-forest">{review.name}</p>
                          {review.role ? (
                            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-moss">
                              {review.role}
                            </p>
                          ) : null}
                          {review.service?.title ? (
                            <p className="mt-3 inline-flex rounded-full bg-ivory px-3 py-1 text-sm text-charcoal/70">
                              {review.service.title}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex gap-1 text-sage">
                        {[...Array(review.rating)].map((_, index) => (
                          <Star key={index} className="h-5 w-5 fill-sage text-sage" />
                        ))}
                      </div>
                    </div>

                    <blockquote className="mt-6 text-lg leading-8 text-charcoal/80 md:text-xl">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                  </article>
                ))
              ) : (
                <div className="rounded-[2rem] border border-dashed border-sage/30 bg-white p-8 text-center shadow-sm md:p-10">
                  <p className="font-display text-2xl text-forest">
                    No approved reviews match this filter yet
                  </p>
                  <p className="mt-3 text-base leading-7 text-charcoal/68">
                    Try a different service filter or check back after more reviews are
                    approved in Sanity.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
                <p className="text-sm uppercase tracking-[0.28em] text-moss">
                  Ready to book?
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-forest">
                  Turn inspiration into your next session
                </h3>
                <p className="mt-3 text-base leading-7 text-charcoal/70">
                  If the reviews helped you narrow down a treatment, you can move
                  straight into booking or message the team for guidance.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-base font-medium text-ivory transition hover:bg-forest/92"
                  >
                    Book a Session
                    <CalendarDays className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://wa.me/94762985339?text=Hi%20Rayan%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20services"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-green-600/20 bg-green-50 px-6 py-4 text-base font-medium text-green-700 transition hover:bg-green-100"
                  >
                    Message on WhatsApp
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <ReviewSubmissionForm
                services={services}
                isSubmissionEnabled={isReviewSubmissionEnabled}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
