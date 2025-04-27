"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { apis } from "#fe/apis";
import StoryCard from "#fe/components/StoryCard";

const LatestStories: React.FC = () => {
  const { data: stories } = useSuspenseQuery({
    queryKey: apis.stories.getAll.key(),
    queryFn: apis.stories.getAll.fn,
    select: (data) => data.payload,
  });

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
