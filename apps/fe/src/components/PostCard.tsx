"use client";

import { GetAllPostAPIResponse } from "#fe/apis";
import {
  AspectRatio,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sd/ui";
import { convertToCategory } from "@sd/utils";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  post: GetAllPostAPIResponse[number];
}

const PostCard: React.FC<IProps> = ({ post }) => {
  return (
    <Card className="flex w-[350px] flex-col">
      <Link href={`/post/${post.id}`} className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle className="overflow-hidden text-ellipsis">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="line-clamp-3 whitespace-pre-wrap">
            {post.summary}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="flex items-end justify-between">
        <Badge>{convertToCategory(post.category)}</Badge>
        {post.thumbnail?.url && (
          <Popover>
            <PopoverTrigger asChild className="cursor-pointer">
              <figure className="w-16">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={post.thumbnail.url}
                    alt={post.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </figure>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <figure className="mx-auto w-80">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={post.thumbnail.url}
                    alt={post.title}
                    fill
                    className="rounded-md"
                  />
                </AspectRatio>
              </figure>
            </PopoverContent>
          </Popover>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
