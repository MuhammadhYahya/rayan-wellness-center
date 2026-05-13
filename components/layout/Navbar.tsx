'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import Logo from './Logo';

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
        isScrolled
          ? 'bg-forest/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
      <Logo />
      
        {/* Desktop Navigation - Using Shadcn NavigationMenu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              <NavigationMenuItem>
                <Link href="/" className="text-ivory hover:text-sage transition-colors font-medium">
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/services" className="text-ivory hover:text-sage transition-colors font-medium">
                  Services
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" className="text-ivory hover:text-sage transition-colors font-medium">
                  About
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/gallery" className="text-ivory hover:text-sage transition-colors font-medium">
                  Gallery
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" className="text-ivory hover:text-sage transition-colors font-medium">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Book Now Button */}
        <div className="hidden md:block">
          <Button 
            asChild 
            className="bg-moss hover:bg-moss/90 text-white rounded-full px-8 py-6 font-medium"
          >
            
            <Link href="/contact">Book a Session</Link>
          </Button>
        </div>

        {/* Mobile Menu - Using Shadcn Sheet */}
        {/* Mobile Menu */}
<Sheet>
  <SheetTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden text-ivory hover:bg-white/10 rounded-full"
    >
      <Menu className="h-7 w-7" />
    </Button>
  </SheetTrigger>

  <SheetContent
    side="right"
    className="bg-forest/95 backdrop-blur-xl text-ivory border-l border-white/10 w-[300px] p-0"
  >
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold tracking-wide">
          Menu
        </h2>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3 px-4 py-6">

        <Link
          href="/"
          className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-white/10 transition-all duration-200"
        >
          Home
        </Link>

        <Link
          href="/services"
          className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-white/10 transition-all duration-200"
        >
          Services
        </Link>

        <Link
          href="/about"
          className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-white/10 transition-all duration-200"
        >
          About
        </Link>

        <Link
          href="/gallery"
          className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-white/10 transition-all duration-200"
        >
          Gallery
        </Link>

        <Link
          href="/contact"
          className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-white/10 transition-all duration-200"
        >
          Contact
        </Link>

      </div>
    </div>
  </SheetContent>
</Sheet>
      </div>
    </nav>
  );
}