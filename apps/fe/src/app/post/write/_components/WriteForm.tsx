"use client";

import { z } from "zod";
import { Form, Tabs, TabsContent, TabsList, TabsTrigger, toast } from "@sd/ui";
import { schemas } from "@sd/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "#fe/libs/trpc";
import { useRouter } from "next/navigation";
import useMe from "#fe/hooks/useMe";
import { handleError } from "#fe/libs/handleError";

import Metadata from "#fe/app/post/write/_components/Metadata";
import Editor from "#fe/app/post/write/_components/Editor";
import { useState } from "react";

const formSchema = z.object({
  title: schemas.title,
  content: schemas.content,
  summary: schemas.summary,
  // FIXME: 백엔드 타입 가져와서 사용하는 방법 찾아보기
  category: z.enum([
    "GENERAL_KNOWLEDGE",
    "ETYMOLOGY",
    "PURE_KOREAN",
    "QUOTATION",
  ]),
});

const DEV_DEFAULT_VALUES =
  process.env.NODE_ENV === "development"
    ? ({
        title: "게시글 제목 " + Date.now(),
        summary: "게시글 요약 " + Date.now(),
        content: "## 제목\n대충 내용 아무거나 작성" + Date.now(),
        category: "GENERAL_KNOWLEDGE",
      } as const)
    : ({
        title: "",
        summary: "",
        content: "",
        category: "GENERAL_KNOWLEDGE",
      } as const);

const WriteForm: React.FC = () => {
  const router = useRouter();
  const { me } = useMe();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEV_DEFAULT_VALUES,
  });

  const [imageData, setImageData] = useState<{
    id: string;
    url: string;
  } | null>(null);

  const { mutateAsync: createPost } = trpc.posts.create.useMutation();
  const { mutateAsync: moveImage } = trpc.images.move.useMutation();
  const onSubmit = form.handleSubmit(async (body) => {
    if (!me?.id) return;

    try {
      if (imageData) {
        await moveImage({
          id: imageData.id,
          beforeStatus: "TEMP",
          afterStatus: "USE",
        });
      }

      await createPost({
        ...body,
        userId: me.id,
        thumbnailId: imageData?.id,
      });

      router.replace("/");

      toast.success("게시글 생성 성공", {
        description: `게시글이 성공적으로 생성되었습니다.\n메인 페이지로 이동됩니다!`,
      });
    } catch (error) {
      handleError({ error, title: "게시글 생성 실패" });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Tabs defaultValue="metadata">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="metadata">메타데이터</TabsTrigger>
            <TabsTrigger value="editor">에디터</TabsTrigger>
          </TabsList>
          <TabsContent value="metadata">
            <Metadata imageData={imageData} setImageData={setImageData} />
          </TabsContent>
          <TabsContent value="editor">
            <Editor
              content={form.watch("content")}
              onChange={(value) => form.setValue("content", value)}
            />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default WriteForm;
