import { Reaction, ReactionType } from "#be/types";
import useMe from "#fe/hooks/useMe";
import useReactionMutations from "#fe/hooks/useReactionMutations";
import { handleError } from "#fe/libs/handleError";
import { reactionTypeToEmojiMap } from "#fe/libs/mappings";
import { FaceIcon } from "@radix-ui/react-icons";
import { Button, Popover, PopoverContent, PopoverTrigger, toast } from "@sd/ui";

interface IProps {
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
  refetch: () => void;
  postId?: string;
  commentId?: string;
  replyId?: string;
}

const ReactionPopover: React.FC<IProps> = ({ reactions, refetch, ...ids }) => {
  const { me } = useMe();

  const { createReactionMutate, patchReactionMutate, deleteReactionMutate } =
    useReactionMutations();
  const onClickReaction: React.MouseEventHandler<HTMLElement> = async (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const type = e.target.dataset.type as ReactionType;
    if (!type) return;

    if (!me) return toast.warning("로그인 후 이용해주세요.");

    const exReaction = reactions.find((reaction) => reaction.userId === me.id);

    try {
      // 리액션 생성
      if (!exReaction) {
        await createReactionMutate({
          body: {
            type,
            ...ids,
          },
        });

        refetch();
        return toast.success("리액션 생성", {
          description: `"${reactionTypeToEmojiMap[type]}" 리액션을 생성했습니다.`,
        });
      }

      // 리액션 교체
      if (exReaction.type !== type) {
        await patchReactionMutate({
          params: { reactionId: exReaction.id },
          body: { type },
        });

        refetch();
        return toast("리액션 교체", {
          description: `"${reactionTypeToEmojiMap[exReaction.type]}"에서 "${reactionTypeToEmojiMap[type]}"으로 교체했습니다.`,
        });
      }

      // 리액션 제거
      await deleteReactionMutate({
        params: { reactionId: exReaction.id },
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
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary" size="icon" className="rounded-full">
          <FaceIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onClick={onClickReaction}
        className="grid w-full grid-cols-4 gap-2"
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

export default ReactionPopover;
