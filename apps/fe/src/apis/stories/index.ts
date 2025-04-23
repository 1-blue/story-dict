import type { Story, StoryCategory, StoryReaction, User } from "@sd/db";
import {
  fetchInstance,
  fetchInstanceHandleResponse,
  fetchInstanceHandleError,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 이야기 생성 ==============================
/** 이야기 생성 요청 타입 */
export interface ICreateStoryAPIRequest {
  body: Partial<Pick<Story, "id" | "category" | "thumbnailPath">> &
    Pick<Story, "title" | "summary" | "content">;
}
/** 이야기 생성 응답 타입 */
export interface ICreateStoryAPIResponse extends IAPIResponse<Story> {}
/** 이야기 생성 함수 */
export const createStoryAPI = async ({
  body,
}: ICreateStoryAPIRequest): Promise<ICreateStoryAPIResponse> => {
  return fetchInstance(storyApis.create.endPoint(), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 모든 이야기 가져오기 ==============================
/** 모든 이야기 가져오기 요청 타입 */
export interface IGetAllStoryAPIRequest {}
/** 모든 이야기 가져오기 응답 타입 */
export interface IGetAllStoryAPIResponse extends IAPIResponse<Story[]> {}
/** 모든 이야기 가져오기 함수 */
export const getAllStoryAPI = async (): Promise<IGetAllStoryAPIResponse> => {
  return fetchInstance(storyApis.getAll.endPoint(), {
    method: "GET",
    next: { tags: storyApis.getAll.key() },
    cache: "no-cache",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 특정 이야기 가져오기 ==============================
/** 특정 이야기 가져오기 요청 타입 */
export interface IGetOneStoryAPIRequest {
  params: { storyId: Story["id"] };
}
/** 특정 이야기 가져오기 응답 타입 */
export interface IGetOneStoryAPIResponse
  extends IAPIResponse<
    Story & {
      user: Pick<User, "id" | "nickname" | "imagePath">;
      reactions: Pick<StoryReaction, "id" | "type" | "userId">[];
    }
  > {}
/** 특정 이야기 가져오기 함수 */
export const getOneStoryAPI = async ({
  params,
}: IGetOneStoryAPIRequest): Promise<IGetOneStoryAPIResponse> => {
  return fetchInstance(storyApis.getOne.endPoint({ params }), {
    method: "GET",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 제목으로 특정 이야기 가져오기 ==============================
/** 제목으로 특정 이야기 가져오기 요청 타입 */
export interface IGetOneStoryByTitleAPIRequest {
  params: { title: Story["title"] };
}
/** 제목으로 특정 이야기 가져오기 응답 타입 */
export interface IGetOneStoryByTitleAPIResponse
  extends IAPIResponse<
    Story & {
      user: Pick<User, "id" | "nickname" | "imagePath">;
      reactions: Pick<StoryReaction, "id" | "type" | "userId">[];
    }
  > {}
/** 제목으로 특정 이야기 가져오기 함수 */
export const getOneStoryByTitleAPI = async ({
  params,
}: IGetOneStoryByTitleAPIRequest): Promise<IGetOneStoryByTitleAPIResponse> => {
  return fetchInstance(storyApis.getOneByTitle.endPoint({ params }), {
    method: "GET",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 랜덤 이야기들 가져오기 ==============================
/** 랜덤 이야기들 요청 타입 */
export interface IGetManyRandomStoryAPIRequest {
  queries: { existingIds?: string };
}
/** 랜덤 이야기들 응답 타입 */
export interface IGetManyRandomStoryAPIResponse
  extends IAPIResponse<
    (Story & {
      reactions: Pick<StoryReaction, "id" | "type" | "userId">[];
    })[]
  > {}
/** 랜덤 이야기들 가져오기 함수 */
export const getManyRandomStoryAPI = async ({
  queries,
}: IGetManyRandomStoryAPIRequest): Promise<IGetManyRandomStoryAPIResponse> => {
  return fetchInstance(storyApis.getManyRandom.endPoint({ queries }), {
    method: "GET",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 검색된 이야기들 가져오기 ==============================
/** 검색된 이야기들 가져오기 요청 타입 */
export interface IGetManyCategoryStoryAPIRequest {
  params: { category: StoryCategory };
}
/** 검색된 이야기들 가져오기 응답 타입 */
export interface IGetManyCategoryStoryAPIResponse
  extends IAPIResponse<
    (Story & {
      reactions: Pick<StoryReaction, "id" | "type" | "userId">[];
    })[]
  > {}
/** 검색된 이야기들 가져오기  함수 */
export const getManyCategoryStoryAPI = async ({
  params,
}: IGetManyCategoryStoryAPIRequest): Promise<IGetManyCategoryStoryAPIResponse> => {
  return fetchInstance(storyApis.getManyCategory.endPoint({ params }), {
    method: "GET",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 카테고리 이야기들 가져오기 ==============================
/** 카테고리 이야기들 가져오기 요청 타입 */
export interface IGetManyKeywordStoryAPIRequest {
  params: { keyword: string };
}
/** 카테고리 이야기들 가져오기 응답 타입 */
export interface IGetManyKeywordStoryAPIResponse
  extends IAPIResponse<
    (Story & {
      reactions: Pick<StoryReaction, "id" | "type" | "userId">[];
    })[]
  > {}
/** 카테고리 이야기들 가져오기  함수 */
export const getManyKeywordStoryAPI = async ({
  params,
}: IGetManyKeywordStoryAPIRequest): Promise<IGetManyKeywordStoryAPIResponse> => {
  return fetchInstance(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/stories/search/${params?.keyword}`,
    {
      method: "GET",
    },
  )
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기 수정 ==============================
/** 이야기 수정 요청 타입 */
export interface IPatchStoryAPIRequest {
  params: { storyId: Story["id"] };
  body: Partial<ICreateStoryAPIRequest["body"]>;
}
/** 이야기 수정 응답 타입 */
export interface IPatchStoryAPIResponse extends IAPIResponse<Story> {}
/** 이야기 수정 함수 */
export const patchStoryAPI = async ({
  body,
  params,
}: IPatchStoryAPIRequest): Promise<IPatchStoryAPIResponse> => {
  return fetchInstance(storyApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기 삭제 ==============================
/** 이야기 삭제 요청 타입 */
export interface IDeleteStoryAPIRequest {
  params: { storyId: Story["id"] };
}
/** 이야기 삭제 응답 타입 */
export interface IDeleteStoryAPIResponse extends IAPIResponse<Story> {}
/** 이야기 삭제 함수 */
export const deleteStoryAPI = async ({
  params,
}: IDeleteStoryAPIRequest): Promise<IDeleteStoryAPIResponse> => {
  return fetchInstance(storyApis.delete.endPoint({ params }), {
    method: "DELETE",
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이야기 제목 유니크 확인 ==============================
/** 이야기 제목 유니크 확인 요청 타입 */
export interface ICheckUniqueTitleAPIRequest {
  body: Pick<Story, "title">;
}
/** 이야기 제목 유니크 확인 응답 타입 */
export interface ICheckUniqueTitleAPIResponse
  extends IAPIResponse<{
    isUnique: boolean;
  }> {}
/** 이야기 제목 유니크 확인 함수 */
export const checkUniqueTitleAPI = async ({
  body,
}: ICheckUniqueTitleAPIRequest): Promise<ICheckUniqueTitleAPIResponse> => {
  return fetchInstance(storyApis.checkUniqueTitle.endPoint(), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const storyApis = {
  create: {
    endPoint: () => SERVER_URL + "/apis/v1/stories",
    key: () => ["create", "stories"],
    fn: createStoryAPI,
  },
  getAll: {
    endPoint: () => SERVER_URL + "/apis/v1/stories",
    key: () => ["get", "stories"],
    fn: getAllStoryAPI,
  },
  getOne: {
    endPoint: ({ params }: Pick<IGetOneStoryAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/${params.storyId}`,
    key: ({ params }: Pick<IGetOneStoryAPIRequest, "params">) => [
      "get",
      "stories",
      params.storyId,
    ],
    fn: getOneStoryAPI,
  },
  getOneByTitle: {
    endPoint: ({ params }: Pick<IGetOneStoryByTitleAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/title/${params.title}`,
    key: ({ params }: Pick<IGetOneStoryByTitleAPIRequest, "params">) => [
      "get",
      "stories",
      "title",
      params.title,
    ],
    fn: getOneStoryByTitleAPI,
  },
  getManyRandom: {
    endPoint: ({ queries }: Pick<IGetManyRandomStoryAPIRequest, "queries">) =>
      SERVER_URL +
      `/apis/v1/stories/random` +
      `${queries.existingIds ? `?existingIds=${queries.existingIds}` : `?existingIds=""`}`,
    key: ({ queries }: Pick<IGetManyRandomStoryAPIRequest, "queries">) => [
      "get",
      "stories",
      "random",
      queries.existingIds,
    ],
    fn: getManyRandomStoryAPI,
  },
  getManyCategory: {
    endPoint: ({ params }: Pick<IGetManyCategoryStoryAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/category/${params.category}`,
    key: ({ params }: Pick<IGetManyCategoryStoryAPIRequest, "params">) => [
      "get",
      "stories",
      "category",
      params.category,
    ],
    fn: getManyCategoryStoryAPI,
  },
  getManyKeyword: {
    endPoint: ({ params }: Pick<IGetManyKeywordStoryAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/search/${params.keyword}`,
    key: ({ params }: Pick<IGetManyKeywordStoryAPIRequest, "params">) => [
      "get",
      "stories",
      "keyword",
      params.keyword,
    ],
    fn: getManyKeywordStoryAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchStoryAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/${params.storyId}`,
    key: ({ params }: Pick<IPatchStoryAPIRequest, "params">) => [
      "patch",
      "stories",
      params.storyId,
    ],
    fn: patchStoryAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<IDeleteStoryAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/stories/${params.storyId}`,
    key: ({ params }: Pick<IDeleteStoryAPIRequest, "params">) => [
      "delete",
      "stories",
      params.storyId,
    ],
    fn: deleteStoryAPI,
  },
  checkUniqueTitle: {
    endPoint: () => SERVER_URL + "/apis/v1/stories/check-unique-title",
    key: ({ body }: Pick<ICheckUniqueTitleAPIRequest, "body">) => [
      "check",
      "unique",
      "title",
      body.title,
    ],
    fn: checkUniqueTitleAPI,
  },
};
