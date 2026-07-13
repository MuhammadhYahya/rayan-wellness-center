import 'server-only';

import { headers } from 'next/headers';

/**
 * Basic, dependency-free abuse-prevention helpers for the public review
 * submission endpoint.
 */

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_PER_WINDOW = 3;
const RATE_LIMIT_COOLDOWN_MS = 20 * 1000; // 20 seconds

const submissionTimestamps = new Map<string, number[]>();

function pruneStore(now: number) {
  for (const [key, timestamps] of submissionTimestamps.entries()) {
    const recent = timestamps.filter(
      (t) => now - t < RATE_LIMIT_WINDOW_MS
    );

    if (recent.length === 0) {
      submissionTimestamps.delete(key);
    } else {
      submissionTimestamps.set(key, recent);
    }
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; message: string };

export async function getClientIdentifier(): Promise<string> {
  const headerList = await headers();

  const forwardedFor = headerList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = headerList.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

export function checkRateLimit(
  identifier: string
): RateLimitResult {
  const now = Date.now();
  pruneStore(now);

  const timestamps =
    submissionTimestamps.get(identifier) ?? [];

  const recent = timestamps.filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  const lastSubmission = recent[recent.length - 1];

  if (
    lastSubmission !== undefined &&
    now - lastSubmission < RATE_LIMIT_COOLDOWN_MS
  ) {
    return {
      allowed: false,
      message:
        'Please wait a few seconds before submitting another review.',
    };
  }

  if (recent.length >= RATE_LIMIT_MAX_PER_WINDOW) {
    return {
      allowed: false,
      message:
        'You have reached the maximum number of reviews you can submit right now. Please try again later.',
    };
  }

  recent.push(now);
  submissionTimestamps.set(identifier, recent);

  return { allowed: true };
}

const URL_PATTERN = /(https?:\/\/|www\.)\S+/i;
const REPEATED_CHAR_PATTERN = /(.)\1{6,}/;
const EXCESSIVE_CAPS_PATTERN = /[A-Z]{15,}/;

const SPAM_KEYWORDS = [
  'viagra',
  'cialis',
  'casino',
  'crypto airdrop',
  'bitcoin investment',
  'forex signal',
  'loan approval',
  'click here',
  'free money',
  'work from home',
  'weight loss pills',
  'backlink',
  'seo service',
  'escort service',
  'porn',
  'xxx',
  'replica watch',
  'discount pharmacy',
  'earn $',
  'make money fast',
];

export function looksLikeSpam(
  ...fields: Array<string | undefined>
): boolean {
  const text = fields.filter(Boolean).join(' \n ');

  if (!text) return false;

  const lower = text.toLowerCase();

  if (URL_PATTERN.test(text)) return true;
  if (REPEATED_CHAR_PATTERN.test(text)) return true;
  if (EXCESSIVE_CAPS_PATTERN.test(text)) return true;
  if (SPAM_KEYWORDS.some((keyword) => lower.includes(keyword))) {
    return true;
  }

  return false;
}