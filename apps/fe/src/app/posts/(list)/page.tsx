import { cache } from "react";
import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { apis } from "#fe/apis";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import LatestPosts from "#fe/app/posts/(list)/_components/LatestPosts";

export const revalidate = 0;

const queryClient = getQueryClient();
const getAllPosts = cache(() =>
  queryClient.fetchQuery({
    queryKey: apis.posts.getAll.key(),
    queryFn: () => apis.posts.getAll.fn(),
  }),
);

export const generateMetadata = async (): Promise<Metadata> => {
  const { payload: posts } = await getAllPosts();
  // 커스텀 타입 가드 사용하면 가독성이 더 안좋아져서 (아래에서)타입 단언 사용
  const hasThumbnailPost = posts.find((post) => !!post.thumbnailPath);

  return getSharedMetadata({
    title: "이야기 일지",
    keywords: posts.map((post) => post.title),
    ...(hasThumbnailPost && {
      images: [hasThumbnailPost.thumbnailPath!],
    }),
  });
};

const Page: React.FC = () => {
  getAllPosts();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LatestPosts />
    </HydrationBoundary>
  );
};

export default Page;
