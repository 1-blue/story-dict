import { useToast } from "@xstory/ui/hooks";
import { TRPCClientError } from "@trpc/client";
import { CustomError } from "./error";

interface HandleErrorArgs {
  error: unknown;
  toast: ReturnType<typeof useToast>["toast"];
  title: string;
}

/** 공용 에러 처리 함수 */
export const handleError = ({ error, toast, title }: HandleErrorArgs) => {
  console.error(`🚫 Error ${title} >> `, error);

  if (error instanceof TRPCClientError) {
    toast({
      variant: "destructive",
      title: title,
      description: error.message,
    });
  } else if (error instanceof CustomError) {
    toast({
      variant: "destructive",
      title: title,
      description: error.message,
    });
  } else {
    toast({
      variant: "destructive",
      title: title,
      description: `알 수 없는 에러가 발생했습니다\n잠시후에 다시 시도해주세요!`,
    });
  }
};
