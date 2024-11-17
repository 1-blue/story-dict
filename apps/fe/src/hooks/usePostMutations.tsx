import { useMutation } from "@tanstack/react-query";
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

const usePostMutations = () => {
  const { mutateAsync: createPostMutate } = useMutation<
    ICreatePostAPIResponse,
    Error,
    ICreatePostAPIRequest
  >({
    mutationFn: ({ body }) => apis.posts.create.fn({ body }),
  });
  const { mutateAsync: patchPostMutate } = useMutation<
    IPatchPostAPIResponse,
    Error,
    IPatchPostAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.posts.patch.fn({ body, params }),
  });
  const { mutateAsync: deletePostMutate } = useMutation<
    IDeletePostAPIResponse,
    Error,
    IDeletePostAPIRequest
  >({
    mutationFn: ({ params }) => apis.posts.delete.fn({ params }),
  });
  const { mutateAsync: checkUniqueTitleMutate } = useMutation<
    ICheckUniqueTitleAPIResponse,
    Error,
    ICheckUniqueTitleAPIRequest
  >({
    mutationFn: ({ body }) => apis.posts.checkUniqueTitle.fn({ body }),
  });

  return {
    createPostMutate,
    patchPostMutate,
    deletePostMutate,
    checkUniqueTitleMutate,
  };
};

export default usePostMutations;
