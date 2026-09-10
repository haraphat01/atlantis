import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_1px_2px_rgba(20,33,46,0.12)] hover:bg-accent-ink hover:shadow-[0_8px_24px_-8px_rgba(47,104,240,0.55)]",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-ink/30 hover:bg-mist",
  ghost: "text-ink hover:bg-ink/[0.06]",
  onDark:
    "bg-chalk text-obsidian shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] hover:bg-white",
  onDarkGhost:
    "border border-white/20 text-chalk hover:border-white/45 hover:bg-white/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.8125rem]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[0.9375rem]",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
          aria-hidden
        />
      )}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
