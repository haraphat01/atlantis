import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Section, CtaBand, Kicker, CheckList } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ServiceIcon } from "@/components/service-icon";
import { industries, getIndustry } from "@/lib/industries";
import { getService } from "@/lib/services";
import { primaryCta } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(
  props: PageProps<"/industries/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return { title: industry.name, description: industry.summary };
}

export default async function IndustryDetailPage(
  props: PageProps<"/industries/[slug]">,
) {
  const { slug } = await props.params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relevant = industry.relevantServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-ledger mask-fade-b opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(47,104,240,0.12),transparent_70%)] blur-2xl"
        />
        <Container className="relative py-16 sm:py-24">
          <nav
            className="flex items-center gap-1.5 text-sm text-ink-faint"
            aria-label="Breadcrumb"
          >
            <Link href="/industries" className="hover:text-ink">
              Industries
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-ink-soft">{industry.name}</span>
          </nav>
          <Reveal className="mt-8 max-w-3xl">
            <Kicker>Industry</Kicker>
            <h1 className="mt-4 text-[2.4rem] leading-[1.06] sm:text-5xl">{industry.name}</h1>
            <p className="mt-6 text-lg leading-8 text-ink-soft">{industry.summary}</p>
            <div className="mt-9">
              <ButtonLink href="/contact" size="lg" withArrow>
                {primaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl text-ink">Common cybersecurity pressures</h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Themes we see repeatedly in this sector. Your engagement is scoped to the ones
              that matter for your organization.
            </p>
            <div className="mt-6">
              <CheckList items={industry.pressures} />
            </div>
          </Reveal>
          <div>
            <Reveal as="h2" className="text-2xl text-ink">
              Services that most often apply
            </Reveal>
            <Stagger className="mt-6 space-y-4">
              {relevant.map((s) => (
                <StaggerItem key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative flex gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-line-strong hover:bg-[#fdfcfa]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                    />
                    <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-obsidian text-chalk transition-colors group-hover:bg-accent">
                      <ServiceIcon slug={s.slug} className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">{s.summary}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-ink">
                        Learn more
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
          </div>
        </div>
      </Section>

      <Section tone="mist" divide>
        <Reveal as="h2" className="text-2xl text-ink">
          Other industries
        </Reveal>
        <Stagger className="mt-6 flex flex-wrap gap-3">
          {industries
            .filter((i) => i.slug !== industry.slug)
            .map((i) => (
              <StaggerItem key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-ink-soft transition-colors hover:border-accent/50 hover:text-ink"
                >
                  {i.name}
                </Link>
              </StaggerItem>
            ))}
        </Stagger>
      </Section>

      <CtaBand />
    </>
  );
}
