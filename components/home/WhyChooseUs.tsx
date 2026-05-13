// components/home/WhyChooseUs.tsx
import { Shield, Award, Users, Leaf } from 'lucide-react';

const pillars = [
  {
    icon: Shield,
    title: "Military Precision",
    desc: "22 years of Sri Lanka Navy discipline ensures every session is handled with focus, safety, and attention to detail.",
    color: "text-forest"
  },
  {
    icon: Award,
    title: "Multi-Certified Expertise",
    desc: "15+ professional certifications in Sports Massage, Thai Massage, Abhyanga, Yoga and more.",
    color: "text-forest"
  },
  {
    icon: Leaf,
    title: "Healing in Nature",
    desc: "Experience deep relaxation in a calm, green environment surrounded by rubber trees and fresh air.",
    color: "text-forest"
  },
  {
    icon: Users,
    title: "Personalized Care",
    desc: "Every session is tailored to your body, goals, and specific needs — never a generic treatment.",
    color: "text-forest"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-forest mb-4">
            Why Choose Rayan
          </h2>
          <p className="text-charcoal/70 max-w-lg mx-auto text-lg">
            What makes this healing experience truly different
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl border border-sage/10 hover:border-moss/30 
                           hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center mb-6 group-hover:bg-moss/10 transition-colors">
                  <Icon className={`w-8 h-8 ${item.color}`} />
                </div>

                <h3 className="text-xl font-semibold text-forest mb-4 group-hover:text-moss transition-colors">
                  {item.title}
                </h3>

                <p className="text-charcoal/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}