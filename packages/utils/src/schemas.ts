import { z } from "zod";

/** 이메일 유효성 검사 스키마 */
const email = z
  .string()
  .min(1, { message: "이메일을 입력해주세요!" })
  .email({ message: "이메일 형식에 맞게 입력해주세요!" });

/** 비밀번호 유효성 검사 스키마 */
const password = z
  .string()
  .min(1, { message: "비밀번호를 입력해주세요!" })
  .regex(/^(?=.*[A-Z])/, "최소 하나의 대문자가 필요합니다.")
  .regex(/^(?=.*[a-z])/, "최소 하나의 소문자가 필요합니다.")
  .regex(/^(?=.*\d)/, "최소 하나의 숫자가 필요합니다.")
  .regex(/^(?=.*[\W_])/, "최소 하나의 특수문자가 필요합니다.")
  .min(8, { message: "8자 이상 입력해주세요!" });

/** 닉네임 유효성 검사 스키마 */
const nickname = z
  .string()
  .min(1, { message: "닉네임을 입력해주세요!" })
  .max(10, { message: "닉네임은 최대 10자입니다!" })
  .regex(/^\S*$/, { message: "공백은 사용할 수 없습니다!" })
  .regex(/^[a-zA-Z가-힣]+$/, { message: "한글과 영문만 사용 가능합니다!" });

/** 휴대폰 번호 유효성 검사 스키마 */
const phone = z
  .string()
  .min(1, { message: "휴대폰 번호를 입력해주세요!" })
  .regex(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: "'-'를 포함해서 휴대폰 번호 형식에 맞게 입력해주세요!",
  });

/** 제목 유효성 검사 스키마 */
const title = z
  .string()
  .min(1, { message: "제목을 입력해주세요!" })
  .max(40, { message: "제목은 최대 40자입니다!" });

/** 요약 유효성 검사 스키마 */
const summary = z
  .string()
  .min(1, { message: "설명을 입력해주세요!" })
  .max(120, { message: "설명은 최대 120자입니다!" });

/** 내용 유효성 검사 스키마 */
const content = z.string().min(1, { message: "내용을 입력해주세요!" });

/** 카테고리 유효성 검사 스키마 */
const category = z.enum([
  "GENERAL_KNOWLEDGE",
  "ETYMOLOGY",
  "PURE_KOREAN",
  "QUOTATION",
  "INFORMATION",
]);

export const schemas = {
  email,
  password,
  nickname,
  phone,
  title,
  summary,
  content,
  category,
};
