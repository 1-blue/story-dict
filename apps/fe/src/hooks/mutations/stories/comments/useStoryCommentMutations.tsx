import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apis,
  ICreateStoryCommentAPIRequest,
  ICreateStoryCommentAPIResponse,
  IDeleteStoryCommentAPIRequest,
  IDeleteStoryCommentAPIResponse,
  IPatchStoryCommentAPIRequest,
  IPatchStoryCommentAPIResponse,
} from "#fe/apis";

interface IArgs {
  storyId: string;
}

const useStoryCommentMutations = ({ storyId }: IArgs) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createStoryCommentMutateAsync } = useMutation<
    ICreateStoryCommentAPIResponse,
    Error,
    ICreateStoryCommentAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.stories.comments.create.fn({ params, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.comments.getAll.key({ params: { storyId } }),
      });
    },
  });
  const { mutateAsync: patchStoryCommentMutateAsync } = useMutation<
    IPatchStoryCommentAPIResponse,
    Error,
    IPatchStoryCommentAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.stories.comments.patch.fn({ params, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.comments.getAll.key({ params: { storyId } }),
      });
    },
  });
  const { mutateAsync: deleteStoryCommentMutateAsync } = useMutation<
    IDeleteStoryCommentAPIResponse,
    Error,
    IDeleteStoryCommentAPIRequest
  >({
    mutationFn: ({ params }) => apis.stories.comments.delete.fn({ params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.comments.getAll.key({ params: { storyId } }),
      });
    },
  });

  return {
    createStoryCommentMutateAsync,
    patchStoryCommentMutateAsync,
    deleteStoryCommentMutateAsync,
  };
};

export default useStoryCommentMutations;
