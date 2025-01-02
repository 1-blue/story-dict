import type { Metadata, NextPage } from "next";
import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { apis } from "#fe/apis";
import PostCarouselWrapper from "#fe/app/posts/random/_components/PostCarouselWrapper";

// FIXME: 리팩토링하기
export const dynamic = "force-dynamic";

const queryClient = getQueryClient();
const getRandomPosts = cache(() =>
  queryClient.fetchQuery({
    queryKey: apis.posts.getManyRandom.key({ queries: { existingIds: "" } }),
    queryFn: () =>
      apis.posts.getManyRandom.fn({ queries: { existingIds: "" } }),
  }),
);

export const generateMetadata = async (): Promise<Metadata> => {
  const { payload: posts } = await getRandomPosts();
  const post = posts[0];
  // 커스텀 타입 가드 사용하면 가독성이 더 안좋아져서 (아래에서)타입 단언 사용
  const hasThumbnailPost = posts.find((post) => !!post.thumbnail);

  if (!post) return getSharedMetadata({ title: "랜덤 게시글" });

  return getSharedMetadata({
    title: "랜덤 게시글",
    description: `[랜덤] ${post.title}: ${post.summary}`,
    ...(hasThumbnailPost && { images: [hasThumbnailPost.thumbnail!.url] }),
  });
};

const Page: NextPage = async () => {
  await getRandomPosts();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostCarouselWrapper />
    </HydrationBoundary>
  );
};

export default Page;
