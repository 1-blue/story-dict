"use client";

import { useEffect, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { apis, IGetManyRandomStoryAPIResponse } from "#fe/apis";
import StoryCarousel from "#fe/app/stories/random/_components/StoryCarousel";

const StoryCarouselWrapper: React.FC = () => {
  const [stories, setStories] = useState<
    IGetManyRandomStoryAPIResponse["payload"]
  >([]);
  const existingIdsRef = useRef<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, refetch } = useSuspenseQuery({
    queryKey: apis.stories.getManyRandom.key({
      queries: { existingIds: existingIdsRef.current.join(",") },
    }),
    queryFn: () =>
      apis.stories.getManyRandom.fn({
        queries: { existingIds: existingIdsRef.current.join(",") },
      }),
    select: (data) => data.payload,
  });

  useEffect(() => {
    if (data.length === 0) {
      setHasMore(false);
    }

    // 개발모드에서 useEffect가 두 번 실행되기 때문에 조건 추가
    if (process.env.NODE_ENV === "development") {
      setStories((prev) => {
        const newStoryIds = new Set(data.map((story) => story.id));
        const filteredPrev = prev.filter((story) => !newStoryIds.has(story.id));
        return [...filteredPrev, ...data];
      });
    } else {
      setStories((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <StoryCarousel
      stories={stories}
      randomStoryRefatch={refetch}
      existingIdsRef={existingIdsRef}
      hasMore={hasMore}
    />
  );
};

export default StoryCarouselWrapper;
