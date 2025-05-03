"use client";

import { $tempAPI } from "#fe/openapis";
import StoryCard from "#fe/components/StoryCard";

const LatestStories: React.FC = () => {
  const { data: stories } = $tempAPI.useSuspenseQuery(
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
