import type { Metadata, NextPage } from "next";
import { PostCategory } from "#be/types";
import CategoryPosts from "./_components/CategoryPosts";
import { postCategoryToKoreanMap } from "#fe/libs/mappings";
import { redirect } from "next/navigation";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { getAllCategoryPostAPI } from "#fe/apis";

interface IProps {
  params: {
    category: PostCategory;
  };
}

export const generateMetadata = async ({
  params: { category },
}: IProps): Promise<Metadata> => {
  const posts = await getAllCategoryPostAPI({ params: { category } });
  const post = posts[0];

  return getSharedMetadata({
    title: `${postCategoryToKoreanMap[category]} 게시글`,
    description: post?.summary.replace(/\n/g, " ") ?? "",
    ...(post?.thumbnail && { images: [post.thumbnail.url] }),
  });
};

const Page: NextPage<IProps> = ({ params: { category } }) => {
  if (!Object.keys(postCategoryToKoreanMap).includes(category)) {
    return redirect("/post/category");
  }

  return <CategoryPosts category={category} />;
};

export default Page;
