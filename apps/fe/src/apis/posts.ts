import { CustomError } from "#fe/libs/error";
import type { Image, Post, PostCategory, Reaction, User } from "#be/types";
import { fetchInstance } from "#fe/apis/fetchInstance";

// ============================== 게시글 생성 ==============================
/** 게시글 생성 요청 타입 */
export interface ICreatePostAPIRequest {
  body: Partial<Pick<Post, "id" | "category" | "thumbnailId">> &
    Pick<Post, "title" | "summary" | "content">;
}
/** 게시글 생성 응답 타입 */
export interface ICreatePostAPIResponse extends Post {}
/** 게시글 생성 함수 */
export const createPostAPI = async ({
  body,
}: ICreatePostAPIRequest): Promise<ICreatePostAPIResponse> => {
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
export interface IGetAllPostAPIRequest {}
/** 모든 게시글 가져오기 응답 타입 */
export type TGetAllPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
})[];
/** 모든 게시글 가져오기 함수 */
export const getAllPostAPI = async (): Promise<TGetAllPostAPIResponse> => {
  return fetchInstance(postApis.getAll.endPoint(), {
    method: "GET",
    next: { tags: postApis.getAll.key() },
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
export interface IGetOnePostAPIRequest {
  params: { postId: Post["id"] };
}
/** 특정 게시글 가져오기 응답 타입 */
export interface IGetOnePostAPIResponse extends Post {
  user: Pick<User, "id" | "nickname"> & {
    image?: Pick<Image, "id" | "url">;
  };
  thumbnail?: Pick<Image, "id" | "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
}
/** 특정 게시글 가져오기 함수 */
export const getOnePostAPI = async ({
  params,
}: IGetOnePostAPIRequest): Promise<IGetOnePostAPIResponse> => {
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

// ============================== 제목으로 특정 게시글 가져오기 ==============================
/** 제목으로 특정 게시글 가져오기 요청 타입 */
export interface IGetOnePostByTitleAPIRequest {
  params: { title: Post["title"] };
}
/** 제목으로 특정 게시글 가져오기 응답 타입 */
export interface IGetOnePostByTitleAPIResponse extends Post {
  user: Pick<User, "id" | "nickname"> & {
    image?: Pick<Image, "id" | "url">;
  };
  thumbnail?: Pick<Image, "id" | "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
}
/** 제목으로 특정 게시글 가져오기 함수 */
export const getOnePostByTitleAPI = async ({
  params,
}: IGetOnePostByTitleAPIRequest): Promise<IGetOnePostByTitleAPIResponse> => {
  return fetchInstance(postApis.getOneByTitle.endPoint({ params }), {
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
export interface IGetManyRandomPostAPIRequest {
  queries: { existingIds?: string };
}
/** 랜덤 게시글들 응답 타입 */
export type TGetManyRandomPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 랜덤 게시글들 가져오기 함수 */
export const getManyRandomPostAPI = async ({
  queries,
}: IGetManyRandomPostAPIRequest): Promise<TGetManyRandomPostAPIResponse> => {
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
      throw new CustomError(err);
    });
};

// ============================== 검색된 게시글들 가져오기 ==============================
/** 검색된 게시글들 가져오기 요청 타입 */
export interface IGetManyCategoryPostAPIRequest {
  params: { category: PostCategory };
}
/** 검색된 게시글들 가져오기 응답 타입 */
export type TGetManyCategoryPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 검색된 게시글들 가져오기  함수 */
export const getManyCategoryPostAPI = async ({
  params,
}: IGetManyCategoryPostAPIRequest): Promise<TGetManyCategoryPostAPIResponse> => {
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
export interface IGetManyKeywordPostAPIRequest {
  params: { keyword: string };
}
/** 카테고리 게시글들 가져오기 응답 타입 */
export type TGetManyKeywordPostAPIResponse = (Post & {
  thumbnail?: Pick<Image, "url">;
  reactions: Pick<Reaction, "id" | "type" | "userId">[];
})[];
/** 카테고리 게시글들 가져오기  함수 */
export const getManyKeywordPostAPI = async ({
  params,
}: IGetManyKeywordPostAPIRequest): Promise<TGetManyKeywordPostAPIResponse> => {
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
export interface IPatchPostAPIRequest {
  params: { postId: Post["id"] };
  body: Partial<ICreatePostAPIRequest["body"]>;
}
/** 게시글 수정 응답 타입 */
export interface IPatchPostAPIResponse extends Post {}
/** 게시글 수정 함수 */
export const patchPostAPI = async ({
  body,
  params,
}: IPatchPostAPIRequest): Promise<IPatchPostAPIResponse> => {
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
export interface IDeletePostAPIRequest {
  params: { postId: Post["id"] };
}
/** 게시글 삭제 응답 타입 */
export interface IDeletePostAPIResponse extends Post {}
/** 게시글 삭제 함수 */
export const deletePostAPI = async ({
  params,
}: IDeletePostAPIRequest): Promise<IDeletePostAPIResponse> => {
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

// ============================== 게시글 제목 유니크 확인 ==============================
/** 게시글 제목 유니크 확인 요청 타입 */
export interface ICheckUniqueTitleAPIRequest {
  body: Pick<Post, "title">;
}
/** 게시글 제목 유니크 확인 응답 타입 */
export interface ICheckUniqueTitleAPIResponse {
  isUnique: boolean;
}
/** 게시글 제목 유니크 확인 함수 */
export const checkUniqueTitleAPI = async ({
  body,
}: ICheckUniqueTitleAPIRequest): Promise<ICheckUniqueTitleAPIResponse> => {
  return fetchInstance(postApis.checkUniqueTitle.endPoint(), {
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
    endPoint: ({ params }: Pick<IGetOnePostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}`,
    key: ({ params }: Pick<IGetOnePostAPIRequest, "params">) => [
      "get",
      "posts",
      params.postId,
    ],
    fn: getOnePostAPI,
  },
  getOneByTitle: {
    endPoint: ({ params }: Pick<IGetOnePostByTitleAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/title/${params.title}`,
    key: ({ params }: Pick<IGetOnePostByTitleAPIRequest, "params">) => [
      "get",
      "posts",
      "title",
      params.title,
    ],
    fn: getOnePostByTitleAPI,
  },
  getManyRandom: {
    endPoint: ({ queries }: Pick<IGetManyRandomPostAPIRequest, "queries">) =>
      SERVER_URL +
      `/apis/v1/posts/random` +
      `${queries.existingIds ? `?existingIds=${queries.existingIds}` : `?existingIds=""`}`,
    key: ({ queries }: Pick<IGetManyRandomPostAPIRequest, "queries">) => [
      "get",
      "posts",
      "random",
      queries.existingIds,
    ],
    fn: getManyRandomPostAPI,
  },
  getManyCategory: {
    endPoint: ({ params }: Pick<IGetManyCategoryPostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/category/${params.category}`,
    key: ({ params }: Pick<IGetManyCategoryPostAPIRequest, "params">) => [
      "get",
      "posts",
      "category",
      params.category,
    ],
    fn: getManyCategoryPostAPI,
  },
  getManyKeyword: {
    endPoint: ({ params }: Pick<IGetManyKeywordPostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/search/${params.keyword}`,
    key: ({ params }: Pick<IGetManyKeywordPostAPIRequest, "params">) => [
      "get",
      "posts",
      "keyword",
      params.keyword,
    ],
    fn: getManyKeywordPostAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchPostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}`,
    key: ({ params }: Pick<IPatchPostAPIRequest, "params">) => [
      "patch",
      "posts",
      params.postId,
    ],
    fn: patchPostAPI,
  },
  delete: {
    endPoint: ({ params }: Pick<IDeletePostAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/posts/${params.postId}`,
    key: ({ params }: Pick<IDeletePostAPIRequest, "params">) => [
      "delete",
      "posts",
      params.postId,
    ],
    fn: deletePostAPI,
  },
  checkUniqueTitle: {
    endPoint: () => SERVER_URL + "/apis/v1/posts/check-unique-title",
    key: ({ body }: Pick<ICheckUniqueTitleAPIRequest, "body">) => [
      "check",
      "unique",
      "title",
      body.title,
    ],
    fn: checkUniqueTitleAPI,
  },
};
