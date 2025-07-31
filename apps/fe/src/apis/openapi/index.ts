import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import type { paths } from "#fe/@types/openapi";

const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: { "Content-Type": "application/json" },
  credentials: "include",
});
export const openapi = createClient(fetchClient);
