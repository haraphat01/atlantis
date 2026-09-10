import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import {
  Section,
  SectionHeading,
  CtaBand,
  Kicker,
  Card,
  ArrowLink,
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
  return (
    <>
      <Hero />

      {/* Frameworks marquee */}
      <div className="border-y border-line bg-mist py-7">
        <Container>
          <p className="mb-5 text-center">
            <span className="kicker text-ink-faint">
              Fluent in the frameworks your stakeholders ask about
            </span>
          </p>
        </Container>
        <Marquee>
          {frameworks.map((f) => (
            <span
              key={f.name}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-ink-soft"
            >
              {f.name}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Problems */}
      <Section index="01">
        <SectionHeading
          eyebrow="Where clients start"
          title="Most clients arrive with a business concern, not a service request"
          intro="If any of these sound familiar, there is a clear next step. Start with the problem — we'll connect it to the right engagement."
        />
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
          {clientProblems.map((p) => (
            <StaggerItem key={p.problem}>
              <Card href={p.href} className="p-6">
                <p className="font-serif text-lg leading-snug text-ink">
                  &ldquo;{p.problem}&rdquo;
                </p>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-soft">{p.direction}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink">
                  See how we help
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Services */}
      <Section tone="mist" index="02" divide>
        <SectionHeading
          eyebrow="Core service portfolio"
          title="Seven service categories, one trusted partner"
          intro="Each category connects a business problem to what we do and the outcomes you can expect."
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug}>
              <Card href={`/services/${s.slug}`} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-obsidian text-chalk transition-colors group-hover:bg-accent">
                    <ServiceIcon slug={s.slug} />
                  </span>
                  <span className="kicker text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-ink">
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Differentiators */}
      <Section index="03">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Why Atlantic Fortis"
            title="Enterprise-level expertise, without the cost or rigidity"
            intro="We bring specialized support to growing, regulated, and mid-market organizations — and stay genuinely independent."
          />
          <Stagger className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {differentiators.map((d) => (
              <StaggerItem key={d.title} className="border-l border-line-strong pl-5">
                <span aria-hidden className="block h-px w-6 rule-accent" />
                <h3 className="mt-3 text-base font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{d.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Industries */}
      <Section tone="mist" index="04" divide>
        <SectionHeading
          eyebrow="Industries"
          title="Context matters — pressures differ by sector"
          intro="We adapt scope to the size of the organization, the sensitivity of its data, and its regulatory environment."
        />
        <Stagger className="mt-12 flex flex-wrap gap-3">
          {industries.map((i) => (
            <StaggerItem key={i.slug}>
              <Link
                href={`/industries/${i.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-ink-soft transition-colors hover:border-accent/50 hover:text-ink"
              >
                {i.name}
                <ArrowRight className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Process */}
      <Section index="05">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="How we work"
            title="A structured engagement, easy to start"
            intro="Every engagement begins with a discovery conversation and scope definition before a final proposal is issued."
          />
          <Stagger as="ol" className="relative space-y-8 border-l border-line pl-8">
            {engagementSteps.slice(0, 5).map((step, idx) => (
              <StaggerItem as="li" key={step.title} className="relative">
                <span className="absolute -left-[41px] grid h-6 w-6 place-items-center rounded-full border border-line bg-surface text-[0.7rem] font-semibold text-accent-ink">
                  {idx + 1}
                </span>
                <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{step.description}</p>
              </StaggerItem>
            ))}
            <StaggerItem as="li" className="relative">
              <ArrowLink href="/how-we-work" variant="right">
                See the full engagement journey
              </ArrowLink>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      {/* Frameworks detail */}
      <Section tone="mist" index="06" divide>
        <SectionHeading
          eyebrow="Frameworks and standards"
          title="We help you use frameworks, not just name them"
          intro="Familiarity with recognized cybersecurity, privacy, resilience, and assurance frameworks — applied to your gap analysis, readiness, and roadmap."
        />
        <Stagger className="mt-14 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((f) => (
            <StaggerItem
              key={f.name}
              className="border-t border-line-strong pt-4"
            >
              <p className="text-sm font-semibold text-ink">{f.name}</p>
              <p className="mt-1.5 text-sm leading-6 text-ink-soft">{f.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Mission / Vision */}
      <Section index="07">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
            <Kicker>Our mission</Kicker>
            <p className="mt-5 font-serif text-xl leading-8 text-ink">{mission}</p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="rounded-2xl border border-line bg-surface p-8 sm:p-10"
          >
            <Kicker>Our vision</Kicker>
            <p className="mt-5 font-serif text-xl leading-8 text-ink">{vision}</p>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
