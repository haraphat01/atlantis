import type { Metadata } from "next";
import {
  PageHero,
  Section,
  SectionHeading,
  CtaBand,
  Kicker,
} from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { aboutSections, operatingPrinciples } from "@/lib/about";
import { company, vision, mission, trustSignals } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Atlantic Fortis is an independent cybersecurity advisory firm making enterprise-level security expertise accessible to the organizations that need it most.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An independent advisor, accountable to one interest — the client's"
        lead={company.descriptionShort}
      />

      <Section index="01">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="Company overview"
              title="Who we are and what we believe"
            />
          </div>
          <Stagger className="space-y-10">
            {aboutSections.map((s, i) => (
              <StaggerItem key={s.heading} className="border-l border-line-strong pl-6">
                <div className="flex items-baseline gap-3">
                  <span className="kicker text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl text-ink">{s.heading}</h2>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="mist" index="02" divide>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
            <Kicker>Mission</Kicker>
            <p className="mt-5 font-serif text-xl leading-8 text-ink">{mission}</p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="rounded-2xl border border-line bg-surface p-8 sm:p-10"
          >
            <Kicker>Vision</Kicker>
            <p className="mt-5 font-serif text-xl leading-8 text-ink">{vision}</p>
          </Reveal>
        </div>
      </Section>

      <Section index="03">
        <SectionHeading
          eyebrow="Operating principles"
          title="How we hold ourselves accountable on every engagement"
        />
        <Stagger className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {operatingPrinciples.map((p) => (
            <StaggerItem key={p.title} className="border-l border-line-strong pl-5">
              <span aria-hidden className="block h-px w-6 rule-accent" />
              <h3 className="mt-3 text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{p.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="mist" index="04" divide>
        <SectionHeading
          eyebrow="Trust and credibility"
          title="Building our public record"
          intro="Cybersecurity consulting is a trust-based service. As engagements complete and permissions are granted, this is where our proof will live."
        />
        <Stagger className="mt-12 flex flex-wrap gap-3">
          {trustSignals.map((t) => (
            <StaggerItem key={t}>
              <span className="inline-block rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-ink-soft">
                {t}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-ink-faint">
            Leadership and team biographies will be published once approved. Testimonials and
            case studies are published only with appropriate client permission.
          </p>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
