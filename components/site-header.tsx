"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { primaryNav, primaryCta, company } from "@/lib/site";
import { services } from "@/lib/services";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const onHome = pathname === "/";
  const overHero = onHome && !scrolled && !mobileOpen;

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    function onDown(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    function onScroll() {
      setServicesOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [servicesOpen]);

  // Prevent body scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkColor = overHero
    ? "text-chalk-soft hover:text-chalk hover:bg-white/[0.08]"
    : "text-ink-soft hover:text-ink hover:bg-ink/[0.05]";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-paper/85 backdrop-blur-xl",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-2.5"
          aria-label={`${company.name} home`}
        >
          <Logo className={cn("h-8 w-8", overHero ? "text-chalk" : "text-ink")} />
          <span
            className={cn(
              "font-serif text-lg font-medium tracking-tight transition-colors",
              overHero ? "text-chalk" : "text-ink",
            )}
          >
            {company.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setServicesOpen(false);
              }
            }}
          >
            <Link
              href="/services"
              className={cn(
                "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                linkColor,
                (servicesOpen || isActive("/services")) &&
                  (overHero ? "text-chalk" : "text-ink"),
              )}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={closeMenus}
              onFocus={() => setServicesOpen(true)}
            >
              Services
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  servicesOpen && "rotate-180",
                )}
                aria-hidden
              />
            </Link>
            {/* Explicit toggle for keyboard / touch users. */}
            <button
              type="button"
              className="sr-only"
              aria-label={servicesOpen ? "Hide services menu" : "Show services menu"}
              onClick={() => setServicesOpen((v) => !v)}
            />

            {/* Dropdown — always mounted, toggled with classes so it never
                depends on an animation library to become visible. */}
            <div
              className={cn(
                "absolute left-1/2 top-full w-[33rem] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-150 ease-out",
                servicesOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0",
              )}
            >
              <div
                className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-20px_rgba(20,33,46,0.28)]"
                onClick={closeMenus}
              >
                <Link
                  href="/services"
                  className="flex items-center justify-between rounded-xl bg-mist px-3.5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-line/60"
                >
                  All services overview
                  <ArrowRight className="h-4 w-4 text-accent-ink" aria-hidden />
                </Link>
                <div className="mt-1 grid grid-cols-2 gap-0.5">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="rounded-xl px-3.5 py-2.5 text-sm text-ink-soft transition-colors hover:bg-mist hover:text-ink"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {primaryNav
            .filter((l) => l.href !== "/services")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  linkColor,
                  isActive(link.href) && (overHero ? "text-chalk" : "text-ink"),
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3.5 -bottom-px h-0.5 rounded-full",
                      overHero ? "bg-chalk" : "bg-accent",
                    )}
                  />
                )}
              </Link>
            ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink
            href={primaryCta.href}
            size="sm"
            variant={overHero ? "onDark" : "primary"}
            withArrow
          >
            {primaryCta.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden",
            overHero ? "text-chalk hover:bg-white/10" : "text-ink hover:bg-ink/5",
          )}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <Container className="py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile" onClick={closeMenus}>
              <Link
                href="/services"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-mist"
              >
                Services overview
              </Link>
              <div className="mb-1 ml-3 flex flex-col border-l border-line pl-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-lg px-3 py-1.5 text-sm text-ink-soft hover:bg-mist"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
              {primaryNav
                .filter((l) => l.href !== "/services")
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-mist"
                  >
                    {link.label}
                  </Link>
                ))}
              <ButtonLink href={primaryCta.href} className="mt-3 w-full" size="lg" withArrow>
                {primaryCta.label}
              </ButtonLink>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
