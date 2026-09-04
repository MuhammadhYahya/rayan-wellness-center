export type SanityImageSource = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
};

export type ServiceIconKey =
  | 'sports-massage'
  | 'deep-tissue'
  | 'thai-massage'
  | 'swedish-massage'
  | 'reflexology'
  | 'sport-stretching'
  | 'hatha-yoga';

export type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  duration: string;
  order: number;
  iconKey?: ServiceIconKey | string;
  image?: SanityImageSource;
  imageUrl?: string;
};

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export type Review = {
  _id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  quote: string;
  rating: number;
  status: ReviewStatus;
  featured: boolean;
  featuredOrder?: number;
  submittedAt?: string;
  approvedAt?: string;
  consentToPublish: boolean;
  submissionSource?: string;
  image?: SanityImageSource;
  imageUrl?: string;
  service?: {
    _id: string;
    title: string;
    slug?: string;
  };
};
