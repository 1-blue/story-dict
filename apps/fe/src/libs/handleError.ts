import { toast } from "@sd/ui";
import { APIResponseError } from "./error";

interface IHandleErrorArgs {
  error: unknown;
}

/** 공용 에러 처리 함수 */
export const handleError = ({ error }: IHandleErrorArgs) => {
  if (error instanceof APIResponseError) {
    toast.error(error.title, { description: error.description });
  } else {
    toast.error("알 수 없는 에러가 발생", {
      description: "잠시후에 다시 시도해주세요!",
    });
  }
};
