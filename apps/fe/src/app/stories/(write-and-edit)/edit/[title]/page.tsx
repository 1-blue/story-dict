import type { NextPage } from "next";

import { openapi } from "#fe/apis";
import { getQueryClient } from "#fe/libs/getQueryClient";
import StoryForm from "#fe/app/stories/(write-and-edit)/_components/StoryForm";

const queryClient = getQueryClient();

interface IProps {
  params: {
    title: string;
  };
}

const Page: NextPage<IProps> = async ({ params }) => {
  const title = decodeURIComponent(params.title);

  const { payload: story } = await queryClient.fetchQuery(
    openapi.queryOptions("get", "/apis/v1/stories/title/{title}", {
      params: { path: { title } },
    }),
  );

  return (
    <StoryForm
      ownerId={story.userId}
      storyId={story.id}
      defaultValues={{
        title: story.title,
        summary: story.summary,
        content: story.content,
        category: story.category,
        thumbnailPath: story.thumbnailPath,
      }}
    />
  );
};

export default Page;
