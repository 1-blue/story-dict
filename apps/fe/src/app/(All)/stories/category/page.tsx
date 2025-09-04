import type { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import { CATEGORIES } from "#fe/constants";

export const metadata: Metadata = getSharedMetadata({
  title: "카테고리 이야기",
  description: "카테고리 이야기",
});

const Page: NextPage = () => {
  return redirect(`/stories/category/${CATEGORIES[0]?.value}`);
};

export default Page;
