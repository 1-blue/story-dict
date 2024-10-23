import type { Metadata, NextPage } from "next";

import CategoryForm from "./_components/CategoryForm";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

export const generateMetadata = async (): Promise<Metadata> => {
  return getSharedMetadata({
    title: "카테고리 게시글",
    description: "카테고리 게시글",
  });
};

const Page: NextPage = () => {
  return (
    <div>
      <CategoryForm />
    </div>
  );
};

export default Page;
