import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { $tempAPI } from "#fe/openapis";

const useStoryReactionMutations = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ title: string }>();
  const { queryKey } = $tempAPI.queryOptions(
    "get",
    "/apis/v1/stories/{storyId}",
    { params: { path: { storyId: params.title } } },
  );

  const createStoryReactionMutation = $tempAPI.useMutation(
    "post",
    "/apis/v1/stories/{storyId}/reactions",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const patchStoryReactionMutation = $tempAPI.useMutation(
    "patch",
    "/apis/v1/stories/{storyId}/reactions/{reactionId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const deleteStoryReactionMutation = $tempAPI.useMutation(
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
