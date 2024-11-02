import { Image, ImageStatus } from "#be/types";
import { CustomError } from "#fe/libs/error";
import { fetchInstance } from "#fe/apis/fetchInstance";

// ============================== 이미지 업로드 ==============================
/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 요청 타입 */
export interface PostUploadPresignedURLByPresignedURLAPIRequest {
  imageFile: File;
  fields: Record<string, string>;
}
/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 응답 타입 */
export interface PostUploadPresignedURLByPresignedURLAPIResponse {}
/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 함수 */
export const postUploadImageByPresignedURL = async ({
  fields,
  imageFile,
}: PostUploadPresignedURLByPresignedURLAPIRequest) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("Content-Type", imageFile.type);
  formData.append("file", imageFile, imageFile.name);

  return fetch(imageApis.upload.endPoint(), {
    method: "POST",
    body: formData,
  }).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

// ============================== 이미지 생성 ==============================
/** 이미지 생성 요청 타입 */
export interface CreateImageAPIRequest {
  body: Partial<Pick<Image, "id" | "status" | "purpose">> &
    Pick<Image, "name" | "url">;
}
/** 이미지 생성 응답 타입 */
export interface CreateImageAPIResponse extends Image {}
/** 이미지 생성 함수 */
export const createImageAPI = async ({
  body,
}: CreateImageAPIRequest): Promise<CreateImageAPIResponse> => {
  return fetchInstance(imageApis.create.endPoint(), {
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

// ============================== 이미지 이동 ==============================
/** 이미지 이동 요청 타입 */
export interface PatchImageAPIRequest {
  params: { imageId: Image["id"] };
  body: {
    beforeStatus: Exclude<ImageStatus, "default">;
    afterStatus: Exclude<ImageStatus, "default">;
  };
}
/** 이미지 이동 응답 타입 */
export interface PatchImageAPIResponse extends Image {}
/** 이미지 이동 함수 */
export const patchImageAPI = async ({
  params,
  body,
}: PatchImageAPIRequest): Promise<PatchImageAPIResponse> => {
  return fetchInstance(imageApis.patch.endPoint({ params }), {
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

// ============================== presignedURL 생성 ==============================
/** presignedURL 생성 요청 타입 */
export interface CreatePresignedURLAPIRequest {
  body: Partial<Pick<Image, "status">> & { filename: string };
}
/** presignedURL 생성 응답 타입 */
export interface CreatePresignedURLAPIResponse {
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
}: CreatePresignedURLAPIRequest): Promise<CreatePresignedURLAPIResponse> => {
  return fetchInstance(imageApis.createPresignedURL.endPoint(), {
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

export const imageApis = {
  upload: {
    endPoint: () => "https://s3.ap-northeast-2.amazonaws.com/story-dict",
    key: () => ["upload", "images"],
    fn: postUploadImageByPresignedURL,
  },
  create: {
    endPoint: () => SERVER_URL + "/apis/v1/images",
    key: () => ["create", "images"],
    fn: createImageAPI,
  },
  patch: {
    endPoint: ({ params }: Pick<PatchImageAPIRequest, "params">) =>
      SERVER_URL + `/apis/v1/images/${params.imageId}`,
    key: ({ params }: PatchImageAPIRequest) => [
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
