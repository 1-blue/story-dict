import { useQueryClient } from "@tanstack/react-query";
import { openapi } from "#fe/apis";

interface IArgs {
  storyId: string;
}
const useStoryCommentReactionMutations = ({ storyId }: IArgs) => {
  const queryClient = useQueryClient();
  const { queryKey } = openapi.queryOptions(
    "get",
    "/apis/v1/stories/{storyId}/comments",
    { params: { path: { storyId } } },
  );

  const createStoryCommentReactionMutation = openapi.useMutation(
    "post",
    "/apis/v1/stories/{storyId}/comments/{commentId}/reactions",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const patchStoryCommentReactionMutation = openapi.useMutation(
    "patch",
    "/apis/v1/stories/{storyId}/comments/{commentId}/reactions/{reactionId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const deleteStoryCommentReactionMutation = openapi.useMutation(
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
