/** API 응답 타입 */
export interface IAPIResponse<Payload> {
  toast?: {
    title: string;
    description: string;
  };
  payload: Payload;
}
