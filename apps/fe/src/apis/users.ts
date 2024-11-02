import { CustomError } from "#fe/libs/error";
import type { Image, User } from "#be/types";
import { fetchInstance } from "#fe/apis/fetchInstance";

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
  return fetchInstance(userApis.getMe.endPoint(), {
    method: "GET",
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
export interface CreateUserAPIRequest {
  body: Pick<User, "email" | "password" | "nickname"> &
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
    >;
}
/** 유저 생성 응답 타입 */
export interface CreateUserAPIResponse extends Omit<User, "password"> {
  image?: Pick<Image, "id" | "url">;
}
/** 유저 생성 함수 */
export const createUserAPI = async ({
  body,
}: CreateUserAPIRequest): Promise<CreateUserAPIResponse> => {
  return fetchInstance(userApis.create.endPoint(), {
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (res) => {
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const userApis = {
  getMe: {
    endPoint: () => SERVER_URL + "/apis/v1/users/me",
    key: () => ["get", "users", "me"],
    fn: getMeAPI,
  },
  create: {
    endPoint: () => SERVER_URL + "/apis/v1/users",
    key: () => ["create", "users"],
    fn: createUserAPI,
  },
};
