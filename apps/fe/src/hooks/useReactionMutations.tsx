import { useMutation } from "@tanstack/react-query";
import {
  apis,
  CreateReactionAPIRequest,
  CreateReactionAPIResponse,
  DeleteReactionAPIRequest,
  DeleteReactionAPIResponse,
  PatchReactionAPIRequest,
  PatchReactionAPIResponse,
} from "#fe/apis";

const useReactionMutations = () => {
  const { mutateAsync: createReactionMutate } = useMutation<
    CreateReactionAPIResponse,
    Error,
    CreateReactionAPIRequest
  >({
    mutationFn: ({ body }) => apis.reactions.create.fn({ body }),
  });
  const { mutateAsync: patchReactionMutate } = useMutation<
    PatchReactionAPIResponse,
    Error,
    PatchReactionAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.reactions.patch.fn({ body, params }),
  });
  const { mutateAsync: deleteReactionMutate } = useMutation<
    DeleteReactionAPIResponse,
    Error,
    DeleteReactionAPIRequest
  >({
    mutationFn: ({ params }) => apis.reactions.delete.fn({ params }),
  });

  return { createReactionMutate, patchReactionMutate, deleteReactionMutate };
};

export default useReactionMutations;
