import { Image, ImageStatus } from "#be/types";
import {
  fetchInstance,
  fetchInstanceHandleError,
  fetchInstanceHandleResponse,
} from "#fe/apis/fetchInstance";
import type { IAPIResponse } from "#fe/types/api";

// ============================== 이미지 업로드 ==============================
/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 요청 타입 */
export interface IPostUploadPresignedURLByPresignedURLAPIRequest {
  imageFile: File;
  fields: Record<string, string>;
}
/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 응답 타입 */
export interface IPostUploadPresignedURLByPresignedURLAPIResponse {}
/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 함수 */
export const postUploadImageByPresignedURL = async ({
  fields,
  imageFile,
}: IPostUploadPresignedURLByPresignedURLAPIRequest) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("Content-Type", imageFile.type);
  formData.append("file", imageFile, imageFile.name);

  return fetch(imageApis.upload.endPoint(), {
    method: "POST",
    body: formData,
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이미지 생성 ==============================
/** 이미지 생성 요청 타입 */
export interface ICreateImageAPIRequest {
  body: Partial<Pick<Image, "id" | "status" | "purpose">> &
    Pick<Image, "name" | "url">;
}
/** 이미지 생성 응답 타입 */
export interface ICreateImageAPIResponse extends IAPIResponse<Image> {}
/** 이미지 생성 함수 */
export const createImageAPI = async ({
  body,
}: ICreateImageAPIRequest): Promise<ICreateImageAPIResponse> => {
  return fetchInstance(imageApis.create.endPoint(), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== 이미지 이동 ==============================
/** 이미지 이동 요청 타입 */
export interface IPatchImageAPIRequest {
  params: { imageId: Image["id"] };
  body: {
    beforeStatus: Exclude<ImageStatus, "default">;
    afterStatus: Exclude<ImageStatus, "default">;
  };
}
/** 이미지 이동 응답 타입 */
export interface IPatchImageAPIResponse extends IAPIResponse<Image> {}
/** 이미지 이동 함수 */
export const patchImageAPI = async ({
  params,
  body,
}: IPatchImageAPIRequest): Promise<IPatchImageAPIResponse> => {
  return fetchInstance(imageApis.patch.endPoint({ params }), {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

// ============================== presignedURL 생성 ==============================
/** presignedURL 생성 요청 타입 */
export interface ICreatePresignedURLAPIRequest {
  body: Partial<Pick<Image, "status">> & { filename: string };
}
/** presignedURL 생성 응답 타입 */
export interface ICreatePresignedURLAPIResponse {
  url: string;
  fields: {
    bucket: string;
    "X-Amz-Algorithm": string;
    "X-Amz-Credential": string;
    "X-Amz-Date": string;
    key: string;
    Policy: string;
    "X-Amz-Signature": string;
  };
}
/** presignedURL 생성 함수 */
export const createPresignedURLAPI = async ({
  body,
}: ICreatePresignedURLAPIRequest): Promise<ICreatePresignedURLAPIResponse> => {
  return fetchInstance(imageApis.createPresignedURL.endPoint(), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(fetchInstanceHandleResponse)
    .catch(fetchInstanceHandleError);
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const imageApis = {
  upload: {
    endPoint: () => "https://s3.ap-northeast-2.amazonaws.com/storydict",
    key: () => ["upload", "images"],
    fn: postUploadImageByPresignedURL,
  },
  create: {
    endPoint: () => SERVER_URL + "/apis/v1/images",
    key: () => ["create", "images"],
    fn: createImageAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<IPatchImageAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/images/${params.imageId}`,
    key: ({ params }: IPatchImageAPIRequest) => [
      "patch",
      "images",
      params.imageId,
    ],
    fn: patchImageAPI,
  },
  createPresignedURL: {
    endPoint: () => SERVER_URL + "/apis/v1/images/presigned-url",
    key: () => ["create", "presigned-url"],
    fn: createPresignedURLAPI,
  },
};
