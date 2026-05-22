'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-forest/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className="font-medium text-ivory transition-colors hover:text-sage"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-full bg-moss px-8 py-6 font-medium text-white hover:bg-moss/90"
          >
            <Link href="/contact">Book a Session</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-ivory hover:bg-white/10 md:hidden"
            >
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] border-l border-white/10 bg-forest/95 p-0 text-ivory backdrop-blur-xl"
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-white/10 px-6 py-5">
                <h2 className="text-xl font-semibold tracking-wide">Menu</h2>
              </div>

              <div className="flex flex-col gap-3 px-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-4 py-3 text-lg font-medium transition-all duration-200 hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
