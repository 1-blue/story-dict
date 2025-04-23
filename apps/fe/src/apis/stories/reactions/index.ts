import type { StoryReaction } from "@sd/db";
import {
  fetchInstance,
  fetchInstanceHandleError,
  fetchInstanceHandleResponse,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 이야기의 리액션 생성 ==============================
/** 이야기의 리액션 생성 요청 타입 */
export interface ICreateStoryReactionAPIRequest {
  params: Pick<StoryReaction, "storyId">;
  body: Partial<Pick<StoryReaction, "id">> & Pick<StoryReaction, "type">;
}
/** 이야기의 리액션 생성 응답 타입 */
export interface ICreateStoryReactionAPIResponse
  extends IAPIResponse<StoryReaction> {}
/** 이야기의 리액션 생성 함수 */
export const createStoryReactionAPI = async ({
  params,
  body,
}: ICreateStoryReactionAPIRequest): Promise<ICreateStoryReactionAPIResponse> => {
  return fetchInstance(storyReactionApis.create.endPoint({ params }), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기의 리액션 수정 ==============================
/** 이야기의 리액션 수정 요청 타입 */
export interface IPatchStoryReactionAPIRequest {
  params: Pick<StoryReaction, "storyId"> & { reactionId: StoryReaction["id"] };
  body: Partial<ICreateStoryReactionAPIRequest["body"]>;
}
/** 이야기의 리액션 수정 응답 타입 */
export interface IPatchStoryReactionAPIResponse
  extends IAPIResponse<StoryReaction> {}
/** 이야기의 리액션 수정 함수 */
export const patchStoryReactionAPI = async ({
  params,
  body,
}: IPatchStoryReactionAPIRequest): Promise<IPatchStoryReactionAPIResponse> => {
  return fetchInstance(storyReactionApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기의 리액션 삭제 ==============================
/** 이야기의 리액션 삭제 요청 타입 */
export interface IDeleteStoryReactionAPIRequest {
  params: Pick<StoryReaction, "storyId"> & { reactionId: StoryReaction["id"] };
}
/** 이야기의 리액션 삭제 응답 타입 */
export interface IDeleteStoryReactionAPIResponse
  extends IAPIResponse<StoryReaction> {}
/** 이야기의 리액션 삭제 함수 */
export const deleteStoryReactionAPI = async ({
  params,
}: IDeleteStoryReactionAPIRequest): Promise<IDeleteStoryReactionAPIResponse> => {
  return fetchInstance(storyReactionApis.delete.endPoint({ params }), {
    method: "DELETE",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const storyReactionApis = {
  create: {
    endPoint: ({ params }: Pick<ICreateStoryReactionAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/${params.storyId}/reactions`,
    key: ({ params }: ICreateStoryReactionAPIRequest) => [
      "create",
      "stories",
      params.storyId,
      "reactions",
    ],
    fn: createStoryReactionAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchStoryReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/stories/${params.storyId}/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IPatchStoryReactionAPIRequest, "params">) => [
      "patch",
      "stories",
      params.storyId,
      "reactions",
      params.reactionId,
    ],
    fn: patchStoryReactionAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<IDeleteStoryReactionAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/stories/${params.storyId}/reactions/${params.reactionId}`,
    key: ({ params }: Pick<IDeleteStoryReactionAPIRequest, "params">) => [
      "delete",
      "stories",
      params.storyId,
      "reactions",
      params.reactionId,
    ],
    fn: deleteStoryReactionAPI,
  },
};
