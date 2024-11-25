"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger, toast } from "@sd/ui";

import type { Comment, Post } from "#be/types";
import { handleError } from "#fe/libs/handleError";
import usePostCommentMutations from "#fe/hooks/mutations/posts/comments/usePostCommentMutations";

interface IProps {
  postId: Post["id"];
  commentId: Comment["id"];
  refetch: () => void;
}
const CommentReactionPanelPopover: React.FC<IProps> = ({
  postId,
  commentId,
  refetch,
}) => {
  const { deletePostCommentMutate } = usePostCommentMutations();
  const onClickDeleteButton = async () => {
    try {
      await deletePostCommentMutate({ params: { postId, commentId } });
      toast.success("댓글 삭제 완료");
      refetch();
    } catch (error) {
      handleError({ error, title: "댓글 삭제 실패" });
    }
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