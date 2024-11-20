"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@sd/ui";
import { format } from "date-fns";

import { TGetAllCommentAPIResponse } from "#fe/apis";

import Reactions from "#fe/app/post/[title]/_components/Section03/Reactions";
import ReactionPopover from "#fe/app/post/[title]/_components/Section03/ReactionPopover";
import ReactionPanelPopover from "#fe/app/post/[title]/_components/Section03/ReactionPanelPopover";

interface IProps {
  comment: TGetAllCommentAPIResponse[number];
  commentRefetch: () => void;
}
const Comment: React.FC<IProps> = ({ comment, commentRefetch }) => {
  return (
    <li
      key={comment.id}
      className="flex flex-col gap-4 rounded-md border px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={comment.user.image?.url} />
            <AvatarFallback>{comment.user.nickname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{comment.user.nickname}</span>
            <time className="text-xs text-muted-foreground">
              {format(comment.createdAt, "yyyy-MM-dd HH:mm:ss")}
            </time>
          </div>
        </div>

        <ReactionPanelPopover
          postId={comment.postId}
          commentId={comment.id}
          refetch={commentRefetch}
        />
      </div>
      <p className="whitespace-pre-wrap break-words rounded-md bg-muted/40 px-3 py-2 text-sm">
        {comment.content}
      </p>
      <div className="flex gap-2">
        <ReactionPopover
          reactions={comment.reactions}
          commentId={comment.id}
          refetch={commentRefetch}
        />
        <Reactions
          reactions={comment.reactions}
          commentId={comment.id}
          refetch={commentRefetch}
        />
      </div>
    </li>
  );
};

export default Comment;
