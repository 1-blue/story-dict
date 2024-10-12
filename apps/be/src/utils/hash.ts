import { InternalServerErrorException } from "@nestjs/common";
import { hash, compare } from "bcrypt";

/**
 * 암호화 함수
 * @param value 암호화할 데이터
 * @returns 암호화된 데이터
 */
export const encryptionValue = async (value: string, saltRounds = 10) => {
  try {
    return await hash(value, saltRounds);
  } catch (error) {
    console.error("🚀 암호화 도중 에러 발생 >> ", error);
    throw new InternalServerErrorException("암호화 도중 에러 발생");
  }
};

/**
 * 암호환된 값 검사 함수
 * @param value 기존 값
 * @param hashedValue 암호화된 값
 * @returns 검증
 */
export const compareValue = async (value: string, hashedValue: string) => {
  try {
    return await compare(value, hashedValue);
  } catch (error) {
    console.error("🚀 암호화된 값 검사 도중 에러 발생 >> ", error);
    throw new InternalServerErrorException("암호화된 값 검사 도중 에러 발생");
  }
};
