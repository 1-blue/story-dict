import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apis,
  ICreatePostCommentAPIRequest,
  ICreatePostCommentAPIResponse,
  IDeletePostCommentAPIRequest,
  IDeletePostCommentAPIResponse,
  IPatchPostCommentAPIRequest,
  IPatchPostCommentAPIResponse,
} from "#fe/apis";

interface IArgs {
  postId: string;
}

const usePostCommentMutations = ({ postId }: IArgs) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createPostCommentMutateAsync } = useMutation<
    ICreatePostCommentAPIResponse,
    Error,
    ICreatePostCommentAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.comments.create.fn({ params, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.comments.getAll.key({ params: { postId } }),
      });
    },
  });
  const { mutateAsync: patchPostCommentMutateAsync } = useMutation<
    IPatchPostCommentAPIResponse,
    Error,
    IPatchPostCommentAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.comments.patch.fn({ params, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.comments.getAll.key({ params: { postId } }),
      });
    },
  });
  const { mutateAsync: deletePostCommentMutateAsync } = useMutation<
    IDeletePostCommentAPIResponse,
    Error,
    IDeletePostCommentAPIRequest
  >({
    mutationFn: ({ params }) => apis.posts.comments.delete.fn({ params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.comments.getAll.key({ params: { postId } }),
      });
    },
  });

  return {
    createPostCommentMutateAsync,
    patchPostCommentMutateAsync,
    deletePostCommentMutateAsync,
  };
};

export default usePostCommentMutations;
