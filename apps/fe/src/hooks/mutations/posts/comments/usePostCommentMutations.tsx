import { useMutation } from "@tanstack/react-query";
import {
  apis,
  ICreatePostCommentAPIRequest,
  ICreatePostCommentAPIResponse,
  IDeletePostCommentAPIRequest,
  IDeletePostCommentAPIResponse,
  IPatchPostCommentAPIRequest,
  IPatchPostCommentAPIResponse,
} from "#fe/apis";

const usePostCommentMutations = () => {
  const { mutateAsync: createPostCommentMutate } = useMutation<
    ICreatePostCommentAPIResponse,
    Error,
    ICreatePostCommentAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.comments.create.fn({ params, body }),
  });
  const { mutateAsync: patchPostCommentMutate } = useMutation<
    IPatchPostCommentAPIResponse,
    Error,
    IPatchPostCommentAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.comments.patch.fn({ params, body }),
  });
  const { mutateAsync: deletePostCommentMutate } = useMutation<
    IDeletePostCommentAPIResponse,
    Error,
    IDeletePostCommentAPIRequest
  >({
    mutationFn: ({ params }) => apis.posts.comments.delete.fn({ params }),
  });

  return {
    createPostCommentMutate,
    patchPostCommentMutate,
    deletePostCommentMutate,
  };
};

export default usePostCommentMutations;
