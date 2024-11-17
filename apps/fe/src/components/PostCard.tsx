"use client";

import Image from "next/image";
import Link from "next/link";
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

import { routes } from "#fe/constants";
import { TGetAllPostAPIResponse } from "#fe/apis";

interface IProps {
  post: TGetAllPostAPIResponse[number];
}

const PostCard: React.FC<IProps> = ({ post }) => {
  return (
    <Card className="flex w-80 flex-col">
      <Link
        href={routes.post.detail.url(post.title)}
        className="flex flex-1 flex-col"
      >
        <CardHeader>
          <CardTitle className="typography-body-sm overflow-hidden text-ellipsis">
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
        <Link href={routes.post.category.detail.url(post.category)}>
          <Badge>{convertToCategory(post.category)}</Badge>
        </Link>
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
