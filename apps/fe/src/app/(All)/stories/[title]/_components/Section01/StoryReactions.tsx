"use client";

import { StoryReaction, ReactionType } from "@sd/db";
import useMe from "#fe/hooks/queries/users/useMe";
import useStoryReactionMutations from "#fe/hooks/mutations/stories/reactions/useStoryReactionMutations";
import { reactionTypeToEmojiMap } from "@sd/utils";
import { toast } from "@sd/ui";
import { cn } from "@sd/ui/libs";

interface IProps {
  reactions: Pick<StoryReaction, "id" | "type" | "userId">[];
  storyId: string;
}

const StoryReactions: React.FC<IProps> = ({ reactions, storyId }) => {
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
    createStoryReactionMutation,
    patchStoryReactionMutation,
    deleteStoryReactionMutation,
  } = useStoryReactionMutations();
  const onClickReaction: React.MouseEventHandler<HTMLElement> = async (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const type = e.target.dataset.type as ReactionType;
    if (!type) return;

    if (!me) return toast.warning("로그인 후 이용해주세요.");

    const exReaction = reactions.find((reaction) => reaction.userId === me.id);

    // 리액션 생성
    if (!exReaction) {
      createStoryReactionMutation.mutate({
        params: { path: { storyId } },
        body: { type },
      });
    }
    // 리액션 교체
    else if (exReaction.type !== type) {
      patchStoryReactionMutation.mutate({
        params: { path: { storyId, reactionId: exReaction.id } },
        body: { type },
      });
    }
    // 리액션 제거
    else {
      deleteStoryReactionMutation.mutate({
        params: { path: { storyId, reactionId: exReaction.id } },
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

export default StoryReactions;
