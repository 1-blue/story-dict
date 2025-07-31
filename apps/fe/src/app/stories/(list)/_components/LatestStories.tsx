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
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stories.map((story) => (
          <li key={story.id}>
            <StoryCard story={story} className="h-full w-full" />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default LatestStories;
