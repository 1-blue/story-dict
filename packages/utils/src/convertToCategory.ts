type Category =
  | "GENERAL_KNOWLEDGE"
  | "ETYMOLOGY"
  | "PURE_KOREAN"
  | "QUOTATION"
  | "INFORMATION"
  | "NONSENSE";

/** 카테고리 한글로 변환 */
export const convertToCategory = (category: Category) => {
  switch (category) {
    case "GENERAL_KNOWLEDGE":
      return "일반 지식";
    case "ETYMOLOGY":
      return "어원";
    case "PURE_KOREAN":
      return "순우리말";
    case "QUOTATION":
      return "명대사";
    case "INFORMATION":
      return "정보";
    case "NONSENSE":
      return "넌센스";
  }
};
