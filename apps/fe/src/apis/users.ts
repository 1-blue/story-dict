import { CustomError } from "#fe/libs/error";
import type { Image, User } from "#be/types";

/** 로그인된 유저 정보 요청 타입 */
export interface GetMeAPIRequest {}
/** 로그인된 유저 정보 응답 타입 */
export interface GetMeAPIResponse
  extends Pick<User, "id" | "nickname" | "role"> {
  image?: Pick<Image, "id" | "url">;
}
/** 로그인된 유저 정보 가져오기 함수 */
export const getMeAPI = async (): Promise<GetMeAPIResponse> => {
  return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/apis/v1/users/me", {
    method: "GET",
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
