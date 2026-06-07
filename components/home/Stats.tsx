// components/home/Stats.tsx
'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="bg-forest py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-center justify-between md:justify-around gap-4 md:gap-12 text-center">
          
          {/* Stat 1 */}
          <div className="flex-1">
            <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-ivory mb-2">
              {inView && <CountUp start={0} end={22} duration={2.5} />}+
            </div>
            <p className="text-sage text-[10px] sm:text-xs uppercase tracking-widest leading-tight">
              Years of<br />Navy Discipline
            </p>
          </div>

          {/* Divider 1 */}
          <div className="w-px h-16 bg-sage/40" />

          {/* Stat 2 */}
          <div className="flex-1">
            <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-ivory mb-2">
              {inView && <CountUp start={0} end={10} duration={2.5} />}+
            </div>
            <p className="text-sage text-[10px] sm:text-xs uppercase tracking-widest leading-tight">
              Professional<br />Certifications
            </p>
          </div>

          {/* Divider 2 */}
          <div className="w-px h-16 bg-sage/40" />

          {/* Stat 3 */}
          <div className="flex-1">
            <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-ivory mb-2">
              {inView && <CountUp start={0} end={1200} duration={2.8} />}+
            </div>
            <p className="text-sage text-[10px] sm:text-xs uppercase tracking-widest leading-tight">
              Hours of<br />Training
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}