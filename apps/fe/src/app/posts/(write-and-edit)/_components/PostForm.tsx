"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { Form, Tabs, TabsContent, TabsList, TabsTrigger, toast } from "@sd/ui";
import { schemas } from "@sd/utils";

import { routes } from "#fe/constants";
import useMe from "#fe/hooks/queries/users/useMe";
import { handleError } from "#fe/libs/handleError";
import usePostMutations from "#fe/hooks/mutations/posts/usePostMutations";

import Metadata from "#fe/app/posts/(write-and-edit)/_components/Metadata";
import Editor from "#fe/app/posts/(write-and-edit)/_components/Editor";

const formSchema = z.object({
  title: schemas.title,
  content: schemas.content,
  summary: schemas.summary,
  category: schemas.category,
  thumbnailPath: z.string().nullable(),
});

const DEV_DEFAULT_VALUES =
  process.env.NODE_ENV === "development"
    ? ({
        title: "게시글 제목 " + Date.now(),
        summary: "게시글 요약 " + Date.now(),
        content: "## 제목\n대충 내용 아무거나 작성" + Date.now(),
        category: "GENERAL_KNOWLEDGE",
        thumbnailPath: null,
      } as const)
    : ({
        title: "",
        summary: "",
        content: "",
        category: "GENERAL_KNOWLEDGE",
        thumbnailPath: null,
      } as const);

interface IProps {
  ownerId?: string;
  postId?: string;
  defaultValues?: z.infer<typeof formSchema>;
}

const PostForm: React.FC<IProps> = ({ ownerId, postId, defaultValues }) => {
  const { me } = useMe();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? DEV_DEFAULT_VALUES,
  });

  const [tab, setTab] = useState<"editor" | "metadata">("editor");
  useEffect(() => {
    const errors = form.formState.errors;
    if (errors.content) {
      setTab("editor");
      toast.error(errors.content?.message);
      return;
    }
    if (errors.title || errors.summary || errors.category) {
      setTab("metadata");
      toast.error(
        errors.title?.message ||
          errors.summary?.message ||
          errors.category?.message,
      );
      return;
    }
  }, [form.formState.errors]);

  const isEdit = !!postId;

  const {
    createPostMutateAsync,
    checkUniqueTitleMutateAsync,
    patchPostMutateAsync,
  } = usePostMutations();
  const onSubmit = form.handleSubmit(async (body) => {
    if (!me?.id) return;

    const isTitleUnchanged = defaultValues?.title === body.title;

    if (!isTitleUnchanged) {
      try {
        const {
          payload: { isUnique },
        } = await checkUniqueTitleMutateAsync({
          body: { title: body.title.trim() },
        });

        if (!isUnique) {
          form.setError("title", {
            type: "validate",
            message: "이미 존재하는 제목입니다",
          });
          return;
        }
      } catch (error) {
        handleError({ error });
      }
    }

    if (isEdit) {
      patchPostMutateAsync({
        params: { postId },
        body: {
          ...body,
          title: body.title.trim(),
        },
      });
    } else {
      createPostMutateAsync({
        body: {
          ...body,
          title: body.title.trim(),
        },
      });
    }
  });

  if (ownerId && ownerId !== me?.id) {
    toast.warning("권한이 없습니다", { id: "unauthorized" });
    return redirect(routes.post.url);
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Tabs value={tab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor" onClick={() => setTab("editor")}>
              에디터
            </TabsTrigger>
            <TabsTrigger value="metadata" onClick={() => setTab("metadata")}>
              메타데이터
            </TabsTrigger>
          </TabsList>
          <TabsContent value="metadata">
            <Metadata />
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

export default PostForm;
