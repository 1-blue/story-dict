import { cache } from "react";
import type { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { StoryCategory } from "@sd/db";
import { storyCategoryToKoreanMap } from "@sd/utils";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { openapi } from "#fe/apis";
import { CATEGORIES, routes } from "#fe/constants";
import CategoryStories from "#fe/app/(All)/stories/category/[category]/_components/CategoryStories";
import { getQueryClient } from "#fe/libs/getQueryClient";

interface IProps {
  params: Promise<{
    category: StoryCategory;
  }>;
}

export const revalidate = 1800;

const queryClient = getQueryClient();
const getManyCategoryStory = cache(
  ({ category }: { category: StoryCategory }) => {
    return queryClient.fetchQuery(
      openapi.queryOptions("get", "/apis/v1/stories/category/{category}", {
        params: { path: { category } },
      }),
    );
  },
);

export const generateMetadata = async ({
  params,
}: IProps): Promise<Metadata> => {
  const { category } = await params;
  const { payload: stories } = await getManyCategoryStory({ category });
  const post = stories[0];

  if (!post) {
    return getSharedMetadata({
      title: `${storyCategoryToKoreanMap[category]} 이야기`,
    });
  }

  return getSharedMetadata({
    title: `${storyCategoryToKoreanMap[category]} 이야기`,
    description: `[${category}] ${post.title}: ${post.summary.replace(/\n/g, " ")}`,
    keywords: [category, ...stories.map((post) => post.title)],
    ...(post.thumbnailPath && { images: [post.thumbnailPath] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  const { category } = await params;

  if (!Object.keys(storyCategoryToKoreanMap).includes(category)) {
    return redirect(routes.story.category.detail.url(CATEGORIES[0]!.value));
  }

  await getManyCategoryStory({ category });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryStories category={category} />
    </HydrationBoundary>
  );
};

export default Page;
