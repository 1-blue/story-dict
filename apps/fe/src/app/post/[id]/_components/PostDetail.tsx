"use client";

import { AspectRatio, Badge } from "@sd/ui";

import "#fe/css/github-markdown.css";
import MarkdownViewer from "./MarkdownViewer";
import Image from "next/image";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";

import { postCategoryToKoreanMap } from "#fe/libs/mappings";
import CommentSheet from "./CommentSheet";
import ReactionPopover from "./ReactionPopover";
import Reactions from "./Reactions";
import { useQuery } from "@tanstack/react-query";
import { apis } from "#fe/apis";

interface IProps {
  postId: string;
}

const PostDetail: React.FC<IProps> = ({ postId }) => {
  const { data: post, refetch: postRefetch } = useQuery({
    queryKey: apis.posts.getOne.key({ params: { postId } }),
    queryFn: () => apis.posts.getOne.fn({ params: { postId } }),
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
                dateTime={new Date(post.createdAt).toISOString()}
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

          <CommentSheet title={post.title} postId={postId} />
        </div>
        <div className="flex gap-2 self-start">
          <ReactionPopover
            reactions={post.reactions}
            postId={postId}
            refetch={postRefetch}
          />

          <Reactions
            reactions={post.reactions}
            postId={postId}
            refetch={postRefetch}
          />
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
