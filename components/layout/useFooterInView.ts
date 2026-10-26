'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// True while the site footer (#site-footer) is on screen. Re-checks after each
// page change because every page renders its own footer. Without
// IntersectionObserver (very old browsers) it stays false, so nothing hides.
export function useFooterInView() {
  const pathname = usePathname();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(footer);
    return () => {
      observer.disconnect();
      setInView(false);
    };
  }, [pathname]);

  return inView;
}
