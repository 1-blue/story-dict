"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { StoryCategory } from "@sd/db";
import { apis } from "#fe/apis";
import StoryCard from "#fe/components/StoryCard";
import EmptyAlert from "#fe/components/EmptyAlert";
import CategoryForm from "#fe/app/stories/category/_components/CategoryForm";

interface IProps {
  category: StoryCategory;
}

const CategoryStories: React.FC<IProps> = ({ category }) => {
  const { data: stories } = useSuspenseQuery({
    queryKey: apis.stories.getManyCategory.key({ params: { category } }),
    queryFn: () => apis.stories.getManyCategory.fn({ params: { category } }),
    select: (data) => data.payload,
  });

  return (
    <article className="flex flex-col gap-4">
      <CategoryForm defaultCategory={category} />

      {stories.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </ul>
      ) : (
        <EmptyAlert
          title="게시글 없음"
          description="해당 카테고리의 게시글이 존재하지 않아요 🥲"
        />
      )}
    </article>
  );
};

export default CategoryStories;
