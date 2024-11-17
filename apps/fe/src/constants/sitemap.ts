import type { ISitemap } from "#fe/types";

export const DEFAULT_SITEMAP: ISitemap = {
  priority: 1,
  lastmod: new Date().toISOString(),
  changefreq: "daily",
};
