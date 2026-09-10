import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.atlanticfortis.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/services", "/industries", "/how-we-work", "/contact"];
  const now = new Date();

  return [
    ...staticPaths.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${siteUrl}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...industries.map((i) => ({
      url: `${siteUrl}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
