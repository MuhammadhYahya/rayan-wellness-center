// Real numbers are written straight into the HTML: they show on every phone
// (no count-up animation that needs JavaScript) and Google can read them.
// The certificate number comes from Sanity (see getCertificateCount).
export default function Stats({ certificateCount }: { certificateCount: number }) {
  const stats = [
    { value: '22+', label: 'Years of Navy discipline' },
    { value: `${certificateCount}+`, label: 'Professional certifications' },
    { value: '1,200+', label: 'Hours of training' },
  ];

  return (
    <section aria-label="Rayan at a glance" className="border-b border-line bg-white">
      <div className="site-container">
        <dl className="grid grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse px-2 py-[1.625rem] text-center lg:px-4 lg:py-[2.125rem] ${
                index > 0 ? 'border-l border-line' : ''
              }`}
            >
              <dt className="mt-2.5 text-[0.8125rem] leading-[1.45] text-ink-muted sm:text-sm">
                {stat.label}
              </dt>
              <dd className="font-display text-[1.75rem] leading-none text-forest sm:text-4xl lg:text-[2.75rem]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
