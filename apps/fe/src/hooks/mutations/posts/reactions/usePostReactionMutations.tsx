import { useMutation } from "@tanstack/react-query";
import {
  apis,
  ICreatePostReactionAPIRequest,
  ICreatePostReactionAPIResponse,
  IDeletePostReactionAPIRequest,
  IDeletePostReactionAPIResponse,
  IPatchPostReactionAPIRequest,
  IPatchPostReactionAPIResponse,
} from "#fe/apis";

const usePostReactionMutations = () => {
  const { mutateAsync: createPostReactionMutate } = useMutation<
    ICreatePostReactionAPIResponse,
    Error,
    ICreatePostReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.reactions.create.fn({ params, body }),
  });
  const { mutateAsync: patchPostReactionMutate } = useMutation<
    IPatchPostReactionAPIResponse,
    Error,
    IPatchPostReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.reactions.patch.fn({ params, body }),
  });
  const { mutateAsync: deletePostReactionMutate } = useMutation<
    IDeletePostReactionAPIResponse,
    Error,
    IDeletePostReactionAPIRequest
  >({
    mutationFn: ({ params }) => apis.posts.reactions.delete.fn({ params }),
  });

  return {
    createPostReactionMutate,
    patchPostReactionMutate,
    deletePostReactionMutate,
  };
};

export default usePostReactionMutations;
