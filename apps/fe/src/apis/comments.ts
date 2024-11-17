import { CustomError } from "#fe/libs/error";
import type { Comment, Image, Post, Reaction, User } from "#be/types";
import { fetchInstance } from "#fe/apis/fetchInstance";

// ============================== 댓글 생성 ==============================
/** 댓글 생성 요청 타입 */
export interface ICreateCommentAPIRequest {
  params: { postId: Post["id"] };
  body: Partial<Pick<Comment, "id">> & Pick<Comment, "content">;
}

/** 댓글 생성 응답 타입 */
export interface ICreateCommentAPIResponse extends Comment {
  user: Pick<User, "id" | "nickname"> & {
    image: Pick<Image, "id" | "url">;
  };
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
}
/** 댓글 생성 함수 */
export const createCommentAPI = async ({
  params,
  body,
}: ICreateCommentAPIRequest): Promise<ICreateCommentAPIResponse> => {
  return fetchInstance(commentApis.create.endPoint({ params }), {
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

// ============================== 모든 댓글 요청 ==============================
/** 모든 댓글 요청 요청 타입 */
export interface IGetAllCommentAPIRequest {
  params: { postId: Post["id"] };
}
/** 모든 댓글 요청 응답 타입 */
export type TGetAllCommentAPIResponse = (Comment & {
  user: Pick<User, "id" | "nickname"> & {
    image: Pick<Image, "id" | "url">;
  };
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 모든 댓글 요청 함수 */
export const getAllCommentAPI = async ({
  params,
}: IGetAllCommentAPIRequest): Promise<TGetAllCommentAPIResponse> => {
  return fetchInstance(commentApis.getAll.endPoint({ params }), {
    method: "GET",
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
export interface IPatchCommentAPIRequest {
  params: { postId: Post["id"]; commentId: Comment["id"] };
  body: Partial<ICreateCommentAPIRequest["body"]>;
}
/** 댓글 수정 응답 타입 */
export type IPatchCommentAPIResponse = (Comment & {
  user: Pick<User, "id" | "nickname"> & {
    image: Pick<Image, "id" | "url">;
  };
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 댓글 수정 함수 */
export const patchCommentAPI = async ({
  body,
  params,
}: IPatchCommentAPIRequest): Promise<IPatchCommentAPIResponse> => {
  return fetchInstance(commentApis.patch.endPoint({ params }), {
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

// ============================== 댓글 삭제 ==============================
/** 댓글 삭제 요청 타입 */
export interface IDeleteCommentAPIRequest {
  params: { postId: Post["id"]; commentId: Comment["id"] };
}
/** 댓글 삭제 응답 타입 */
export interface IDeleteCommentAPIResponse extends Comment {}
/** 댓글 삭제 함수 */
export const deleteCommentAPI = async ({
  params,
}: IDeleteCommentAPIRequest): Promise<IDeleteCommentAPIResponse> => {
  return fetchInstance(commentApis.delete.endPoint({ params }), {
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

export const commentApis = {
  create: {
    endPoint: ({ params }: Pick<ICreateCommentAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}/comments`,
    key: ({ params }: ICreateCommentAPIRequest) => [
      "create",
      "posts",
      params.postId,
      "comments",
    ],
    fn: createCommentAPI,
  },
  getAll: {
    endPoint: ({ params }: Pick<IGetAllCommentAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}/comments`,
    key: ({ params }: IGetAllCommentAPIRequest) => [
      "get",
      "posts",
      params.postId,
      "comments",
    ],
    fn: getAllCommentAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchCommentAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}`,
    key: ({ params }: IPatchCommentAPIRequest) => [
      "patch",
      "posts",
      params.postId,
      "comments",
      params.commentId,
    ],
    fn: patchCommentAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<IDeleteCommentAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}`,
    key: ({ params }: IDeleteCommentAPIRequest) => [
      "delete",
      "posts",
      params.postId,
      "comments",
      params.commentId,
    ],
    fn: deleteCommentAPI,
  },
};
