import { CustomError } from "#fe/libs/error";
import type { APIRuquestType } from "#fe/types";
import type { Image, Post, PostCategory, Reaction, User } from "#be/types";

// ============================== 게시글 생성 ==============================
/** 게시글 생성 요청 타입 */
export interface CreatePostAPIRequest
  extends APIRuquestType<
    Partial<Pick<Post, "id" | "category" | "thumbnailId">> &
      Pick<Post, "title" | "summary" | "content">
  > {}
/** 게시글 생성 응답 타입 */
export interface CreatePostAPIResponse extends Post {}
/** 게시글 생성 함수 */
export const createPostAPI = async (
  body: CreatePostAPIRequest,
): Promise<CreatePostAPIResponse> => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/apis/v1/posts`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};

// ============================== 모든 게시글 가져오기 ==============================
/** 모든 게시글 가져오기 요청 타입 */
export interface GetAllPostAPIRequest {}
/** 모든 게시글 가져오기 응답 타입 */
export type GetAllPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
})[];
/** 모든 게시글 가져오기 함수 */
export const getAllPostAPI = async (): Promise<GetAllPostAPIResponse> => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/apis/v1/posts`, {
    method: "GET",
    credentials: "include",
  })
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};

// ============================== 특정 게시글 가져오기 ==============================
/** 특정 게시글 가져오기 요청 타입 */
export interface GetOnePostAPIRequest
  extends APIRuquestType<{}, { postId: Post["id"] }> {}
/** 특정 게시글 가져오기 응답 타입 */
export interface GetOnePostAPIResponse extends Post {
  user: Pick<User, "id" | "nickname"> & {
    image?: Pick<Image, "id" | "url">;
  };
  thumbnail?: Pick<Image, "id" | "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
}
/** 특정 게시글 가져오기 함수 */
export const getOnePostAPI = async ({
  params,
}: GetOnePostAPIRequest): Promise<GetOnePostAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + `/apis/v1/posts/${params?.postId}`,
    {
      method: "GET",
      credentials: "include",
    },
  )
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};

// ============================== 랜덤 게시글들 가져오기 ==============================
/** 랜덤 게시글들 요청 타입 */
export interface GetManyRandomPostAPIRequest
  extends APIRuquestType<{}, {}, { existingIds: string }> {}
/** 랜덤 게시글들 응답 타입 */
export type GetManyRandomPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 랜덤 게시글들 가져오기 함수 */
export const getManyRandomPostAPI = async ({
  queries,
}: GetManyRandomPostAPIRequest): Promise<GetManyRandomPostAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/posts/random` +
      `${queries?.existingIds ? `?existingIds=${queries?.existingIds}` : `?existingIds=""`}`,
    {
      method: "GET",
      credentials: "include",
    },
  )
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};

// ============================== 검색된 게시글들 가져오기 ==============================
/** 검색된 게시글들 가져오기 요청 타입 */
export interface GetAllCategoryPostAPIRequest
  extends APIRuquestType<{}, { category: PostCategory }> {}
/** 검색된 게시글들 가져오기 응답 타입 */
export type GetAllCategoryPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 검색된 게시글들 가져오기  함수 */
export const getAllCategoryPostAPI = async ({
  params,
}: GetAllCategoryPostAPIRequest): Promise<GetAllCategoryPostAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/posts/category/${params?.category}`,
    {
      method: "GET",
      credentials: "include",
    },
  )
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};

// ============================== 카테고리 게시글들 가져오기 ==============================
/** 카테고리 게시글들 가져오기 요청 타입 */
export interface GetManyKeywordPostAPIRequest
  extends APIRuquestType<{}, { keyword: string }> {}
/** 카테고리 게시글들 가져오기 응답 타입 */
export type GetManyKeywordPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 카테고리 게시글들 가져오기  함수 */
export const getManyKeywordPostAPI = async ({
  params,
}: GetManyKeywordPostAPIRequest): Promise<GetManyKeywordPostAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/posts/search/${params?.keyword}`,
    {
      method: "GET",
      credentials: "include",
    },
  )
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};

// ============================== 게시글 수정 ==============================
/** 게시글 수정 요청 타입 */
export interface PatchPostAPIRequest
  extends APIRuquestType<
    Partial<CreatePostAPIRequest["body"]>,
    { postId: Post["id"] }
  > {}
/** 게시글 수정 응답 타입 */
export interface PatchPostAPIResponse extends Post {}
/** 게시글 수정 함수 */
export const patchPostAPI = async ({
  body,
  params,
}: PatchPostAPIRequest): Promise<PatchPostAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + `/apis/v1/posts/${params?.postId}`,
    {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(body),
    },
  )
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};

// ============================== 게시글 삭제 ==============================
/** 게시글 삭제 요청 타입 */
export interface DeletePostAPIRequest
  extends APIRuquestType<{}, { postId: Post["id"] }> {}
/** 게시글 삭제 응답 타입 */
export interface DeletePostAPIResponse extends Post {}
/** 게시글 삭제 함수 */
export const deletePostAPI = async ({
  params,
}: DeletePostAPIRequest): Promise<DeletePostAPIResponse> => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + `/apis/v1/posts/${params?.postId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  )
    .then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    })
    .catch((err) => {
      throw new CustomError(err);
    });
};

export const postApis = {
  create: {
    key: () => ["create", "posts"],
    fn: createPostAPI,
  },
  getAll: {
    key: () => ["get", "all", "posts"],
    fn: getAllPostAPI,
  },
  getOne: {
    key: ({ params }: GetOnePostAPIRequest) => [
      "get",
      "posts",
      "one",
      params?.postId,
    ],
    fn: getOnePostAPI,
  },
  getManyRandom: {
    key: ({ queries }: GetManyRandomPostAPIRequest) => [
      "get",
      "many",
      "random",
      "posts",
      queries?.existingIds,
    ],
    fn: getManyRandomPostAPI,
  },
  getManyKeyword: {
    key: ({ params }: GetManyKeywordPostAPIRequest) => [
      "get",
      "many",
      "keyword",
      "posts",
      params?.keyword,
    ],
    fn: getManyKeywordPostAPI,
  },
  getAllCategory: {
    key: ({ params }: GetAllCategoryPostAPIRequest) => [
      "get",
      "all",
      "category",
      "posts",
      params?.category,
    ],
    fn: getAllCategoryPostAPI,
  },
  patch: {
    key: ({ params }: PatchPostAPIRequest) => [
      "patch",
      "posts",
      params?.postId,
    ],
    fn: patchPostAPI,
  },
  delete: {
    key: ({ params }: DeletePostAPIRequest) => [
      "delete",
      "posts",
      params?.postId,
    ],
    fn: deletePostAPI,
  },
};
