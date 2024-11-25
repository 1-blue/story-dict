import { CustomError } from "#fe/libs/error";

export const fetchInstance = (url: string, options: RequestInit) =>
  fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

/** API 응답 처리를 위한 공통 유틸리티 함수 */
export const fetchInstanceHandleResponse = async (res: Response) => {
  // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
  const parsedText = await res.text();
  const data = parsedText ? JSON.parse(parsedText) : parsedText;

  // 성공한 경우
  if (res.ok) return data;

  // 실패한 경우 (NestJS 에러 응답 형식 처리)
  throw new CustomError({
    message: data.message || "알 수 없는 에러가 발생했습니다",
    statusCode: data.statusCode || res.status.toString(),
    error: data.error || "CustomError",
  });
};

/** API 에러 처리를 위한 공통 유틸리티 함수 */
export const fetchInstanceHandleError = (err: unknown) => {
  if (err instanceof CustomError) {
    throw new CustomError(err);
  }
  if (err instanceof Error) {
    console.log("🚀 err >> ", err);
    throw new Error(err?.message || "알 수 없는 에러");
  }
  throw new Error("알 수 없는 에러");
};
