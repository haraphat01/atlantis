"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { frameworks } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Cycles through a list of pages with a two-step "page turn": the current
 *  page flips away first, then the next one flips in — read together as
 *  one continuous motion instead of an instant content swap. */
function useBookFlip(length: number, startIndex = 0, intervalMs = 2800, outMs = 220) {
  const [index, setIndex] = useState(startIndex);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const swapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const tick = setInterval(() => {
      setPhase("out");
      swapTimer.current = setTimeout(() => {
        setIndex((i) => (i + 1) % length);
        setPhase("in");
      }, outMs);
    }, intervalMs);
    return () => {
      clearInterval(tick);
      clearTimeout(swapTimer.current);
    };
  }, [length, intervalMs, outMs]);

  return {
    index,
    phase,
    flipClass: phase === "out" ? "page-flip-out" : "page-flip-in",
    shadowClass: phase === "out" ? "shadow-sweep-out" : "shadow-sweep-in",
  };
}

/*
  Friendly, colorful visuals in place of stock photography — soft gradient
  blobs and small dashboard-style mockups, the way a modern trust platform
  shows its product rather than illustrating with stock people.
*/

/** Soft blurred color behind a hero or section. Purely decorative. */
export function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-accent/25 blur-[100px]" />
      <div className="absolute -right-16 top-10 h-[22rem] w-[22rem] rounded-full bg-teal/20 blur-[100px]" />
      <div className="absolute bottom-[-8rem] left-1/3 h-[20rem] w-[20rem] rounded-full bg-pink/15 blur-[100px]" />
    </div>
  );
}

/** Per-framework content for the trust card — what a client's own trust
 *  page might show once each of these is in place. Keyed by the framework
 *  names in lib/site.ts so the card always has a page for every framework
 *  in the marquee. No invented scores — a checkmark stands for "in place." */
const cardContentByFramework: Record<string, { metric: string; items: string[] }> = {
  "ISO/IEC 27001": {
    metric: "ISMS in place",
    items: ["Risk assessment", "Access control policy", "Internal audit programme"],
  },
  "ISO 22301": {
    metric: "Continuity plan in place",
    items: ["Business impact analysis", "Recovery plan tested", "Crisis communication"],
  },
  "ISO 27701": {
    metric: "Privacy programme in place",
    items: ["Data mapping", "Consent management", "Retention schedule"],
  },
  "NIST Cybersecurity Framework 2.0": {
    metric: "Framework aligned",
    items: ["Govern function", "Identify & protect", "Detect & respond"],
  },
  "NIST SP 800-53": {
    metric: "Controls assessed",
    items: ["Access control (AC)", "Audit & accountability (AU)", "Incident response (IR)"],
  },
  "CIS Critical Security Controls": {
    metric: "Controls in place",
    items: ["Asset inventory", "Secure configuration", "Continuous monitoring"],
  },
  "SOC 2": {
    metric: "Program in place",
    items: ["Access control", "Data encryption", "Incident response"],
  },
  "PCI DSS": {
    metric: "Compliance ready",
    items: ["Network segmentation", "Cardholder data protection", "Vulnerability management"],
  },
  PIPEDA: {
    metric: "Privacy compliant",
    items: ["Consent practices", "Breach reporting", "Data minimization"],
  },
  GDPR: {
    metric: "Data protection ready",
    items: ["Lawful basis", "Data subject rights", "Breach notification"],
  },
  HIPAA: {
    metric: "Safeguards in place",
    items: ["PHI access controls", "Audit logging", "Business associate agreements"],
  },
  "AI governance frameworks": {
    metric: "Governance in place",
    items: ["Model risk assessment", "Bias monitoring", "Human oversight"],
  },
};

const itemTones = ["teal", "accent", "amber"] as const;
const toneClasses: Record<(typeof itemTones)[number], string> = {
  teal: "bg-teal-soft text-teal",
  accent: "bg-accent-soft text-accent",
  amber: "bg-amber-soft text-amber",
};

/** The hero's signature visual: a live-feeling trust card that turns
 *  through a page for each framework, in step with the badge above it. */
export function TrustScoreCard({ className = "" }: { className?: string }) {
  const startIndex = Math.max(
    frameworks.findIndex((f) => f.name === "SOC 2"),
    0,
  );
  const { index, phase, flipClass, shadowClass } = useBookFlip(frameworks.length, startIndex);

  const framework = frameworks[index];
  const page = cardContentByFramework[framework.name] ?? cardContentByFramework["SOC 2"];

  return (
    <div className={`relative ${className}`}>
      <div className="page-flip-frame animate-float rounded-3xl border border-line bg-surface p-6 shadow-lift sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">Trust overview</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-xs font-semibold text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Live
          </span>
        </div>

        {/* The flipping region — clipped and relatively positioned so the
            shadow sweep below reads as light crossing this content, not
            the whole card. */}
        <div className="relative mt-6 overflow-hidden">
          <div key={index} className={cn("flex items-center gap-5", flipClass)}>
            <span className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-full bg-accent-soft">
              <svg viewBox="0 0 32 32" className="h-7 w-7 animate-check-pop">
                <path
                  d="M8 17 L14 23 L24 10"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="3.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={25}
                  style={{ ["--check-len" as string]: 25 }}
                  className="animate-check"
                />
              </svg>
            </span>
            <p className="text-lg font-bold text-ink">{page.metric}</p>
          </div>

          <ul className="mt-6 space-y-2.5">
            {page.items.map((label, i) => {
              const tone = itemTones[i % itemTones.length];
              return (
                <li
                  key={`${index}-${i}`}
                  style={{ animationDelay: flipClass === "page-flip-in" ? `${i * 0.07}s` : undefined }}
                  className={cn("flex items-center gap-3 text-sm text-ink-soft", flipClass)}
                >
                  <span
                    className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-full ${toneClasses[tone]}`}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {label}
                </li>
              );
            })}
          </ul>

          <div key={`${index}-${phase}`} aria-hidden className={cn("shadow-sweep", shadowClass)} />
        </div>
      </div>

      <div className="page-flip-frame absolute -left-8 -top-6 hidden w-44 rotate-[-6deg] items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3 shadow-soft sm:flex">
        <ShieldCheck className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden />
        <span
          key={index}
          title={framework.name}
          className={cn("truncate text-xs font-semibold text-ink", flipClass)}
        >
          {framework.name}
        </span>
      </div>
    </div>
  );
}

/** A finding, resolved — three friendly steps in a soft card. */
export function FindingsCard({ className = "" }: { className?: string }) {
  const steps = [
    { n: "1", label: "Finding logged", tone: "amber" as const },
    { n: "2", label: "Impact scored", tone: "teal" as const },
    { n: "3", label: "Decision made", tone: "accent" as const },
  ];
  const toneClasses = {
    amber: "bg-amber-soft text-amber",
    teal: "bg-teal-soft text-teal",
    accent: "bg-accent-soft text-accent",
  };
  return (
    <div className={`rounded-3xl border border-line bg-surface p-7 shadow-soft ${className}`}>
      <ul className="space-y-4">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center gap-4">
            <span
              className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-sm font-bold ${toneClasses[s.tone]}`}
            >
              {s.n}
            </span>
            <span className="text-sm font-medium text-ink">{s.label}</span>
            {i < steps.length - 1 && (
              <span className="ml-auto hidden h-px flex-1 bg-line sm:block" aria-hidden />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Evidence, reviewed and verified. */
export function EvidenceCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-3xl border border-line bg-surface p-7 shadow-soft ${className}`}>
      <div className="space-y-2.5">
        {[100, 80, 60].map((w, i) => (
          <div key={i} className="h-3 rounded-full bg-mist" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-teal-soft p-4">
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-teal text-white">
          <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Evidence verified</p>
          <p className="text-xs text-ink-soft">Ready for audit review</p>
        </div>
      </div>
    </div>
  );
}

/** A quiet colorful accent for interior hero sections, in place of a photo. */
export function HeroBlob({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/25 via-teal/20 to-pink/20 blur-2xl" />
      <div className="relative grid h-full w-full place-items-center rounded-full border border-line bg-surface/70 shadow-soft backdrop-blur">
        <ShieldCheck className="h-10 w-10 text-accent" strokeWidth={1.6} aria-hidden />
      </div>
    </div>
  );
}
