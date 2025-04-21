"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@sd/ui";

import { storyCategoryToKoreanMap } from "@sd/utils";
import { IGetManyRandomStoryAPIResponse } from "#fe/apis";
import { routes } from "#fe/constants";

import Reactions from "#fe/app/stories/random/_components/Reactions";

interface IProps {
  stories: IGetManyRandomStoryAPIResponse["payload"];
  randomStoryRefatch: () => void;
  existingIdsRef: React.MutableRefObject<string[]>;
  hasMore: boolean;
}

const StoryCarousel: React.FC<IProps> = ({
  stories,
  randomStoryRefatch,
  existingIdsRef,
  hasMore,
}) => {
  useEffect(() => {
    existingIdsRef.current = [...new Set(stories.map((post) => post.id))];
  }, [stories, existingIdsRef]);

  return (
    <div className="mx-auto flex h-[calc(100vh-208px)] max-w-xs items-center">
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full max-w-xs"
      >
        <CarouselContent className="-mt-1 h-[50vh] gap-2 md:h-[66vh]">
          {stories?.map((post) => (
            <CarouselItem key={post.id} className="relative basis-1/5 pt-1">
              <Link href={routes.story.detail.url(post.title)}>
                <Badge className="absolute right-2 top-4 text-xs">
                  {storyCategoryToKoreanMap[post.category]}
                </Badge>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
                    <span className="text-lg font-semibold">{post.title}</span>
                    <p className="text-sm text-muted-foreground">
                      {post.summary}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Reactions reactions={post.reactions} />
                  </CardFooter>
                </Card>
              </Link>
            </CarouselItem>
          ))}
          <CarouselItem key="refatch" className="shrink basis-1/3 pt-1">
            <Card>
              <CardContent className="flex h-full flex-col items-center justify-center gap-2 p-6">
                <Button onClick={randomStoryRefatch} disabled={!hasMore}>
                  {hasMore ? "랜덤 게시글 가져오기" : "불러올 게시글 없음"}
                </Button>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default StoryCarousel;
