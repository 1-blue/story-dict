"use client";

import { trpc } from "#fe/libs/trpc";
import { AspectRatio, Badge } from "@xstory/ui";

import "#fe/css/github-markdown.css";
import MarkdownViewer from "./MarkdownViewer";
import Image from "next/image";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  postCategoryToKoreanMap,
  reactionTypeToEmojiMap,
} from "#fe/libs/mappings";
import { cn } from "@xstory/ui/libs";
import CommentSheet from "./CommentSheet";
import ReactionPopover from "./ReactionPopover";
import Reactions from "./Reactions";

interface IProps {
  id: string;
}

const PostDetail: React.FC<IProps> = ({ id }) => {
  const { data: post, refetch: postRefetch } = trpc.posts.getOne.useQuery({
    id,
  });

  if (!post) return null;

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
            <div className="flex items-center gap-2">
              <Reactions
                reactions={post.reactions}
                postId={id}
                refetch={postRefetch}
              />

              <ReactionPopover
                reactions={post.reactions}
                postId={id}
                refetch={postRefetch}
              />
            </div>

            <CommentSheet title={post.title} postId={id} />
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

      <MarkdownViewer mdText={post.content} />
    </article>
  );
};

export default PostDetail;
