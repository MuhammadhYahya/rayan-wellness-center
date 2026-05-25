import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { AiFillTikTok } from 'react-icons/ai';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-forest pb-10 pt-16 text-ivory">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />

            <p className="mt-6 max-w-md text-sage/80">
              Expert healing through sports massage, Ayurvedic therapies, and Hatha Yoga
              with military precision and compassionate care.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.facebook.com/share/1FfTLPn4Zj/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:scale-110 hover:bg-white/20"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/rayans_recovery_wellness_cener"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:scale-110 hover:bg-white/20"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@rayanvidumina"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:scale-110 hover:bg-white/20"
              >
                <AiFillTikTok className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/94762985339"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 transition-all hover:scale-110 hover:bg-green-700"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-5 font-medium text-sage">QUICK LINKS</h4>
            <div className="space-y-3 text-sm">
              <Link href="/" className="block transition hover:text-sage">
                Home
              </Link>
              <Link href="/about" className="block transition hover:text-sage">
                About
              </Link>
              <Link href="/services" className="block transition hover:text-sage">
                Services
              </Link>
              <Link href="/gallery" className="block transition hover:text-sage">
                Gallery
              </Link>
              <Link href="/reviews" className="block transition hover:text-sage">
                Reviews
              </Link>
              <Link href="/contact" className="block transition hover:text-sage">
                Contact
              </Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-5 font-medium text-sage">OUR SERVICES</h4>
            <div className="space-y-3 text-sm">
              <p>Sports Massage</p>
              <p>Deep Tissue Massage</p>
              <p>Thai Massage</p>
              <p>Indian Abhyanga</p>
              <p>Reflexology</p>
              <p>Hatha Yoga</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-5 font-medium text-sage">CONTACT US</h4>
            <div className="space-y-5 text-sm">
              <a
                href="tel:+94762985339"
                className="flex items-center gap-3 transition hover:text-sage"
              >
                <Phone className="h-4 w-4" />
                +94 76 298 5339
              </a>

              <a
                href="mailto:rayanrecoverycenter7@gmail.com"
                className="flex items-center gap-3 transition hover:text-sage"
              >
                <Mail className="h-4 w-4" />
                rayanrecoverycenter7@gmail.com
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4" />
                <span>Keeranthidiya, Sri Lanka</span>
              </div>
            </div>

            <a
              href="https://wa.me/94762985339?text=Hi%20Rayan%2C%20I%27d%20like%20to%20book%20a%20session"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium transition hover:bg-green-700"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-sage/20 pt-8 text-center text-xs text-sage/60">
          Copyright {new Date().getFullYear()} Rayan&apos;s Recovery & Wellness Center |
          Keeranthidiya, Sri Lanka
        </div>
      </div>
    </footer>
  );
}
