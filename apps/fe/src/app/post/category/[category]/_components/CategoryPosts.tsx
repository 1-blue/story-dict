"use client";

import { PostCategory } from "#be/types";
import PostCard from "#fe/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import CategoryForm from "../../_components/CategoryForm";
import { apis } from "#fe/apis";

interface IProps {
  category: PostCategory;
}

const CategoryPosts: React.FC<IProps> = ({ category }) => {
  const { data: posts } = useQuery({
    queryKey: apis.posts.getAllCategory.key({ params: { category } }),
    queryFn: () => apis.posts.getAllCategory.fn({ params: { category } }),
  });

  return (
    <article className="flex flex-col gap-4">
      <CategoryForm defaultCategory={category} />

      <ul className="flex flex-wrap gap-4">
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </ul>
    </article>
  );
};

export default CategoryPosts;
