"use client";

import { z } from "zod";
import { Form } from "@xstory/ui";
import { schemas } from "@xstory/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "#fe/libs/trpc";
import { useRouter } from "next/navigation";
import useMe from "#fe/hooks/useMe";
import { useToast } from "@xstory/ui/hooks";
import { PATHS } from "#fe/constants";
import { handleError } from "#fe/libs/handleError";

import Rename from "#fe/app/post/write/_components/Rename";
import Editor from "#fe/app/post/write/_components/Editor";

const formSchema = z.object({
  title: schemas.title,
  content: schemas.content,
  // FIXME: 백엔드 타입 가져와서 사용하는 방법 찾아보기
  category: z.enum(["GENERAL_KNOWLEDGE", "ETYMOLOGY", "PURE_KOREAN"]),
});

const DEV_DEFAULT_VALUES =
  process.env.NODE_ENV === "development"
    ? {
        title: "게시글 제목 " + Date.now(),
        content: "## 제목\n대충 내용 아무거나 작성" + Date.now(),
      }
    : {
        title: "",
        content: "",
      };

const WriteForm: React.FC = () => {
  const router = useRouter();
  const { me } = useMe();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEV_DEFAULT_VALUES,
  });

  const { mutateAsync: createPost } = trpc.posts.create.useMutation();
  const onSubmit = form.handleSubmit(async (body) => {
    if (!me?.id) return;

    try {
      await createPost({
        ...body,
        userId: me.id,
      });

      router.replace(PATHS.HOME);

      toast({
        title: "게시글 생성 성공",
        description: `게시글이 성공적으로 생성되었습니다.\n메인 페이지로 이동됩니다!`,
      });
    } catch (error) {
      handleError({ error, toast, title: "게시글 생성 실패" });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Rename />
        <Editor
          content={form.watch("content")}
          onChange={(value) => form.setValue("content", value)}
        />
      </form>
    </Form>
  );
};

export default WriteForm;
