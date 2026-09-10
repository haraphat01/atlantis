import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { company } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.atlanticfortis.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.legalName} — Independent Cybersecurity Advisory`,
    template: `%s — ${company.name}`,
  },
  description: company.descriptionShort,
  applicationName: company.name,
  openGraph: {
    type: "website",
    siteName: company.legalName,
    title: `${company.legalName} — Independent Cybersecurity Advisory`,
    description: company.descriptionShort,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.legalName} — Independent Cybersecurity Advisory`,
    description: company.descriptionShort,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-obsidian focus:px-4 focus:py-2 focus:text-chalk"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1 pt-16">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
