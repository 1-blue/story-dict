import type { Metadata, NextPage } from "next";

import LogInForm from "#fe/app/(All)/login/_components/LogInForm";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

export const generateMetadata = (): Metadata => {
  return getSharedMetadata({
    title: "로그인",
    description: "로그인",
  });
};

const Page: NextPage = () => {
  return <LogInForm />;
};

export default Page;
