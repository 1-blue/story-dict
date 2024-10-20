"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
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
} from "@xstory/ui";
import { useRef } from "react";
import { trpc } from "#fe/libs/trpc";
import { handleError } from "#fe/libs/handleError";
import { postUploadImageByPresignedURL } from "#fe/apis";
import { CameraIcon } from "@radix-ui/react-icons";

interface IProps {
  imageData: { id: string; url: string } | null;
  setImageData: (imageData: { id: string; url: string }) => void;
}

const Metadata: React.FC<IProps> = ({ imageData, setImageData }) => {
  const { control } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createPresignedURL } =
    trpc.images.createPresignedURL.useMutation();
  const { mutateAsync: createImage } = trpc.images.create.useMutation();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) return;

    try {
      const { url, fields } = await createPresignedURL({ filename: file.name });
      await postUploadImageByPresignedURL({ fields, imageFile: file });
      const { id: imageId, url: imageURL } = await createImage({
        name: file.name,
        url: url + fields.key,
        purpose: "POST_THUMBNAIL",
      });

      setImageData({ id: imageId, url: imageURL });
    } catch (error) {
      handleError({ error, title: "이미지 업로드 실패" });
    }
  };

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
                    <SelectItem value="GENERAL_KNOWLEDGE">상식</SelectItem>
                    <SelectItem value="ETYMOLOGY">어원</SelectItem>
                    <SelectItem value="PURE_KOREAN">순우리말</SelectItem>
                    <SelectItem value="QUOTATION">명대사</SelectItem>
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
            {imageData ? (
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={imageData.url}
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
