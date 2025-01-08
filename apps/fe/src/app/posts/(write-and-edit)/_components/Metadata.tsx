"use client";

import { useRef } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { CameraIcon } from "@radix-ui/react-icons";

import {
  AspectRatio,
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RFHInput,
  RFHTextarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sd/ui";
import { postCategoryToKoreanMap } from "@sd/utils";

import { handleError } from "#fe/libs/handleError";
import { postUploadImageByPresignedURL } from "#fe/apis";
import useImageMutations from "#fe/hooks/mutations/images/useImageMutations";

const CATEGORY_OPTIONS = Object.entries(postCategoryToKoreanMap).map(
  ([key, value]) => ({
    label: value,
    value: key,
  }),
);

const Metadata: React.FC = () => {
  const { control, setValue, watch } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { createPresignedURLMutateAsync } = useImageMutations();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) return;

    try {
      const {
        payload: { url, fields },
      } = await createPresignedURLMutateAsync({
        body: { filename: file.name },
      });
      await postUploadImageByPresignedURL({
        fields,
        imageFile: file,
      });

      const uploadedImagePath = url + fields.key;

      setValue("thumbnailPath", uploadedImagePath);
    } catch (error) {
      handleError({ error });
    }
  };

  const thumbnailPath = watch("thumbnailPath");

  return (
    <article className="mx-auto mt-4 flex max-w-screen-md flex-col gap-4">
      <section className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <RFHInput
            name="title"
            label="제목"
            placeholder="ex) 게시글 제목"
            className="flex-1"
          />
          <RFHTextarea
            name="summary"
            label="요약"
            placeholder="ex) 게시글 요약"
            className="flex-1 resize-none"
            rows={3}
          />
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>카테고리</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
          <FormLabel>썸네일</FormLabel>
          <div
            className="flex min-h-72 w-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-muted md:h-5/6 md:min-h-fit"
            onClick={() => fileInputRef.current?.click()}
          >
            {thumbnailPath ? (
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={thumbnailPath}
                  alt="게시글 썸네일"
                  className="object-fit"
                  fill
                />
              </AspectRatio>
            ) : (
              <div className="flex flex-col items-center gap-0.5">
                <CameraIcon className="h-12 w-12" />
                <span className="text-sm">썸네일 업로드</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <Button type="submit">생성</Button>
    </article>
  );
};

export default Metadata;
