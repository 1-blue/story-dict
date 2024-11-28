"use client";

import { toast } from "@sd/ui";
import { cn } from "@sd/ui/libs";

import type { PostReaction, ReactionType } from "#be/types";
import useMe from "#fe/hooks/queries/users/useMe";
import usePostCommentReactionMutations from "#fe/hooks/mutations/posts/comments/reactions/usePostCommentReactionMutations";
import { reactionTypeToEmojiMap } from "@sd/utils";

interface IProps {
  reactions: Pick<PostReaction, "id" | "type" | "userId">[];
  postId: string;
  commentId: string;
}

const CommentReactions: React.FC<IProps> = ({
  reactions,
  postId,
  commentId,
}) => {
  const { me } = useMe();

  const reactionCounts = reactions.reduce(
    (acc, reaction) => {
      acc[reaction.type] = (acc[reaction.type] || 0) + 1;
      return acc;
    },
    {} as Record<ReactionType, number>,
  );
  const reactionCountArray = Object.entries(reactionCounts).map(
    ([type, count]) => ({
      type: type as ReactionType,
      count,
    }),
  );
  const myReactionType = reactions.find(
    (reaction) => reaction.userId === me?.id,
  )?.type;

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
    <ul className="flex flex-wrap items-center gap-1" onClick={onClickReaction}>
      {reactionCountArray.map((reaction) => (
        <button
          key={reaction.type}
          data-type={reaction.type}
          type="button"
          className={cn(
            "flex cursor-pointer items-center gap-1 rounded-full border border-muted px-2 pb-1 pt-1.5 text-xs",
            myReactionType === reaction.type &&
              "border-primary/60 bg-primary/20",
          )}
        >
          {reactionTypeToEmojiMap[reaction.type]}
          <span className="text-xs text-muted-foreground">
            {reaction.count}
          </span>
        </button>
      ))}
    </ul>
  );
};

export default CommentReactions;
