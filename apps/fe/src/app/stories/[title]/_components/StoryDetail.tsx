"use client";

import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AspectRatio, Badge } from "@sd/ui";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";

import "#fe/css/github-markdown.css";
import { apis } from "#fe/apis";
import { storyCategoryToKoreanMap } from "@sd/utils";

import StoryReactions from "#fe/app/stories/[title]/_components/Section01/StoryReactions";
import StoryReactionPopover from "#fe/app/stories/[title]/_components/Section01/StoryReactionPopover";
import StoryPanelPopover from "#fe/app/stories/[title]/_components/Section01/StoryPanelPopover";
import MarkdownViewer from "#fe/app/stories/[title]/_components/Section02/MarkdownViewer";
import CommentSheet from "#fe/app/stories/[title]/_components/Section03/CommentSheet";

interface StoryDetailProps {
  storyTitle: string;
}

interface StoryMetaInfoProps {
  createdAt: Date;
  authorNickname: string;
}

interface StoryThumbnailProps {
  thumbnailPath: string | null;
  title: string;
}

// 스토리 메타 정보 컴포넌트
const StoryMetaInfo: React.FC<StoryMetaInfoProps> = ({
  createdAt,
  authorNickname,
}) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-1">
      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
      <time className="text-xs text-muted-foreground">
        {createdAt.toLocaleDateString("ko-KR")}
      </time>
    </div>
    <span className="text-sm text-muted-foreground">-</span>
    <div className="flex items-center gap-1">
      <PersonIcon className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{authorNickname}</span>
    </div>
  </div>
);

// 스토리 헤더 컴포넌트
const StoryHeader: React.FC<{ story: any }> = ({ story }) => (
  <section className="relative flex flex-col items-center justify-center gap-4 rounded-md border bg-background p-4">
    {/* 상단 뱃지와 패널 */}
    <div className="absolute top-0 flex w-full items-center justify-between px-2 pt-2">
      <Badge className="">
        {
          storyCategoryToKoreanMap[
            story.category as keyof typeof storyCategoryToKoreanMap
          ]
        }
      </Badge>
      <StoryPanelPopover storyId={story.id} />
    </div>

    {/* 제목과 요약 */}
    <div className="flex flex-col items-center justify-center gap-1">
      <h1 className="text-2xl font-bold">{story.title}</h1>
      <p className="text-base font-semibold text-muted-foreground">
        {story.summary}
      </p>
    </div>

    {/* 메타 정보와 댓글 */}
    <div className="flex w-full items-end justify-between gap-3">
      <StoryMetaInfo
        createdAt={story.createdAt}
        authorNickname={story.user.nickname}
      />
      <CommentSheet title={story.title} storyId={story.id} />
    </div>

    {/* 반응 버튼들 */}
    <div className="flex gap-2 self-start">
      <StoryReactionPopover reactions={story.reactions} storyId={story.id} />
      <StoryReactions reactions={story.reactions} storyId={story.id} />
    </div>
  </section>
);

// 스토리 썸네일 컴포넌트
const StoryThumbnail: React.FC<StoryThumbnailProps> = ({
  thumbnailPath,
  title,
}) => {
  if (!thumbnailPath) return null;

  return (
    <section className="mx-auto w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="w-full">
        <Image
          src={thumbnailPath}
          alt={title}
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </section>
  );
};

// 로딩 상태 컴포넌트
const StoryNotFound: React.FC = () => (
  <div className="mx-auto flex max-w-3xl items-center justify-center p-8">
    <p className="text-muted-foreground">스토리를 찾을 수 없습니다.</p>
  </div>
);

// 메인 StoryDetail 컴포넌트
const StoryDetail: React.FC<StoryDetailProps> = ({ storyTitle }) => {
  const { data: story } = useSuspenseQuery({
    queryKey: apis.stories.getOneByTitle.key({ params: { title: storyTitle } }),
    queryFn: () =>
      apis.stories.getOneByTitle.fn({ params: { title: storyTitle } }),
    select: (data) => data.payload,
  });

  if (!story) {
    return <StoryNotFound />;
  }

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-4">
      <StoryHeader story={story} />
      <StoryThumbnail thumbnailPath={story.thumbnailPath} title={story.title} />
      <MarkdownViewer mdText={story.content} />
    </article>
  );
};

export default StoryDetail;
