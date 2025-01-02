"use client";

import { useParams, useRouter } from "next/navigation";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@sd/ui";

import type { Post } from "@sd/db";
import usePostMutations from "#fe/hooks/mutations/posts/usePostMutations";

interface IProps {
  postId: Post["id"];
}
const PostPanelPopover: React.FC<IProps> = ({ postId }) => {
  const { title } = useParams<{ title: string }>();
  const router = useRouter();

  const onClickEditButton = () => router.replace(`/post/edit/${title}`);

  const { deletePostMutateAsync } = usePostMutations();
  const onClickDeleteButton = () => {
    deletePostMutateAsync({ params: { postId } });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2" align="end">
        <Button
          variant="ghost"
          className="w-full text-xs"
          onClick={onClickEditButton}
        >
          수정
        </Button>
        <Button
          variant="ghost"
          className="w-full text-xs"
          onClick={onClickDeleteButton}
        >
          삭제
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default PostPanelPopover;
