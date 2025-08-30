"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@sd/ui";
import type { StoryComment, Story } from "@sd/db";

import useStoryCommentMutations from "#fe/hooks/mutations/stories/comments/useStoryCommentMutations";

interface IProps {
  storyId: Story["id"];
  commentId: StoryComment["id"];
}
const CommentReactionPanelPopover: React.FC<IProps> = ({
  storyId,
  commentId,
}) => {
  const { deleteStoryCommentMutation } = useStoryCommentMutations({ storyId });
  const onClickDeleteButton = () => {
    deleteStoryCommentMutation.mutateAsync({
      params: { path: { storyId, commentId } },
    });
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
          onClick={onClickDeleteButton}
        >
          삭제
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default CommentReactionPanelPopover;
