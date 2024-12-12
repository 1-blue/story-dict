import type { PostReaction } from "@sd/db";
import {
  fetchInstance,
  fetchInstanceHandleError,
  fetchInstanceHandleResponse,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 게시글의 리액션 생성 ==============================
/** 게시글의 리액션 생성 요청 타입 */
export interface ICreatePostReactionAPIRequest {
  params: Pick<PostReaction, "postId">;
  body: Partial<Pick<PostReaction, "id">> & Pick<PostReaction, "type">;
}
/** 게시글의 리액션 생성 응답 타입 */
export interface ICreatePostReactionAPIResponse
  extends IAPIResponse<PostReaction> {}
/** 게시글의 리액션 생성 함수 */
export const createPostReactionAPI = async ({
  params,
  body,
}: ICreatePostReactionAPIRequest): Promise<ICreatePostReactionAPIResponse> => {
  return fetchInstance(reactionApis.create.endPoint({ params }), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 게시글의 리액션 수정 ==============================
/** 게시글의 리액션 수정 요청 타입 */
export interface IPatchPostReactionAPIRequest {
  params: Pick<PostReaction, "postId"> & { reactionId: PostReaction["id"] };
  body: Partial<ICreatePostReactionAPIRequest["body"]>;
}
/** 게시글의 리액션 수정 응답 타입 */
export interface IPatchPostReactionAPIResponse
  extends IAPIResponse<PostReaction> {}
/** 게시글의 리액션 수정 함수 */
export const patchPostReactionAPI = async ({
  params,
  body,
}: IPatchPostReactionAPIRequest): Promise<IPatchPostReactionAPIResponse> => {
  return fetchInstance(reactionApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 게시글의 리액션 삭제 ==============================
/** 게시글의 리액션 삭제 요청 타입 */
export interface IDeletePostReactionAPIRequest {
  params: Pick<PostReaction, "postId"> & { reactionId: PostReaction["id"] };
}
/** 게시글의 리액션 삭제 응답 타입 */
export interface IDeletePostReactionAPIResponse
  extends IAPIResponse<PostReaction> {}
/** 게시글의 리액션 삭제 함수 */
export const deletePostReactionAPI = async ({
  params,
}: IDeletePostReactionAPIRequest): Promise<IDeletePostReactionAPIResponse> => {
  return fetchInstance(reactionApis.delete.endPoint({ params }), {
    method: "DELETE",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const reactionApis = {
  create: {
    endPoint: ({ params }: Pick<ICreatePostReactionAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}/reactions`,
    key: ({ params }: ICreatePostReactionAPIRequest) => [
      "create",
      "posts",
      params.postId,
      "reactions",
    ],
    fn: createPostReactionAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchPostReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IPatchPostReactionAPIRequest, "params">) => [
      "patch",
      "posts",
      params.postId,
      "reactions",
      params.reactionId,
    ],
    fn: patchPostReactionAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<IDeletePostReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/posts/${params.postId}/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IDeletePostReactionAPIRequest, "params">) => [
      "delete",
      "posts",
      params.postId,
      "reactions",
      params.reactionId,
    ],
    fn: deletePostReactionAPI,
  },
};
