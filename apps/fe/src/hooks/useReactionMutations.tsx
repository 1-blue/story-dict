import { useMutation } from "@tanstack/react-query";
import {
  apis,
  ICreateReactionAPIRequest,
  ICreateReactionAPIResponse,
  IDeleteReactionAPIRequest,
  IDeleteReactionAPIResponse,
  IPatchReactionAPIRequest,
  IPatchReactionAPIResponse,
} from "#fe/apis";

const useReactionMutations = () => {
  const { mutateAsync: createReactionMutate } = useMutation<
    ICreateReactionAPIResponse,
    Error,
    ICreateReactionAPIRequest
  >({
    mutationFn: ({ body }) => apis.reactions.create.fn({ body }),
  });
  const { mutateAsync: patchReactionMutate } = useMutation<
    IPatchReactionAPIResponse,
    Error,
    IPatchReactionAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.reactions.patch.fn({ body, params }),
  });
  const { mutateAsync: deleteReactionMutate } = useMutation<
    IDeleteReactionAPIResponse,
    Error,
    IDeleteReactionAPIRequest
  >({
    mutationFn: ({ params }) => apis.reactions.delete.fn({ params }),
  });

  return { createReactionMutate, patchReactionMutate, deleteReactionMutate };
};

export default useReactionMutations;
