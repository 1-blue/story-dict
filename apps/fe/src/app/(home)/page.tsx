import { Metadata } from "next";

import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import HomePage from "./_components/HomePage";

export const generateMetadata = async (): Promise<Metadata> => {
  return getSharedMetadata({
    title: "이야기 사전",
  });
};

const Page: React.FC = async () => {
  return <HomePage />;
};

export default Page;
