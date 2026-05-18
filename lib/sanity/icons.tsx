import type { LucideIcon } from 'lucide-react';
import {
  Dumbbell,
  Footprints,
  Heart,
  Leaf,
  Sparkles,
  StretchVertical,
  UserRound,
} from 'lucide-react';

const serviceIcons: Record<string, LucideIcon> = {
  'sports-massage': Dumbbell,
  'deep-tissue': UserRound,
  'thai-massage': Leaf,
  'swedish-massage': Heart,
  abhyanga: Sparkles,
  reflexology: Footprints,
  'sport-stretching': StretchVertical,
  'hatha-yoga': StretchVertical,
};

export function getServiceIcon(iconKey?: string): LucideIcon {
  if (!iconKey) {
    return Leaf;
  }

  return serviceIcons[iconKey] ?? Leaf;
}
