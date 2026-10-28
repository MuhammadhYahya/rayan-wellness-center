import type { Metadata } from 'next';

import { BUSINESS_NAME } from '@/lib/site';

// The picture and text shown when a page link is shared on WhatsApp, Facebook,
// Instagram DMs, X, etc. (Open Graph + Twitter card tags).
// A real photo of Rayan at work, cropped to 1200×630 (the size these apps expect).
const SHARE_IMAGE = {
  url: '/assets/images/og-rayan-wellness.jpg',
  width: 1200,
  height: 630,
  alt: 'Rayan giving a Thai massage stretch at his studio in Keeranthidiya',
};

type ShareTags = {
  /** Full title as it should appear in the preview card. */
  title: string;
  description: string;
  /** Page path, e.g. '/services'. Turned into a full www address by metadataBase. */
  path: string;
};

// Next.js does not merge openGraph between the layout and a page (the page's value
// replaces the layout's), so every page passes its own full set through this helper.
export function shareTags({ title, description, path }: ShareTags): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: BUSINESS_NAME,
      title,
      description,
      url: path,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
