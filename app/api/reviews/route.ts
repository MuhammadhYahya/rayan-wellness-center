import { NextResponse } from 'next/server';

import { submitReviewFormData } from '@/lib/reviews/submitReview';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await submitReviewFormData(formData);

    const status = result.status === 'success' ? 200 : 400;
    return NextResponse.json(result, { status });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong while submitting your review.',
      },
      { status: 500 }
    );
  }
}
