import type { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { CATEGORIES } from "#fe/constants";

export const metadata: Metadata = getSharedMetadata({
  title: "카테고리 게시글",
  description: "카테고리 게시글",
});

const Page: NextPage = () => {
  return redirect(`/post/category/${CATEGORIES[0]?.value}`);
};

export default Page;
