"use client";

import { trpc } from "#fe/libs/trpc";
import { useEffect, useState } from "react";
import PostCarousel from "./PostCarousel";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "#be/apis/v0/trpc/trpc.router";

const PostCarouselWrapper: React.FC = () => {
  const [existingIds, setExistingIds] = useState<string[]>([]);
  const { data, refetch } = trpc.posts.getRandom.useQuery({
    existingIds: existingIds.join(","),
  });

  const [posts, setPosts] = useState<
    inferRouterOutputs<AppRouter>["posts"]["getRandom"]
  >([]);

  useEffect(() => {
    if (!data) return;

    setPosts((prev) => [...prev, ...data]);
  }, [data]);

  return (
    <PostCarousel
      posts={posts}
      randomPostRefatch={refetch}
      setExistingIds={setExistingIds}
    />
  );
};

export default PostCarouselWrapper;
