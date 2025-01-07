import { cache } from "react";
import type { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { PostCategory } from "@sd/db";
import { postCategoryToKoreanMap } from "@sd/utils";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { apis } from "#fe/apis";
import { CATEGORIES } from "#fe/constants";
import CategoryPosts from "#fe/app/posts/category/[category]/_components/CategoryPosts";
import { getQueryClient } from "#fe/libs/getQueryClient";

interface IProps {
  params: {
    category: PostCategory;
  };
}

export const revalidate = 60 * 30;

const queryClient = getQueryClient();
const getManyCategoryPost = cache(({ params }: IProps) =>
  queryClient.fetchQuery({
    queryKey: apis.posts.getManyCategory.key({ params }),
    queryFn: () => apis.posts.getManyCategory.fn({ params }),
  }),
);

export const generateMetadata = async ({
  params,
}: IProps): Promise<Metadata> => {
  const { payload: posts } = await getManyCategoryPost({ params });
  const post = posts[0];

  if (!post) {
    return getSharedMetadata({
      title: `${postCategoryToKoreanMap[params.category]} 게시글`,
    });
  }

  return getSharedMetadata({
    title: `${postCategoryToKoreanMap[params.category]} 게시글`,
    description: `[${params.category}] ${post.title}: ${post.summary.replace(/\n/g, " ")}`,
    keywords: [params.category, ...posts.map((post) => post.title)],
    ...(post.thumbnailPath && { images: [post.thumbnailPath] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  if (!Object.keys(postCategoryToKoreanMap).includes(params.category)) {
    return redirect(`/post/category/${CATEGORIES[0]?.value}`);
  }

  await getManyCategoryPost({ params });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryPosts category={params.category} />
    </HydrationBoundary>
  );
};

export default Page;
