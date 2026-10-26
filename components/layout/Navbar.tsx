'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { NAV_LINKS } from '@/lib/site';
import Logo from './Logo';
import { useFooterInView } from './useFooterInView';

// Header bar (64px phones/tablets, 80px desktop). Clear at the very top of the
// page, green once you scroll (see .site-header in globals.css), and it slides
// away while the footer is on screen. The mobile menu is a native <details>
// element, so it opens even if JavaScript fails on older phones.
export default function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const atFooter = useFooterInView();

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 h-16 text-ivory lg:h-20 ${atFooter ? 'is-hidden' : ''}`}>
      <div className="site-container flex h-full items-center justify-between gap-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-8 text-[0.9375rem] font-medium">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={
                      active
                        ? 'text-sage'
                        : 'text-ivory transition-colors hover:text-sage'
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className="btn btn-primary hidden lg:inline-flex">
          Book a Session
        </Link>

        <details ref={menuRef} className="group lg:hidden">
          <summary
            aria-label="Menu"
            className="menu-toggle flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-ivory/50 text-ivory"
          >
            <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
            <X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
          </summary>

          <nav
            aria-label="Mobile"
            className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line-dark bg-forest px-5 pb-6 pt-2 shadow-xl sm:px-8"
          >
            <ul>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="border-b border-line-dark">
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`block py-3.5 text-lg font-medium ${
                        active ? 'text-sage' : 'text-ivory'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-5 w-full">
              Book a Session
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
