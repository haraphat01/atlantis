import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { engagementSteps, deliveryModel } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "A structured cybersecurity consulting engagement, from discovery and scoping through evidence gathering, assessment, validation, reporting, and ongoing advisory.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Structured, professional, and easy to engage"
        lead="Engagements follow a consistent path. Most opportunities begin with a discovery conversation and scope definition before a final proposal is issued, so both sides are clear on outcomes, deliverables, and commercial model."
      />

      <Section>
        <SectionHeading
          eyebrow="Engagement journey"
          title="Seven steps from business need to sustained improvement"
        />
        <Stagger as="ol" className="mt-14 space-y-0 border-l border-line">
          {engagementSteps.map((step, idx) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="relative pb-12 pl-10 last:pb-0"
            >
              <span className="absolute -left-[19px] top-0 grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent-ink">
                {idx + 1}
              </span>
              <h3 className="text-lg text-ink">{step.title}</h3>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-7 text-ink-soft">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="mist" divide>
        <SectionHeading
          eyebrow="Delivery model"
          title="Virtual-first, hybrid where it adds value"
        />
        <Reveal>
          <p className="mt-6 max-w-3xl text-[1.0625rem] leading-7 text-ink-soft">
            {deliveryModel}
          </p>
        </Reveal>
      </Section>
    </>
  );
}
