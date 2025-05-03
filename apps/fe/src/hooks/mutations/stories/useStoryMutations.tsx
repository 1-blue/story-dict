import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { $tempAPI } from "#fe/openapis";
import { routes } from "#fe/constants";

const useStoryMutations = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { queryKey } = $tempAPI.queryOptions("get", "/apis/v1/stories");

  const storyCreateMutation = $tempAPI.useMutation("post", "/apis/v1/stories", {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
      // FIXME: openapi-typescript 적용 후 처리하기
      // revalidateTagForServer(queryKey);
      router.replace(routes.story.url);
    },
  });
  const storyPatchMutation = $tempAPI.useMutation(
    "patch",
    "/apis/v1/stories/{storyId}",
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey });
        // FIXME: openapi-typescript 적용 후 처리하기
        // revalidateTagForServer(queryKey);
        router.replace(routes.story.url);
      },
    },
  );
  const storyDeleteMutation = $tempAPI.useMutation(
    "delete",
    "/apis/v1/stories/{storyId}",
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey });
        router.replace(routes.story.url);
      },
    },
  );
  const checkUniqueTitleMutation = $tempAPI.useMutation(
    "post",
    "/apis/v1/stories/check-unique-title",
  );

  return {
    storyCreateMutation,
    storyPatchMutation,
    storyDeleteMutation,
    checkUniqueTitleMutation,
  };
};

export default useStoryMutations;
