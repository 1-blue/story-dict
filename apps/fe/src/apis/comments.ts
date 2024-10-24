import { CustomError } from "#fe/libs/error";
import type { APIRuquestType } from "#fe/types";
import type { Comment, Image, Post, Reaction, User } from "#be/types";

// ============================== 댓글 생성 ==============================
/** 댓글 생성 요청 타입 */
export interface CreateCommentAPIRequest
  extends APIRuquestType<
    Partial<Pick<Comment, "id">> & Pick<Comment, "content" | "postId">
  > {}

/** 댓글 생성 응답 타입 */
export interface CreateCommentAPIResponse extends Comment {
  user: Pick<User, "id" | "nickname"> & {
    image: Pick<Image, "id" | "url">;
  };
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
}
/** 댓글 생성 함수 */
export const createCommentAPI = async ({
  body,
}: CreateCommentAPIRequest): Promise<CreateCommentAPIResponse> => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/apis/v1/comments", {
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

// ============================== 모든 댓글 요청 ==============================
/** 모든 댓글 요청 요청 타입 */
export interface GetAllCommentAPIRequest
  extends APIRuquestType<{}, { postId: Post["id"] }> {}
/** 모든 댓글 요청 응답 타입 */
export type GetAllCommentAPIResponse = (Comment & {
  user: Pick<User, "id" | "nickname"> & {
    image: Pick<Image, "id" | "url">;
  };
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 모든 댓글 요청 함수 */
export const getAllCommentAPI = async ({
  params,
}: GetAllCommentAPIRequest): Promise<GetAllCommentAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + `/apis/v1/comments/${params?.postId}`,
    {
      method: "GET",
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

// ============================== 댓글 수정 ==============================
/** 댓글 수정 요청 타입 */
export interface PatchCommentAPIRequest
  extends APIRuquestType<
    Partial<CreateCommentAPIRequest>,
    { commentId: Comment["id"] }
  > {}
/** 댓글 수정 응답 타입 */
export type PatchCommentAPIResponse = (Comment & {
  user: Pick<User, "id" | "nickname"> & {
    image: Pick<Image, "id" | "url">;
  };
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 댓글 수정 함수 */
export const patchCommentAPI = async ({
  body,
  params,
}: PatchCommentAPIRequest): Promise<PatchCommentAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/comments/${params?.commentId}`,
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

// ============================== 댓글 삭제 ==============================
/** 댓글 삭제 요청 타입 */
export interface DeleteCommentAPIRequest
  extends APIRuquestType<{}, { commentId: Comment["id"] }> {}
/** 댓글 삭제 응답 타입 */
export interface DeleteCommentAPIResponse extends Comment {}
/** 댓글 삭제 함수 */
export const deleteCommentAPI = async ({
  params,
}: DeleteCommentAPIRequest): Promise<DeleteCommentAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/comments/${params?.commentId}`,
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

export const commentApis = {
  create: {
    key: () => ["create", "comments"],
    fn: createCommentAPI,
  },
  getAll: {
    key: ({ params }: GetAllCommentAPIRequest) => [
      "get",
      "comments",
      params?.postId,
    ],
    fn: getAllCommentAPI,
  },
  patch: {
    key: ({ params }: PatchCommentAPIRequest) => [
      "patch",
      "comments",
      params?.commentId,
    ],
    fn: patchCommentAPI,
  },
  delete: {
    key: ({ params }: DeleteCommentAPIRequest) => [
      "delete",
      "comments",
      params?.commentId,
    ],
    fn: deleteCommentAPI,
  },
};
