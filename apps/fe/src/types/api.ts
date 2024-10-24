/**
 * API 요청 타입 형식
 * `Params`, `Body`, `Queries` 순서
 **/
export interface APIRuquestType<Body = {}, Params = {}, Queries = {}> {
  body?: Body;
  params?: Params;
  queries?: Queries;
}
