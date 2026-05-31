export type ReviewSubmissionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors?: Partial<
    Record<
      'name' | 'email' | 'phone' | 'rating' | 'quote' | 'consentToPublish' | 'image',
      string
    >
  >;
};

export const REVIEW_SUBMISSION_INITIAL_STATE: ReviewSubmissionState = {
  status: 'idle',
  message: '',
};
