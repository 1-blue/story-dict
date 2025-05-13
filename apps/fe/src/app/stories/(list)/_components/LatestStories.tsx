"use client";

import { openapi } from "#fe/apis";
import StoryCard from "#fe/components/StoryCard";

const LatestStories: React.FC = () => {
  const { data: stories } = openapi.useSuspenseQuery(
    "get",
    "/apis/v1/stories",
    undefined,
    { select: (data) => data.payload },
  );

  return (
    <article>
      <ul className="flex flex-wrap gap-4">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </ul>
    </article>
  );
};

export default LatestStories;
