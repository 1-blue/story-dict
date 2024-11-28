import type { Image, User } from "#be/types";
import {
  fetchInstance,
  fetchInstanceHandleError,
  fetchInstanceHandleResponse,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 로그인된 유저 정보 ==============================
/** 로그인된 유저 정보 요청 타입 */
export interface IGetMeAPIRequest {}
/** 로그인된 유저 정보 응답 타입 */
export interface IGetMeAPIResponse
  extends IAPIResponse<
    Pick<User, "id" | "nickname" | "role" | "email"> & {
      image?: Pick<Image, "id" | "url">;
    }
  > {}
/** 로그인된 유저 정보 가져오기 함수 */
export const getMeAPI = async (): Promise<IGetMeAPIResponse> => {
  return fetchInstance(userApis.getMe.endPoint(), {
    method: "GET",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 유저 생성 ==============================
/** 유저 생성 요청 타입 */
export interface ICreateUserAPIRequest {
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
export interface ICreateUserAPIResponse
  extends IAPIResponse<
    Omit<User, "password"> & { image?: Pick<Image, "id" | "url"> }
  > {}
/** 유저 생성 함수 */
export const createUserAPI = async ({
  body,
}: ICreateUserAPIRequest): Promise<ICreateUserAPIResponse> => {
  return fetchInstance(userApis.create.endPoint(), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
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
