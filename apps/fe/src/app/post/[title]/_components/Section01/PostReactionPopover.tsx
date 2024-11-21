import { CommentReaction, ReactionType } from "#be/types";
import useMe from "#fe/hooks/queries/users/useMe";
import usePostReactionMutations from "#fe/hooks/mutations/posts/reactions/usePostReactionMutations";
import { handleError } from "#fe/libs/handleError";
import { reactionTypeToEmojiMap } from "#fe/libs/mappings";
import { FaceIcon } from "@radix-ui/react-icons";
import { Button, Popover, PopoverContent, PopoverTrigger, toast } from "@sd/ui";

interface IProps {
  reactions: Pick<CommentReaction, "id" | "type" | "userId">[];
  refetch: () => void;
  postId: string;
}

const PostReactionPopover: React.FC<IProps> = ({
  reactions,
  refetch,
  postId,
}) => {
  const { me } = useMe();

  const {
    createPostReactionMutate,
    patchPostReactionMutate,
    deletePostReactionMutate,
  } = usePostReactionMutations();
  const onClickReaction: React.MouseEventHandler<HTMLElement> = async (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const type = e.target.dataset.type as ReactionType;
    if (!type) return;

    if (!me) return toast.warning("로그인 후 이용해주세요.");

    const exReaction = reactions.find((reaction) => reaction.userId === me.id);

    try {
      // 리액션 생성
      if (!exReaction) {
        await createPostReactionMutate({
          params: { postId },
          body: { type },
        });

        refetch();
        return toast.success("게시글 리액션 생성", {
          description: `게시글의 "${reactionTypeToEmojiMap[type]}" 리액션을 생성했습니다.`,
        });
      }

      // 리액션 교체
      if (exReaction.type !== type) {
        await patchPostReactionMutate({
          params: { postId, reactionId: exReaction.id },
          body: { type },
        });

        refetch();
        return toast("게시글 리액션 교체", {
          description: `게시글의 "${reactionTypeToEmojiMap[exReaction.type]}" 리액션을 "${reactionTypeToEmojiMap[type]}"로 교체했습니다.`,
        });
      }

      // 리액션 제거
      await deletePostReactionMutate({
        params: { postId, reactionId: exReaction.id },
      });

      refetch();
      return toast("게시글 리액션 제거", {
        description: `게시글의 "${reactionTypeToEmojiMap[exReaction.type]}" 리액션을 제거했습니다.`,
      });
    } catch (error) {
      handleError({ error, title: "게시글 리액션 실패" });
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

export default PostReactionPopover;
