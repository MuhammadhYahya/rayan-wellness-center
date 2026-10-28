import SectionHeading from './SectionHeading';

// Design "B · Note from Rayan": a short note in Rayan's own voice plus four
// plain-text reasons. No icon boxes, so the section reads as personal, not a
// template. The quote and reasons 01-02 are draft wording for Rayan to approve.
const QUOTE =
  'Before I begin, I ask where it hurts, how you move and how you want to feel afterwards. Those small details decide your treatment — not a fixed routine.';

const reasonsFor = (certificateCount: number) => [
  {
    title: 'It starts with listening',
    desc: 'Every session begins with a short talk about your pain, your sport or work, and your goals — so the treatment fits your body.',
  },
  {
    title: 'Precision in every detail',
    desc: '22 years of Sri Lanka Navy discipline means focus, safety and care in the pressure, timing and technique of your session.',
  },
  {
    title: 'The right technique for you',
    desc: `With ${certificateCount}+ certifications in sports massage, Thai massage therapy, yoga and more, Rayan chooses the method that suits your body.`,
  },
  {
    title: 'Space to fully relax',
    desc: 'A quiet, green setting among rubber trees and fresh air, so your body and mind can let go.',
  },
];

// The certificate number comes from Sanity (see getCertificateCount).
export default function WhyChooseUs({ certificateCount }: { certificateCount: number }) {
  const reasons = reasonsFor(certificateCount);

  return (
    <section aria-labelledby="why-title" className="bg-white py-[4.5rem] lg:py-28">
      <div className="site-container">
        <SectionHeading
          id="why-title"
          eyebrow="Why Rayan"
          title="Why Choose Rayan"
          intro="The small things you notice from the first minute of your session."
        />

        {/* Phones/tablets: note, then the reasons. Desktop: note left, 2x2 reasons right. */}
        <div className="mt-11 grid gap-11 lg:mt-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <figure className="relative pt-11 text-center lg:text-left">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 -translate-x-1/2 font-display text-[5.5rem] leading-none text-leaf lg:-left-1 lg:translate-x-0"
            >
              &ldquo;
            </span>
            <blockquote className="mx-auto max-w-[34rem] lg:max-w-none">
              <p className="font-display text-2xl italic leading-[1.5] text-forest lg:text-[2rem] lg:leading-[1.45]">
                {QUOTE}
              </p>
            </blockquote>
            <figcaption className="mt-7">
              <span className="block font-display text-lg leading-[1.3] text-forest">
                Rayan Vidumina Jayamanna
              </span>
              <span className="block text-sm leading-[1.4] text-ink-muted">
                Founder · Keeranthidiya
              </span>
            </figcaption>
          </figure>

          <ol className="grid grid-cols-1 text-center sm:grid-cols-2 sm:gap-x-8 lg:gap-x-10 lg:text-left">
            {reasons.map(({ title, desc }, index) => (
              <li key={title} className="border-t border-line py-[1.375rem] lg:pb-6 lg:pt-7">
                <span aria-hidden="true" className="block text-xs font-medium tracking-[0.18em] text-moss">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1.5 font-display text-[1.3125rem] leading-[1.35] text-forest lg:text-[1.4375rem]">
                  {title}
                </h3>
                <p className="mt-1.5 text-base leading-[1.75] text-ink-muted">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
