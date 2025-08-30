import { useQueryClient } from "@tanstack/react-query";
import { openapi } from "#fe/apis";

interface IArgs {
  storyId: string;
}

const useStoryCommentMutations = ({ storyId }: IArgs) => {
  const queryClient = useQueryClient();
  const { queryKey } = openapi.queryOptions(
    "get",
    "/apis/v1/stories/{storyId}/comments",
    { params: { path: { storyId } } },
  );

  const createStoryCommentMutation = openapi.useMutation(
    "post",
    "/apis/v1/stories/{storyId}/comments",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const patchStoryCommentMutation = openapi.useMutation(
    "patch",
    "/apis/v1/stories/{storyId}/comments/{commentId}",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );
  const deleteStoryCommentMutation = openapi.useMutation(
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
