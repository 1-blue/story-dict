import type { NextPage } from "next";
import { PostCategory } from "#be/types";
import CategoryPosts from "./_components/CategoryPosts";
import { postCategoryToKoreanMap } from "#fe/libs/mappings";
import { redirect } from "next/navigation";

interface IProps {
  params: {
    category: PostCategory;
  };
}

const Page: NextPage<IProps> = ({ params: { category } }) => {
  if (!Object.keys(postCategoryToKoreanMap).includes(category)) {
    return redirect("/post/category");
  }

  return <CategoryPosts category={category} />;
};

export default Page;
