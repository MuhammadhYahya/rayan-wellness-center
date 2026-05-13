// components/layout/Footer.tsx
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube,
  FaWhatsapp 
} from 'react-icons/fa';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-forest text-ivory pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Logo />   {/* ← Using your Logo component */}

            <p className="text-sage/80 max-w-md mt-6">
              Expert healing through sports massage, Ayurvedic therapies, and Hatha Yoga 
              with military precision and compassionate care.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-8">
              <a 
                href="https://facebook.com" 
                target="_blank"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/94762985339" 
                target="_blank"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-sage font-medium mb-5">QUICK LINKS</h4>
            <div className="space-y-3 text-sm">
              <Link href="/" className="block hover:text-sage transition">Home</Link>
              <Link href="/about" className="block hover:text-sage transition">About</Link>
              <Link href="/services" className="block hover:text-sage transition">Services</Link>
              <Link href="/gallery" className="block hover:text-sage transition">Gallery</Link>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-sage font-medium mb-5">OUR SERVICES</h4>
            <div className="space-y-3 text-sm">
              <p>Sports Massage</p>
              <p>Deep Tissue Massage</p>
              <p>Thai Massage</p>
              <p>Indian Abhyanga</p>
              <p>Reflexology</p>
              <p>Hatha Yoga</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <h4 className="text-sage font-medium mb-5">CONTACT US</h4>
            <div className="space-y-5 text-sm">
              <a href="tel:+94762985339" className="flex items-center gap-3 hover:text-sage transition">
                <Phone className="w-4 h-4" />
                +94 76 298 5339
              </a>
              
              <a href="mailto:rayanvidumina@gmail.com" className="flex items-center gap-3 hover:text-sage transition">
                <Mail className="w-4 h-4" />
                rayanvidumina@gmail.com
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Matugama,<br />Sri Lanka</span>
              </div>
            </div>

            <a
              href="https://wa.me/94762985339?text=Hi%20Rayan%2C%20I%27d%20like%20to%20book%20a%20session"
              target="_blank"
              className="mt-8 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-sm font-medium transition w-full justify-center"
            >
              <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sage/20 mt-16 pt-8 text-center text-xs text-sage/60">
          © {new Date().getFullYear()} Rayan&apos;s Recovery & Wellness Center • Matugama, Sri Lanka
        </div>
      </div>
    </footer>
  );
}