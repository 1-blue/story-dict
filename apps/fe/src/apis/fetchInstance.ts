import { APIResponseError } from "#fe/libs/error";

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
  throw new APIResponseError({
    title: data.title,
    description: data.description,
  });
};

/** API 에러 처리를 위한 공통 유틸리티 함수 */
export const fetchInstanceHandleError = (err: unknown) => {
  if (err instanceof APIResponseError) {
    throw new APIResponseError(err);
  }
  throw new APIResponseError({
    title: "알 수 없는 문제",
    description: `알 수 없는 문제가 발생했습니다 😥\n잠시후에 다시 시도해주세요!`,
  });
};
