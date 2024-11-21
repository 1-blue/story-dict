"use client";

import { PostReaction, ReactionType } from "#be/types";
import useMe from "#fe/hooks/queries/users/useMe";
import usePostCommentReactionMutations from "#fe/hooks/mutations/posts/comments/reactions/usePostCommentReactionMutations";
import { handleError } from "#fe/libs/handleError";
import { reactionTypeToEmojiMap } from "#fe/libs/mappings";
import { toast } from "@sd/ui";
import { cn } from "@sd/ui/libs";

interface IProps {
  reactions: Pick<PostReaction, "id" | "type" | "userId">[];
  refetch: () => void;
  postId: string;
  commentId: string;
}

const CommentReactions: React.FC<IProps> = ({
  reactions,
  refetch,
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
    createPostCommentReactionMutate,
    patchPostCommentReactionMutate,
    deletePostCommentReactionMutate,
  } = usePostCommentReactionMutations();
  const onClickReaction: React.MouseEventHandler<HTMLElement> = async (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const type = e.target.dataset.type as ReactionType;
    if (!type) return;

    if (!me) return toast.warning("로그인 후 이용해주세요.");

    const exReaction = reactions.find((reaction) => reaction.userId === me.id);

    try {
      // 리액션 생성
      if (!exReaction) {
        await createPostCommentReactionMutate({
          params: { postId, commentId },
          body: { type },
        });

        refetch();
        return toast.info("댓글 리액션 생성", {
          description: `댓글의 "${reactionTypeToEmojiMap[type]}" 리액션을 생성했습니다.`,
        });
      }

      // 리액션 교체
      if (exReaction.type !== type) {
        await patchPostCommentReactionMutate({
          params: { postId, commentId, reactionId: exReaction.id },
          body: { type },
        });

        refetch();
        return toast.info("댓글 리액션 교체", {
          description: `댓글의 "${reactionTypeToEmojiMap[exReaction.type]}" 리액션을 "${reactionTypeToEmojiMap[type]}"로 교체했습니다.`,
        });
      }

      // 리액션 제거
      await deletePostCommentReactionMutate({
        params: { postId, commentId, reactionId: exReaction.id },
      });

      refetch();
      return toast.info("댓글 리액션 제거", {
        description: `댓글의 "${reactionTypeToEmojiMap[exReaction.type]}" 리액션을 제거했습니다.`,
      });
    } catch (error) {
      handleError({ error, title: "댓글 리액션 실패" });
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
