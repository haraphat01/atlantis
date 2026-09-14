import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/button";
import { company, primaryNav, primaryCta } from "@/lib/site";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-dark text-chalk-soft">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-teal"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-accent/10 blur-[110px]"
      />
      <Container className="relative py-20">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2.5 text-chalk">
              <Logo className="h-8 w-8" />
              <span className="text-lg font-semibold">{company.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-2xl leading-tight tracking-tight text-chalk sm:text-3xl">
              Let&apos;s talk about your cyber risk.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href} size="lg" variant="onDark" withArrow>
              {primaryCta.label}
            </ButtonLink>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm font-medium text-chalk transition-colors hover:border-white/45 hover:bg-white/[0.06]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {company.email}
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <p className="max-w-xs text-sm leading-6 text-chalk-faint">
            {company.descriptionShort}
          </p>

          <nav aria-label="Services">
            <h2 className="mark-label text-chalk-faint">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-chalk-soft transition-colors hover:text-chalk"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <h2 className="mark-label text-chalk-faint">Industries</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/industries/${i.slug}`}
                    className="text-chalk-soft transition-colors hover:text-chalk"
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="mark-label text-chalk-faint">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {primaryNav
                .filter((l) => l.href !== "/services" && l.href !== "/industries")
                .map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-chalk-soft transition-colors hover:text-chalk"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-1 text-chalk-soft transition-colors hover:text-chalk"
                >
                  {company.email}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-chalk-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.legalName} All rights reserved.
          </p>
          <p className="max-w-xl sm:text-right">
            Atlantic Fortis provides advisory and assurance services. It does not issue
            certifications where an accredited body or independent attestation provider is
            required.
          </p>
        </div>
      </Container>
    </footer>
  );
}
