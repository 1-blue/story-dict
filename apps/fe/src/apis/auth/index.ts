import type { User } from "@sd/db";
import {
  fetchInstance,
  fetchInstanceHandleError,
  fetchInstanceHandleResponse,
} from "#fe/apis/fetchInstance";

// ============================== 로그인 ==============================
/** 로그인 요청 타입 */
export interface IPostLogInAPIRequest {
  body: Pick<User, "email" | "password">;
}
/** 로그인 응답 타입 */
export interface IPostLogInAPIResponse {
  toast: {
    title: string;
    description: string;
  };
  payload: Omit<User, "password">;
}
/** 로그인 함수 */
const postLogInAPI = async ({
  body,
}: IPostLogInAPIRequest): Promise<IPostLogInAPIResponse> => {
  return fetchInstance(authApis.login.endPoint(), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 로그아웃 ==============================
/** 로그아웃 요청 타입 */
export interface IPostLogOutAPIRequest {}
/** 로그아웃 응답 타입 */
export interface IPostLogOutAPIResponse {}
/** 로그아웃 함수 */
const postLogOutAPI = async (): Promise<IPostLogOutAPIResponse> => {
  return fetchInstance(authApis.logout.endPoint(), {
    method: "POST",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
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
