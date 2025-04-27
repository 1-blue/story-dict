import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apis,
  ICreateStoryReactionAPIRequest,
  ICreateStoryReactionAPIResponse,
  IDeleteStoryReactionAPIRequest,
  IDeleteStoryReactionAPIResponse,
  IPatchStoryReactionAPIRequest,
  IPatchStoryReactionAPIResponse,
} from "#fe/apis";

const useStoryReactionMutations = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ title: string }>();

  const { mutateAsync: createStoryReactionMutateAsync } = useMutation<
    ICreateStoryReactionAPIResponse,
    Error,
    ICreateStoryReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.stories.reactions.create.fn({ params, body }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: apis.stories.getOneByTitle.key({ params }),
      });
    },
  });
  const { mutateAsync: patchStoryReactionMutateAsync } = useMutation<
    IPatchStoryReactionAPIResponse,
    Error,
    IPatchStoryReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.stories.reactions.patch.fn({ params, body }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: apis.stories.getOneByTitle.key({ params }),
      });
    },
  });
  const { mutateAsync: deleteStoryReactionMutateAsync } = useMutation<
    IDeleteStoryReactionAPIResponse,
    Error,
    IDeleteStoryReactionAPIRequest
  >({
    mutationFn: ({ params }) => apis.stories.reactions.delete.fn({ params }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: apis.stories.getOneByTitle.key({ params }),
      });
    },
  });

  return {
    createStoryReactionMutateAsync,
    patchStoryReactionMutateAsync,
    deleteStoryReactionMutateAsync,
  };
};

export default useStoryReactionMutations;
