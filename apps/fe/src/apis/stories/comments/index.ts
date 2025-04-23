import type { StoryComment, Story, StoryCommentReaction, User } from "@sd/db";
import {
  fetchInstance,
  fetchInstanceHandleError,
  fetchInstanceHandleResponse,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 이야기의 댓글 생성 ==============================
/** 이야기의 댓글 생성 요청 타입 */
export interface ICreateStoryCommentAPIRequest {
  params: { storyId: Story["id"] };
  body: Partial<Pick<StoryComment, "id">> & Pick<StoryComment, "content">;
}

/** 이야기의 댓글 생성 응답 타입 */
export interface ICreateStoryCommentAPIResponse
  extends IAPIResponse<
    StoryComment & {
      user: Pick<User, "id" | "nickname" | "imagePath">;
      reactions: Pick<StoryCommentReaction, "id" | "type" | "userId">[];
    }
  > {}
/** 이야기의 댓글 생성 함수 */
export const createStoryCommentAPI = async ({
  params,
  body,
}: ICreateStoryCommentAPIRequest): Promise<ICreateStoryCommentAPIResponse> => {
  return fetchInstance(storyCommentApis.create.endPoint({ params }), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기의 모든 댓글 요청 ==============================
/** 이야기의 모든 댓글 요청 요청 타입 */
export interface IGetAllStoryCommentAPIRequest {
  params: { storyId: Story["id"] };
}
/** 이야기의 모든 댓글 요청 응답 타입 */
export interface IGetAllStoryCommentAPIResponse
  extends IAPIResponse<
    (StoryComment & {
      user: Pick<User, "id" | "nickname" | "imagePath">;
      reactions: Pick<StoryCommentReaction, "id" | "type" | "userId">[];
    })[]
  > {}
/** 이야기의 모든 댓글 요청 함수 */
export const getAllStoryCommentAPI = async ({
  params,
}: IGetAllStoryCommentAPIRequest): Promise<IGetAllStoryCommentAPIResponse> => {
  return fetchInstance(storyCommentApis.getAll.endPoint({ params }), {
    method: "GET",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기의 댓글 수정 ==============================
/** 이야기의 댓글 수정 요청 타입 */
export interface IPatchStoryCommentAPIRequest {
  params: { storyId: Story["id"]; commentId: StoryComment["id"] };
  body: Partial<ICreateStoryCommentAPIRequest["body"]>;
}
/** 이야기의 댓글 수정 응답 타입 */
export interface IPatchStoryCommentAPIResponse
  extends IAPIResponse<
    (StoryComment & {
      user: Pick<User, "id" | "nickname" | "imagePath">;
      reactions: Pick<StoryCommentReaction, "id" | "type" | "userId">[];
    })[]
  > {}
/** 이야기의 댓글 수정 함수 */
export const patchStoryCommentAPI = async ({
  body,
  params,
}: IPatchStoryCommentAPIRequest): Promise<IPatchStoryCommentAPIResponse> => {
  return fetchInstance(storyCommentApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기의 댓글 삭제 ==============================
/** 이야기의 댓글 삭제 요청 타입 */
export interface IDeleteStoryCommentAPIRequest {
  params: { storyId: Story["id"]; commentId: StoryComment["id"] };
}
/** 이야기의 댓글 삭제 응답 타입 */
export interface IDeleteStoryCommentAPIResponse
  extends IAPIResponse<StoryComment> {}
/** 이야기의 댓글 삭제 함수 */
export const deleteStoryCommentAPI = async ({
  params,
}: IDeleteStoryCommentAPIRequest): Promise<IDeleteStoryCommentAPIResponse> => {
  return fetchInstance(storyCommentApis.delete.endPoint({ params }), {
    method: "DELETE",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const storyCommentApis = {
  create: {
    endPoint: ({ params }: Pick<ICreateStoryCommentAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/${params.storyId}/comments`,
    key: ({ params }: ICreateStoryCommentAPIRequest) => [
      "create",
      "stories",
      params.storyId,
      "comments",
    ],
    fn: createStoryCommentAPI,
  },
  getAll: {
    endPoint: ({ params }: Pick<IGetAllStoryCommentAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/${params.storyId}/comments`,
    key: ({ params }: IGetAllStoryCommentAPIRequest) => [
      "get",
      "stories",
      params.storyId,
      "comments",
    ],
    fn: getAllStoryCommentAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchStoryCommentAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/stories/${params.storyId}/comments/${params.commentId}`,
    key: ({ params }: IPatchStoryCommentAPIRequest) => [
      "patch",
      "stories",
      params.storyId,
      "comments",
      params.commentId,
    ],
    fn: patchStoryCommentAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<IDeleteStoryCommentAPIRequest, "params">) =>
      SERVER_URL +
      `/apis/v1/stories/${params.storyId}/comments/${params.commentId}`,
    key: ({ params }: IDeleteStoryCommentAPIRequest) => [
      "delete",
      "stories",
      params.storyId,
      "comments",
      params.commentId,
    ],
    fn: deleteStoryCommentAPI,
  },
};
