import useMe from "#fe/hooks/useMe";
import { handleError } from "#fe/libs/handleError";
import { trpc } from "#fe/libs/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  RFHTextarea,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  toast,
} from "@xstory/ui";
import { schemas } from "@xstory/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactionPopover from "./ReactionPopover";
import Reactions from "./Reactions";

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

  const { data: comments, refetch: commentRefetch } =
    trpc.comments.getMany.useQuery({
      postId,
    });

  const { mutateAsync: createComment } = trpc.comments.create.useMutation();

  const onSubmit = form.handleSubmit(async (body) => {
    if (!me) return;

    try {
      await createComment({
        postId,
        userId: me.id,
        content: body.content,
      });

      toast.success("댓글 작성 완료");
      commentRefetch();
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
      <SheetContent className="!max-w-sm" hideClose>
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
            <li
              key={comment.id}
              className="flex flex-col gap-2 rounded-md border px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={comment.user.image?.url} />
                  <AvatarFallback>
                    {comment.user.nickname.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">
                    {comment.user.nickname}
                  </span>
                  <time className="text-xs text-muted-foreground">
                    {format(comment.createdAt, "yyyy-MM-dd HH:mm:ss")}
                  </time>
                </div>
              </div>
              <p className="whitespace-pre-wrap break-words">
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
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
