'use client';

import { useEffect, useRef } from 'react';

// Trustindex live Google reviews widget. The loader script injects the widget
// right after itself in the DOM, so we append it inside this container. Editing
// the widget's look/filters is done in the Trustindex dashboard — no code change.
const TRUSTINDEX_SRC =
  'https://cdn.trustindex.io/loader.js?584b78986913225347764b32e04';

export default function GoogleReviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Guard on THIS container (not a one-time flag) so React Strict Mode's
    // dev double-mount still renders the widget into the live container.
    if (container.querySelector('script[data-trustindex]')) return;

    const script = document.createElement('script');
    script.src = TRUSTINDEX_SRC;
    script.async = true;
    script.setAttribute('data-trustindex', '');
    container.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}
