"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@sd/ui";
import { schemas } from "@sd/utils";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CategoryCombobox from "./CategoryCombobox";
import { useRouter } from "next/navigation";
import { PostCategory } from "#be/types";
import { postCategoryToKoreanMap } from "@sd/utils";
import { routes } from "#fe/constants";

const formSchema = z.object({
  category: z.object({
    label: z.string(),
    value: schemas.category,
  }),
});

interface IProps {
  defaultCategory?: PostCategory;
}

const CategoryForm: React.FC<IProps> = ({ defaultCategory }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    ...(defaultCategory && {
      defaultValues: {
        category: {
          label: postCategoryToKoreanMap[defaultCategory],
          value: defaultCategory,
        },
      },
    }),
  });

  const onSubmit = form.handleSubmit((formData) => {
    router.push(routes.post.category.detail.url(formData.category.value));
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <CategoryCombobox onSelect={() => buttonRef.current?.click()} />

        <button type="submit" ref={buttonRef} hidden />
      </form>
    </Form>
  );
};

export default CategoryForm;
