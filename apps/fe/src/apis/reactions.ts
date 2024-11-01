import { CustomError } from "#fe/libs/error";
import type { Reaction } from "#be/types";

// ============================== 리액션 생성 ==============================
/** 리액션 생성 요청 타입 */
export interface CreateReactionAPIRequest {
  body: Partial<Pick<Reaction, "id" | "postId" | "commentId" | "replyId">> &
    Pick<Reaction, "type">;
}
/** 리액션 생성 응답 타입 */
export interface CreateReactionAPIResponse extends Reaction {}
/** 리액션 생성 함수 */
export const createReactionAPI = async ({
  body,
}: CreateReactionAPIRequest): Promise<CreateReactionAPIResponse> => {
  return fetch(reactionApis.create.endPoint(), {
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

// ============================== 리액션 수정 ==============================
/** 리액션 수정 요청 타입 */
export interface PatchReactionAPIRequest {
  params: { reactionId: Reaction["id"] };
  body: Partial<CreateReactionAPIRequest["body"]>;
}
/** 리액션 수정 응답 타입 */
export interface PatchReactionAPIResponse extends Reaction {}
/** 리액션 수정 함수 */
export const patchReactionAPI = async ({
  body,
  params,
}: PatchReactionAPIRequest): Promise<PatchReactionAPIResponse> => {
  return fetch(reactionApis.patch.endPoint({ params }), {
    method: "PATCH",
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

// ============================== 리액션 삭제 ==============================
/** 리액션 삭제 요청 타입 */
export interface DeleteReactionAPIRequest {
  params: { reactionId: Reaction["id"] };
}
/** 리액션 삭제 응답 타입 */
export interface DeleteReactionAPIResponse extends Reaction {}
/** 리액션 삭제 함수 */
export const deleteReactionAPI = async ({
  params,
}: DeleteReactionAPIRequest): Promise<DeleteReactionAPIResponse> => {
  return fetch(reactionApis.delete.endPoint({ params }), {
    method: "DELETE",
    credentials: "include",
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
    key: ({ body }: CreateReactionAPIRequest) => [
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
    endPoint: ({ params }: Pick<PatchReactionAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/reactions/${params.reactionId}`,
    key: ({ params }: Pick<PatchReactionAPIRequest, "params">) => [
      "patch",
      "reactions",
      params.reactionId,
    ],
    fn: patchReactionAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<DeleteReactionAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/reactions/${params.reactionId}`,
    key: ({ params }: Pick<DeleteReactionAPIRequest, "params">) => [
      "delete",
      "reactions",
      params.reactionId,
    ],
    fn: deleteReactionAPI,
  },
};
