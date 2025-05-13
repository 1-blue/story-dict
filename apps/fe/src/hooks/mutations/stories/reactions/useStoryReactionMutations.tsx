import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { openapi } from "#fe/apis";

const useStoryReactionMutations = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ title: string }>();
  const { queryKey } = openapi.queryOptions(
    "get",
    "/apis/v1/stories/title/{title}",
    { params: { path: { title: params.title } } },
  );

  const createStoryReactionMutation = openapi.useMutation(
    "post",
    "/apis/v1/stories/{storyId}/reactions",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const patchStoryReactionMutation = openapi.useMutation(
    "patch",
    "/apis/v1/stories/{storyId}/reactions/{reactionId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const deleteStoryReactionMutation = openapi.useMutation(
    "delete",
    "/apis/v1/stories/{storyId}/reactions/{reactionId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );

  return {
    createStoryReactionMutation,
    patchStoryReactionMutation,
    deleteStoryReactionMutation,
  };
};

export default useStoryReactionMutations;
