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

// 동적 사이트맵 생성을 위해 revalidate 옵션 추가
export const revalidate = 3600; // 1시간마다 재생성 (필요에 따라 조정 가능)

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
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/posts/${post.id}`,
      lastModified: new Date(post.updatedAt),
    }));

    return [...routes, ...postRoutes];
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
    return routes; // API 호출 실패시 정적 라우트만 반환
  }
}
