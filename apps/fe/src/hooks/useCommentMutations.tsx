import { useMutation } from "@tanstack/react-query";
import {
  apis,
  ICreateCommentAPIRequest,
  ICreateCommentAPIResponse,
} from "#fe/apis";

const useCommentMutations = () => {
  const { mutateAsync: createCommentMutate } = useMutation<
    ICreateCommentAPIResponse,
    Error,
    ICreateCommentAPIRequest
  >({
    mutationFn: ({ params, body }) => apis.comments.create.fn({ params, body }),
  });

  return { createCommentMutate };
};

export default useCommentMutations;
