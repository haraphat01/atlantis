import type { ReactNode } from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { GradientMesh } from "@/components/graphics";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  Kicker — a small pill badge above a heading                              */
/* -------------------------------------------------------------------------- */

export function Kicker({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        onDark ? "bg-white/10 text-signal" : "bg-accent-soft text-accent-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Back-compat alias — some pages import `Eyebrow`.
export const Eyebrow = Kicker;

/* -------------------------------------------------------------------------- */
/*  Section heading                                                           */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Kicker onDark={onDark}>{eyebrow}</Kicker>}
      <h2
        className={cn(
          "mt-4 text-[1.65rem] leading-[1.15] sm:text-[2.1rem]",
          onDark ? "text-chalk" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 text-[1.0625rem] leading-7",
            onDark ? "text-chalk-soft" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature split — alternating illustration + copy row                      */
/* -------------------------------------------------------------------------- */

export function FeatureSplit({
  kicker,
  title,
  body,
  graphic,
  reverse = false,
  children,
}: {
  kicker: string;
  title: string;
  body: string;
  graphic: ReactNode;
  reverse?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={reverse ? "lg:order-2" : "lg:order-1"}>{graphic}</Reveal>
      <Reveal delay={0.08} className={reverse ? "lg:order-1" : "lg:order-2"}>
        <Kicker>{kicker}</Kicker>
        <h3 className="mt-4 text-2xl leading-tight text-ink sm:text-[1.75rem]">{title}</h3>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-7 text-ink-soft">{body}</p>
        {children}
      </Reveal>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Interior page hero — light, with a soft gradient and a small mark         */
/* -------------------------------------------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  graphic,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  /** Optional small visual shown beside the copy on larger screens. */
  graphic?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <GradientMesh className="opacity-70" />
      <Container className="relative py-16 sm:py-24">
        <div className={cn("grid gap-12 lg:items-center", graphic ? "lg:grid-cols-[1.2fr_0.5fr]" : "")}>
          <div className="max-w-2xl">
            {eyebrow && (
              <Reveal>
                <Kicker>{eyebrow}</Kicker>
              </Reveal>
            )}
            <Reveal delay={0.04} as="h1" className="mt-5 text-[2.15rem] leading-[1.08] sm:text-[2.75rem]">
              {title}
            </Reveal>
            {lead && (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">{lead}</p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.14} className="mt-9">
                {children}
              </Reveal>
            )}
          </div>
          {graphic && (
            <Reveal delay={0.08} className="hidden justify-self-center lg:block">
              {graphic}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section wrapper                                                           */
/* -------------------------------------------------------------------------- */

export function Section({
  children,
  className = "",
  tone = "paper",
  divide = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "mist" | "dark";
  /** Draw a top hairline. */
  divide?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative",
        tone === "mist" && "bg-mist",
        tone === "dark" && "bg-dark text-chalk",
        divide && "border-t border-line",
        className,
      )}
    >
      <Container className="relative py-16 sm:py-24">{children}</Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Arrow link — the repeated "Learn more" affordance                        */
/* -------------------------------------------------------------------------- */

export function ArrowLink({
  href,
  children,
  variant = "diagonal",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "diagonal" | "right";
  className?: string;
}) {
  const Icon = variant === "diagonal" ? ArrowUpRight : ArrowRight;
  return (
    <Link
      href={href}
      className={cn(
        "group/al inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      <Icon
        className="h-4 w-4 transition-transform duration-200 group-hover/al:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Check list                                                                */
/* -------------------------------------------------------------------------- */

export function CheckList({
  items,
  onDark = false,
}: {
  items: string[];
  onDark?: boolean;
}) {
  return (
    <Stagger as="ul" className="space-y-3">
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={item}
          className={cn(
            "flex items-center gap-3 text-[0.9375rem] leading-6",
            onDark ? "text-chalk-soft" : "text-ink-soft",
          )}
        >
          <span
            className={cn(
              "grid h-5 w-5 flex-shrink-0 place-items-center rounded-full",
              onDark ? "bg-white/10 text-signal" : "bg-teal-soft text-teal",
            )}
          >
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <span>{item}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card — rounded surface with soft depth                                    */
/* -------------------------------------------------------------------------- */

export function Card({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </Link>
  );
}
