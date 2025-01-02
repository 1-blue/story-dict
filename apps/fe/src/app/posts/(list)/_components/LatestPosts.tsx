"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { apis } from "#fe/apis";
import PostCard from "#fe/components/PostCard";

const LatestPosts: React.FC = () => {
  const { data: posts } = useSuspenseQuery({
    queryKey: apis.posts.getAll.key(),
    queryFn: apis.posts.getAll.fn,
    select: (data) => data.payload,
  });

  return (
    <article>
      <ul className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </article>
  );
};

export default LatestPosts;
