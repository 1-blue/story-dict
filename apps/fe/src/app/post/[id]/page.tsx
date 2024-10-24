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
  const postId = decodeURIComponent(params.id);

  const post = await getOnePostAPI({ params: { postId } });

  return getSharedMetadata({
    title: post.title,
    description: post.summary.replace(/\n/g, " "),
    ...(post.thumbnail && { images: [post.thumbnail.url] }),
  });
};

const Page: NextPage<IProps> = ({ params }) => {
  return <PostDetail postId={params.id} />;
};

export default Page;
