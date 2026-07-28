import { useEffect, useRef, useState, useCallback } from "react";

/* ────────────────────────────────────────────────────────────
 * useScrollReveal — IntersectionObserver-based scroll reveal
 * Returns a ref to attach + whether element is in view
 * ──────────────────────────────────────────────────────────── */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/* ────────────────────────────────────────────────────────────
 * useCountUp — Animated count-up from 0 to target
 * ──────────────────────────────────────────────────────────── */
export function useCountUp(
  target: number,
  shouldStart: boolean,
  duration: number = 2000
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for a satisfying deceleration
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);

      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);

  return count;
}

/* ────────────────────────────────────────────────────────────
 * useStaggerChildren — Returns delay for nth child
 * ──────────────────────────────────────────────────────────── */
export function getStaggerDelay(index: number, baseDelay: number = 100): string {
  return `${index * baseDelay}ms`;
}
