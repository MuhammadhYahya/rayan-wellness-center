import type { Metadata } from 'next';

import { BUSINESS_NAME } from '@/lib/site';

export type ShareImage = { url: string; width: number; height: number; alt: string };

// The picture and text shown when a page link is shared on WhatsApp, Facebook,
// Instagram DMs, X, etc. (Open Graph + Twitter card tags).
// Default for every page: a real photo of Rayan at work, cropped to 1200×630
// (the size these apps expect).
const SHARE_IMAGE: ShareImage = {
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
  /** A page's own preview picture (1200×630). Leave out to use the shared photo. */
  image?: ShareImage;
};

// Home page: the logo and name on the site's dark green (brand card).
export const HOME_SHARE_IMAGE: ShareImage = {
  url: '/assets/images/og-rayan-home.jpg',
  width: 1200,
  height: 630,
  alt: 'Rayan’s Recovery & Wellness logo',
};

// About page: Rayan's own portrait (head and shoulders stay in view when apps crop
// the preview to a small square, like WhatsApp does).
export const ABOUT_SHARE_IMAGE: ShareImage = {
  url: '/assets/images/og-rayan-about.jpg',
  width: 1200,
  height: 630,
  alt: 'Rayan Vidumina Jayamanna, founder of Rayan’s Recovery & Wellness Center',
};

// Next.js does not merge openGraph between the layout and a page (the page's value
// replaces the layout's), so every page passes its own full set through this helper.
export function shareTags({ title, description, path, image = SHARE_IMAGE }: ShareTags): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: BUSINESS_NAME,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
