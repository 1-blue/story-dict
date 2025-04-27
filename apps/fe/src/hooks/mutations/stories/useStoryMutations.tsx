import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apis,
  ICheckUniqueTitleAPIRequest,
  ICheckUniqueTitleAPIResponse,
  ICreateStoryAPIRequest,
  ICreateStoryAPIResponse,
  IDeleteStoryAPIRequest,
  IDeleteStoryAPIResponse,
  IPatchStoryAPIRequest,
  IPatchStoryAPIResponse,
} from "#fe/apis";
import { routes } from "#fe/constants";
import { revalidateTagForServer } from "#fe/actions/revalidateForServer";

const useStoryMutations = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: createStoryMutateAsync } = useMutation<
    ICreateStoryAPIResponse,
    Error,
    ICreateStoryAPIRequest
  >({
    mutationFn: ({ body }) => apis.stories.create.fn({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.getAll.key(),
      });

      revalidateTagForServer(apis.stories.getAll.key());

      router.replace(routes.story.url);
    },
  });
  const { mutateAsync: patchStoryMutateAsync } = useMutation<
    IPatchStoryAPIResponse,
    Error,
    IPatchStoryAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.stories.patch.fn({ body, params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.getAll.key(),
      });

      revalidateTagForServer(apis.stories.getAll.key());

      router.replace(routes.story.url);
    },
  });
  const { mutateAsync: deleteStoryMutateAsync } = useMutation<
    IDeleteStoryAPIResponse,
    Error,
    IDeleteStoryAPIRequest
  >({
    mutationFn: ({ params }) => apis.stories.delete.fn({ params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: apis.stories.getAll.key(),
      });

      router.replace(routes.story.url);
    },
  });
  const { mutateAsync: checkUniqueTitleMutateAsync } = useMutation<
    ICheckUniqueTitleAPIResponse,
    Error,
    ICheckUniqueTitleAPIRequest
  >({
    mutationFn: ({ body }) => apis.stories.checkUniqueTitle.fn({ body }),
  });

  return {
    createStoryMutateAsync,
    patchStoryMutateAsync,
    deleteStoryMutateAsync,
    checkUniqueTitleMutateAsync,
  };
};

export default useStoryMutations;
