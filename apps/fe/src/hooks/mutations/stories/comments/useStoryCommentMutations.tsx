import { useQueryClient } from "@tanstack/react-query";
import { $tempAPI } from "#fe/openapis";

interface IArgs {
  storyId: string;
}

const useStoryCommentMutations = ({ storyId }: IArgs) => {
  const queryClient = useQueryClient();
  const { queryKey } = $tempAPI.queryOptions(
    "get",
    "/apis/v1/stories/{storyId}/comments",
    { params: { path: { storyId } } },
  );

  const createStoryCommentMutation = $tempAPI.useMutation(
    "post",
    "/apis/v1/stories/{storyId}/comments",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const patchStoryCommentMutation = $tempAPI.useMutation(
    "patch",
    "/apis/v1/stories/{storyId}/comments/{commentId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const deleteStoryCommentMutation = $tempAPI.useMutation(
    "delete",
    "/apis/v1/stories/{storyId}/comments/{commentId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );

  return {
    createStoryCommentMutation,
    patchStoryCommentMutation,
    deleteStoryCommentMutation,
  };
};

export default useStoryCommentMutations;
