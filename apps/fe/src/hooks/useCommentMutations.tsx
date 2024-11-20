import { useMutation } from "@tanstack/react-query";
import {
  apis,
  ICreateCommentAPIRequest,
  ICreateCommentAPIResponse,
  IDeleteCommentAPIRequest,
  IDeleteCommentAPIResponse,
  IPatchCommentAPIRequest,
  IPatchCommentAPIResponse,
} from "#fe/apis";

const useCommentMutations = () => {
  const { mutateAsync: createCommentMutate } = useMutation<
    ICreateCommentAPIResponse,
    Error,
    ICreateCommentAPIRequest
  >({
    mutationFn: ({ params, body }) => apis.comments.create.fn({ params, body }),
  });
  const { mutateAsync: patchCommentMutate } = useMutation<
    IPatchCommentAPIResponse,
    Error,
    IPatchCommentAPIRequest
  >({
    mutationFn: ({ params, body }) => apis.comments.patch.fn({ params, body }),
  });
  const { mutateAsync: deleteCommentMutate } = useMutation<
    IDeleteCommentAPIResponse,
    Error,
    IDeleteCommentAPIRequest
  >({
    mutationFn: ({ params }) => apis.comments.delete.fn({ params }),
  });

  return { createCommentMutate, patchCommentMutate, deleteCommentMutate };
};

export default useCommentMutations;
