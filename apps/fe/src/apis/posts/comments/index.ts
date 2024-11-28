import type { Comment, Image, Post, CommentReaction, User } from "#be/types";
import {
  fetchInstance,
  fetchInstanceHandleError,
  fetchInstanceHandleResponse,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 게시글의 댓글 생성 ==============================
/** 게시글의 댓글 생성 요청 타입 */
export interface ICreatePostCommentAPIRequest {
  params: { postId: Post["id"] };
  body: Partial<Pick<Comment, "id">> & Pick<Comment, "content">;
}

/** 게시글의 댓글 생성 응답 타입 */
export interface ICreatePostCommentAPIResponse
  extends IAPIResponse<
    Comment & {
      user: Pick<User, "id" | "nickname"> & {
        image: Pick<Image, "id" | "url">;
      };
      reactions: Pick<CommentReaction, "id" | "type" | "userId">[];
    }
  > {}
/** 게시글의 댓글 생성 함수 */
export const createPostCommentAPI = async ({
  params,
  body,
}: ICreatePostCommentAPIRequest): Promise<ICreatePostCommentAPIResponse> => {
  return fetchInstance(postCommentApis.create.endPoint({ params }), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 게시글의 모든 댓글 요청 ==============================
/** 게시글의 모든 댓글 요청 요청 타입 */
export interface IGetAllPostCommentAPIRequest {
  params: { postId: Post["id"] };
}
/** 게시글의 모든 댓글 요청 응답 타입 */
export interface IGetAllPostCommentAPIResponse
  extends IAPIResponse<
    (Comment & {
      user: Pick<User, "id" | "nickname"> & {
        image: Pick<Image, "id" | "url">;
      };
      reactions: Pick<CommentReaction, "id" | "type" | "userId">[];
    })[]
  > {}
/** 게시글의 모든 댓글 요청 함수 */
export const getAllPostCommentAPI = async ({
  params,
}: IGetAllPostCommentAPIRequest): Promise<IGetAllPostCommentAPIResponse> => {
  return fetchInstance(postCommentApis.getAll.endPoint({ params }), {
    method: "GET",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 게시글의 댓글 수정 ==============================
/** 게시글의 댓글 수정 요청 타입 */
export interface IPatchPostCommentAPIRequest {
  params: { postId: Post["id"]; commentId: Comment["id"] };
  body: Partial<ICreatePostCommentAPIRequest["body"]>;
}
/** 게시글의 댓글 수정 응답 타입 */
export interface IPatchPostCommentAPIResponse
  extends IAPIResponse<
    (Comment & {
      user: Pick<User, "id" | "nickname"> & {
        image: Pick<Image, "id" | "url">;
      };
      reactions: Pick<CommentReaction, "id" | "type" | "userId">[];
    })[]
  > {}
/** 게시글의 댓글 수정 함수 */
export const patchPostCommentAPI = async ({
  body,
  params,
}: IPatchPostCommentAPIRequest): Promise<IPatchPostCommentAPIResponse> => {
  return fetchInstance(postCommentApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 게시글의 댓글 삭제 ==============================
/** 게시글의 댓글 삭제 요청 타입 */
export interface IDeletePostCommentAPIRequest {
  params: { postId: Post["id"]; commentId: Comment["id"] };
}
/** 게시글의 댓글 삭제 응답 타입 */
export interface IDeletePostCommentAPIResponse extends IAPIResponse<Comment> {}
/** 게시글의 댓글 삭제 함수 */
export const deletePostCommentAPI = async ({
  params,
}: IDeletePostCommentAPIRequest): Promise<IDeletePostCommentAPIResponse> => {
  return fetchInstance(postCommentApis.delete.endPoint({ params }), {
    method: "DELETE",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const postCommentApis = {
  create: {
    endPoint: ({ params }: Pick<ICreatePostCommentAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}/comments`,
    key: ({ params }: ICreatePostCommentAPIRequest) => [
      "create",
      "posts",
      params.postId,
      "comments",
    ],
    fn: createPostCommentAPI,
  },
  getAll: {
    endPoint: ({ params }: Pick<IGetAllPostCommentAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}/comments`,
    key: ({ params }: IGetAllPostCommentAPIRequest) => [
      "get",
      "posts",
      params.postId,
      "comments",
    ],
    fn: getAllPostCommentAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchPostCommentAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}`,
    key: ({ params }: IPatchPostCommentAPIRequest) => [
      "patch",
      "posts",
      params.postId,
      "comments",
      params.commentId,
    ],
    fn: patchPostCommentAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<IDeletePostCommentAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}`,
    key: ({ params }: IDeletePostCommentAPIRequest) => [
      "delete",
      "posts",
      params.postId,
      "comments",
      params.commentId,
    ],
    fn: deletePostCommentAPI,
  },
};
