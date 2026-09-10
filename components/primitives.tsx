import type { ReactNode } from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { primaryCta } from "@/lib/site";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  Kicker — monospace label with a short accent rule                         */
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
        "kicker inline-flex items-center gap-3",
        onDark ? "text-signal" : "text-accent-ink",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-6",
          onDark ? "bg-signal/70" : "bg-accent/60",
        )}
      />
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
        align === "center" && "mx-auto text-center [&_.kicker]:justify-center",
        className,
      )}
    >
      {eyebrow && <Kicker onDark={onDark}>{eyebrow}</Kicker>}
      <h2
        className={cn(
          "mt-5 text-[1.75rem] leading-[1.12] sm:text-[2.35rem]",
          onDark ? "text-chalk" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-[1.0625rem] leading-7",
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
/*  Interior page hero — light, editorial                                     */
/* -------------------------------------------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-ledger mask-fade-b opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(47,104,240,0.12),transparent_70%)] blur-2xl"
      />
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <Kicker>{eyebrow}</Kicker>
            </Reveal>
          )}
          <Reveal
            delay={0.05}
            as="h1"
            className="mt-6 text-[2.4rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem]"
          >
            {title}
          </Reveal>
          {lead && (
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft">{lead}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.18} className="mt-10">
              {children}
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
  index,
  divide = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "mist" | "obsidian";
  /** Optional two-digit section marker shown top-right. */
  index?: string;
  /** Draw a top hairline. */
  divide?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative",
        tone === "mist" && "bg-mist",
        tone === "obsidian" && "bg-obsidian text-chalk",
        divide && "border-t border-line",
        className,
      )}
    >
      <Container className="relative py-20 sm:py-28">
        {index && (
          <span
            aria-hidden
            className={cn(
              "kicker absolute right-5 top-8 hidden sm:right-6 sm:block lg:right-8",
              tone === "obsidian" ? "text-chalk-faint" : "text-ink-faint",
            )}
          >
            {index}
          </span>
        )}
        {children}
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Arrow link — the repeated "Learn more →" affordance                       */
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
        "group/al inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink transition-colors hover:text-accent",
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
/*  CTA band — obsidian panel                                                 */
/* -------------------------------------------------------------------------- */

export function CtaBand({
  title = "Start with the problem you're facing",
  body = "Tell us what's prompting the review or what you're trying to achieve. We'll connect it to the right engagement, scope, and next step — no obligation.",
  primaryLabel = primaryCta.label,
  primaryHref = primaryCta.href,
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] bg-obsidian px-6 py-14 sm:px-14 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint mask-radial opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(56,214,230,0.22),transparent_62%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(47,104,240,0.28),transparent_65%)] blur-2xl"
        />
        <div className="relative flex flex-col items-start gap-9 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Kicker onDark>Request a consultation</Kicker>
            <h2 className="mt-5 text-3xl text-chalk sm:text-[2.5rem] sm:leading-[1.1]">{title}</h2>
            <p className="mt-5 text-[1.0625rem] leading-7 text-chalk-soft">{body}</p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            <ButtonLink href={primaryHref} size="lg" variant="onDark" withArrow>
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href="/how-we-work" size="lg" variant="onDarkGhost">
              How we work
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
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
    <Stagger as="ul" className="space-y-3.5">
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={item}
          className={cn(
            "flex gap-3 text-[0.9375rem] leading-6",
            onDark ? "text-chalk-soft" : "text-ink-soft",
          )}
        >
          <span
            className={cn(
              "mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full",
              onDark ? "bg-signal/15 text-signal" : "bg-accent/10 text-accent-ink",
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
/*  Card — hairline surface with a hover rule                                 */
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
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong hover:bg-[#fdfcfa]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
      />
      {children}
    </Link>
  );
}
