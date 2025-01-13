import {
  fetchInstance,
  fetchInstanceHandleError,
  fetchInstanceHandleResponse,
} from "#fe/apis/fetchInstance";
import { IAPIResponse } from "#fe/types/api";

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

// ============================== presignedURL 생성 ==============================
/** presignedURL 생성 요청 타입 */
export interface ICreatePresignedURLAPIRequest {
  body: {
    filename: string;
    status?: string;
  };
}
/** presignedURL 생성 응답 타입 */
export interface ICreatePresignedURLAPIResponse {
  payload: {
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

// ============================== 이미지 이동 ==============================
/** 이미지 이동 요청 타입 */
export interface IPatchImageAPIRequest {
  body: {
    imagePath: string;
    beforeStatus: string;
    afterStatus: string;
  };
}
/** 이미지 이동 응답 타입 */
export interface IPatchImageAPIResponse
  extends IAPIResponse<{ imagePath: string }> {}
/** 이미지 이동 함수 */
export const patchImageAPI = async ({
  body,
}: IPatchImageAPIRequest): Promise<IPatchImageAPIResponse> => {
  return fetchInstance(imageApis.patch.endPoint(), {
    method: "PATCH",
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
  createPresignedURL: {
    endPoint: () => SERVER_URL + "/apis/v1/images/presigned-url",
    key: () => ["create", "presigned-url"],
    fn: createPresignedURLAPI,
  },
  patch: {
    endPoint: () => SERVER_URL + `/apis/v1/images/move`,
    key: () => ["patch", "images", "move"],
    fn: patchImageAPI,
  },
};
