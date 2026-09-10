import type { Metadata } from "next";
import { Mail, CalendarClock, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { Kicker } from "@/components/primitives";
import { Reveal } from "@/components/motion";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/lib/site";
import { interestOptions } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description:
    "Start a discovery conversation with an Atlantic Fortis advisor. Tell us what's prompting the review and we'll connect it to the right engagement.",
};

const facts = [
  {
    icon: CalendarClock,
    title: "What happens next",
    body: "An advisor reviews your enquiry and follows up to arrange a discovery call. We then define scope and approach before issuing any proposal.",
  },
  {
    icon: Mail,
    title: "Prefer email?",
    body: `Write to ${company.email}.`,
  },
  {
    icon: MapPin,
    title: "Coverage",
    body: company.regions,
  },
];

export default async function ContactPage(props: PageProps<"/contact">) {
  const sp = await props.searchParams;
  const raw = Array.isArray(sp.interest) ? sp.interest[0] : sp.interest;
  const defaultInterest =
    raw && (interestOptions as readonly string[]).includes(raw) ? raw : undefined;

  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-ledger mask-fade-b opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(47,104,240,0.12),transparent_70%)] blur-2xl"
      />
      <Container className="relative py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <Reveal>
            <Kicker>Contact</Kicker>
            <h1 className="mt-5 text-[2.4rem] leading-[1.06] sm:text-5xl">
              Request a consultation
            </h1>
            <p className="mt-6 text-lg leading-8 text-ink-soft">
              The goal of this first step is a short discovery conversation — not a long
              questionnaire. A sentence or two about your situation is enough for us to
              prepare.
            </p>

            <dl className="mt-10 space-y-6">
              {facts.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-surface text-accent-ink shadow-[0_2px_8px_rgba(20,33,46,0.06)] ring-1 ring-line">
                    <f.icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                  </span>
                  <div>
                    <dt className="text-sm font-semibold text-ink">{f.title}</dt>
                    <dd className="mt-1 text-sm leading-6 text-ink-soft">
                      {f.title === "Prefer email?" ? (
                        <>
                          Write to{" "}
                          <a
                            className="font-medium text-accent-ink hover:underline"
                            href={`mailto:${company.email}`}
                          >
                            {company.email}
                          </a>
                          .
                        </>
                      ) : (
                        f.body
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-[1.5rem] border border-line bg-surface p-6 shadow-[0_24px_60px_-24px_rgba(20,33,46,0.2)] sm:p-9"
          >
            <ContactForm defaultInterest={defaultInterest} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
