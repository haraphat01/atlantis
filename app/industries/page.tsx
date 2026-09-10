import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, CtaBand, Card } from "@/components/primitives";
import { Stagger, StaggerItem } from "@/components/motion";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Cybersecurity advisory for financial services and FinTech, technology and SaaS, healthcare, professional services, energy and utilities, telecommunications, manufacturing, transportation and logistics, and public-sector supply chains.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="The same rigour, adapted to your risk and compliance context"
        lead="Cybersecurity pressures are not identical across sectors. We shape scope, frameworks, and priorities around the risks and obligations that actually apply to your organization."
      />

      <Section>
        <Stagger className="grid gap-5 md:grid-cols-2">
          {industries.map((i, idx) => (
            <StaggerItem key={i.slug}>
              <Card href={`/industries/${i.slug}`} className="p-6 sm:p-8">
                <span className="kicker text-ink-faint">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-lg text-ink">{i.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{i.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink">
                  Sector pressures &amp; services
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

      <CtaBand />
    </>
  );
}
