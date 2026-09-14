import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ServiceIconChip } from "@/components/service-icon";
import { FindingsCard, EvidenceCard } from "@/components/graphics";
import {
  Section,
  SectionHeading,
  Kicker,
  ArrowLink,
  FeatureSplit,
  Card,
} from "@/components/primitives";
import {
  vision,
  mission,
  differentiators,
  clientProblems,
  engagementSteps,
  frameworks,
} from "@/lib/site";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";

export default function HomePage() {
  const businessLedDifferentiator = differentiators.find((d) => d.title === "Business and risk led")!;
  const evidenceBasedDifferentiator = differentiators.find((d) => d.title === "Evidence-based delivery")!;

  return (
    <>
      <Hero />

      {/* Frameworks marquee */}
      <div className="border-y border-line bg-mist py-7">
        <Container>
          <p className="mb-5 text-center text-sm text-ink-faint">
            Fluent in the frameworks your stakeholders ask about
          </p>
        </Container>
        <Marquee>
          {frameworks.map((f) => (
            <span
              key={f.name}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-ink-soft shadow-soft"
            >
              {f.name}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Feature highlights */}
      <Section>
        <div className="space-y-20">
          <FeatureSplit
            kicker="Business and risk led"
            title="A finding is only useful once it reaches a decision"
            body={businessLedDifferentiator.description}
            graphic={<FindingsCard />}
          />
          <FeatureSplit
            kicker="Evidence-based delivery"
            title="Conclusions you can defend to a board, auditor, or regulator"
            body={evidenceBasedDifferentiator.description}
            graphic={<EvidenceCard />}
            reverse
          />
        </div>
      </Section>

      {/* Problems */}
      <Section tone="mist" divide>
        <SectionHeading
          eyebrow="Where clients start"
          title="Most clients arrive with a concern, not a service request"
          intro="If one of these sounds familiar, start with the problem — we'll connect it to the right engagement."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {clientProblems.map((p) => (
            <Card key={p.problem} href={p.href} className="p-6">
              <p className="text-[1.0625rem] leading-snug text-ink">{p.problem}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink-soft">{p.direction}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink">
                See how we help
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="Core service portfolio"
          title="Seven service categories, one trusted partner"
          intro="Each connects a business problem to what we do and the outcomes you can expect."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.slug} href={`/services/${s.slug}`} className="p-6">
              <ServiceIconChip slug={s.slug} />
              <h3 className="mt-5 text-lg text-ink">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{s.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
                Learn more
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Differentiators */}
      <Section tone="mist" divide>
        <SectionHeading
          eyebrow="Why Atlantic Fortis"
          title="Enterprise-level expertise, without the cost or rigidity"
          intro="Specialized support for growing, regulated, and mid-market organizations — and genuine independence."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => (
            <div key={d.title} className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
              <h3 className="text-base font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{d.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section>
        <SectionHeading
          eyebrow="Industries"
          title="Context matters — pressures differ by sector"
          intro="Scope adapts to the size of the organization, the sensitivity of its data, and its regulatory environment."
        />
        <div className="mt-10 flex flex-wrap gap-2.5">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-soft shadow-soft transition-colors hover:border-accent/40 hover:text-ink"
            >
              {i.name}
              <ArrowRight className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
            </Link>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="mist" divide>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="How we work"
            title="A structured engagement, easy to start"
            intro="Every engagement begins with a discovery conversation and scope definition before a final proposal is issued."
          />
          <ol className="relative space-y-7 border-l border-line-strong pl-8">
            {engagementSteps.slice(0, 5).map((step, idx) => (
              <li key={step.title} className="relative">
                <span className="absolute -left-[41px] grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-[0.7rem] font-bold text-accent-ink">
                  {idx + 1}
                </span>
                <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{step.description}</p>
              </li>
            ))}
            <li className="relative">
              <ArrowLink href="/how-we-work" variant="right">
                See the full engagement journey
              </ArrowLink>
            </li>
          </ol>
        </div>
      </Section>

      {/* Mission / Vision */}
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
    </>
  );
}
