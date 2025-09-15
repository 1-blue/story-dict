"use client";

import { useParams, useRouter } from "next/navigation";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@sd/ui";

import type { Story } from "@sd/db";
import useStoryMutations from "#fe/hooks/mutations/stories/useStoryMutations";

interface IProps {
  storyId: Story["id"];
}
const StoryPanelPopover: React.FC<IProps> = ({ storyId }) => {
  const { title } = useParams<{ title: string }>();
  const router = useRouter();

  const onClickEditButton = () => router.replace(`/stories/edit/${title}`);

  const { storyDeleteMutation } = useStoryMutations();
  const onClickDeleteButton = () => {
    storyDeleteMutation.mutateAsync({ params: { path: { storyId } } });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2" align="end">
        <Button
          variant="ghost"
          className="w-full text-xs"
          onClick={onClickEditButton}
        >
          수정
        </Button>
        <Button
          variant="ghost"
          className="w-full text-xs"
          onClick={onClickDeleteButton}
        >
          삭제
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default StoryPanelPopover;
