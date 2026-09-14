import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Section, Kicker, CheckList, Card } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ServiceIconChip } from "@/components/service-icon";
import { services, getService } from "@/lib/services";
import { industries } from "@/lib/industries";
import { primaryCta } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relevantIndustries = industries.filter((i) =>
    i.relevantServices.includes(service.slug),
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <Container className="relative py-16 sm:py-24">
          <nav
            className="flex items-center gap-1.5 text-sm text-ink-faint"
            aria-label="Breadcrumb"
          >
            <Link href="/services" className="hover:text-ink">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-ink-soft">{service.title}</span>
          </nav>
          <Reveal className="mt-8 max-w-3xl">
            <ServiceIconChip slug={service.slug} className="h-14 w-14 [&_svg]:h-6 [&_svg]:w-6" />
            <div className="mt-6">
              <Kicker>Service category</Kicker>
            </div>
            <h1 className="mt-4 text-[2.4rem] leading-[1.06] sm:text-5xl">{service.title}</h1>
            <p className="mt-6 text-lg leading-8 text-ink-soft">{service.summary}</p>
            <div className="mt-9">
              <ButtonLink
                href={`/contact?interest=${encodeURIComponent(service.title)}`}
                size="lg"
                withArrow
              >
                {primaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-2xl text-ink">The problem this answers</h2>
              <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{service.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl text-ink">What Atlantic Fortis does</h2>
              <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{service.whatWeDo}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl text-ink">Typical outcomes</h2>
              <div className="mt-5">
                <CheckList items={service.outcomes} />
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
              <h2 className="mark-label">Service areas</h2>
              <ul className="mt-4 text-sm text-ink-soft">
                {service.serviceAreas.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2.5 border-b border-line py-2.5 last:border-0"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </Section>

      {relevantIndustries.length > 0 && (
        <Section tone="mist" divide>
          <Reveal>
            <h2 className="text-2xl text-ink">Where this comes up</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
              Industries where this service category is frequently part of the engagement.
            </p>
          </Reveal>
          <Stagger className="mt-7 flex flex-wrap gap-3">
            {relevantIndustries.map((i) => (
              <StaggerItem key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-soft shadow-soft transition-colors hover:border-accent/40 hover:text-ink"
                >
                  {i.name}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <Section>
        <Reveal as="h2" className="text-2xl text-ink">
          Other service categories
        </Reveal>
        <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {related.map((s) => (
            <StaggerItem key={s.slug}>
              <Card href={`/services/${s.slug}`} className="p-6">
                <ServiceIconChip slug={s.slug} className="h-10 w-10 [&_svg]:h-4 [&_svg]:w-4" />
                <h3 className="mt-4 text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{s.summary}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-ink">
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
    </>
  );
}
