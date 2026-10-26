import Image from 'next/image';
import Link from 'next/link';

import { BUSINESS_NAME } from '@/lib/site';

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${BUSINESS_NAME} — home`}
      className="flex items-center gap-3 text-ivory"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white lg:h-12 lg:w-12">
        {/* Served at icon size (sizes) instead of the full 1024px file. */}
        <Image
          src="/assets/logo.png"
          alt=""
          width={1024}
          height={1536}
          sizes="48px"
          className="h-[76%] w-auto"
        />
      </span>
      <span className="font-serif leading-none">
        <span className="block text-[1.1875rem] tracking-[0.05em] lg:text-[1.375rem]">RAYAN&apos;S</span>
        <span className="mt-1 block text-[0.5312rem] tracking-[0.24em] text-sage lg:text-[0.5938rem]">
          RECOVERY &amp; WELLNESS
        </span>
      </span>
    </Link>
  );
}
