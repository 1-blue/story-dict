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

import { routes } from "#fe/constants";
import type { components } from "#fe/@types/openapi";
import { storyCategoryToKoreanMap } from "@sd/utils";
import { cn } from "#ui/libs";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  story: components["schemas"]["GetAllStoriesResponsePayloadDTO"];
}

const StoryCard: React.FC<IProps> = ({ story, className, ...props }) => {
  return (
    <Card {...props} className={cn("flex w-80 flex-col", className)}>
      <Link
        href={routes.story.detail.url(story.title)}
        className="flex flex-1 flex-col"
      >
        <CardHeader>
          <CardTitle className="typography-body-sm overflow-hidden text-ellipsis">
            {story.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="line-clamp-3 whitespace-pre-wrap">
            {story.summary}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="flex items-end justify-between">
        <Link href={routes.story.category.detail.url(story.category)}>
          <Badge>{storyCategoryToKoreanMap[story.category]}</Badge>
        </Link>
        {story.thumbnailPath && (
          <Popover>
            <PopoverTrigger asChild className="cursor-pointer">
              <figure className="w-16">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={story.thumbnailPath}
                    alt={story.title}
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
                    src={story.thumbnailPath!}
                    alt={story.title}
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

export default StoryCard;
