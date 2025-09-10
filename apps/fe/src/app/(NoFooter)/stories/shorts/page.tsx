import type { Metadata, NextPage } from "next";
import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { openapi } from "#fe/apis";
import ShortsScrollContainer from "./_components/ShortsScrollContainer";

const queryClient = getQueryClient();
const getShortsStories = cache(() => {
  return queryClient.fetchQuery(
    openapi.queryOptions("get", "/apis/v1/stories/shorts"),
  );
});

export const generateMetadata = async (): Promise<Metadata> => {
  const { payload: stories } = await getShortsStories();
  const post = stories[0];
  const hasThumbnailStory = stories.find((post) => !!post.thumbnailPath);

  if (!post) return getSharedMetadata({ title: "쇼츠 이야기" });

  return getSharedMetadata({
    title: "쇼츠 이야기",
    description: `[쇼츠] ${post.title}: ${post.summary}`,
    ...(hasThumbnailStory && { images: [hasThumbnailStory.thumbnailPath!] }),
  });
};

const Page: NextPage = async () => {
  const { payload: stories } = await getShortsStories();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShortsScrollContainer stories={stories} />
    </HydrationBoundary>
  );
};

export default Page;
