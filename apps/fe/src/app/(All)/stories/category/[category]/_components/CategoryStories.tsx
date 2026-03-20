"use client";

import type { components } from "#fe/@types/openapi";

type StoryCategory = components["schemas"]["StoryCategory"];
import { openapi } from "#fe/apis";
import StoryCard from "#fe/components/StoryCard";
import EmptyAlert from "#fe/components/EmptyAlert";
import CategoryForm from "#fe/app/(All)/stories/category/_components/CategoryForm";

interface IProps {
  category: StoryCategory;
}

const CategoryStories: React.FC<IProps> = ({ category }) => {
  const { data: stories } = openapi.useSuspenseQuery(
    "get",
    "/apis/v1/stories/category/{category}",
    { params: { path: { category } } },
    { select: (data) => data.payload },
  );

  return (
    <article className="flex flex-col gap-4">
      <CategoryForm defaultCategory={category} />

      {stories.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} className="h-full w-full" />
          ))}
        </ul>
      ) : (
        <EmptyAlert
          title="이야기 없음"
          description="해당 카테고리의 이야기가 존재하지 않아요 🥲"
        />
      )}
    </article>
  );
};

export default CategoryStories;
