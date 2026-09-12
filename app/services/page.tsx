import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/primitives";
import { Stagger, StaggerItem } from "@/components/motion";
import { ServiceIcon } from "@/components/service-icon";
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
        title="Advisory, assessment, governance, assurance, and program development"
        lead="Our portfolio is organized into seven categories. Each explains the business problem it answers, what we do, the service areas within it, and the outcomes you can expect. Most engagements begin with a short discovery conversation and scope definition."
        image={{
          src: "/images/services-workstation.jpg",
          alt: "Advisors reviewing findings together on a laptop",
        }}
      >
        <ButtonLink href={primaryCta.href} size="lg" withArrow>
          {primaryCta.label}
        </ButtonLink>
      </PageHero>

      <Section>
        <Stagger className="grid gap-4">
          {services.map((s, idx) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group relative grid gap-6 rounded-lg border border-line bg-surface p-6 transition-colors duration-200 hover:border-accent/40 sm:grid-cols-[auto_1fr] sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-md bg-obsidian text-chalk transition-colors group-hover:bg-accent">
                    <ServiceIcon slug={s.slug} />
                  </span>
                  <span className="font-serif text-2xl text-ink-faint sm:hidden">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="hidden kicker text-ink-faint sm:inline">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl text-ink">{s.title}</h2>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">{s.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-faint">
                    {s.serviceAreas.slice(0, 4).map((a) => (
                      <span key={a} className="rounded-full bg-mist px-2.5 py-1">
                        {a}
                      </span>
                    ))}
                    {s.serviceAreas.length > 4 && (
                      <span className="px-2 py-1">+{s.serviceAreas.length - 4} more</span>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink">
                    View {s.title}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand
        title="Not sure which service fits?"
        body="Describe what's prompting the review and we'll help you connect it to the right engagement and scope."
      />
    </>
  );
}
