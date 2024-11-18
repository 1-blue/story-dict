import { cache } from "react";
import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { apis } from "#fe/apis";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import LatestPosts from "#fe/app/post/(list)/_components/LatestPosts";

// TODO: 미래에 ISR로 변경하기
export const dynamic = "force-dynamic";

const queryClient = getQueryClient();
const getAllPosts = cache(() =>
  queryClient.fetchQuery({
    queryKey: apis.posts.getAll.key(),
    queryFn: () => apis.posts.getAll.fn(),
  }),
);

export const generateMetadata = async (): Promise<Metadata> => {
  const posts = await getAllPosts();
  // 커스텀 타입 가드 사용하면 가독성이 더 안좋아져서 (아래에서)타입 단언 사용
  const hasThumbnailPost = posts.find((post) => !!post.thumbnail);

  return getSharedMetadata({
    title: "이야기 일지",
    keywords: posts.map((post) => post.title),
    ...(hasThumbnailPost && {
      images: [hasThumbnailPost.thumbnail!.url],
    }),
  });
};

const Page: React.FC = () => {
  getAllPosts();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6">
        <LatestPosts />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
