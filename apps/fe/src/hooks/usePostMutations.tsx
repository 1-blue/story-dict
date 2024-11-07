import { useMutation } from "@tanstack/react-query";
import {
  apis,
  CheckUniqueTitleAPIRequest,
  CheckUniqueTitleAPIResponse,
  CreatePostAPIRequest,
  CreatePostAPIResponse,
  DeletePostAPIRequest,
  DeletePostAPIResponse,
  PatchPostAPIRequest,
  PatchPostAPIResponse,
} from "#fe/apis";

const usePostMutations = () => {
  const { mutateAsync: createPostMutate } = useMutation<
    CreatePostAPIResponse,
    Error,
    CreatePostAPIRequest
  >({
    mutationFn: ({ body }) => apis.posts.create.fn({ body }),
  });
  const { mutateAsync: patchPostMutate } = useMutation<
    PatchPostAPIResponse,
    Error,
    PatchPostAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.posts.patch.fn({ body, params }),
  });
  const { mutateAsync: deletePostMutate } = useMutation<
    DeletePostAPIResponse,
    Error,
    DeletePostAPIRequest
  >({
    mutationFn: ({ params }) => apis.posts.delete.fn({ params }),
  });
  const { mutateAsync: checkUniqueTitleMutate } = useMutation<
    CheckUniqueTitleAPIResponse,
    Error,
    CheckUniqueTitleAPIRequest
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
