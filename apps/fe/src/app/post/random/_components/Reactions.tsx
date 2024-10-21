"use client";

import { Reaction, ReactionType } from "#be/types";
import useMe from "#fe/hooks/useMe";
import { reactionTypeToEmojiMap } from "#fe/libs/mappings";
import { cn } from "@xstory/ui/libs";

interface IProps {
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
}

const Reactions: React.FC<IProps> = ({ reactions }) => {
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

  return (
    <ul className="flex flex-wrap items-center gap-1">
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
