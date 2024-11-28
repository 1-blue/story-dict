import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apis,
  ICreatePostCommentReactionAPIRequest,
  ICreatePostCommentReactionAPIResponse,
  IDeletePostCommentReactionAPIRequest,
  IDeletePostCommentReactionAPIResponse,
  IPatchPostCommentReactionAPIRequest,
  IPatchPostCommentReactionAPIResponse,
} from "#fe/apis";

interface IArgs {
  postId: string;
}
const usePostCommentReactionMutations = ({ postId }: IArgs) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createPostCommentReactionMutateAsync } = useMutation<
    ICreatePostCommentReactionAPIResponse,
    Error,
    ICreatePostCommentReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.comments.reactions.create.fn({ params, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.comments.getAll.key({ params: { postId } }),
      });
    },
  });
  const { mutateAsync: patchPostCommentReactionMutateAsync } = useMutation<
    IPatchPostCommentReactionAPIResponse,
    Error,
    IPatchPostCommentReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.comments.reactions.patch.fn({ params, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.comments.getAll.key({ params: { postId } }),
      });
    },
  });
  const { mutateAsync: deletePostCommentReactionMutateAsync } = useMutation<
    IDeletePostCommentReactionAPIResponse,
    Error,
    IDeletePostCommentReactionAPIRequest
  >({
    mutationFn: ({ params }) =>
      apis.posts.comments.reactions.delete.fn({ params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.comments.getAll.key({ params: { postId } }),
      });
    },
  });

  return {
    createPostCommentReactionMutateAsync,
    patchPostCommentReactionMutateAsync,
    deletePostCommentReactionMutateAsync,
  };
};

export default usePostCommentReactionMutations;
