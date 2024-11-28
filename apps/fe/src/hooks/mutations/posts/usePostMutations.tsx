import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apis,
  ICheckUniqueTitleAPIRequest,
  ICheckUniqueTitleAPIResponse,
  ICreatePostAPIRequest,
  ICreatePostAPIResponse,
  IDeletePostAPIRequest,
  IDeletePostAPIResponse,
  IPatchPostAPIRequest,
  IPatchPostAPIResponse,
} from "#fe/apis";
import { routes } from "#fe/constants";
import { revalidateTagForServer } from "#fe/actions/revalidateForServer";

const usePostMutations = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: createPostMutateAsync } = useMutation<
    ICreatePostAPIResponse,
    Error,
    ICreatePostAPIRequest
  >({
    mutationFn: ({ body }) => apis.posts.create.fn({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.getAll.key(),
      });

      revalidateTagForServer(apis.posts.getAll.key());

      router.replace(routes.post.url);
    },
  });
  const { mutateAsync: patchPostMutateAsync } = useMutation<
    IPatchPostAPIResponse,
    Error,
    IPatchPostAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.posts.patch.fn({ body, params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.getAll.key(),
      });

      revalidateTagForServer(apis.posts.getAll.key());

      router.replace(routes.post.url);
    },
  });
  const { mutateAsync: deletePostMutateAsync } = useMutation<
    IDeletePostAPIResponse,
    Error,
    IDeletePostAPIRequest
  >({
    mutationFn: ({ params }) => apis.posts.delete.fn({ params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.posts.getAll.key(),
      });

      router.replace(routes.post.url);
    },
  });
  const { mutateAsync: checkUniqueTitleMutateAsync } = useMutation<
    ICheckUniqueTitleAPIResponse,
    Error,
    ICheckUniqueTitleAPIRequest
  >({
    mutationFn: ({ body }) => apis.posts.checkUniqueTitle.fn({ body }),
  });

  return {
    createPostMutateAsync,
    patchPostMutateAsync,
    deletePostMutateAsync,
    checkUniqueTitleMutateAsync,
  };
};

export default usePostMutations;
