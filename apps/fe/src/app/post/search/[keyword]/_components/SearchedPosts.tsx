"use client";

import { useQuery } from "@tanstack/react-query";

import { apis } from "#fe/apis";
import PostCard from "#fe/components/PostCard";

interface SearchedPostsProps {
  keyword: string;
}

const SearchedPosts: React.FC<SearchedPostsProps> = ({ keyword }) => {
  const { data: posts } = useQuery({
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
