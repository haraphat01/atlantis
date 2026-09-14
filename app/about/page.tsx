import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, Kicker } from "@/components/primitives";
import { HeroBlob } from "@/components/graphics";
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
        title="An independent advisor, accountable to one interest: yours"
        lead={company.descriptionShort}
        graphic={<HeroBlob className="h-40 w-40" />}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading eyebrow="Company overview" title="Who we are and what we believe" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {aboutSections.map((s) => (
              <div key={s.heading} className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
                <h2 className="text-lg text-ink">{s.heading}</h2>
                <p className="mt-2 text-[0.9375rem] leading-7 text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark" divide>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Kicker onDark>Mission</Kicker>
            <p className="mt-4 text-xl leading-8 text-chalk">{mission}</p>
          </div>
          <div>
            <Kicker onDark>Vision</Kicker>
            <p className="mt-4 text-xl leading-8 text-chalk">{vision}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Operating principles"
          title="How we hold ourselves accountable on every engagement"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {operatingPrinciples.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
              <h3 className="text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist" divide>
        <SectionHeading
          eyebrow="Trust and credibility"
          title="Building our public record"
          intro="As engagements complete and permissions are granted, this is where our proof will live."
        />
        <div className="mt-10 flex flex-wrap gap-2.5">
          {trustSignals.map((t) => (
            <span
              key={t}
              className="inline-block rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-soft shadow-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
