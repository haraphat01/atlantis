import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, Card } from "@/components/primitives";
import { HeroBlob } from "@/components/graphics";
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
        lead="Cybersecurity pressures aren't identical across sectors. We shape scope and priorities around what actually applies to your organization."
        graphic={<HeroBlob className="h-40 w-40" />}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {industries.map((i) => (
            <Card key={i.slug} href={`/industries/${i.slug}`} className="p-6 sm:p-8">
              <h2 className="text-lg text-ink">{i.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{i.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink">
                Sector pressures &amp; services
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
