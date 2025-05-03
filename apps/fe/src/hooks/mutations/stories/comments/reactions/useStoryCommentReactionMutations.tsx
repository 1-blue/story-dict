import { useQueryClient } from "@tanstack/react-query";
import { $tempAPI } from "#fe/openapis";

interface IArgs {
  storyId: string;
}
const useStoryCommentReactionMutations = ({ storyId }: IArgs) => {
  const queryClient = useQueryClient();
  const { queryKey } = $tempAPI.queryOptions(
    "get",
    "/apis/v1/stories/{storyId}/comments",
    { params: { path: { storyId } } },
  );

  const createStoryCommentReactionMutation = $tempAPI.useMutation(
    "post",
    "/apis/v1/stories/{storyId}/comments/{commentId}/reactions",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const patchStoryCommentReactionMutation = $tempAPI.useMutation(
    "patch",
    "/apis/v1/stories/{storyId}/comments/{commentId}/reactions/{reactionId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const deleteStoryCommentReactionMutation = $tempAPI.useMutation(
    "delete",
    "/apis/v1/stories/{storyId}/comments/{commentId}/reactions/{reactionId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  return {
    createStoryCommentReactionMutation,
    patchStoryCommentReactionMutation,
    deleteStoryCommentReactionMutation,
  };
};

export default useStoryCommentReactionMutations;
