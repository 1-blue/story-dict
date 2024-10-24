import { useMutation } from "@tanstack/react-query";
import {
  apis,
  CreateCommentAPIRequest,
  CreateCommentAPIResponse,
} from "#fe/apis";

const useCommentMutations = () => {
  const { mutateAsync: createCommentMutate } = useMutation<
    CreateCommentAPIResponse,
    Error,
    CreateCommentAPIRequest
  >({
    mutationFn: ({ body }) => apis.comments.create.fn({ body }),
  });

  return { createCommentMutate };
};

export default useCommentMutations;
