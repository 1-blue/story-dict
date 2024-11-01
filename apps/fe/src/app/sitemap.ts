import type { MetadataRoute } from "next";

import { ROUTES } from "#fe/constants";
import type { IRoute } from "#fe/types";
import { getAllPostAPI } from "#fe/apis";

/** 재귀적으로 돌아서 `sitemap` 생성 */
const generateSitemap = (routes: IRoute[]): MetadataRoute.Sitemap => {
  return routes.flatMap(({ path, sitemap, subRoutes }) => [
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${path}`,
      priority: sitemap?.priority,
      lastModified: sitemap?.lastmod,
      changeFrequency: sitemap?.changefreq,
    },
    ...(subRoutes ? generateSitemap(subRoutes) : []), // 하위 경로에 대해 재귀 호출
  ]);
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostAPI();

  return [
    ...generateSitemap(
      ROUTES.post.filter((route): route is Required<IRoute> => !!route.sitemap),
    ),
    ...generateSitemap(
      ROUTES.auth.filter((route): route is Required<IRoute> => !!route.sitemap),
    ),
    ...posts.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/post/${post.id}`,
      priority: 0.8,
      lastModified: new Date(post.updatedAt).toISOString(),
      changeFrequency: "daily" as const,
    })),
  ];
}
