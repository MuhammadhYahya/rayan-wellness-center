'use server';

import {
  REVIEW_SUBMISSION_INITIAL_STATE,
  submitReviewFormData,
} from '@/lib/reviews/submitReview';

import type { ReviewSubmissionState } from '@/lib/reviews/submissionState';

export const INITIAL_STATE: ReviewSubmissionState = REVIEW_SUBMISSION_INITIAL_STATE;

export async function submitReview(
  previousState: ReviewSubmissionState = REVIEW_SUBMISSION_INITIAL_STATE,
  formData: FormData
): Promise<ReviewSubmissionState> {
  void previousState;
  return submitReviewFormData(formData);
}
