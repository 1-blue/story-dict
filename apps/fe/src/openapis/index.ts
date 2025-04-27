import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "#be/@openapi";

const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
});
/** 임시 API 이전 코드 모두 변경 후 변수명 수정 */
export const $tempAPI = createClient(fetchClient);
