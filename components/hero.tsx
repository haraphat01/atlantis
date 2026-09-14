import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Kicker } from "@/components/primitives";
import { GradientMesh, TrustScoreCard } from "@/components/graphics";
import { company, primaryCta } from "@/lib/site";

const headline = ["Understand risk.", "Prove controls.", "Build resilience."];

const marks = [
  "Independent — no hardware or software to sell",
  "Evidence-based findings",
  "Virtual-first delivery",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <GradientMesh />

      <Container className="relative">
        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <div className="rise">
              <Kicker>Independent B2B cybersecurity advisory</Kicker>
            </div>

            <h1 className="mt-6 max-w-xl text-[2.6rem] leading-[1.06] text-ink sm:text-[3.4rem]">
              {headline.map((line, i) => (
                <span
                  key={line}
                  className="rise block"
                  style={{ animationDelay: `${0.08 + i * 0.08}s` }}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="rise mt-7 max-w-md text-[1.0625rem] leading-7 text-ink-soft"
              style={{ animationDelay: "0.36s" }}
            >
              {company.name} helps organizations govern cyber risk, meet regulatory
              requirements, and build resilience — with advice that answers to no one
              but the client.
            </p>

            <div
              className="rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
              style={{ animationDelay: "0.46s" }}
            >
              <ButtonLink href={primaryCta.href} size="lg" withArrow>
                {primaryCta.label}
              </ButtonLink>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                Explore our services
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>

            <ul
              className="rise mt-14 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6 text-sm text-ink-faint"
              style={{ animationDelay: "0.56s" }}
            >
              {marks.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <TrustScoreCard className="mx-auto max-w-sm" />
          </div>
        </div>
      </Container>
    </section>
  );
}
