"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@sd/ui";

import type { Comment, Post } from "#be/types";
import usePostCommentMutations from "#fe/hooks/mutations/posts/comments/usePostCommentMutations";

interface IProps {
  postId: Post["id"];
  commentId: Comment["id"];
}
const CommentReactionPanelPopover: React.FC<IProps> = ({
  postId,
  commentId,
}) => {
  const { deletePostCommentMutateAsync } = usePostCommentMutations({ postId });
  const onClickDeleteButton = () => {
    deletePostCommentMutateAsync({ params: { postId, commentId } });
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
