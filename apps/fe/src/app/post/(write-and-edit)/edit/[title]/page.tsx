import type { NextPage } from "next";

import { apis } from "#fe/apis";
import { getQueryClient } from "#fe/libs/getQueryClient";
import PostForm from "#fe/app/post/(write-and-edit)/_components/PostForm";

const queryClient = getQueryClient();

interface IProps {
  params: {
    title: string;
  };
}

const Page: NextPage<IProps> = async ({ params }) => {
  const title = decodeURIComponent(params.title);

  const { payload: post } = await queryClient.fetchQuery({
    queryKey: apis.posts.getOneByTitle.key({ params: { title } }),
    queryFn: () => apis.posts.getOneByTitle.fn({ params: { title } }),
  });

  return (
    <PostForm
      ownerId={post.userId}
      postId={post.id}
      defaultValues={{
        title: post.title,
        summary: post.summary,
        content: post.content,
        category: post.category,
      }}
    />
  );
};

export default Page;
