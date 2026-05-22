'use server';

import { getSanityWriteClient } from '@/lib/sanity/client';

export type ReviewSubmissionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors?: Partial<
    Record<'name' | 'email' | 'phone' | 'rating' | 'quote' | 'consentToPublish', string>
  >;
};

const INITIAL_STATE: ReviewSubmissionState = {
  status: 'idle',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s()-]{7,}$/;

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function submitReview(
  previousState: ReviewSubmissionState = INITIAL_STATE,
  formData: FormData
): Promise<ReviewSubmissionState> {
  void previousState;
  const honeypot = getString(formData, 'website');

  if (honeypot) {
    return {
      status: 'error',
      message: 'Unable to submit this review right now.',
    };
  }

  const name = getString(formData, 'name');
  const role = getString(formData, 'role');
  const email = getString(formData, 'email');
  const phone = getString(formData, 'phone');
  const serviceId = getString(formData, 'service');
  const quote = getString(formData, 'quote');
  const consentToPublish = formData.get('consentToPublish') === 'on';
  const ratingValue = getString(formData, 'rating');
  const rating = Number(ratingValue);

  const fieldErrors: ReviewSubmissionState['fieldErrors'] = {};

  if (!name) {
    fieldErrors.name = 'Please enter your name.';
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    fieldErrors.phone = 'Please enter a valid phone number.';
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    fieldErrors.rating = 'Please choose a rating between 1 and 5.';
  }

  if (!quote) {
    fieldErrors.quote = 'Please share your review.';
  }

  if (!consentToPublish) {
    fieldErrors.consentToPublish =
      'Please confirm that we may publish your review once approved.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: 'Please correct the highlighted fields and try again.',
      fieldErrors,
    };
  }

  try {
    const client = getSanityWriteClient();

    await client.create({
      _type: 'review',
      name,
      ...(role ? { role } : {}),
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      ...(serviceId
        ? {
            service: {
              _type: 'reference',
              _ref: serviceId,
            },
          }
        : {}),
      rating,
      quote,
      status: 'pending',
      featured: false,
      consentToPublish,
      submissionSource: 'website',
      submittedAt: new Date().toISOString(),
    });

    return {
      status: 'success',
      message:
        'Thank you for sharing your experience. Your review has been received and will appear after approval.',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong while submitting your review.',
    };
  }
}
