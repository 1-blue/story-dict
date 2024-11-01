import { CustomError } from "#fe/libs/error";
import type { Comment, Image, Post, Reaction, User } from "#be/types";

// ============================== 댓글 생성 ==============================
/** 댓글 생성 요청 타입 */
export interface CreateCommentAPIRequest {
  params: { postId: Post["id"] };
  body: Partial<Pick<Comment, "id">> & Pick<Comment, "content">;
}

/** 댓글 생성 응답 타입 */
export interface CreateCommentAPIResponse extends Comment {
  user: Pick<User, "id" | "nickname"> & {
    image: Pick<Image, "id" | "url">;
  };
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
}
/** 댓글 생성 함수 */
export const createCommentAPI = async ({
  params,
  body,
}: CreateCommentAPIRequest): Promise<CreateCommentAPIResponse> => {
  return fetch(commentApis.create.endPoint({ params }), {
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
export interface GetAllCommentAPIRequest {
  params: { postId: Post["id"] };
}
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
  return fetch(commentApis.getAll.endPoint({ params }), {
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

// ============================== 댓글 수정 ==============================
/** 댓글 수정 요청 타입 */
export interface PatchCommentAPIRequest {
  params: { postId: Post["id"]; commentId: Comment["id"] };
  body: Partial<CreateCommentAPIRequest["body"]>;
}
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
  return fetch(commentApis.patch.endPoint({ params }), {
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

// ============================== 댓글 삭제 ==============================
/** 댓글 삭제 요청 타입 */
export interface DeleteCommentAPIRequest {
  params: { postId: Post["id"]; commentId: Comment["id"] };
}
/** 댓글 삭제 응답 타입 */
export interface DeleteCommentAPIResponse extends Comment {}
/** 댓글 삭제 함수 */
export const deleteCommentAPI = async ({
  params,
}: DeleteCommentAPIRequest): Promise<DeleteCommentAPIResponse> => {
  return fetch(commentApis.delete.endPoint({ params }), {
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

export const commentApis = {
  create: {
    endPoint: ({ params }: Pick<CreateCommentAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}/comments`,
    key: ({ params }: CreateCommentAPIRequest) => [
      "create",
      "posts",
      params.postId,
      "comments",
    ],
    fn: createCommentAPI,
  },
  getAll: {
    endPoint: ({ params }: Pick<GetAllCommentAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}/comments`,
    key: ({ params }: GetAllCommentAPIRequest) => [
      "get",
      "posts",
      params.postId,
      "comments",
    ],
    fn: getAllCommentAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<PatchCommentAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}`,
    key: ({ params }: PatchCommentAPIRequest) => [
      "patch",
      "posts",
      params.postId,
      "comments",
      params.commentId,
    ],
    fn: patchCommentAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<DeleteCommentAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}`,
    key: ({ params }: DeleteCommentAPIRequest) => [
      "delete",
      "posts",
      params.postId,
      "comments",
      params.commentId,
    ],
    fn: deleteCommentAPI,
  },
};
