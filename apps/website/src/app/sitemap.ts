import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shiny-crisp-0a25e3.netlify.app";

const routes = [
  "",
  "/ordering",
  "/reservations",
  "/analytics",
  "/pricing",
  "/demo",
  "/about",
  "/contact",
  "/cookies",
  "/hospitality",
  "/terms",
  "/privacy",
  "/data-processing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
