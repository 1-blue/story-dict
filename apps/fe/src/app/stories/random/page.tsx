import type { Metadata, NextPage } from "next";
import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { $tempAPI } from "#fe/openapis";
import StoryCarouselWrapper from "#fe/app/stories/random/_components/StoryCarouselWrapper";

// FIXME: 리팩토링하기
export const dynamic = "force-dynamic";

const queryClient = getQueryClient();
const getRandomstories = cache(() => {
  return queryClient.fetchQuery(
    $tempAPI.queryOptions("get", "/apis/v1/stories/random", {
      params: { query: { existingIds: "" } },
    }),
  );
});

export const generateMetadata = async (): Promise<Metadata> => {
  const { payload: stories } = await getRandomstories();
  const post = stories[0];
  // 커스텀 타입 가드 사용하면 가독성이 더 안좋아져서 (아래에서)타입 단언 사용
  const hasThumbnailStory = stories.find((post) => !!post.thumbnailPath);

  if (!post) return getSharedMetadata({ title: "랜덤 이야기" });

  return getSharedMetadata({
    title: "랜덤 이야기",
    description: `[랜덤] ${post.title}: ${post.summary}`,
    ...(hasThumbnailStory && { images: [hasThumbnailStory.thumbnailPath!] }),
  });
};

const Page: NextPage = async () => {
  await getRandomstories();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryCarouselWrapper />
    </HydrationBoundary>
  );
};

export default Page;
