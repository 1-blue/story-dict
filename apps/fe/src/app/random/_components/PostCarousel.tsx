"use client";

import { useEffect } from "react";
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
} from "@xstory/ui";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "#be/apis/v0/trpc/trpc.router";
import { postCategoryToKoreanMap } from "#fe/libs/mappings";
import Reactions from "./Reactions";
import Link from "next/link";

interface IProps {
  posts: inferRouterOutputs<AppRouter>["posts"]["getRandom"];
  randomPostRefatch: () => void;
  setExistingIds: (ids: string[]) => void;
}

const PostCarousel: React.FC<IProps> = ({
  posts,
  randomPostRefatch,
  setExistingIds,
}) => {
  useEffect(() => {
    setExistingIds([...new Set(posts.map((post) => post.id))]);
  }, [posts, setExistingIds]);

  return (
    <div className="mx-auto flex h-[calc(100vh-58px-32px-32px-32px)] max-w-xs items-center">
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full max-w-xs"
      >
        <CarouselContent className="-mt-1 h-[50vh] gap-2 md:h-[70vh]">
          {posts?.map((post) => (
            <CarouselItem key={post.id} className="relative basis-1/5 pt-1">
              <Link href={`/post/${post.id}`}>
                <Badge className="absolute right-2 top-4 text-xs">
                  {postCategoryToKoreanMap[post.category]}
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
                <Button onClick={randomPostRefatch}>
                  랜덤 게시글 가져오기
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

export default PostCarousel;
