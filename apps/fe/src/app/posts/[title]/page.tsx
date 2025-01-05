import type { Metadata, NextPage } from "next";
import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { apis } from "#fe/apis";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

import PostDetail from "#fe/app/posts/[title]/_components/PostDetail";

export const revalidate = 60 * 30;
export const dynamicParams = true;
export const generateStaticParams = async () => [];

interface IProps {
  params: {
    title: string;
  };
}

const queryClient = getQueryClient();
const getOneByTitle = cache(({ params }: IProps) =>
  queryClient.fetchQuery({
    queryKey: apis.posts.getOneByTitle.key({ params }),
    queryFn: () => apis.posts.getOneByTitle.fn({ params }),
  }),
);

export const generateMetadata = async ({
  params,
}: IProps): Promise<Metadata> => {
  const { payload: post } = await getOneByTitle({ params });

  return getSharedMetadata({
    title: post.title,
    description: post.summary.replace(/\n/g, " "),
    keywords: [post.title],
    ...(post.thumbnailPath && { images: [post.thumbnailPath] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  await getOneByTitle({ params });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail postTitle={params.title} />
    </HydrationBoundary>
  );
};

export default Page;
