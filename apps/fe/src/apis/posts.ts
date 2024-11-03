import { CustomError } from "#fe/libs/error";
import type { Image, Post, PostCategory, Reaction, User } from "#be/types";
import { fetchInstance } from "#fe/apis/fetchInstance";

// ============================== 게시글 생성 ==============================
/** 게시글 생성 요청 타입 */
export interface CreatePostAPIRequest {
  body: Partial<Pick<Post, "id" | "category" | "thumbnailId">> &
    Pick<Post, "title" | "summary" | "content">;
}
/** 게시글 생성 응답 타입 */
export interface CreatePostAPIResponse extends Post {}
/** 게시글 생성 함수 */
export const createPostAPI = async ({
  body,
}: CreatePostAPIRequest): Promise<CreatePostAPIResponse> => {
  return fetchInstance(postApis.create.endPoint(), {
    method: "POST",
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
  return fetchInstance(process.env.NEXT_PUBLIC_SERVER_URL + `/apis/v1/posts`, {
    method: "GET",
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
export interface GetOnePostAPIRequest {
  params: { postId: Post["id"] };
}
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
  return fetchInstance(postApis.getOne.endPoint({ params }), {
    method: "GET",
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

// ============================== 랜덤 게시글들 가져오기 ==============================
/** 랜덤 게시글들 요청 타입 */
export interface GetManyRandomPostAPIRequest {
  queries: { existingIds?: string };
}
/** 랜덤 게시글들 응답 타입 */
export type GetManyRandomPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 랜덤 게시글들 가져오기 함수 */
export const getManyRandomPostAPI = async ({
  queries,
}: GetManyRandomPostAPIRequest): Promise<GetManyRandomPostAPIResponse> => {
  return fetchInstance(postApis.getManyRandom.endPoint({ queries }), {
    method: "GET",
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
      console.log("🚀 err >> ", err);
      throw new CustomError(err);
    });
};

// ============================== 검색된 게시글들 가져오기 ==============================
/** 검색된 게시글들 가져오기 요청 타입 */
export interface GetManyCategoryPostAPIRequest {
  params: { category: PostCategory };
}
/** 검색된 게시글들 가져오기 응답 타입 */
export type GetManyCategoryPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 검색된 게시글들 가져오기  함수 */
export const getManyCategoryPostAPI = async ({
  params,
}: GetManyCategoryPostAPIRequest): Promise<GetManyCategoryPostAPIResponse> => {
  return fetchInstance(postApis.getManyCategory.endPoint({ params }), {
    method: "GET",
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

// ============================== 카테고리 게시글들 가져오기 ==============================
/** 카테고리 게시글들 가져오기 요청 타입 */
export interface GetManyKeywordPostAPIRequest {
  params: { keyword: string };
}
/** 카테고리 게시글들 가져오기 응답 타입 */
export type GetManyKeywordPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 카테고리 게시글들 가져오기  함수 */
export const getManyKeywordPostAPI = async ({
  params,
}: GetManyKeywordPostAPIRequest): Promise<GetManyKeywordPostAPIResponse> => {
  return fetchInstance(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/apis/v1/posts/search/${params?.keyword}`,
    {
      method: "GET",
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
export interface PatchPostAPIRequest {
  params: { postId: Post["id"] };
  body: Partial<CreatePostAPIRequest["body"]>;
}
/** 게시글 수정 응답 타입 */
export interface PatchPostAPIResponse extends Post {}
/** 게시글 수정 함수 */
export const patchPostAPI = async ({
  body,
  params,
}: PatchPostAPIRequest): Promise<PatchPostAPIResponse> => {
  return fetchInstance(postApis.patch.endPoint({ params }), {
    method: "PATCH",
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

// ============================== 게시글 삭제 ==============================
/** 게시글 삭제 요청 타입 */
export interface DeletePostAPIRequest {
  params: { postId: Post["id"] };
}
/** 게시글 삭제 응답 타입 */
export interface DeletePostAPIResponse extends Post {}
/** 게시글 삭제 함수 */
export const deletePostAPI = async ({
  params,
}: DeletePostAPIRequest): Promise<DeletePostAPIResponse> => {
  return fetchInstance(postApis.delete.endPoint({ params }), {
    method: "DELETE",
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

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const postApis = {
  create: {
    endPoint: () => SERVER_URL + "/apis/v1/posts",
    key: () => ["create", "posts"],
    fn: createPostAPI,
  },
  getAll: {
    endPoint: () => SERVER_URL + "/apis/v1/posts",
    key: () => ["get", "posts"],
    fn: getAllPostAPI,
  },
  getOne: {
    endPoint: ({ params }: Pick<GetOnePostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}`,
    key: ({ params }: Pick<GetOnePostAPIRequest, "params">) => [
      "get",
      "posts",
      params.postId,
    ],
    fn: getOnePostAPI,
  },
  getManyRandom: {
    endPoint: ({ queries }: Pick<GetManyRandomPostAPIRequest, "queries">) =>
      SERVER_URL +
      `/apis/v1/posts/random` +
      `${queries.existingIds ? `?existingIds=${queries.existingIds}` : `?existingIds=""`}`,
    key: ({ queries }: Pick<GetManyRandomPostAPIRequest, "queries">) => [
      "get",
      "posts",
      "random",
      queries.existingIds,
    ],
    fn: getManyRandomPostAPI,
  },
  getManyCategory: {
    endPoint: ({ params }: Pick<GetManyCategoryPostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/category/${params.category}`,
    key: ({ params }: Pick<GetManyCategoryPostAPIRequest, "params">) => [
      "get",
      "posts",
      "category",
      params.category,
    ],
    fn: getManyCategoryPostAPI,
  },
  getManyKeyword: {
    endPoint: ({ params }: Pick<GetManyKeywordPostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/search/${params.keyword}`,
    key: ({ params }: Pick<GetManyKeywordPostAPIRequest, "params">) => [
      "get",
      "posts",
      "keyword",
      params.keyword,
    ],
    fn: getManyKeywordPostAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<PatchPostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}`,
    key: ({ params }: Pick<PatchPostAPIRequest, "params">) => [
      "patch",
      "posts",
      params.postId,
    ],
    fn: patchPostAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<DeletePostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}`,
    key: ({ params }: Pick<DeletePostAPIRequest, "params">) => [
      "delete",
      "posts",
      params.postId,
    ],
    fn: deletePostAPI,
  },
};
