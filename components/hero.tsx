import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Kicker } from "@/components/primitives";
import { company, primaryCta } from "@/lib/site";

const headline = ["Understand risk.", "Prove controls.", "Build resilience."];

const marks = [
  { k: "01", label: "Independent", note: "No hardware or software sales model" },
  { k: "02", label: "Evidence-based", note: "Findings tied to business decisions" },
  { k: "03", label: "Virtual-first", note: "Hybrid where presence adds value" },
];

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden bg-obsidian pt-16 text-chalk">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-review.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_35%]"
        />
        <div className="absolute inset-0 bg-blueprint opacity-20 mix-blend-overlay" />
        {/* Scrim: keep the left column readable, let the photograph show at right */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-obsidian)_0%,var(--color-obsidian)_36%,color-mix(in_oklab,var(--color-obsidian)_62%,transparent)_60%,color-mix(in_oklab,var(--color-obsidian)_28%,transparent)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-obsidian" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-obsidian/80 to-transparent" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20">
          <div className="rise">
            <Kicker onDark>Independent B2B cybersecurity advisory</Kicker>
          </div>

          <h1 className="mt-8 max-w-4xl text-[2.9rem] leading-[1.02] tracking-[-0.02em] text-chalk sm:text-[4.25rem] lg:text-[5rem]">
            {headline.map((line, i) => (
              <span
                key={line}
                className="rise block"
                style={{ animationDelay: `${0.08 + i * 0.09}s` }}
              >
                {i === 2 ? <span className="italic text-signal">{line}</span> : line}
              </span>
            ))}
          </h1>

          <p
            className="rise mt-8 max-w-2xl text-lg leading-8 text-chalk-soft"
            style={{ animationDelay: "0.42s" }}
          >
            {company.name} helps organizations strengthen governance and controls, meet
            regulatory and assurance requirements, improve operational resilience, and build
            sustainable security programs — with advice that is independent, evidence-based,
            and tied to the decisions your management team has to make.
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.52s" }}
          >
            <ButtonLink href={primaryCta.href} size="lg" variant="onDark" withArrow>
              {primaryCta.label}
            </ButtonLink>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2.5 px-1 py-2 text-sm font-medium text-chalk-soft transition-colors hover:text-chalk"
            >
              Explore our services
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-white/50">
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>

          <dl
            className="rise mt-16 grid max-w-3xl gap-px overflow-hidden border border-obsidian-line bg-obsidian-line sm:grid-cols-3"
            style={{ animationDelay: "0.66s" }}
          >
            {marks.map((m) => (
              <div key={m.k} className="bg-obsidian p-5">
                <span className="kicker text-signal">{m.k}</span>
                <dt className="mt-2 text-sm font-semibold text-chalk">{m.label}</dt>
                <dd className="mt-1 text-[0.8125rem] leading-5 text-chalk-faint">{m.note}</dd>
              </div>
            ))}
          </dl>

          <p
            className="rise mt-10 text-[0.8125rem] text-chalk-faint"
            style={{ animationDelay: "0.8s" }}
          >
            {company.regions}
          </p>
        </div>
      </Container>
    </section>
  );
}
