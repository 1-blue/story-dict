import type { StoryCommentReaction } from "@sd/db";
import {
  fetchInstance,
  fetchInstanceHandleResponse,
  fetchInstanceHandleError,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 이야기의 댓글 리액션 생성 ==============================
/** 이야기의 댓글 리액션 생성 요청 타입 */
export interface ICreateStoryCommentReactionAPIRequest {
  params: Pick<StoryCommentReaction, "storyId" | "commentId">;
  body: Partial<Pick<StoryCommentReaction, "id">> &
    Pick<StoryCommentReaction, "type">;
}
/** 이야기의 댓글 리액션 생성 응답 타입 */
export interface ICreateStoryCommentReactionAPIResponse
  extends IAPIResponse<StoryCommentReaction> {}
/** 이야기의 댓글 리액션 생성 함수 */
export const createStoryCommentReactionAPI = async ({
  params,
  body,
}: ICreateStoryCommentReactionAPIRequest): Promise<ICreateStoryCommentReactionAPIResponse> => {
  return fetchInstance(storyCommentReactionApis.create.endPoint({ params }), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기의 댓글 리액션 수정 ==============================
/** 이야기의 댓글 리액션 수정 요청 타입 */
export interface IPatchStoryCommentReactionAPIRequest {
  params: Pick<StoryCommentReaction, "storyId" | "commentId"> & {
    reactionId: StoryCommentReaction["id"];
  };
  body: Partial<ICreateStoryCommentReactionAPIRequest["body"]>;
}
/** 이야기의 댓글 리액션 수정 응답 타입 */
export interface IPatchStoryCommentReactionAPIResponse
  extends IAPIResponse<StoryCommentReaction> {}
/** 이야기의 댓글 리액션 수정 함수 */
export const patchStoryCommentReactionAPI = async ({
  params,
  body,
}: IPatchStoryCommentReactionAPIRequest): Promise<IPatchStoryCommentReactionAPIResponse> => {
  return fetchInstance(storyCommentReactionApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기의 댓글 리액션 삭제 ==============================
/** 이야기의 댓글 리액션 삭제 요청 타입 */
export interface IDeleteStoryCommentReactionAPIRequest {
  params: Pick<StoryCommentReaction, "storyId" | "commentId"> & {
    reactionId: StoryCommentReaction["id"];
  };
}
/** 이야기의 댓글 리액션 삭제 응답 타입 */
export interface IDeleteStoryCommentReactionAPIResponse
  extends IAPIResponse<StoryCommentReaction> {}
/** 이야기의 댓글 리액션 삭제 함수 */
export const deleteStoryCommentReactionAPI = async ({
  params,
}: IDeleteStoryCommentReactionAPIRequest): Promise<IDeleteStoryCommentReactionAPIResponse> => {
  return fetchInstance(storyCommentReactionApis.delete.endPoint({ params }), {
    method: "DELETE",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const storyCommentReactionApis = {
  create: {
    endPoint: ({
      params,
    }: Pick<ICreateStoryCommentReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/stories/${params.storyId}/comments/${params.commentId}/reactions`,
    key: ({ params }: ICreateStoryCommentReactionAPIRequest) => [
      "create",
      "stories",
      params.storyId,
      "comments",
      params.commentId,
      "reactions",
    ],
    fn: createStoryCommentReactionAPI,
  },
  patch: {
    endPoint: ({
      params,
    }: Pick<IPatchStoryCommentReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/stories/${params.storyId}/comments/${params.commentId}/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IPatchStoryCommentReactionAPIRequest, "params">) => [
      "patch",
      "stories",
      params.storyId,
      "comments",
      params.commentId,
      "reactions",
      params.reactionId,
    ],
    fn: patchStoryCommentReactionAPI,
  },
  delete: {
    endPoint: ({
      params,
    }: Pick<IDeleteStoryCommentReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/stories/${params.storyId}/comments/${params.commentId}/reactions/${params.reactionId}`,
    key: ({
      params,
    }: Pick<IDeleteStoryCommentReactionAPIRequest, "params">) => [
      "delete",
      "stories",
      params.storyId,
      "comments",
      params.commentId,
      "reactions",
      params.reactionId,
    ],
    fn: deleteStoryCommentReactionAPI,
  },
};
