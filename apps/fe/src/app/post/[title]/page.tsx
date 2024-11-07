import type { Metadata, NextPage } from "next";

import { apis } from "#fe/apis";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

import PostDetail from "#fe/app/post/[title]/_components/PostDetail";

export const dynamic = "force-dynamic";
export const revalidate = 60 * 30;

interface IProps {
  params: {
    title: string;
  };
}

export const generateMetadata = async ({
  params,
}: IProps): Promise<Metadata> => {
  const post = await apis.posts.getOneByTitle.fn({
    params: { title: params.title },
  });

  return getSharedMetadata({
    title: post.title,
    description: post.summary.replace(/\n/g, " "),
    keywords: [post.title],
    ...(post.thumbnail && { images: [post.thumbnail.url] }),
  });
};

const Page: NextPage<IProps> = async ({ params }) => {
  return <PostDetail postTitle={params.title} />;
};

export default Page;
