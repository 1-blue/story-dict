import type { User } from "#be/types";
import { CustomError } from "#fe/libs/error";

/** 로그인 요청 타입 */
export interface PostLogInAPIRequest {
  email: string;
  password: string;
}
/** 로그인 응답 타입 */
export interface PostLogInAPIResponse extends Omit<User, "password"> {}
/** 로그인 함수 */
export const postLogInAPI = async (
  body: PostLogInAPIRequest,
): Promise<PostLogInAPIResponse> => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/apis/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

/** 로그아웃 요청 타입 */
export interface PostLogOutAPIRequest {}
/** 로그아웃 응답 타입 */
export interface PostLogOutAPIResponse {}
/** 로그아웃 함수 */
export const postLogOutAPI = async (): Promise<PostLogOutAPIResponse> => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/apis/v1/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};
