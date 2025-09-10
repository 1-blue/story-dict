"use client";

import Link from "next/link";
import Image from "next/image";
import type { components } from "#fe/@types/openapi";
import {
  Card,
  CardContent,
  CardHeader,
  Badge,
  Button,
  AspectRatio,
} from "@sd/ui";
import { storyCategoryToKoreanMap } from "@sd/utils";
import { routes } from "#fe/constants";
import MarkdownViewer from "#fe/app/(All)/stories/[title]/_components/Section02/MarkdownViewer";

interface IProps {
  story: components["schemas"]["GetManyShortsResponsePayloadDTO"];
}

const reactionEmojiMap = {
  GOOD: "👍",
  BAD: "👎",
  FIRE: "🔥",
  SEE: "👀",
  HEART: "❤️",
  SMILE: "😊",
  SAD: "😢",
  ANGRY: "😠",
  WOW: "😮",
  QUESTION: "❓",
} as const;

const StoryShortCard: React.FC<IProps> = ({ story }) => {
  const reactionCounts =
    story.reactions?.reduce(
      (acc, reaction) => {
        acc[reaction.type] = (acc[reaction.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ) || {};

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.summary,
          url: window.location.origin + routes.story.detail.url(story.title),
        });
      } catch (error) {
        console.log("공유 취소:", error);
      }
    } else {
      await navigator.clipboard.writeText(
        window.location.origin + routes.story.detail.url(story.title),
      );
    }
  };

  return (
    <Card className="mx-auto mb-8 w-full max-w-3xl border border-border/20 bg-background shadow-sm">
      <CardHeader className="px-4 pb-3 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
              {story.category.charAt(0)}
            </div>
            <Badge variant="secondary" className="text-xs">
              {storyCategoryToKoreanMap[story.category]}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            출합
          </Button>
        </div>

        <h2 className="mb-2 text-center text-xl font-bold leading-tight">
          {story.title}
        </h2>

        <p className="text-center text-sm text-muted-foreground">
          [{story.summary}]
        </p>
      </CardHeader>

      <CardContent className="space-y-4 px-4 pb-4">
        {story.thumbnailPath && (
          <section className="mx-auto w-full max-w-md">
            <AspectRatio ratio={16 / 9} className="w-full">
              <Image
                src={story.thumbnailPath}
                alt={story.title}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </section>
        )}

        <MarkdownViewer mdText={story.content} />

        <div className="flex items-center justify-between border-t border-border/30 pt-3">
          <div className="flex items-center gap-2">
            {Object.entries(reactionCounts).map(([type, count]) => (
              <div key={type} className="flex items-center gap-1">
                <span className="text-sm">
                  {reactionEmojiMap[type as keyof typeof reactionEmojiMap]}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {count}
                </span>
              </div>
            ))}

            {Object.keys(reactionCounts).length === 0 && (
              <div className="flex items-center gap-1">
                <span className="text-sm">❤️</span>
                <span className="text-xs text-muted-foreground">0</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-8 w-8 p-0"
              aria-label="공유하기"
            >
              <span className="text-base">⤴</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label="북마크"
            >
              <span className="text-base">🔖</span>
            </Button>
          </div>
        </div>

        <Link href={routes.story.detail.url(story.title)} className="block">
          <Button variant="outline" className="mt-2 h-8 w-full text-sm">
            자세히 보기
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default StoryShortCard;
