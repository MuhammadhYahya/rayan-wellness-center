'use client';

import { useState } from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp 
} from 'react-icons/fa';
import { AiFillTikTok } from "react-icons/ai";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const socialLinks = [
  { icon: FaFacebookF, href: "https://www.facebook.com/people/Rayan-Vidumina", color: "hover:bg-blue-600" },
  { icon: FaInstagram, href: "https://www.instagram.com/rayans_recovery_wellness_cener", color: "hover:bg-pink-600" },
  { icon: AiFillTikTok , href: "https://www.tiktok.com/@rayanvidumina", color: "hover:bg-red-600" },
  { icon: FaWhatsapp, href: "https://wa.me/94762985339", color: "hover:bg-green-600" },
];

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Version - Always Visible on Right */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            className={`w-11 h-11 bg-forest/90 hover:bg-white text-white hover:text-forest 
                       rounded-full flex items-center justify-center shadow-lg 
                       transition-all duration-300 hover:scale-110 ${social.color}`}
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Mobile Version - Collapsible from Right Side */}
      <div className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-forest text-white w-10 h-10 flex items-center justify-center rounded-l-lg shadow-lg"
        >
          {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Sliding Panel */}
        <div
          className={`absolute top-0 right-10 transition-all duration-300 flex flex-col gap-3 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'
          }`}
        >
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              onClick={() => setIsOpen(false)}
              className={`w-11 h-11 bg-forest/90 hover:bg-white text-white hover:text-forest 
                         rounded-full flex items-center justify-center shadow-lg 
                         transition-all duration-300 hover:scale-110 ${social.color}`}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}