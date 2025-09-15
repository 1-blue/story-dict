import type { NextPage } from "next";
import { redirect } from "next/navigation";

import { routes } from "#fe/constants";

const Page: NextPage = () => {
  return redirect(routes.story.url);
};

export default Page;
