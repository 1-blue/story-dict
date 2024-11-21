import { useMutation } from "@tanstack/react-query";
import {
  apis,
  ICreatePostCommentReactionAPIRequest,
  ICreatePostCommentReactionAPIResponse,
  IDeletePostCommentReactionAPIRequest,
  IDeletePostCommentReactionAPIResponse,
  IPatchPostCommentReactionAPIRequest,
  IPatchPostCommentReactionAPIResponse,
} from "#fe/apis";

const usePostCommentReactionMutations = () => {
  const { mutateAsync: createPostCommentReactionMutate } = useMutation<
    ICreatePostCommentReactionAPIResponse,
    Error,
    ICreatePostCommentReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.comments.reactions.create.fn({ params, body }),
  });
  const { mutateAsync: patchPostCommentReactionMutate } = useMutation<
    IPatchPostCommentReactionAPIResponse,
    Error,
    IPatchPostCommentReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.comments.reactions.patch.fn({ params, body }),
  });
  const { mutateAsync: deletePostCommentReactionMutate } = useMutation<
    IDeletePostCommentReactionAPIResponse,
    Error,
    IDeletePostCommentReactionAPIRequest
  >({
    mutationFn: ({ params }) =>
      apis.posts.comments.reactions.delete.fn({ params }),
  });

  return {
    createPostCommentReactionMutate,
    patchPostCommentReactionMutate,
    deletePostCommentReactionMutate,
  };
};

export default usePostCommentReactionMutations;
