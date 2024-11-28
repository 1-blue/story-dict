import type { CommentReaction } from "#be/types";
import {
  fetchInstance,
  fetchInstanceHandleResponse,
  fetchInstanceHandleError,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 게시글의 댓글 리액션 생성 ==============================
/** 게시글의 댓글 리액션 생성 요청 타입 */
export interface ICreatePostCommentReactionAPIRequest {
  params: Pick<CommentReaction, "postId" | "commentId">;
  body: Partial<Pick<CommentReaction, "id">> & Pick<CommentReaction, "type">;
}
/** 게시글의 댓글 리액션 생성 응답 타입 */
export interface ICreatePostCommentReactionAPIResponse
  extends IAPIResponse<CommentReaction> {}
/** 게시글의 댓글 리액션 생성 함수 */
export const createPostCommentReactionAPI = async ({
  params,
  body,
}: ICreatePostCommentReactionAPIRequest): Promise<ICreatePostCommentReactionAPIResponse> => {
  return fetchInstance(postCommentReactionApis.create.endPoint({ params }), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 게시글의 댓글 리액션 수정 ==============================
/** 게시글의 댓글 리액션 수정 요청 타입 */
export interface IPatchPostCommentReactionAPIRequest {
  params: Pick<CommentReaction, "postId" | "commentId"> & {
    reactionId: CommentReaction["id"];
  };
  body: Partial<ICreatePostCommentReactionAPIRequest["body"]>;
}
/** 게시글의 댓글 리액션 수정 응답 타입 */
export interface IPatchPostCommentReactionAPIResponse
  extends IAPIResponse<CommentReaction> {}
/** 게시글의 댓글 리액션 수정 함수 */
export const patchPostCommentReactionAPI = async ({
  params,
  body,
}: IPatchPostCommentReactionAPIRequest): Promise<IPatchPostCommentReactionAPIResponse> => {
  return fetchInstance(postCommentReactionApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 게시글의 댓글 리액션 삭제 ==============================
/** 게시글의 댓글 리액션 삭제 요청 타입 */
export interface IDeletePostCommentReactionAPIRequest {
  params: Pick<CommentReaction, "postId" | "commentId"> & {
    reactionId: CommentReaction["id"];
  };
}
/** 게시글의 댓글 리액션 삭제 응답 타입 */
export interface IDeletePostCommentReactionAPIResponse
  extends IAPIResponse<CommentReaction> {}
/** 게시글의 댓글 리액션 삭제 함수 */
export const deletePostCommentReactionAPI = async ({
  params,
}: IDeletePostCommentReactionAPIRequest): Promise<IDeletePostCommentReactionAPIResponse> => {
  return fetchInstance(postCommentReactionApis.delete.endPoint({ params }), {
    method: "DELETE",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const postCommentReactionApis = {
  create: {
    endPoint: ({
      params,
    }: Pick<ICreatePostCommentReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}/reactions`,
    key: ({ params }: ICreatePostCommentReactionAPIRequest) => [
      "create",
      "posts",
      params.postId,
      "comments",
      params.commentId,
      "reactions",
    ],
    fn: createPostCommentReactionAPI,
  },
  patch: {
    endPoint: ({
      params,
    }: Pick<IPatchPostCommentReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IPatchPostCommentReactionAPIRequest, "params">) => [
      "patch",
      "posts",
      params.postId,
      "comments",
      params.commentId,
      "reactions",
      params.reactionId,
    ],
    fn: patchPostCommentReactionAPI,
  },
  delete: {
    endPoint: ({
      params,
    }: Pick<IDeletePostCommentReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/comments/${params.commentId}/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IDeletePostCommentReactionAPIRequest, "params">) => [
      "delete",
      "posts",
      params.postId,
      "comments",
      params.commentId,
      "reactions",
      params.reactionId,
    ],
    fn: deletePostCommentReactionAPI,
  },
};
