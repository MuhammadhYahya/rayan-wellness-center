import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition-all group-hover:scale-105">
        <div className="relative h-21 w-21">
          <Image
            src="/assets/logo.png"
            alt="Rayan's Recovery & Wellness Center"
            fill
            className="object-contain p-1"
            priority
          />
        </div>
      </div>

      <div className="font-serif">
        <div className="text-2xl font-medium tracking-wider text-ivory">RAYAN&apos;S</div>
        <div className="-mt-1 text-[10px] uppercase tracking-[2px] text-sage">
          RECOVERY & WELLNESS
        </div>
      </div>
    </Link>
  );
}
