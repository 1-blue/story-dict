import { FaceIcon } from "@radix-ui/react-icons";
import { Button, Popover, PopoverContent, PopoverTrigger, toast } from "@sd/ui";

import type { PostReaction, ReactionType } from "@sd/db";
import useMe from "#fe/hooks/queries/users/useMe";
import usePostCommentReactionMutations from "#fe/hooks/mutations/posts/comments/reactions/usePostCommentReactionMutations";
import { reactionTypeToEmojiMap } from "@sd/utils";

interface IProps {
  reactions: Pick<PostReaction, "id" | "type" | "userId">[];
  postId: string;
  commentId: string;
}

const CommentReactionPopover: React.FC<IProps> = ({
  reactions,
  postId,
  commentId,
}) => {
  const { me } = useMe();

  const {
    createPostCommentReactionMutateAsync,
    patchPostCommentReactionMutateAsync,
    deletePostCommentReactionMutateAsync,
  } = usePostCommentReactionMutations({ postId });
  const onClickReaction: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const type = e.target.dataset.type as ReactionType;
    if (!type) return;

    if (!me) return toast.warning("로그인 후 이용해주세요.");

    const exReaction = reactions.find((reaction) => reaction.userId === me.id);

    // 리액션 생성
    if (!exReaction) {
      createPostCommentReactionMutateAsync({
        params: { postId, commentId },
        body: { type },
      });
    }
    // 리액션 교체
    else if (exReaction.type !== type) {
      patchPostCommentReactionMutateAsync({
        params: { postId, commentId, reactionId: exReaction.id },
        body: { type },
      });
    }
    // 리액션 제거
    else {
      deletePostCommentReactionMutateAsync({
        params: { postId, commentId, reactionId: exReaction.id },
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <FaceIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onClick={onClickReaction}
        className="grid w-full grid-cols-4 gap-2"
        align="start"
      >
        {Object.entries(reactionTypeToEmojiMap).map(([key, emoji]) => (
          <Button
            key={key}
            data-type={key}
            variant="secondary"
            className="h-6 w-6 rounded-full text-xs md:h-8 md:w-8 md:text-sm"
          >
            {emoji}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CommentReactionPopover;
