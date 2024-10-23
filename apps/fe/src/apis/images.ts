import { CustomError } from "#fe/libs/error";

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

  return await fetch("https://s3.ap-northeast-2.amazonaws.com/story-dict", {
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
