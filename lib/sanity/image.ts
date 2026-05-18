import 'server-only';

import imageUrlBuilder from '@sanity/image-url';

import { getSanityClient } from '@/lib/sanity/client';
import type { SanityImageSource } from '@/lib/sanity/types';

export function urlForImage(source: SanityImageSource) {
  const builder = imageUrlBuilder(getSanityClient());
  return builder.image(source);
}
