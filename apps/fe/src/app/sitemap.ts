import { MetadataRoute } from "next";

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

// 동적으로 사이트맵 생성
export const revalidate = 60 * 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 정적 라우트는 항상 포함
  const routes = [
    ...generateSitemap(
      ROUTES.post.filter((route): route is Required<IRoute> => !!route.sitemap),
    ),
    ...generateSitemap(
      ROUTES.auth.filter((route): route is Required<IRoute> => !!route.sitemap),
    ),
  ];

  try {
    const posts = await getAllPostAPI();
    const postRoutes = posts.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/posts/${post.title}`,
      lastModified: new Date(post.updatedAt),
    }));

    return [...routes, ...postRoutes];
  } catch (error) {
    // API 호출 실패시 정적 라우트만 반환 ( 빌드 시 서버가 안켜져 있어서 실패하기 때문에 처리해줌 )
    console.error("🚫 사이트맵 생성 실패 >> ", error);
    return routes;
  }
}
