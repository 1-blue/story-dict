"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { apis } from "#fe/apis";
import PostCard from "#fe/components/PostCard";

interface IProps {
  keyword: string;
}

const SearchedPosts: React.FC<IProps> = ({ keyword }) => {
  const { data: posts } = useSuspenseQuery({
    queryKey: apis.posts.getManyKeyword.key({ params: { keyword } }),
    queryFn: () => apis.posts.getManyKeyword.fn({ params: { keyword } }),
  });

  return (
    <article>
      <ul className="flex flex-wrap gap-4">
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </ul>
    </article>
  );
};

export default SearchedPosts;
