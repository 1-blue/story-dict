import { cache } from "react";
import type { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { StoryCategory } from "@sd/db";
import { storyCategoryToKoreanMap } from "@sd/utils";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { apis } from "#fe/apis";
import { CATEGORIES } from "#fe/constants";
import CategoryStories from "#fe/app/stories/category/[category]/_components/CategoryStories";
import { getQueryClient } from "#fe/libs/getQueryClient";

interface IProps {
  params: {
    category: StoryCategory;
  };
}

export const revalidate = 60 * 30;

const queryClient = getQueryClient();
const getManyCategoryStory = cache(({ params }: IProps) =>
  queryClient.fetchQuery({
    queryKey: apis.stories.getManyCategory.key({ params }),
    queryFn: () => apis.stories.getManyCategory.fn({ params }),
  }),
);

export const generateMetadata = async ({
  params,
}: IProps): Promise<Metadata> => {
  const { payload: stories } = await getManyCategoryStory({ params });
  const post = stories[0];

  if (!post) {
    return getSharedMetadata({
      title: `${storyCategoryToKoreanMap[params.category]} 게시글`,
    });
  }

  return getSharedMetadata({
    title: `${storyCategoryToKoreanMap[params.category]} 게시글`,
    description: `[${params.category}] ${post.title}: ${post.summary.replace(/\n/g, " ")}`,
    keywords: [params.category, ...stories.map((post) => post.title)],
    ...(post.thumbnailPath && { images: [post.thumbnailPath] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  if (!Object.keys(storyCategoryToKoreanMap).includes(params.category)) {
    return redirect(`/post/category/${CATEGORIES[0]?.value}`);
  }

  await getManyCategoryStory({ params });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryStories category={params.category} />
    </HydrationBoundary>
  );
};

export default Page;
