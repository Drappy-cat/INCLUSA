import { type ReactNode, type CSSProperties } from "react";
import { useScrollReveal, getStaggerDelay } from "../../hooks/useAnimations";

/* ────────────────────────────────────────────────────────────
 * ScrollReveal — Wrapper that fades/slides children in on scroll
 * Uses IntersectionObserver, NOT framer-motion (CSS-only = lighter)
 * ──────────────────────────────────────────────────────────── */

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;           // ms
  staggerIndex?: number;    // auto-calculate delay from index
  duration?: number;        // ms
  distance?: number;        // px translate distance
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
  once?: boolean;
}

const directionMap: Record<Direction, (d: number) => string> = {
  up: (d) => `translateY(${d}px)`,
  down: (d) => `translateY(-${d}px)`,
  left: (d) => `translateX(${d}px)`,
  right: (d) => `translateX(-${d}px)`,
  none: () => "translate(0,0)",
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  staggerIndex,
  duration = 600,
  distance = 30,
  className = "",
  as: Tag = "div",
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold, once });

  const computedDelay = staggerIndex !== undefined
    ? parseInt(getStaggerDelay(staggerIndex, 100))
    : delay;

  const hiddenStyle: CSSProperties = {
    opacity: 0,
    transform: directionMap[direction](distance),
    transition: `opacity ${duration}ms ease-out ${computedDelay}ms, transform ${duration}ms ease-out ${computedDelay}ms`,
    willChange: "opacity, transform",
  };

  const visibleStyle: CSSProperties = {
    opacity: 1,
    transform: "translate(0, 0)",
    transition: `opacity ${duration}ms ease-out ${computedDelay}ms, transform ${duration}ms ease-out ${computedDelay}ms`,
    willChange: "auto",
  };

  return (
    // @ts-ignore — dynamic tag
    <Tag
      ref={ref}
      className={className}
      style={isVisible ? visibleStyle : hiddenStyle}
    >
      {children}
    </Tag>
  );
}
