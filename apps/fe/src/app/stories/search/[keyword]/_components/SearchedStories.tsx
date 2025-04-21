"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { apis } from "#fe/apis";
import StoryCard from "#fe/components/StoryCard";
import EmptyAlert from "#fe/components/EmptyAlert";

interface IProps {
  keyword: string;
}

const SearchedStories: React.FC<IProps> = ({ keyword }) => {
  const { data: stories } = useSuspenseQuery({
    queryKey: apis.stories.getManyKeyword.key({ params: { keyword } }),
    queryFn: () => apis.stories.getManyKeyword.fn({ params: { keyword } }),
    select: (data) => data.payload,
  });

  return (
    <article>
      {stories.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </ul>
      ) : (
        <EmptyAlert
          title="게시글 없음"
          description={`"${decodeURIComponent(keyword)}" 키워드의 게시글이 존재하지 않아요 🥲`}
        />
      )}
    </article>
  );
};

export default SearchedStories;
