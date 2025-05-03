import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { NextPage } from "next";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { $tempAPI } from "#fe/openapis";

import SearchedStories from "#fe/app/stories/search/[keyword]/_components/SearchedStories";

interface IProps {
  params: {
    keyword: string;
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 60 * 30;

const queryClient = getQueryClient();
const getSearchedStories = cache(({ params }: IProps) => {
  return queryClient.fetchQuery(
    $tempAPI.queryOptions("get", "/apis/v1/stories/search/{keyword}", {
      params: { path: { keyword: params.keyword } },
    }),
  );
});

export const generateMetadata = async ({ params }: IProps) => {
  const { payload: stories } = await getSearchedStories({ params });
  const post = stories[0];
  // 커스텀 타입 가드 사용하면 가독성이 더 안좋아져서 (아래에서)타입 단언 사용
  const hasThumbnailPost = stories.find((post) => !!post.thumbnailPath);

  const decodedKeyword = decodeURIComponent(params.keyword);

  if (!post) return getSharedMetadata({ title: `${decodedKeyword} (이야기)` });

  return getSharedMetadata({
    title: `${decodedKeyword} (이야기)`,
    description: `[${decodedKeyword}] ${post.title}: ${post.summary}`,
    ...(hasThumbnailPost && { images: [hasThumbnailPost.thumbnailPath!] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  await getSearchedStories({ params });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchedStories keyword={decodeURIComponent(params.keyword)} />
    </HydrationBoundary>
  );
};

export default Page;
