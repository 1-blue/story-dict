"use client";

import { trpc } from "#fe/libs/trpc";
import PostCard from "#fe/components/PostCard";

interface SearchedPostsProps {
  keyword: string;
}

const SearchedPosts: React.FC<SearchedPostsProps> = ({ keyword }) => {
  const { data: posts } = trpc.posts.getKeyword.useQuery({ keyword });

  return (
    <article>
      <ul className="flex flex-wrap gap-4">
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </ul>
    </article>
  );
};

export default SearchedPosts;
