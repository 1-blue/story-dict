"use client";

import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AspectRatio, Badge } from "@sd/ui";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";

import "#fe/css/github-markdown.css";
import { apis } from "#fe/apis";
import { postCategoryToKoreanMap } from "@sd/utils";

import PostReactions from "#fe/app/posts/[title]/_components/Section01/PostReactions";
import PostReactionPopover from "#fe/app/posts/[title]/_components/Section01/PostReactionPopover";
import PostPanelPopover from "#fe/app/posts/[title]/_components/Section01/PostPanelPopover";
import MarkdownViewer from "#fe/app/posts/[title]/_components/Section02/MarkdownViewer";
import CommentSheet from "#fe/app/posts/[title]/_components/Section03/CommentSheet";

interface IProps {
  postTitle: string;
}

const PostDetail: React.FC<IProps> = ({ postTitle }) => {
  const { data: post } = useSuspenseQuery({
    queryKey: apis.posts.getOneByTitle.key({ params: { title: postTitle } }),
    queryFn: () =>
      apis.posts.getOneByTitle.fn({ params: { title: postTitle } }),
    select: (data) => data.payload,
  });

  if (!post) return null;

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-4">
      <section className="relative flex flex-col items-center justify-center gap-4 rounded-md border bg-background p-4">
        <div className="absolute top-0 flex w-full items-center justify-between px-2 pt-2">
          <Badge className="">{postCategoryToKoreanMap[post.category]}</Badge>
          <PostPanelPopover postId={post.id} />
        </div>
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
              <time className="text-xs text-muted-foreground">
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

          <CommentSheet title={post.title} postId={post.id} />
        </div>
        <div className="flex gap-2 self-start">
          <PostReactionPopover reactions={post.reactions} postId={post.id} />

          <PostReactions reactions={post.reactions} postId={post.id} />
        </div>
      </section>

      {post.thumbnailPath && (
        <section className="mx-auto w-full max-w-md">
          <AspectRatio ratio={16 / 9} className="w-full">
            <Image
              src={post.thumbnailPath}
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
