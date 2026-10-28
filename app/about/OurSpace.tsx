import Image from 'next/image';

import SectionHeading from '@/components/home/SectionHeading';

// Real photos of Rayan's studio. The first one is shown large.
// Alt text describes each photo for Google and screen readers (no captions on the photos).
const photos = [
  {
    src: '/assets/images/space/rayan-studio-treatment-room.jpg',
    alt: 'Rayan’s treatment room with a massage table, a garden window and anatomy charts',
  },
  {
    src: '/assets/images/space/rayan-studio-certificates-wall.jpg',
    alt: 'Wall of Rayan’s framed massage and yoga certificates beside a Buddha statue',
  },
  {
    src: '/assets/images/space/rayan-studio-tools-shelves.jpg',
    alt: 'Shelves with foam rollers, massage tools and fresh towels in the treatment room',
  },
  {
    src: '/assets/images/space/rayan-studio-anatomy-charts.jpg',
    alt: 'Muscle, skeleton and sciatic nerve charts on the treatment room wall',
  },
  {
    src: '/assets/images/space/rayan-studio-meditation-wall.jpg',
    alt: 'Yoga and meditation corner with an Om sign and a meditation poster',
  },
];

// 5 photos: one large + four small. Phones: large photo on top, then a 2x2 grid.
// Laptops: large photo on the left (2x2 cells), four small ones on the right —
// every cell filled, no empty space.
export default function OurSpace() {
  return (
    <section aria-labelledby="space-title" className="bg-white py-[4.5rem] lg:py-28">
      <div className="site-container">
        <SectionHeading
          id="space-title"
          eyebrow="Our space"
          title="Inside Rayan’s studio"
          intro="A calm, clean room in Keeranthidiya — everything ready before you arrive."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-12 lg:grid-cols-4 lg:grid-rows-[15rem_15rem] lg:gap-5">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-2xl bg-[#e9ece4] ${
                index === 0 ? 'col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto' : 'aspect-square lg:aspect-auto'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? '(max-width: 1023px) 100vw, 50vw' : '(max-width: 1023px) 50vw, 25vw'}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
