import { cache } from "react";
import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { apis } from "#fe/apis";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import LatestStories from "#fe/app/stories/(list)/_components/LatestStories";

export const revalidate = 0;

const queryClient = getQueryClient();
const getAllstories = cache(() =>
  queryClient.fetchQuery({
    queryKey: apis.stories.getAll.key(),
    queryFn: () => apis.stories.getAll.fn(),
  }),
);

export const generateMetadata = async (): Promise<Metadata> => {
  const { payload: stories } = await getAllstories();
  // 커스텀 타입 가드 사용하면 가독성이 더 안좋아져서 (아래에서)타입 단언 사용
  const hasThumbnailPost = stories.find((post) => !!post.thumbnailPath);

  return getSharedMetadata({
    title: "이야기 일지",
    keywords: stories.map((post) => post.title),
    ...(hasThumbnailPost && {
      images: [hasThumbnailPost.thumbnailPath!],
    }),
  });
};

const Page: React.FC = () => {
  getAllstories();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LatestStories />
    </HydrationBoundary>
  );
};

export default Page;
