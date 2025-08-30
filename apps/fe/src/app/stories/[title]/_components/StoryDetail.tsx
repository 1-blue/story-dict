"use client";

import Image from "next/image";
import { AspectRatio, Badge } from "@sd/ui";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";

import "#fe/css/github-markdown.css";
import { openapi } from "#fe/apis";
import { storyCategoryToKoreanMap } from "@sd/utils";

import useMe from "#fe/hooks/queries/users/useMe";
import StoryReactions from "#fe/app/stories/[title]/_components/Section01/StoryReactions";
import StoryReactionPopover from "#fe/app/stories/[title]/_components/Section01/StoryReactionPopover";
import StoryPanelPopover from "#fe/app/stories/[title]/_components/Section01/StoryPanelPopover";
import MarkdownViewer from "#fe/app/stories/[title]/_components/Section02/MarkdownViewer";
import CommentSheet from "#fe/app/stories/[title]/_components/Section03/CommentSheet";

interface IProps {
  storyTitle: string;
}

const StoryDetail: React.FC<IProps> = ({ storyTitle }) => {
  const { me } = useMe();
  const { data: story } = openapi.useSuspenseQuery(
    "get",
    "/apis/v1/stories/title/{title}",
    { params: { path: { title: storyTitle } } },
    { select: (data) => data.payload },
  );

  if (!story) return null;

  const isOwner = me?.id === story.userId;

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-4">
      <section className="relative flex flex-col items-center justify-center gap-4 rounded-md border bg-background p-4">
        <div className="absolute top-0 flex w-full items-center justify-between px-2 pt-2">
          <Badge className="">{storyCategoryToKoreanMap[story.category]}</Badge>
          {isOwner && <StoryPanelPopover storyId={story.id} />}
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-bold">{story.title}</h1>
          <p className="text-base font-semibold text-muted-foreground">
            {story.summary}
          </p>
        </div>
        <div className="flex w-full items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <time className="text-xs text-muted-foreground">
                {new Date(story.createdAt).toLocaleDateString("ko-KR")}
              </time>
            </div>
            <span className="text-sm text-muted-foreground">-</span>
            <div className="flex items-center gap-1">
              <PersonIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {story.user.nickname}
              </span>
            </div>
          </div>

          <CommentSheet title={story.title} storyId={story.id} />
        </div>
        <div className="flex gap-2 self-start">
          <StoryReactionPopover
            reactions={story.reactions}
            storyId={story.id}
          />

          <StoryReactions reactions={story.reactions} storyId={story.id} />
        </div>
      </section>

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
    </article>
  );
};

export default StoryDetail;
