"use client";

import { useFormContext } from "react-hook-form";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  RFHInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@xstory/ui";

const Rename: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center gap-4">
      <RFHInput
        name="title"
        placeholder="ex) 게시글 제목"
        className="max-w-xs flex-1"
      />
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem className="basis-24">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="GENERAL_KNOWLEDGE">상식</SelectItem>
                <SelectItem value="ETYMOLOGY">어원</SelectItem>
                <SelectItem value="PURE_KOREAN">순우리말</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">생성</Button>
    </div>
  );
};

export default Rename;
