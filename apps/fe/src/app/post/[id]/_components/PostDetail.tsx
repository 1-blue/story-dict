"use client";

import { trpc } from "#fe/libs/trpc";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle, AspectRatio } from "@xstory/ui";

import "#fe/css/github-markdown.css";
import Markdown from "./Markdown";
import Image from "next/image";

interface IProps {
  id: string;
}

const PostDetail: React.FC<IProps> = ({ id }) => {
  const { data: post } = trpc.posts.getOne.useQuery({ id });

  if (!post) return null;

  return (
    <article className="flex flex-col gap-4">
      <Alert>
        <LightningBoltIcon className="h-5 w-5" />
        <AlertTitle className="whitespace-pre-wrap break-words text-lg">
          {post.title}
        </AlertTitle>
        <AlertDescription className="whitespace-pre-line">
          {post.summary}
        </AlertDescription>
      </Alert>

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
