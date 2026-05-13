// components/home/ServicesGrid.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Dumbbell, 
  UserRound, 
  Leaf, 
  Heart, 
  Footprints, 
  StretchVertical, 

} from 'lucide-react';

const services = [
  {
    icon: Dumbbell,
    title: "Sports Massage",
    duration: "60–90 min",
    desc: "Targeted recovery for athletes with muscle repair and performance support.",
    color: "text-moss"
  },
  {
    icon: UserRound,
    title: "Deep Tissue Massage",
    duration: "60–90 min",
    desc: "Firm pressure to release chronic tension and postural pain.",
    color: "text-moss"
  },
  {
    icon: Leaf,
    title: "Thai Massage",
    duration: "60–90 min",
    desc: "Traditional pressure-point and assisted stretching technique.",
    color: "text-moss"
  },
  {
    icon: Heart,
    title: "Swedish Massage",
    duration: "60 min",
    desc: "Relaxing full-body massage using long gliding strokes.",
    color: "text-moss"
  },
  {
    icon: Leaf,
    title: "Indian Abhyanga",
    duration: "60–90 min",
    desc: "Warm herbal oil Ayurvedic massage for deep nourishment.",
    color: "text-moss"
  },
  {
    icon: Footprints,
    title: "Reflexology",
    duration: "45–60 min",
    desc: "Targeted pressure on feet and hands to balance body systems.",
    color: "text-moss"
  },
  {
    icon: StretchVertical,
    title: "Sport Stretching",
    duration: "30–60 min",
    desc: "Assisted PNF and dynamic stretching for flexibility.",
    color: "text-moss"
  },
  {
    icon: StretchVertical,
    title: "Hatha Yoga",
    duration: "60 min",
    desc: "Structured asana, pranayama and meditation for all levels.",
    color: "text-moss"
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-16 md:py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-forest mb-4">
            What We Offer
          </h2>
          <p className="text-charcoal/70 max-w-md mx-auto">
            Personalized healing therapies tailored to your body and goals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 
                           border border-sage/10 hover:border-moss/30 
                           bg-white hover:-translate-y-3 hover:scale-[1.02]
                           rounded-3xl"
              >
                <CardHeader className="pb-4 pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-forest/5 flex items-center justify-center mb-6 
                                group-hover:bg-moss/10 group-hover:scale-110 transition-all duration-500">
                    <Icon className={`w-9 h-9 ${service.color} transition-transform duration-500 group-hover:rotate-6`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-forest group-hover:text-moss transition-colors">
                    {service.title}
                  </h3>
                </CardHeader>

                <CardContent className="pb-8">
                  <p className="text-charcoal/80 text-[15px] leading-relaxed mb-8">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-sage">
                      {service.duration}
                    </p>
                    
                    <Button 
                      asChild
                      variant="ghost" 
                      className="text-moss hover:text-moss/80 group-hover:gap-2 transition-all duration-300"
                    >
                      <Link href="/services" className="flex items-center">
                        Learn More 
                        <span className="group-hover:translate-x-1 transition">→</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>

                {/* Subtle bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-moss to-sage w-0 group-hover:w-full transition-all duration-700" />
              </Card>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-14">
          <Button 
            asChild 
            size="lg"
            className="bg-forest hover:bg-forest/90 text-ivory rounded-full px-10 py-7 text-base"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}