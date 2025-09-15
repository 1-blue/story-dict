import { FaceIcon } from "@radix-ui/react-icons";
import { Button, Popover, PopoverContent, PopoverTrigger, toast } from "@sd/ui";

import type { StoryReaction, ReactionType } from "@sd/db";
import useMe from "#fe/hooks/queries/users/useMe";
import useStoryCommentReactionMutations from "#fe/hooks/mutations/stories/comments/reactions/useStoryCommentReactionMutations";
import { reactionTypeToEmojiMap } from "@sd/utils";

interface IProps {
  reactions: Pick<StoryReaction, "id" | "type" | "userId">[];
  storyId: string;
  commentId: string;
}

const CommentReactionPopover: React.FC<IProps> = ({
  reactions,
  storyId,
  commentId,
}) => {
  const { me } = useMe();

  const {
    createStoryCommentReactionMutation,
    patchStoryCommentReactionMutation,
    deleteStoryCommentReactionMutation,
  } = useStoryCommentReactionMutations({ storyId });
  const onClickReaction: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const type = e.target.dataset.type as ReactionType;
    if (!type) return;

    if (!me) return toast.warning("로그인 후 이용해주세요.");

    const exReaction = reactions.find((reaction) => reaction.userId === me.id);

    // 리액션 생성
    if (!exReaction) {
      createStoryCommentReactionMutation.mutate({
        params: { path: { storyId, commentId } },
        body: { type },
      });
    }
    // 리액션 교체
    else if (exReaction.type !== type) {
      patchStoryCommentReactionMutation.mutate({
        params: { path: { storyId, commentId, reactionId: exReaction.id } },
        body: { type },
      });
    }
    // 리액션 제거
    else {
      deleteStoryCommentReactionMutation.mutate({
        params: { path: { storyId, commentId, reactionId: exReaction.id } },
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
