import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, Card } from "@/components/primitives";
import { ServiceIconChip } from "@/components/service-icon";
import { HeroBlob } from "@/components/graphics";
import { ButtonLink } from "@/components/button";
import { primaryCta } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seven cybersecurity service categories: risk advisory, governance, operational resilience, regulatory framework compliance, IT audit and control assurance, program development, and security awareness training.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Advisory, assessment, governance, and assurance"
        lead="Seven categories, each answering a business problem with defined service areas and outcomes. Most engagements start with a short discovery conversation."
        graphic={<HeroBlob className="h-40 w-40" />}
      >
        <ButtonLink href={primaryCta.href} size="lg" withArrow>
          {primaryCta.label}
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.slug} href={`/services/${s.slug}`} className="p-6 sm:p-7">
              <ServiceIconChip slug={s.slug} />
              <h2 className="mt-5 text-xl text-ink">{s.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{s.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-faint">
                {s.serviceAreas.slice(0, 3).map((a) => (
                  <span key={a} className="rounded-full bg-mist px-2.5 py-1">
                    {a}
                  </span>
                ))}
                {s.serviceAreas.length > 3 && (
                  <span className="px-1 py-1">+{s.serviceAreas.length - 3} more</span>
                )}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink">
                View {s.title}
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
