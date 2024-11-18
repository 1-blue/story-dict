"use client";

import { useParams, useRouter } from "next/navigation";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger, toast } from "@sd/ui";

import type { Post } from "#be/types";
import usePostMutations from "#fe/hooks/usePostMutations";
import { handleError } from "#fe/libs/handleError";
import { routes } from "#fe/constants";

interface IProps {
  postId: Post["id"];
}
const PanelPopover: React.FC<IProps> = ({ postId }) => {
  const { title } = useParams<{ title: string }>();
  const router = useRouter();

  const onClickEditButton = () => router.replace(`/post/edit/${title}`);

  const { deletePostMutate } = usePostMutations();
  const onClickDeleteButton = async () => {
    try {
      await deletePostMutate({ params: { postId } });
      toast.success("게시글 삭제 완료");
      router.replace(routes.post.url);
    } catch (error) {
      handleError({ error, title: "게시글 삭제 실패" });
    }
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

export default PanelPopover;
