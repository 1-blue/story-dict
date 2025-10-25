import type { Metadata, NextPage } from "next";
import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { openapi } from "#fe/apis";
import { getQueryClient } from "#fe/libs/getQueryClient";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

import StoryDetail from "#fe/app/(All)/stories/[title]/_components/StoryDetail";

export const revalidate = 1800;
export const dynamicParams = true;
export const generateStaticParams = async () => [];

interface IProps {
  params: Promise<{
    title: string;
  }>;
}

const queryClient = getQueryClient();
const getOneByTitle = cache(({ title }: { title: string }) => {
  return queryClient.fetchQuery(
    openapi.queryOptions("get", "/apis/v1/stories/title/{title}", {
      params: { path: { title } },
    }),
  );
});

export const generateMetadata = async ({
  params,
}: IProps): Promise<Metadata> => {
  const { title } = await params;
  const { payload: story } = await getOneByTitle({ title });

  return getSharedMetadata({
    title: story.title,
    description: story.summary.replace(/\n/g, " "),
    keywords: [story.title],
    ...(story.thumbnailPath && { images: [story.thumbnailPath] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  const { title } = await params;
  await getOneByTitle({ title });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryDetail storyTitle={title} />
    </HydrationBoundary>
  );
};

export default Page;
