import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      // Starts with the words shown on screen, so voice control ("click Rayan's") works.
      aria-label="Rayan's Recovery & Wellness – home"
      className="flex items-center gap-3 text-ivory"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white lg:h-12 lg:w-12">
        {/* Small, clean copy of the logo (512×768); served at icon size via sizes. */}
        <Image
          src="/assets/logo.png"
          alt=""
          width={512}
          height={768}
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
