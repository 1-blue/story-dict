"use client";

import { trpc } from "#fe/libs/trpc";
import PostCard from "#fe/components/PostCard";

const LatestPosts: React.FC = () => {
  const { data: posts } = trpc.posts.getMany.useQuery();

  return (
    <article>
      <ul className="flex flex-wrap gap-4">
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </ul>
    </article>
  );
};

export default LatestPosts;
