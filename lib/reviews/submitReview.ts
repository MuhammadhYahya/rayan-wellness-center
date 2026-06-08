import { getSanityWriteClient } from '@/lib/sanity/client';
import {
  REVIEW_SUBMISSION_INITIAL_STATE,
  type ReviewSubmissionState,
} from '@/lib/reviews/submissionState';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s()-]{7,}$/;
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getUploadedImage(formData: FormData) {
  const value = formData.get('image');

  if (value instanceof File && value.size > 0) {
    return value;
  }

  return null;
}

export async function submitReviewFormData(
  formData: FormData
): Promise<ReviewSubmissionState> {
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
  const image = getUploadedImage(formData);

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

  if (image) {
    if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
      fieldErrors.image = 'Please upload a JPG, PNG, GIF, or WebP image.';
    } else if (image.size > MAX_IMAGE_SIZE_BYTES) {
      fieldErrors.image = 'Please upload an image smaller than 5 MB.';
    }
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
    let uploadedImage:
      | {
          _type: 'image';
          asset: {
            _type: 'reference';
            _ref: string;
          };
          alt?: string;
        }
      | undefined;

    if (image) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const asset = await client.assets.upload('image', imageBuffer, {
        filename: image.name,
        contentType: image.type,
      });

      uploadedImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      };
    }

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
      ...(uploadedImage ? { image: uploadedImage } : {}),
      status: 'pending',
      featured: false,
      consentToPublish,
      submissionSource: 'website',
      submittedAt: new Date().toISOString(),
    });

    return {
      status: 'success',
      message:
        'Thank you for sharing your experience. Your review has been received.',
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

export { REVIEW_SUBMISSION_INITIAL_STATE };
