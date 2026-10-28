export type GalleryItem = {
  src: string;
  alt: string;
  /** Which part of the photo to keep in view when it is cropped (CSS object-position). */
  focus?: string;
};

export type GallerySection = {
  /** Used in the address: /gallery#yoga */
  id: string;
  title: string;
  line: string;
  /** The card at the end of the row. */
  end: { title: string; sub: string; href: string };
  photos: GalleryItem[];
};

// The Gallery page shows each section as a side-scrolling row; the Home page shows
// the first photo of each section. A section with no photos is hidden everywhere,
// so add photos here and the section appears on its own.
// Alt text describes what is really in each photo (Google reads it, screen
// readers speak it).
export const gallerySections: GallerySection[] = [
  {
    id: 'yoga',
    title: 'Yoga',
    line: 'Hatha yoga — postures, breathing and balance, guided by Rayan.',
    end: {
      title: 'Book a yoga class',
      sub: 'Drop-in Hatha yoga',
      href: `/contact?service=${encodeURIComponent('Yoga Drop-In Class')}`,
    },
    // Taken at Rayan's own studio. The first photo is also the Yoga cover on the Home page.
    photos: [
      {
        src: '/assets/images/gallery/rayan-yoga-camel-pose.jpg',
        alt: 'Rayan in camel pose (Ustrasana), a deep back bend, at his yoga studio',
        focus: '45% 50%',
      },
      {
        src: '/assets/images/gallery/rayan-yoga-peacock-pose.jpg',
        alt: 'Rayan balancing in peacock pose (Mayurasana) on a yoga mat',
        focus: '52% 50%',
      },
      {
        src: '/assets/images/gallery/rayan-yoga-seated-twist.jpg',
        alt: 'Rayan in a seated spinal twist with a bound arm',
        focus: '52% 50%',
      },
      {
        src: '/assets/images/gallery/rayan-yoga-block-lift.jpg',
        alt: 'Rayan lifting his body on yoga blocks with legs held straight',
      },
      {
        src: '/assets/images/gallery/rayan-yoga-kneeling-breath.jpg',
        alt: 'Rayan kneeling in Vajrasana with eyes closed, focusing on his breathing',
      },
    ],
  },
  {
    id: 'thai-massage',
    title: 'Thai massage',
    line: 'Traditional Thai massage along the Sen energy lines.',
    end: {
      title: 'Book a Thai massage',
      sub: 'Traditional Thai, 90 min',
      href: `/contact?service=${encodeURIComponent('Thai Massage Therapy')}`,
    },
    // The first photo is also the Thai massage cover on the Home page.
    photos: [
      {
        src: '/assets/images/gallery/rayan-thai-massage-back-stretch.jpg',
        alt: 'Rayan smiling as he gives a Thai massage back stretch, lifting the client’s arms',
        focus: '47% 50%',
      },
      {
        src: '/assets/images/gallery/rayan-thai-massage-leg-stretch.jpg',
        alt: 'Rayan giving a Thai massage leg stretch to a client lying on a mat',
      },
      {
        src: '/assets/images/gallery/rayan-thai-massage-arm-leg-stretch.jpg',
        alt: 'Rayan stretching a client’s arm and leg together during Thai massage',
        focus: '55% 50%',
      },
      {
        src: '/assets/images/gallery/rayan-thai-massage-forward-stretch.jpg',
        alt: 'Rayan guiding a client into a seated forward stretch in Thai massage',
        focus: '50% 45%',
      },
      {
        src: '/assets/images/gallery/rayan-thai-massage-shoulder-stretch.jpg',
        alt: 'Rayan giving a seated shoulder and back stretch on the treatment table',
        focus: '55% 45%',
      },
    ],
  },
  {
    id: 'sports-massage',
    title: 'Sports & recovery massage',
    line: 'Deep tissue, sports massage and stretching for active bodies.',
    end: {
      title: 'Book a sports massage',
      sub: 'Sports, deep tissue & stretching',
      href: `/contact?service=${encodeURIComponent('Sports Massage')}`,
    },
    // The first photo is also the cover on the Home page.
    photos: [
      {
        src: '/assets/images/gallery/rayan-deep-tissue-forearm-back.jpg',
        alt: 'Rayan using his forearm for a deep tissue massage on a client’s back',
        focus: '55% 50%',
      },
      {
        src: '/assets/images/gallery/rayan-deep-tissue-upper-back.jpg',
        alt: 'Rayan applying deep tissue pressure to a client’s upper back on the treatment table',
        focus: '45% 50%',
      },
      {
        src: '/assets/images/gallery/rayan-deep-tissue-shoulder-blade.jpg',
        alt: 'Rayan releasing tension around the shoulder blade during a deep tissue massage',
        focus: '45% 50%',
      },
      {
        src: '/assets/images/gallery/g-05.jpg',
        alt: 'Rayan shaking hands with a happy client outside a massage centre',
        focus: '50% 65%',
      },
    ],
  },
  {
    id: 'training',
    title: 'Training & certificates',
    // {certificates} is replaced with the live count from Sanity, e.g. "12+".
    line: 'Some of the courses behind Rayan’s {certificates} certifications.',
    end: { title: 'Meet Rayan', sub: 'His story and all certificates', href: '/about' },
    photos: [
      {
        src: '/assets/images/gallery/g-06.jpeg',
        alt: 'Rayan receiving a certificate at the Lanka Institute of Fitness and Nutrition',
        focus: '50% 40%',
      },
      {
        src: '/assets/images/gallery/g-08.jpg',
        alt: 'Rayan receiving a training certificate from his teachers',
        focus: '50% 35%',
      },
    ],
  },
];

/** Sections that have at least one photo (the ones shown on the site). */
export const visibleGallerySections = gallerySections.filter((section) => section.photos.length > 0);

/** Every photo in one list (kept for older components). */
export const galleryImages: (GalleryItem & { category: string })[] = gallerySections.flatMap((section) =>
  section.photos.map((photo) => ({ ...photo, category: section.title }))
);
