import { CustomError } from "#fe/libs/error";
import type { APIRuquestType } from "#fe/types";
import type { Reaction } from "#be/types";

// ============================== 리액션 생성 ==============================
/** 리액션 생성 요청 타입 */
export interface CreateReactionAPIRequest
  extends APIRuquestType<
    Partial<Pick<Reaction, "id" | "postId" | "commentId" | "replyId">> &
      Pick<Reaction, "type">
  > {}
/** 리액션 생성 응답 타입 */
export interface CreateReactionAPIResponse extends Reaction {}
/** 리액션 생성 함수 */
export const createReactionAPI = async ({
  body,
}: CreateReactionAPIRequest): Promise<CreateReactionAPIResponse> => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/apis/v1/reactions", {
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
export interface PatchReactionAPIRequest
  extends APIRuquestType<
    Partial<CreateReactionAPIRequest["body"]>,
    { reactionId: Reaction["id"] }
  > {}
/** 리액션 수정 응답 타입 */
export interface PatchReactionAPIResponse extends Reaction {}
/** 리액션 수정 함수 */
export const patchReactionAPI = async ({
  body,
  params,
}: PatchReactionAPIRequest): Promise<PatchReactionAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/reactions/${params?.reactionId}`,
    {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(body),
    },
  ).then(async (res) => {
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

// ============================== 리액션 삭제 ==============================
/** 리액션 삭제 요청 타입 */
export interface DeleteReactionAPIRequest
  extends APIRuquestType<{}, { reactionId: Reaction["id"] }> {}
/** 리액션 삭제 응답 타입 */
export interface DeleteReactionAPIResponse extends Reaction {}
/** 리액션 삭제 함수 */
export const deleteReactionAPI = async ({
  params,
}: DeleteReactionAPIRequest): Promise<DeleteReactionAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/reactions/${params?.reactionId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  ).then(async (res) => {
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

export const reactionApis = {
  create: {
    key: () => ["create", "reactions"],
    fn: createReactionAPI,
  },
  patch: {
    key: ({ params }: PatchReactionAPIRequest) => [
      "patch",
      "reactions",
      params?.reactionId,
    ],
    fn: patchReactionAPI,
  },
  delete: {
    key: ({ params }: DeleteReactionAPIRequest) => [
      "delete",
      "reactions",
      params?.reactionId,
    ],
    fn: deleteReactionAPI,
  },
};
