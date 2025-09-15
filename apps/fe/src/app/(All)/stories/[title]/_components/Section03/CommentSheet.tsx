import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  Button,
  Form,
  RFHTextarea,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  toast,
} from "@sd/ui";
import { schemas } from "@sd/utils";

import { openapi } from "#fe/apis";
import useMe from "#fe/hooks/queries/users/useMe";
import useStoryCommentMutations from "#fe/hooks/mutations/stories/comments/useStoryCommentMutations";

import Comment from "#fe/app/(All)/stories/[title]/_components/Section03/Comment";

const formSchema = z.object({
  content: schemas.content,
});

interface IProps {
  title: string;
  storyId: string;
}

const CommentSheet: React.FC<IProps> = ({ title, storyId }) => {
  const { me } = useMe();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { createStoryCommentMutation } = useStoryCommentMutations({
    storyId,
  });
  const { data: comments } = openapi.useSuspenseQuery(
    "get",
    "/apis/v1/stories/{storyId}/comments",
    { params: { path: { storyId } } },
    { select: (data) => data.payload },
  );

  const onSubmit = form.handleSubmit(async (body) => {
    if (!me) return toast.warning("로그인 후 이용해주세요.");

    createStoryCommentMutation.mutateAsync({
      params: { path: { storyId } },
      body: { content: body.content },
    });

    form.reset();
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <ChatBubbleIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="!max-w-sm overflow-auto" hideClose>
        <SheetHeader className="mb-1 line-clamp-1">{title}</SheetHeader>
        <SheetDescription className="mb-4">
          댓글({comments.length || 0}개)
        </SheetDescription>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <RFHTextarea
              name="content"
              placeholder="ex) 힘내요"
              className="resize-none"
              rows={4}
            />
            <Button type="submit" className="w-full">
              댓글 작성
            </Button>
          </form>
        </Form>
        <ul className="mt-6 flex flex-col gap-2">
          {comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
