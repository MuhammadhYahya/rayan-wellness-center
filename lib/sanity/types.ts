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
  | 'abhyanga'
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
};

export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  order: number;
  image?: SanityImageSource;
  imageUrl?: string;
};
