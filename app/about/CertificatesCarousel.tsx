'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const certificates = [
  { id: 1, title: "Certificate of Yoga | Swami Vivekananda Yoga & Meditation School (RISHIKESH)", image: "/assets/images/Certificates/certificate of yoga.jpg" },
  { id: 2, title: "Diploma in Acupuncture (D.Ac.) | Acupressure / Acupuncture & Alternative Medicine Institute in Jodhpur, Rajasthan", image: "/assets/images/Certificates/d.ac certificate.jpg" },
  { id: 3, title: "Diploma in Cupping Therapy |  from the Acupressure Acupuncture & Alternative Medicine Institute located in Jodhpur, Rajasthan.", image: "/assets/images/Certificates/d.cup.t certificate.jpg" },
  { id: 4, title: "Nuad Bo-Rarn Thai Massage | International Training Massage School (ITM) in Thailand", image: "/assets/images/Certificates/nuad bo_rarn thai massage ITM.jpg" },
  { id: 5, title: "CERTIFIED PERSONAL EXERCISE TRAINER | International Academy of Sport Sciences (IASS)", image: "/assets/images/Certificates/personal exercise trainer IASS.jpg" },
  { id: 6, title: "Certificate Course for Sports Massage | Institute of Sports & Exercise Science", image: "/assets/images/Certificates/sport massage ISES.jpg" },
  { id: 7, title: "National Certificate for a Sport Masseur | NVQ Level 4", image: "/assets/images/Certificates/SPORT MASSEUR NVQ 4.jpg" },
  { id: 8, title: "Workshop on Sports Related Stretching Training Techniques | Lanka Institute of Fitness & Nutrition", image: "/assets/images/Certificates/SPORT RELATED STRETCHIGN TRAINING lifn.jpg" },
{ id: 9, title: "60-hour Swedish Massage course | International Practitioners of Holistic Medicine (IPHM)", image: "/assets/images/Certificates/swedish massage IPHM.jpg" },
{ id: 10, title: "Certificate in Taping for Sports & Rehabilitation | Institute of Sports and Exercise Science (ISES)", image: "/assets/images/Certificates/training for sports and rehablation ISES.jpg" }
];

export default function CertificatesCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % certificates.length);
  const prev = () => setCurrent((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-sage/10 shadow-xl">
        <Image
          src={certificates[current].image}
          alt={certificates[current].title}
          fill
          className="object-contain bg-white p-6"
        />
      </div>

      {/* Title */}
      <div className="text-center mt-6 mb-8">
        <p className="text-lg font-medium text-forest">
          {certificates[current].title}
        </p>
        <p className="text-sm text-charcoal/60 mt-1">
          Certificate {current + 1} of {certificates.length}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={prev}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-sage/20 hover:bg-sage/5 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === current ? 'bg-moss w-8' : 'bg-sage/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-sage/20 hover:bg-sage/5 transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}