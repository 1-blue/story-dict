"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { PostCategory } from "#be/types";
import { apis } from "#fe/apis";
import PostCard from "#fe/components/PostCard";
import EmptyAlert from "#fe/components/EmptyAlert";
import CategoryForm from "#fe/app/post/category/_components/CategoryForm";

interface IProps {
  category: PostCategory;
}

const CategoryPosts: React.FC<IProps> = ({ category }) => {
  const { data: posts } = useSuspenseQuery({
    queryKey: apis.posts.getManyCategory.key({ params: { category } }),
    queryFn: () => apis.posts.getManyCategory.fn({ params: { category } }),
  });

  return (
    <article className="flex flex-col gap-4">
      <CategoryForm defaultCategory={category} />

      {posts.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <EmptyAlert
          title="게시글 없음"
          description="해당 카테고리의 게시글이 존재하지 않아요 🥲"
        />
      )}
    </article>
  );
};

export default CategoryPosts;
