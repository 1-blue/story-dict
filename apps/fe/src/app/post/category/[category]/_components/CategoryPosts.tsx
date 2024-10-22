"use client";

import { PostCategory } from "#be/types";
import PostCard from "#fe/components/PostCard";
import { trpc } from "#fe/libs/trpc";
import CategoryForm from "../../_components/CategoryForm";

interface IProps {
  category: PostCategory;
}

const CategoryPosts: React.FC<IProps> = ({ category }) => {
  const { data: posts } = trpc.posts.getCategory.useQuery({
    category,
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
