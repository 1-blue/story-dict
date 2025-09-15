import { toast } from "@sd/ui";

interface IHandleErrorArgs {
  error: unknown;
}

const getErrorTitle = (statusCode: number | null) => {
  switch (statusCode) {
    case 400:
      return "잘못된 요청입니다.";
    case 401:
      return "인증되지 않은 요청입니다.";
    case 403:
      return "권한이 없는 요청입니다.";
    case 404:
      return "존재하지 않는 요청입니다.";
    case 409:
      return "중복된 요청입니다.";
    default:
      return "알 수 없는 에러가 발생했습니다.";
  }
};

/** 공용 에러 처리 함수 */
export const handleError = ({ error }: IHandleErrorArgs) => {
  console.error("🚫 Error error >> ", error);

  let errorStatusCode: number | null = null;
  let errorMessage: string | null = null;

  if (!error) return;
  if (typeof error !== "object") return;
  if ("statusCode" in error && typeof error.statusCode === "number") {
    errorStatusCode = error.statusCode;
  }
  if ("message" in error && typeof error.message === "string") {
    errorMessage = error.message;
  }

  toast.error(getErrorTitle(errorStatusCode), {
    description: errorMessage,
  });
};
