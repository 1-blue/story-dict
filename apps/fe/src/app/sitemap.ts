import { MetadataRoute } from "next";

import { NAV_ROUTES } from "#fe/constants";
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

// 동적으로 사이트맵 생성
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hasValidSitemap = (route: IRoute): route is Required<IRoute> =>
    !!route.sitemap;

  // 정적 라우트 생성
  const routes = [
    ...generateSitemap(NAV_ROUTES.main.filter(hasValidSitemap)),
    ...generateSitemap(NAV_ROUTES.auth.filter(hasValidSitemap)),
  ];

  try {
    const { payload: posts } = await getAllPostAPI();
    const postRoutes = posts.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/posts/${post.title}`,
      lastModified: new Date(post.updatedAt),
    }));

    return [...routes, ...postRoutes];
  } catch (error) {
    console.error("🚫 사이트맵 생성 실패 >> ", error);
    return routes;
  }
}
