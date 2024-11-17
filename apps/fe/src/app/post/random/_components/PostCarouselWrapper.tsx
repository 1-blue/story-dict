"use client";

import { useEffect, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { apis, TGetManyRandomPostAPIResponse } from "#fe/apis";
import PostCarousel from "#fe/app/post/random/_components/PostCarousel";

const PostCarouselWrapper: React.FC = () => {
  const [posts, setPosts] = useState<TGetManyRandomPostAPIResponse>([]);
  const existingIdsRef = useRef<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, refetch } = useSuspenseQuery({
    queryKey: apis.posts.getManyRandom.key({
      queries: { existingIds: existingIdsRef.current.join(",") },
    }),
    queryFn: () =>
      apis.posts.getManyRandom.fn({
        queries: { existingIds: existingIdsRef.current.join(",") },
      }),
  });

  useEffect(() => {
    if (data.length === 0) {
      setHasMore(false);
    }

    // 개발모드에서 useEffect가 두 번 실행되기 때문에 조건 추가
    if (process.env.NODE_ENV === "development") {
      setPosts((prev) => {
        const newPostIds = new Set(data.map((post) => post.id));
        const filteredPrev = prev.filter((post) => !newPostIds.has(post.id));
        return [...filteredPrev, ...data];
      });
    } else {
      setPosts((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <PostCarousel
      posts={posts}
      randomPostRefatch={refetch}
      existingIdsRef={existingIdsRef}
      hasMore={hasMore}
    />
  );
};

export default PostCarouselWrapper;
