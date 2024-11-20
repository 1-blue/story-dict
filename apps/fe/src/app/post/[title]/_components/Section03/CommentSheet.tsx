import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
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

import { apis } from "#fe/apis";
import { handleError } from "#fe/libs/handleError";
import useMe from "#fe/hooks/useMe";
import useCommentMutations from "#fe/hooks/useCommentMutations";

import Comment from "#fe/app/post/[title]/_components/Section03/Comment";

const formSchema = z.object({
  content: schemas.content,
});

interface IProps {
  title: string;
  postId: string;
}

const CommentSheet: React.FC<IProps> = ({ title, postId }) => {
  const { me } = useMe();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { createCommentMutate } = useCommentMutations();
  const { data: comments, refetch: commentRefetch } = useQuery({
    queryKey: apis.comments.getAll.key({ params: { postId } }),
    queryFn: () => apis.comments.getAll.fn({ params: { postId } }),
  });

  const onSubmit = form.handleSubmit(async (body) => {
    if (!me) return toast.warning("로그인 후 이용해주세요.");

    try {
      await createCommentMutate({
        params: { postId },
        body: { content: body.content },
      });

      toast.success("댓글 작성 완료");
      commentRefetch();
      form.reset();
    } catch (error) {
      handleError({ error, title: "댓글 작성 실패" });
    }
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
          댓글({comments?.length || 0}개)
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
            <Comment
              key={comment.id}
              comment={comment}
              commentRefetch={commentRefetch}
            />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
