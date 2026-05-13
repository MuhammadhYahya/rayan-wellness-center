// components/layout/Logo.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* White Circle Background - Slightly Larger */}
      <div className="relative w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-md transition-all group-hover:scale-105">
        
        {/* Your Transparent Logo */}
        <div className="relative w-21 h-21">
          <Image
            src="/assets/logo.png"        // ← Your transparent PNG logo
            alt="Rayan's Recovery & Wellness Center"
            fill
            className="object-contain p-1"   // p-1 adds little inner padding
            priority
          />
        </div>
      </div>

      {/* Brand Text */}
      <div className="font-serif ">
        <div className="text-2xl tracking-wider text-ivory font-medium">
          RAYAN&apos;S
        </div>
        <div className="text-[10px] text-sage -mt-1 tracking-[2px] uppercase">
          RECOVERY & WELLNESS
        </div>
      </div>
    </Link>
  );
}