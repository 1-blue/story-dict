import type { NextPage } from "next";
import { redirect } from "next/navigation";

import { routes } from "#fe/constants";

const Page: NextPage = () => {
  return redirect(routes.post.url);
};

export default Page;
