import { CustomError } from "#fe/libs/error";
import type { Image, User } from "#be/types";
import { APIRuquestType } from "#fe/types";

// ============================== 로그인된 유저 정보 ==============================
/** 로그인된 유저 정보 요청 타입 */
export interface GetMeAPIRequest {}
/** 로그인된 유저 정보 응답 타입 */
export interface GetMeAPIResponse
  extends Pick<User, "id" | "nickname" | "role" | "email"> {
  image?: Pick<Image, "id" | "url">;
}
/** 로그인된 유저 정보 가져오기 함수 */
export const getMeAPI = async (): Promise<GetMeAPIResponse> => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/apis/v1/users/me", {
    method: "GET",
    credentials: "include",
  }).then(async (res) => {
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

// ============================== 유저 생성 ==============================
/** 유저 생성 요청 타입 */
export interface CreateUserAPIRequest
  extends APIRuquestType<
    Pick<User, "email" | "password" | "nickname"> &
      Partial<
        Pick<
          User,
          | "id"
          | "phone"
          | "money"
          | "role"
          | "provider"
          | "providerId"
          | "imageId"
        >
      >,
    {}
  > {}
/** 유저 생성 응답 타입 */
export interface CreateUserAPIResponse extends Omit<User, "password"> {
  image?: Pick<Image, "id" | "url">;
}
/** 유저 생성 함수 */
export const createUserAPI = async ({
  body,
}: CreateUserAPIRequest): Promise<CreateUserAPIResponse> => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/apis/v1/users", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  }).then(async (res) => {
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

export const userApis = {
  getMe: {
    key: () => ["get", "me", "users"],
    fn: getMeAPI,
  },
  create: {
    key: () => ["create", "users"],
    fn: createUserAPI,
  },
};
