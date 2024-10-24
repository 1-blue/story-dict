"use client";

import { useEffect, useState } from "react";
import PostCarousel from "./PostCarousel";
import { apis, GetManyRandomPostAPIResponse } from "#fe/apis";
import { useSuspenseQuery } from "@tanstack/react-query";

const PostCarouselWrapper: React.FC = () => {
  const [existingIds, setExistingIds] = useState<string[]>([]);
  const { data, refetch } = useSuspenseQuery({
    queryKey: apis.posts.getManyRandom.key({
      queries: { existingIds: existingIds.join(",") },
    }),
    queryFn: () =>
      apis.posts.getManyRandom.fn({
        queries: { existingIds: existingIds.join(",") },
      }),
  });

  const [posts, setPosts] = useState<GetManyRandomPostAPIResponse>([]);

  useEffect(() => setPosts((prev) => [...prev, ...data]), [data]);

  return (
    <PostCarousel
      posts={posts}
      randomPostRefatch={refetch}
      setExistingIds={setExistingIds}
    />
  );
};

export default PostCarouselWrapper;
