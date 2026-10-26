'use client';

import { ArrowUp } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import { WHATSAPP_BOOKING_URL } from '@/lib/site';
import { useFooterInView } from './useFooterInView';

// The single floating button (replaces the old social side bar).
// - Normally: WhatsApp chat.
// - While the footer is on screen (the top bar slides away then): "Back to top",
//   and the footer's own WhatsApp button takes over.
// Without JavaScript it simply stays the WhatsApp button.
export default function WhatsAppButton() {
  const atFooter = useFooterInView();

  const backToTop = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  const base =
    'fixed bottom-5 right-5 z-40 flex h-14 items-center justify-center rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-opacity duration-300 lg:bottom-6 lg:right-6';

  return (
    <>
      <a
        href={WHATSAPP_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        aria-hidden={atFooter}
        tabIndex={atFooter ? -1 : undefined}
        style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        className={`${base} w-14 bg-whatsapp text-white ${atFooter ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </a>

      <button
        type="button"
        onClick={backToTop}
        aria-hidden={!atFooter}
        tabIndex={atFooter ? undefined : -1}
        style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        className={`${base} gap-2 bg-ivory px-5 text-[0.9375rem] font-medium text-forest hover:bg-white ${
          atFooter ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
        Back to top
      </button>
    </>
  );
}
