"use client";

import { trpc } from "#fe/libs/trpc";
import {
  AspectRatio,
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@xstory/ui";

import "#fe/css/github-markdown.css";
import Markdown from "./Markdown";
import Image from "next/image";
import { CalendarIcon, FaceIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  postCategoryToKoreanMap,
  reactionTypeToEmojiMap,
} from "#fe/libs/mappings";
import { ReactionType } from "#be/types";
import useMe from "#fe/hooks/useMe";
import { handleError } from "#fe/libs/handleError";
import { useToast } from "@xstory/ui/hooks";
import { cn } from "@xstory/ui/libs";

interface IProps {
  id: string;
}

const PostDetail: React.FC<IProps> = ({ id }) => {
  const { me } = useMe();
  const { toast } = useToast();
  const { data: post, refetch: postRefetch } = trpc.posts.getOne.useQuery({
    id,
  });

  const { mutateAsync: createReaction } = trpc.reactions.create.useMutation();
  const { mutateAsync: updateReaction } = trpc.reactions.update.useMutation();
  const { mutateAsync: deleteReaction } = trpc.reactions.delete.useMutation();
  const onClickReaction: React.MouseEventHandler<HTMLElement> = async (e) => {
    if (!me) return;
    if (!post) return;
    if (!(e.target instanceof HTMLButtonElement)) return;
    const type = e.target.dataset.type as ReactionType;
    if (!type) return;

    const exReaction = post.reactions.find(
      (reaction) => reaction.userId === me.id,
    );

    try {
      // 리액션 생성
      if (!exReaction) {
        await createReaction({
          type,
          userId: me.id,
          postId: id,
        });

        postRefetch();
        return toast({
          title: "리액션 생성",
          description: `"${reactionTypeToEmojiMap[type]}" 리액션을 생성했습니다.`,
        });
      }

      // 리액션 교체
      if (exReaction.type !== type) {
        await updateReaction({
          id: exReaction.id,
          type,
        });

        postRefetch();
        return toast({
          title: "리액션 교체",
          description: `"${reactionTypeToEmojiMap[exReaction.type]}"에서 "${reactionTypeToEmojiMap[type]}"으로 교체했습니다.`,
        });
      }

      // 리액션 제거
      await deleteReaction({
        id: exReaction.id,
      });

      postRefetch();
      return toast({
        title: "리액션 제거",
        description: `"${reactionTypeToEmojiMap[exReaction.type]}" 리액션을 제거했습니다.`,
      });
    } catch (error) {
      handleError({ error, toast, title: "리액션 처리 실패" });
    }
  };

  if (!post) return null;

  const reactionCounts = post?.reactions.reduce(
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

  const myReactionType = post.reactions.find(
    (reaction) => reaction.userId === me?.id,
  )?.type;

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-4">
      <section className="relative flex flex-col items-center justify-center gap-4 rounded-md border bg-background p-4">
        <Badge className="absolute right-4 top-4">
          {postCategoryToKoreanMap[post.category]}
        </Badge>
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-base font-semibold text-muted-foreground">
            {post.summary}
          </p>
        </div>
        <div className="flex w-full items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <time
                dateTime={post.createdAt}
                className="text-xs text-muted-foreground"
              >
                {new Date(post.createdAt).toLocaleDateString("ko-KR")}
              </time>
            </div>
            <span className="text-sm text-muted-foreground">-</span>
            <div className="flex items-center gap-1">
              <PersonIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {post.user.nickname}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ul className="flex items-center gap-1" onClick={onClickReaction}>
              {reactionCountArray.map((reaction) => (
                <button
                  key={reaction.type}
                  data-type={reaction.type}
                  type="button"
                  className={cn(
                    "flex cursor-pointer items-center gap-1 rounded-full border border-muted px-2 py-1 text-xs",
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

            <Popover>
              <PopoverTrigger>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
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
          </div>
        </div>
      </section>

      {post.thumbnail && (
        <section className="mx-auto w-full max-w-md">
          <AspectRatio ratio={16 / 9} className="w-full">
            <Image
              src={post.thumbnail.url}
              alt={post.title}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </section>
      )}

      <Markdown mdText={post.content} />
    </article>
  );
};

export default PostDetail;

{
  /* <div className="flex items-center gap-1">
<Avatar>
  <AvatarImage src={post.user.image?.url} />
  <AvatarFallback>
    {post.user.nickname.slice(0, 2).toUpperCase()}
  </AvatarFallback>
</Avatar>
<span>{post.user.nickname}</span>
</div> */
}
