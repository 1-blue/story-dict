import { registerDecorator, ValidationOptions } from "class-validator";

export const IsS3ImagePath = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isS3ImagePath",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return value.startsWith(
            "https://storydict.s3.ap-northeast-2.amazonaws.com/images",
          );
        },
        defaultMessage() {
          return "잘못된 이미지 경로입니다.";
        },
      },
    });
  };
};
