"use client";

import { Reaction, ReactionType } from "#be/types";
import useMe from "#fe/hooks/useMe";
import { handleError } from "#fe/libs/handleError";
import { reactionTypeToEmojiMap } from "#fe/libs/mappings";
import { trpc } from "#fe/libs/trpc";
import { toast } from "@sd/ui";
import { cn } from "@sd/ui/libs";

interface IProps {
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
  refetch: () => void;
  postId?: string;
  commentId?: string;
  replyId?: string;
}

const Reactions: React.FC<IProps> = ({ reactions, refetch, ...ids }) => {
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

  const { mutateAsync: createReaction } = trpc.reactions.create.useMutation();
  const { mutateAsync: updateReaction } = trpc.reactions.update.useMutation();
  const { mutateAsync: deleteReaction } = trpc.reactions.delete.useMutation();
  const onClickReaction: React.MouseEventHandler<HTMLElement> = async (e) => {
    if (!me) return;
    if (!(e.target instanceof HTMLButtonElement)) return;
    const type = e.target.dataset.type as ReactionType;
    if (!type) return;

    const exReaction = reactions.find((reaction) => reaction.userId === me.id);

    try {
      // 리액션 생성
      if (!exReaction) {
        await createReaction({
          type,
          userId: me.id,
          ...ids,
        });

        refetch();
        return toast.success("리액션 생성", {
          description: `"${reactionTypeToEmojiMap[type]}" 리액션을 생성했습니다.`,
        });
      }

      // 리액션 교체
      if (exReaction.type !== type) {
        await updateReaction({
          id: exReaction.id,
          type,
        });

        refetch();
        return toast("리액션 교체", {
          description: `"${reactionTypeToEmojiMap[exReaction.type]}"에서 "${reactionTypeToEmojiMap[type]}"으로 교체했습니다.`,
        });
      }

      // 리액션 제거
      await deleteReaction({
        id: exReaction.id,
      });

      refetch();
      return toast("리액션 제거", {
        description: `"${reactionTypeToEmojiMap[exReaction.type]}" 리액션을 제거했습니다.`,
      });
    } catch (error) {
      handleError({ error, title: "리액션 실패" });
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

export default Reactions;
