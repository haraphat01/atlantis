# Atlantic Fortis website

Marketing and lead-generation site for **Atlantic Fortis Inc.**, an independent B2B
cybersecurity advisory firm. Built with Next.js 16 (App Router, Turbopack) and
Tailwind CSS v4.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

Open http://localhost:3000.

## Structure

| Path | Purpose |
| --- | --- |
| `app/` | Routes. Home, `about`, `services` (+ `[slug]`), `industries` (+ `[slug]`), `how-we-work`, `contact`. |
| `app/actions.ts` | `submitConsultation` server action for the contact form. |
| `components/` | Shared UI — header, footer, buttons, section primitives, contact form. |
| `lib/site.ts` | Company facts, navigation, differentiators, client problems, engagement steps, frameworks. |
| `lib/services.ts` | The seven service categories (single source of truth for pages + nav + footer). |
| `lib/industries.ts` | The nine industry sections. |
| `lib/about.ts` | Approved About Us content, mission, vision, operating principles. |
| `lib/contact.ts` | Form field options and validation. |
| `lib/email.ts` | Hostinger Email API client used by the contact server action. |

Content is data-driven: edit the files in `lib/` and every page, the nav dropdown,
the footer, and the sitemap update together.

## Contact form email delivery

The consultation form posts to a server action that sends the enquiry through the
Hostinger Email API. Until the three required environment variables are set
(`HOSTINGER_EMAIL_TOKEN`, `HOSTINGER_MAILBOX_RESOURCE_ID`, `CONTACT_TO_EMAIL`),
submissions are accepted and written to the server console instead of emailed. See
`.env.example`.

## Notes

- Insights / Resources is intentionally not built yet.
- Team bios, testimonials, and case studies have placeholder structure on the About
  page and should only be published once approved / permitted.
- Atlantic Fortis provides advisory and assurance services; the copy never implies
  it issues certifications where an accredited body is required.

## Checks

```bash
npm run build      # production build (also typechecks)
npx eslint .       # lint
```
# atlantis
