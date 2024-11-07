import type { NextPage } from "next";
import { redirect } from "next/navigation";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";

const DEFAULT_KEYWORD = "아";

export const generateMetadata = () => {
  return getSharedMetadata({
    title: `검색: ${DEFAULT_KEYWORD}`,
  });
};

const Page: NextPage = () => {
  return redirect(`/post/search/${encodeURIComponent(DEFAULT_KEYWORD)}`);
};

export default Page;
