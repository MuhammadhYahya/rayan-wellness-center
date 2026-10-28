import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPin, Target, Eye } from 'lucide-react';
import CertificatesCarousel from './CertificatesCarousel';
import OurSpace from './OurSpace';

import Footer from '@/components/layout/Footer';
import { fallbackCertificates, type CertificateItem } from '@/lib/certificates';
import { getCertificates } from '@/lib/sanity/queries';
import { ABOUT_SHARE_IMAGE, shareTags } from '@/lib/seo';
import { BUSINESS_NAME } from '@/lib/site';

const TITLE = 'About Our Wellness Center & Founder';
const DESCRIPTION =
  'Meet Rayan Vidumina Jayamanna, a certified massage therapist and yoga instructor bringing 22 years of discipline and professional massage expertise to Matugama, Sri Lanka.';

export const metadata: Metadata = {
  // Own address for Google (otherwise the page inherits the home page's "/").
  alternates: { canonical: '/about' },
  title: TITLE,
  description: DESCRIPTION,
  // Link preview on WhatsApp, Facebook, etc.
  ...shareTags({
    title: `${TITLE} | ${BUSINESS_NAME}`,
    description: DESCRIPTION,
    path: '/about',
    image: ABOUT_SHARE_IMAGE,
  }),
};

async function loadCertificates(): Promise<CertificateItem[]> {
  try {
    const certificates = await getCertificates();
    const items = certificates
      .filter((certificate) => certificate.imageUrl)
      .map((certificate) => ({
        id: certificate._id,
        title: certificate.title,
        image: certificate.imageUrl as string,
      }));

    return items.length > 0 ? items : fallbackCertificates;
  } catch (error) {
    console.error('Failed to load certificates from Sanity:', error);
    return fallbackCertificates;
  }
}

export default async function AboutPage() {
  const certificates = await loadCertificates();

  return (
    <main className="min-h-screen bg-ivory">
      <section aria-labelledby="about-title" className="solid-top-bar overflow-hidden border-b border-line bg-ivory">
        <div aria-hidden="true" className="h-16 bg-forest lg:h-20" />
        <div className="site-container grid gap-6 pt-10 text-center lg:grid-cols-2 lg:items-end lg:gap-12 lg:pt-14 lg:text-left">
          <div className="lg:pb-[4.5rem]">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-moss">Our story</p>
            <h1 id="about-title" className="mt-3 font-display text-[2.25rem] leading-[1.12] text-forest sm:text-5xl lg:text-[3.75rem]">
              Meet Your Healer
            </h1>
            <p className="mt-3.5 font-display text-xl leading-[1.35] text-forest">
              Rayan Vidumina Jayamanna
              <span className="mt-1 block font-sans text-sm text-moss">Founder &amp; Lead Therapist</span>
            </p>
            <p className="mx-auto mt-4 max-w-[30rem] text-balance text-[1.0625rem] font-light leading-[1.8] text-ink-muted lg:mx-0">
              From 22 years in the Sri Lanka Navy to a life dedicated to healing
            </p>
            <ul className="mt-7 grid grid-cols-3 border-t border-line lg:max-w-[34rem]">
              {[
                { value: '22', label: 'years in the Sri Lanka Navy' },
                // Same live count as the Home page (certificates in Sanity).
                { value: `${certificates.length}+`, label: 'certificates' },
                { value: '1', label: 'studio in Keeranthidiya' },
              ].map((fact, index) => (
                <li
                  key={fact.label}
                  className={`px-1 pt-4 leading-[1.3] lg:px-5 lg:pt-[1.125rem] lg:first:pl-0 ${
                    index > 0 ? 'border-l border-line' : ''
                  }`}
                >
                  <span className="block font-display text-2xl text-forest">{fact.value}</span>
                  <span className="mt-1 block text-xs text-ink-muted">{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto h-[22rem] w-full max-w-[24rem] lg:h-[31rem] lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute bottom-[-24%] left-1/2 aspect-square w-[min(104%,23.5rem)] -translate-x-1/2 rounded-full border-[1.5px] border-[#cfd8c6] lg:bottom-[-27%] lg:w-[31rem]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[-18%] left-1/2 aspect-square w-[min(88%,20rem)] -translate-x-1/2 rounded-full bg-[#e8e2d5] lg:bottom-[-20%] lg:w-[27rem]"
            />
            <Image
              src="/assets/images/rayan-vidumina-jayamanna-cutout.png"
              alt="Rayan Vidumina Jayamanna, founder of Rayan’s Recovery & Wellness Center"
              width={645}
              height={990}
              sizes="(max-width: 1023px) 240px, (max-width: 1535px) 330px, 480px"
              className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2"
              preload
            />
          </div>
        </div>
      </section>

      {/* His story: then (Navy) and now (therapist), then his own words. */}
      <section className="bg-white py-16 lg:py-[5.5rem]">
        <div className="site-container">
          <div className="grid gap-9 text-center lg:grid-cols-2 lg:gap-16 lg:text-left">
            <div className="lg:border-t lg:border-line lg:pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-moss">Then</p>
              <h2 className="mt-2 font-display text-[1.625rem] leading-[1.3] text-forest">22 years in the Sri Lanka Navy</h2>
              <p className="mx-auto mt-3.5 max-w-[30rem] text-[1.0625rem] leading-[1.85] text-ink-muted lg:mx-0 lg:max-w-none">
                After 22 years of honorable service as a Leading Seaman in the Sri Lanka Navy,
                Rayan transitioned his discipline and precision into the healing arts.
              </p>
            </div>
            <div className="lg:border-t lg:border-line lg:pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-moss">Now</p>
              <h2 className="mt-2 font-display text-[1.625rem] leading-[1.3] text-forest">Massage therapist &amp; yoga instructor</h2>
              <p className="mx-auto mt-3.5 max-w-[30rem] text-[1.0625rem] leading-[1.85] text-ink-muted lg:mx-0 lg:max-w-none">
                A certified Massage Therapist and Yoga Instructor, he brings together sports science,
                military-grade attention to detail, and certified Thai massage techniques to create truly
                transformative wellness experiences.
              </p>
            </div>
          </div>

          <figure className="mx-auto mt-14 max-w-[46rem] text-center">
            {/* Opening quote mark (decoration only). */}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-auto mb-4 h-10 w-10 fill-sage">
              <path d="M9.5 6C6.5 7.2 4.5 9.9 4.5 13.4V18h6v-6H7.6c.2-2 1.4-3.6 3.2-4.4L9.5 6zm9 0c-3 1.2-5 3.9-5 7.4V18h6v-6h-2.9c.2-2 1.4-3.6 3.2-4.4L18.5 6z" />
            </svg>
            <blockquote>
              <p className="font-display text-[1.375rem] italic leading-[1.5] text-forest lg:text-[1.875rem]">
                “Discipline, compassion, and deep knowledge are the pillars I bring from my military service into every healing session.”
              </p>
            </blockquote>
            <figcaption className="mt-4 text-sm text-moss">— Rayan Vidumina Jayamanna</figcaption>
          </figure>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-sage/5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-moss mb-3">Our Purpose</p>
            <h3 className="font-display text-3xl md:text-4xl text-forest">
              Mission & Vision
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <div className="rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-sage/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-moss/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-moss" />
                </div>
                <h4 className="text-2xl font-semibold text-forest">Our Mission</h4>
              </div>
              <p className="text-charcoal/80 leading-relaxed text-[15px] md:text-base">
                Our mission is to promote holistic health and well-being through professional massage therapy, yoga, fitness, and wellness practices. We are committed to helping every individual improve physical health, reduce stress, enhance mobility, and achieve a balanced, healthier lifestyle through safe, personalized, and evidence-informed wellness services.
              </p>
            </div>

            {/* Vision Card */}
            <div className="rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-sage/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-moss/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-moss" />
                </div>
                <h4 className="text-2xl font-semibold text-forest">Our Vision</h4>
              </div>
              <p className="text-charcoal/80 leading-relaxed text-[15px] md:text-base">
                To become a trusted wellness sanctuary in Sri Lanka where discipline meets compassion — a place where every person can experience lasting recovery, renewed energy, and deep inner balance through authentic, personalized healing practices rooted in nature and professional expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Carousel */}
      <section className="px-5 py-16 md:py-20 bg-sage/5">
        <div className="mx-auto max-w-5xl">
          <h3 className="font-display text-3xl md:text-4xl text-forest text-center mb-10">
            Certifications & Expertise
          </h3>
          <CertificatesCarousel certificates={certificates} />
        </div>
      </section>

      {/* Our space: real photos of the studio */}
      <OurSpace />

      {/* Location Section */}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-sm text-moss mb-2">Visit Us</p>
            <h3 className="font-display text-3xl md:text-4xl text-forest">
              Our Healing Space
            </h3>
            <p className="mt-3 text-charcoal/70">
              Keeranthidiya, Matugama, Sri Lanka
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-sage/15 shadow-sm bg-white">
            <iframe
              title="Map showing Rayan's Recovery & Wellness Center in Keeranthidiya"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3964.3612922007496!2d80.059968!3d6.47584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjgnMzMuMCJOIDgwwrAwMyczNS45IkU!5e0!3m2!1sen!2slk!4v1779545711805!5m2!1sen!2slk"
              width="100%"
              height="460"
              className="w-full border-0"
              style={{ minHeight: '380px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            <div className="flex items-center justify-center gap-3 bg-white py-5 text-sm text-charcoal/70 border-t border-sage/10">
              <MapPin className="h-4 w-4 text-moss" />
              <span>Keeranthidiya, Matugama, Sri Lanka</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
