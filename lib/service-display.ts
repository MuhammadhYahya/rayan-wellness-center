import type { Service } from '@/lib/sanity/types';

// Some titles are typed in all caps in Sanity ("SWEDISH MASSAGE") -> "Swedish Massage".
export function displayTitle(title: string) {
  if (title !== title.toUpperCase()) return title;
  return title.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// "1 Hour 30 Minutes" -> "90 min", "60" -> "60 min"; ranges like "60–90 min" stay as written.
export function displayDuration(duration?: string) {
  if (!duration) return null;
  const text = duration.trim();
  if (/[–-]/.test(text)) return text;
  if (/^\d+$/.test(text)) return `${text} min`;
  const hours = text.match(/(\d+)\s*h(?:ou)?rs?/i);
  const minutes = text.match(/(\d+)\s*m(?:in(?:ute)?s?)?\b/i);
  if (!hours && !minutes) return text;
  const total = (hours ? Number(hours[1]) * 60 : 0) + (minutes ? Number(minutes[1]) : 0);
  return `${total} min`;
}

// Anchor id for a service on the Services page, e.g. /services#sports-massage
export function serviceAnchor(service: Pick<Service, 'slug' | 'title'>) {
  const base = service.slug || service.title;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function bookingHref(service: Pick<Service, 'slug' | 'title'>) {
  return `/contact?service=${encodeURIComponent(service.slug || service.title)}`;
}

export type ServiceGroup = {
  id: string;
  title: string;
  intro: string;
  photo: { src: string; alt: string; position?: string };
  services: Service[];
};

// Groups for the Services page. Sanity has no "category" field yet, so services are
// matched by words in their title. A new service that matches no group still shows,
// under "More treatments", so nothing ever disappears from the page.
const GROUPS: (Omit<ServiceGroup, 'services'> & { match: RegExp })[] = [
  {
    id: 'sports-recovery',
    title: 'Sports & recovery',
    intro: 'For athletes, active people and anyone with tight, sore muscles.',
    photo: {
      src: '/assets/images/gallery/g-05.png',
      alt: 'Rayan with a client outside a massage centre',
      position: '50% 70%',
    },
    match: /sport|deep tissue|iastm|instrument|stretch|strech/i,
  },
  {
    id: 'relaxation-wellbeing',
    title: 'Relaxation & wellbeing',
    intro: 'Slow down, release stress and let your body reset.',
    photo: {
      src: '/assets/images/hero-bg.jpg',
      alt: 'Misty green hills and palm trees near Keeranthidiya',
      position: '50% 60%',
    },
    match: /swedish|hot stone|bamboo|lomi|lymph|reflex|aroma|relax/i,
  },
  {
    id: 'thai-massage-yoga',
    title: 'Thai massage & yoga',
    intro: 'Stretch, breathe and move more freely.',
    photo: {
      src: '/assets/images/gallery/g-03.jpeg',
      alt: 'Rayan holding a kneeling yoga pose',
      position: '50% 55%',
    },
    match: /thai|yoga/i,
  },
];

const OTHER: Omit<ServiceGroup, 'services'> = {
  id: 'more-treatments',
  title: 'More treatments',
  intro: 'Other sessions Rayan offers.',
  photo: {
    src: '/assets/images/hero-bg.jpg',
    alt: 'Misty green hills and palm trees near Keeranthidiya',
  },
};

// Keeps the Sanity order inside each group and drops groups with no services.
export function groupServices(services: Service[]): ServiceGroup[] {
  const groups: ServiceGroup[] = GROUPS.map((group) => ({
    id: group.id,
    title: group.title,
    intro: group.intro,
    photo: group.photo,
    services: [],
  }));
  const other: ServiceGroup = { ...OTHER, services: [] };

  for (const service of services) {
    const index = GROUPS.findIndex((group) => group.match.test(service.title));
    (index === -1 ? other : groups[index]).services.push(service);
  }

  return [...groups, other].filter((group) => group.services.length > 0);
}
