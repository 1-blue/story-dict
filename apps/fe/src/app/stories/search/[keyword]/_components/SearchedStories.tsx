"use client";

import { $tempAPI } from "#fe/openapis";
import StoryCard from "#fe/components/StoryCard";
import EmptyAlert from "#fe/components/EmptyAlert";

interface IProps {
  keyword: string;
}

const SearchedStories: React.FC<IProps> = ({ keyword }) => {
  const { data: stories } = $tempAPI.useSuspenseQuery(
    "get",
    "/apis/v1/stories/search/{keyword}",
    { params: { path: { keyword } } },
    { select: (data) => data.payload },
  );

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
          title="이야기 없음"
          description={`"${decodeURIComponent(keyword)}" 키워드의 이야기이 존재하지 않아요 🥲`}
        />
      )}
    </article>
  );
};

export default SearchedStories;
