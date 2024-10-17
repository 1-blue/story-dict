import { CustomError } from "#fe/libs/error";
import type { Image, Post } from "#be/types";

/** 특정 게시글 요청 타입 */
export interface GetOnePostAPIRequest {
  id: string;
}
/** 특정 게시글 응답 타입 */
export interface GetOnePostAPIResponse extends Post {
  thumbnail?: Pick<Image, "url">;
}
/** 특정 게시글 가져오기 함수 */
export const getOnePostAPI = async ({
  id,
}: GetOnePostAPIRequest): Promise<GetOnePostAPIResponse> => {
  return await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + `/apis/v1/posts/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  )
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};
