import type { User } from "#be/types";
import { CustomError } from "#fe/libs/error";
import { fetchInstance } from "#fe/apis/fetchInstance";

// ============================== 로그인 ==============================
/** 로그인 요청 타입 */
export interface PostLogInAPIRequest {
  body: Pick<User, "email" | "password">;
}
/** 로그인 응답 타입 */
export interface PostLogInAPIResponse extends Omit<User, "password"> {}
/** 로그인 함수 */
const postLogInAPI = async ({
  body,
}: PostLogInAPIRequest): Promise<PostLogInAPIResponse> => {
  return fetchInstance(authApis.login.endPoint(), {
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

// ============================== 로그아웃 ==============================
/** 로그아웃 요청 타입 */
export interface PostLogOutAPIRequest {}
/** 로그아웃 응답 타입 */
export interface PostLogOutAPIResponse {}
/** 로그아웃 함수 */
const postLogOutAPI = async (): Promise<PostLogOutAPIResponse> => {
  return fetchInstance(authApis.logout.endPoint(), {
    method: "POST",
  }).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const authApis = {
  login: {
    endPoint: () => SERVER_URL + "/apis/v1/auth/login",
    key: () => ["post", "auth", "login"],
    fn: postLogInAPI,
  },
  logout: {
    endPoint: () => SERVER_URL + "/apis/v1/auth/logout",
    key: () => ["post", "auth", "logout"],
    fn: postLogOutAPI,
  },
};
