import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const params = useParams<{ title: string }>();

  const { mutateAsync: createPostReactionMutateAsync } = useMutation<
    ICreatePostReactionAPIResponse,
    Error,
    ICreatePostReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.reactions.create.fn({ params, body }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: apis.posts.getOneByTitle.key({ params }),
      });
    },
  });
  const { mutateAsync: patchPostReactionMutateAsync } = useMutation<
    IPatchPostReactionAPIResponse,
    Error,
    IPatchPostReactionAPIRequest
  >({
    mutationFn: ({ params, body }) =>
      apis.posts.reactions.patch.fn({ params, body }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: apis.posts.getOneByTitle.key({ params }),
      });
    },
  });
  const { mutateAsync: deletePostReactionMutateAsync } = useMutation<
    IDeletePostReactionAPIResponse,
    Error,
    IDeletePostReactionAPIRequest
  >({
    mutationFn: ({ params }) => apis.posts.reactions.delete.fn({ params }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: apis.posts.getOneByTitle.key({ params }),
      });
    },
  });

  return {
    createPostReactionMutateAsync,
    patchPostReactionMutateAsync,
    deletePostReactionMutateAsync,
  };
};

export default usePostReactionMutations;
