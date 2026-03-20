import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { NextPage } from "next";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { openapi } from "#fe/apis";

import SearchedStories from "#fe/app/(All)/stories/search/[keyword]/_components/SearchedStories";

interface IProps {
  params: Promise<{ keyword: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30분

const queryClient = getQueryClient();
const getSearchedStories = cache((keyword: string) => {
  return queryClient.fetchQuery(
    openapi.queryOptions("get", "/apis/v1/stories/search/{keyword}", {
      params: { path: { keyword } },
    }),
  );
});

export const generateMetadata = async ({ params }: IProps) => {
  const { keyword } = await params;
  const { payload: stories } = await getSearchedStories(keyword);
  const post = stories[0];
  // 커스텀 타입 가드 사용하면 가독성이 더 안좋아져서 (아래에서)타입 단언 사용
  const hasThumbnailPost = stories.find((post) => !!post.thumbnailPath);

  const decodedKeyword = decodeURIComponent(keyword);

  if (!post) return getSharedMetadata({ title: `${decodedKeyword} (이야기)` });

  return getSharedMetadata({
    title: `${decodedKeyword} (이야기)`,
    description: `[${decodedKeyword}] ${post.title}: ${post.summary}`,
    ...(hasThumbnailPost && { images: [hasThumbnailPost.thumbnailPath!] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  const { keyword } = await params;
  await getSearchedStories(keyword);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchedStories keyword={decodeURIComponent(keyword)} />
    </HydrationBoundary>
  );
};

export default Page;
