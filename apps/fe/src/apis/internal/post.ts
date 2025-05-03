import { Story } from "@sd/db";
import { fetchInstance, type IAPIResponse } from "..";

// ============================== 모든 이야기 가져오기 ==============================

/** 모든 이야기 가져오기 요청 타입 */
export interface IGetAllStoryAPIRequest {}
/** 모든 이야기 가져오기 응답 타입 */
export interface IGetAllStoryAPIResponse extends IAPIResponse<Story[]> {}
/** 모든 이야기 가져오기 함수 */
export const getAllStoryAPI = async (): Promise<IGetAllStoryAPIResponse> => {
  return fetchInstance(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/apis/v1/stories`,
    { method: "GET" },
  ).then((res) => res.json());
};
