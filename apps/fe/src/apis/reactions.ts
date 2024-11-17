import { CustomError } from "#fe/libs/error";
import type { Reaction } from "#be/types";
import { fetchInstance } from "#fe/apis/fetchInstance";

// ============================== 리액션 생성 ==============================
/** 리액션 생성 요청 타입 */
export interface ICreateReactionAPIRequest {
  body: Partial<Pick<Reaction, "id" | "postId" | "commentId" | "replyId">> &
    Pick<Reaction, "type">;
}
/** 리액션 생성 응답 타입 */
export interface ICreateReactionAPIResponse extends Reaction {}
/** 리액션 생성 함수 */
export const createReactionAPI = async ({
  body,
}: ICreateReactionAPIRequest): Promise<ICreateReactionAPIResponse> => {
  return fetchInstance(reactionApis.create.endPoint(), {
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

// ============================== 리액션 수정 ==============================
/** 리액션 수정 요청 타입 */
export interface IPatchReactionAPIRequest {
  params: { reactionId: Reaction["id"] };
  body: Partial<ICreateReactionAPIRequest["body"]>;
}
/** 리액션 수정 응답 타입 */
export interface IPatchReactionAPIResponse extends Reaction {}
/** 리액션 수정 함수 */
export const patchReactionAPI = async ({
  body,
  params,
}: IPatchReactionAPIRequest): Promise<IPatchReactionAPIResponse> => {
  return fetchInstance(reactionApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  }).then(async (res) => {
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

// ============================== 리액션 삭제 ==============================
/** 리액션 삭제 요청 타입 */
export interface IDeleteReactionAPIRequest {
  params: { reactionId: Reaction["id"] };
}
/** 리액션 삭제 응답 타입 */
export interface IDeleteReactionAPIResponse extends Reaction {}
/** 리액션 삭제 함수 */
export const deleteReactionAPI = async ({
  params,
}: IDeleteReactionAPIRequest): Promise<IDeleteReactionAPIResponse> => {
  return fetchInstance(reactionApis.delete.endPoint({ params }), {
    method: "DELETE",
  }).then(async (res) => {
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const reactionApis = {
  create: {
    endPoint: () => SERVER_URL + "/apis/v1/reactions",
    key: ({ body }: ICreateReactionAPIRequest) => [
      "create",
      "reactions",
      body.type,
      ...(body.postId ? [body.postId] : []),
      ...(body.commentId ? [body.commentId] : []),
      ...(body.replyId ? [body.replyId] : []),
    ],
    fn: createReactionAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchReactionAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IPatchReactionAPIRequest, "params">) => [
      "patch",
      "reactions",
      params.reactionId,
    ],
    fn: patchReactionAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<IDeleteReactionAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IDeleteReactionAPIRequest, "params">) => [
      "delete",
      "reactions",
      params.reactionId,
    ],
    fn: deleteReactionAPI,
  },
};
