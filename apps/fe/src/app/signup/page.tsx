import type { Metadata, NextPage } from "next";

import SignUpForm from "#fe/app/signup/_components/SignUpForm";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

export const generateMetadata = (): Metadata => {
  return getSharedMetadata({
    title: "회원가입",
    description: "회원가입",
  });
};

const Page: NextPage = () => {
  return <SignUpForm />;
};

export default Page;
