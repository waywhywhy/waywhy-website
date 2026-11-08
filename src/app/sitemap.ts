import type { MetadataRoute } from "next";
import { DOCS } from "@/lib/docs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/features",
    "/download",
    "/docs",
    "/changelog",
    "/faq",
    "/about",
    "/privacy",
    "/security",
    "/licenses",
    "/contributing",
  ];
  return [...pages, ...DOCS.map((d) => `/docs/${d.slug}`)].map((p) => ({ url: `${site.url}${p}` }));
}
