export type GalleryItem = {
  src: string;
  alt: string;
  category: string;
};

// The alt text describes what is really in each photo (Google reads it, screen
// readers speak it, and the gallery page shows it as the caption).
// Order is mixed on purpose: the Home page shows the first four.
export const galleryImages: GalleryItem[] = [
  {
    src: '/assets/images/gallery/g-05.png',
    alt: 'Rayan shaking hands with a happy client outside a massage centre',
    category: 'Massage',
  },
  {
    src: '/assets/images/gallery/g-02.jpeg',
    alt: 'Rayan holding a crow pose, a yoga arm balance, during yoga training',
    category: 'Yoga',
  },
  {
    src: '/assets/images/gallery/g-06.jpeg',
    alt: 'Rayan receiving a certificate at the Lanka Institute of Fitness and Nutrition',
    category: 'Training',
  },
  {
    src: '/assets/images/gallery/g-03.jpeg',
    alt: 'Rayan in a kneeling yoga pose at the Swami Vivekananda Yoga & Meditation Foundation',
    category: 'Yoga',
  },
  {
    src: '/assets/images/gallery/g-07.png',
    alt: 'Rayan receiving a certificate at the Magnetic Health & Research Center',
    category: 'Training',
  },
  {
    src: '/assets/images/gallery/g-01.jpeg',
    alt: 'Rayan practising a yoga stretch on the mat during yoga training',
    category: 'Yoga',
  },
  {
    src: '/assets/images/gallery/g-08.png',
    alt: 'Rayan receiving a training certificate from his teachers',
    category: 'Training',
  },
  {
    src: '/assets/images/gallery/g-04.jpeg',
    alt: 'Rayan holding an advanced yoga pose with both legs raised',
    category: 'Yoga',
  },
];
