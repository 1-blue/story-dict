import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apis,
  ICreateStoryCommentReactionAPIRequest,
  ICreateStoryCommentReactionAPIResponse,
  IDeleteStoryCommentReactionAPIRequest,
  IDeleteStoryCommentReactionAPIResponse,
  IPatchStoryCommentReactionAPIRequest,
  IPatchStoryCommentReactionAPIResponse,
} from "#fe/apis";

interface IArgs {
  storyId: string;
}
const useStoryCommentReactionMutations = ({ storyId }: IArgs) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createStoryCommentReactionMutateAsync } = useMutation<
    ICreateStoryCommentReactionAPIResponse,
    Error,
    ICreateStoryCommentReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.stories.comments.reactions.create.fn({ params, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.comments.getAll.key({ params: { storyId } }),
      });
    },
  });
  const { mutateAsync: patchStoryCommentReactionMutateAsync } = useMutation<
    IPatchStoryCommentReactionAPIResponse,
    Error,
    IPatchStoryCommentReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.stories.comments.reactions.patch.fn({ params, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.comments.getAll.key({ params: { storyId } }),
      });
    },
  });
  const { mutateAsync: deleteStoryCommentReactionMutateAsync } = useMutation<
    IDeleteStoryCommentReactionAPIResponse,
    Error,
    IDeleteStoryCommentReactionAPIRequest
  >({
    mutationFn: ({ params }) =>
      apis.stories.comments.reactions.delete.fn({ params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.comments.getAll.key({ params: { storyId } }),
      });
    },
  });

  return {
    createStoryCommentReactionMutateAsync,
    patchStoryCommentReactionMutateAsync,
    deleteStoryCommentReactionMutateAsync,
  };
};

export default useStoryCommentReactionMutations;
