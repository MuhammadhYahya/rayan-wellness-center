'use client';

import { useActionState, useState } from 'react';
import { CheckCircle2, LoaderCircle, Send, ShieldCheck, Star } from 'lucide-react';

import { submitReview, type ReviewSubmissionState } from '@/app/reviews/actions';
import { Button } from '@/components/ui/button';
import type { Service } from '@/lib/sanity/types';

type ReviewSubmissionFormProps = {
  services: Service[];
  isSubmissionEnabled: boolean;
};

const INITIAL_STATE: ReviewSubmissionState = {
  status: 'idle',
  message: '',
};

export default function ReviewSubmissionForm({
  services,
  isSubmissionEnabled,
}: ReviewSubmissionFormProps) {
  const [state, formAction, isPending] = useActionState(submitReview, INITIAL_STATE);
  const [rating, setRating] = useState(5);

  return (
    <div className="rounded-[2rem] border border-sage/15 bg-white p-8 shadow-[0_24px_80px_rgba(26,46,26,0.08)] md:p-10">
      <div className="flex flex-col gap-3 border-b border-sage/15 pb-6">
        <p className="text-sm uppercase tracking-[0.28em] text-moss">Leave a review</p>
        <h2 className="font-display text-3xl text-forest md:text-4xl">
          Share how your session felt
        </h2>
        <p className="max-w-2xl text-base leading-7 text-charcoal/70">
          Tell future clients what helped you most. Every submission is reviewed
          before it goes live on the site.
        </p>
      </div>

      {!isSubmissionEnabled ? (
        <div className="mt-8 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          Review submissions are temporarily unavailable because `SANITY_WRITE_TOKEN`
          is not configured for this site. Add a write-capable token to enable the
          form again.
        </div>
      ) : null}

      <form
        action={isSubmissionEnabled ? formAction : undefined}
        onSubmit={(event) => {
          if (!isSubmissionEnabled) {
            event.preventDefault();
          }
        }}
        className="mt-8 space-y-6"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Full Name"
            htmlFor="name"
            error={state.fieldErrors?.name}
            required
            input={
              <input
                id="name"
                name="name"
                type="text"
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
                placeholder="Your full name"
              />
            }
          />

          <Field
            label="Role / Profession"
            htmlFor="role"
            input={
              <input
                id="role"
                name="role"
                type="text"
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
                placeholder="Optional"
              />
            }
          />

          <Field
            label="Email Address"
            htmlFor="email"
            error={state.fieldErrors?.email}
            input={
              <input
                id="email"
                name="email"
                type="email"
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
                placeholder="Optional"
              />
            }
          />

          <Field
            label="Phone Number"
            htmlFor="phone"
            error={state.fieldErrors?.phone}
            input={
              <input
                id="phone"
                name="phone"
                type="tel"
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
                placeholder="Optional"
              />
            }
          />

          <Field
            label="Service Received"
            htmlFor="service"
            input={
              <select
                id="service"
                name="service"
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition focus:border-moss"
                defaultValue=""
              >
                <option value="">Choose a service</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.title}
                  </option>
                ))}
              </select>
            }
          />

          <Field
            label="Rating"
            htmlFor="rating"
            error={state.fieldErrors?.rating}
            required
            input={
              <div className="rounded-[1.5rem] border border-sage/20 bg-ivory px-4 py-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="cursor-pointer">
                      <input
                        id={`rating-${value}`}
                        type="radio"
                        name="rating"
                        value={value}
                        checked={rating === value}
                        onChange={() => setRating(value)}
                        className="sr-only"
                      />
                      <Star
                        className={`h-7 w-7 transition ${
                          value <= rating ? 'fill-sage text-sage' : 'text-sage/35'
                        }`}
                      />
                    </label>
                  ))}
                  <span className="ml-2 text-sm font-medium text-charcoal/65">
                    {rating} / 5
                  </span>
                </div>
              </div>
            }
          />
        </div>

        <Field
          label="Review"
          htmlFor="quote"
          error={state.fieldErrors?.quote}
          required
          input={
            <textarea
              id="quote"
              name="quote"
              rows={6}
              className="w-full rounded-[1.5rem] border border-sage/20 bg-ivory px-4 py-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
              placeholder="What stood out about your experience, recovery, or results?"
            />
          }
        />

        <label className="flex items-start gap-3 rounded-[1.5rem] border border-sage/15 bg-moss/5 p-5 text-sm leading-6 text-charcoal/75">
          <input
            type="checkbox"
            name="consentToPublish"
            className="mt-1 h-4 w-4 rounded border-sage/30 text-moss focus:ring-moss"
          />
          <span>
            I confirm this review reflects my real experience and may be published on
            the website once approved.
          </span>
        </label>

        {state.fieldErrors?.consentToPublish ? (
          <p className="text-sm text-red-600">{state.fieldErrors.consentToPublish}</p>
        ) : null}

        <div className="rounded-[1.5rem] border border-sage/15 bg-forest p-5 text-sm leading-6 text-ivory/80">
          <div className="flex items-center gap-3 text-sage">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-medium uppercase tracking-[0.22em]">
              Moderated publishing
            </span>
          </div>
          <p className="mt-3">
            Reviews are submitted privately first, then approved before they appear on
            the homepage or reviews page.
          </p>
        </div>

        {state.status !== 'idle' ? (
          <div
            className={`rounded-[1.5rem] border px-5 py-4 text-sm leading-6 ${
              state.status === 'success'
                ? 'border-moss/20 bg-moss/10 text-forest'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            <div className="flex items-start gap-3">
              {state.status === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              ) : (
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              )}
              <p>{state.message}</p>
            </div>
          </div>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={isPending || !isSubmissionEnabled}
          className="h-auto rounded-full bg-forest px-8 py-4 text-base text-ivory hover:bg-forest/92"
        >
          {!isSubmissionEnabled ? (
            <>
              <ShieldCheck className="h-4 w-4" />
              Submission Unavailable
            </>
          ) : isPending ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Sending Review
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit Review
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  input: React.ReactNode;
};

function Field({ label, htmlFor, error, required, input }: FieldProps) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm font-medium uppercase tracking-[0.18em] text-forest">
        {label}
        {required ? <span className="ml-1 text-moss">*</span> : null}
      </span>
      {input}
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
