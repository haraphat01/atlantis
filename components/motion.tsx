import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
  Lightweight, dependency-free entrance animations.

  Everything renders visible by default and plays a short CSS "rise" on load
  (see `.reveal` / `.stagger` in globals.css). The reduced-motion media query
  collapses the animation to a snap, so content is never gated on JavaScript.
*/

type Tag = "div" | "section" | "ul" | "li" | "span" | "h1" | "h2" | "h3" | "p" | "ol";

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: Tag;
  /** seconds */
  delay?: number;
  /** kept for API compatibility — no longer used */
  y?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  return <Tag className={cn("stagger", className)}>{children}</Tag>;
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  return <Tag className={className}>{children}</Tag>;
}

/** Retained for compatibility — a plain hover lift via CSS. */
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("transition-transform duration-200 hover:-translate-y-1", className)}>
      {children}
    </div>
  );
}
