export * from "./openapi";
export * from "./internal";
export * from "./external";

/** API 응답 타입 */
export interface IAPIResponse<Payload> {
  toast?: {
    title: string;
    description: string;
  };
  payload: Payload;
}
export const fetchInstance = (url: string, options: RequestInit) =>
  fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
