"use client";

import { useEffect, useRef, useState } from "react";

import { openapi } from "#fe/apis";
import { components } from "#be/@openapi";
import StoryCarousel from "#fe/app/stories/random/_components/StoryCarousel";

const StoryCarouselWrapper: React.FC = () => {
  const [stories, setStories] = useState<
    components["schemas"]["GetManyRandomStoryResponsePayloadDTO"][]
  >([]);
  const existingIdsRef = useRef<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, refetch } = openapi.useSuspenseQuery(
    "get",
    "/apis/v1/stories/random",
    { params: { query: { existingIds: existingIdsRef.current.join(",") } } },
    { select: (data) => data.payload },
  );

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
