import type { Metadata, NextPage } from "next";
import PostCarouselWrapper from "./_components/PostCarouselWrapper";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata> => {
  return getSharedMetadata({
    title: "랜덤 게시글",
    description: "랜덤 게시글",
  });
};

const Page: NextPage = () => {
  return <PostCarouselWrapper />;
};

export default Page;
