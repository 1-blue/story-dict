import { fetchInstance } from "..";

/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 요청 타입 */
interface IPostUploadPresignedURLByPresignedURLAPIRequest {
  imageFile: File;
  fields: Record<string, string>;
}
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

  return fetchInstance("https://s3.ap-northeast-2.amazonaws.com/storydict", {
    method: "POST",
    body: formData,
  });
};
