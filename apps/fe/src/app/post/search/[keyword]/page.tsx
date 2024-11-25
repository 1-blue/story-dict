import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { NextPage } from "next";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { apis } from "#fe/apis";

import SearchedPosts from "#fe/app/post/search/[keyword]/_components/SearchedPosts";

interface IProps {
  params: {
    keyword: string;
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 60 * 30;

const queryClient = getQueryClient();
const getSearchedPosts = cache(({ params }: IProps) =>
  queryClient.fetchQuery({
    queryKey: apis.posts.getManyKeyword.key({ params }),
    queryFn: () => apis.posts.getManyKeyword.fn({ params }),
  }),
);

export const generateMetadata = async ({ params }: IProps) => {
  const posts = await getSearchedPosts({ params });
  const post = posts[0];
  // 커스텀 타입 가드 사용하면 가독성이 더 안좋아져서 (아래에서)타입 단언 사용
  const hasThumbnailPost = posts.find((post) => !!post.thumbnail);

  const decodedKeyword = decodeURIComponent(params.keyword);

  if (!post) return getSharedMetadata({ title: `${decodedKeyword} (게시글)` });

  return getSharedMetadata({
    title: `${decodedKeyword} (게시글)`,
    description: `[${decodedKeyword}] ${post.title}: ${post.summary}`,
    ...(hasThumbnailPost && { images: [hasThumbnailPost.thumbnail!.url] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  await getSearchedPosts({ params });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchedPosts keyword={decodeURIComponent(params.keyword)} />
    </HydrationBoundary>
  );
};

export default Page;
