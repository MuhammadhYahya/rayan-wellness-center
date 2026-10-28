import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { AiFillTikTok } from 'react-icons/ai';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import {
  BUSINESS_NAME,
  EMAIL,
  LOCATION,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SOCIAL_LINKS,
  WHATSAPP_BOOKING_URL,
  WHATSAPP_URL,
} from '@/lib/site';
import { getFooterServices } from '@/lib/sanity/queries';
import { displayTitle, serviceAnchor } from '@/lib/service-display';
import Logo from './Logo';

const socials = [
  { href: SOCIAL_LINKS.facebook, label: 'Facebook', Icon: FaFacebookF },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: FaInstagram },
  { href: SOCIAL_LINKS.tiktok, label: 'TikTok', Icon: AiFillTikTok },
];

// The "Our services" list comes from Sanity, so a service added there appears here
// on its own. Each name links to that service on the Services page.
export default async function Footer() {
  const services = await getFooterServices();

  return (
    <footer id="site-footer" className="border-t border-line-dark bg-forest pb-[6.5rem] pt-[3.75rem] text-ivory lg:pb-7">
      <div className="site-container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:gap-10 lg:grid-cols-[1.3fr_0.8fr_1fr_1.5fr] lg:gap-12">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-5 max-w-[26rem] text-[0.9375rem] leading-[1.75] text-ivory-muted">
              Expert healing through sports massage, Thai massage therapy, and Hatha Yoga with
              military precision and compassionate care.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-whatsapp text-white transition-colors hover:bg-[#00692d]"
              >
                <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-sage">Quick links</h2>
            <ul className="mt-[1.125rem] space-y-3 text-[0.9375rem] leading-normal">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-sage">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-sage">Our services</h2>
            <ul className="mt-[1.125rem] space-y-3 text-[0.9375rem] leading-normal">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service._id}>
                    <Link href={`/services#${serviceAnchor(service)}`} className="transition-colors hover:text-sage">
                      {displayTitle(service.title)}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/services" className="transition-colors hover:text-sage">
                    View all treatments
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="col-span-2 flex flex-col sm:col-span-1">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-sage">Contact us</h2>
            <ul className="mt-[1.125rem] space-y-3.5 text-[0.9375rem] leading-normal">
              <li>
                <a href={`tel:${PHONE_TEL}`} className="flex items-start gap-2.5 transition-colors hover:text-sage">
                  <Phone className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-sage" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex min-w-0 items-start gap-2.5 [overflow-wrap:anywhere] transition-colors hover:text-sage"
                >
                  <Mail className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-sage" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-sage" aria-hidden="true" />
                {LOCATION}
              </li>
            </ul>
            <a
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-[1.375rem] self-start"
            >
              <FaWhatsapp aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-line-dark pt-6 text-center text-sm text-ivory-muted">
          © {new Date().getFullYear()} {BUSINESS_NAME} · {LOCATION}
        </p>
      </div>
    </footer>
  );
}
