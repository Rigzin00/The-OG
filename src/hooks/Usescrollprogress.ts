import { useEffect, useRef, useState, useCallback, RefObject } from 'react';

/**
 * Returns a scroll progress value (0 → 1) based on how far
 * `targetRef` has been scrolled past. `scrollRange` controls
 * what fraction of the element's scrollable height equals progress=1.
 */
export function useScrollProgress(
  scrollRange = 0.6
): { ref: RefObject<HTMLDivElement>; progress: number } {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (!ref.current) return;
    const rect  = ref.current.getBoundingClientRect();
    const total = ref.current.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    setProgress(scrolled / (total * scrollRange));
  }, [scrollRange]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // sync on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return { ref, progress };
}