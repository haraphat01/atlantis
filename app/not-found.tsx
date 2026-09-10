import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Kicker } from "@/components/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <Kicker>Error 404</Kicker>
      <h1 className="mt-5 text-4xl sm:text-5xl">This page could not be found</h1>
      <p className="mt-4 max-w-lg text-[1.0625rem] leading-7 text-ink-soft">
        The page may have moved or never existed. Head back to the homepage or explore our
        services.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/" size="lg" withArrow>
          Back to home
        </ButtonLink>
        <ButtonLink href="/services" size="lg" variant="secondary">
          Explore services
        </ButtonLink>
      </div>
    </Container>
  );
}
