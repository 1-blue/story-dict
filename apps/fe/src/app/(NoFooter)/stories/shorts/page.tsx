import type { Metadata, NextPage } from "next";
import { cache } from "react";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { openapi } from "#fe/apis";
import ShortStoryDetail from "./_components/ShortStoryDetail";

// 정적 생성 비활성화
export const dynamic = "force-dynamic";

const queryClient = getQueryClient();
const getShortsStories = cache(() => {
  return queryClient.fetchQuery(
    openapi.queryOptions("get", "/apis/v1/stories/shorts", {
      params: {
        query: { page: 1, limit: 1 },
      },
    }),
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

const Page: NextPage = () => {
  return <ShortStoryDetail />;
};

export default Page;
