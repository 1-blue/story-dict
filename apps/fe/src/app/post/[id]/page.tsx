import type { Metadata, NextPage } from "next";

import { getOnePostAPI } from "#fe/apis";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

import PostDetail from "./_components/PostDetail";

interface IProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: IProps): Promise<Metadata> => {
  const id = decodeURIComponent(params.id);

  const post = await getOnePostAPI({ id });

  return getSharedMetadata({
    title: post.title,
    description: post.summary.replace(/\n/g, " "),
    ...(post.thumbnail && { images: [post.thumbnail.url] }),
  });
};

const Page: NextPage<IProps> = ({ params }) => {
  return <PostDetail id={params.id} />;
};

export default Page;
