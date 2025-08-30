import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { openapi } from "#fe/apis";
import { routes } from "#fe/constants";
import { revalidateTagForServer } from "#fe/actions/revalidateForServer";

const useStoryMutations = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { queryKey } = openapi.queryOptions("get", "/apis/v1/stories");
  const path = queryKey[1];

  const storyCreateMutation = openapi.useMutation("post", "/apis/v1/stories", {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
      revalidateTagForServer([path]);
      router.replace(routes.story.url);
    },
  });
  const storyPatchMutation = openapi.useMutation(
    "patch",
    "/apis/v1/stories/{storyId}",
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey });
        revalidateTagForServer([path]);
        router.replace(routes.story.url);
      },
    },
  );
  const storyDeleteMutation = openapi.useMutation(
    "delete",
    "/apis/v1/stories/{storyId}",
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey });
        revalidateTagForServer([path]);
        router.replace(routes.story.url);
      },
    },
  );
  const checkUniqueTitleMutation = openapi.useMutation(
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
