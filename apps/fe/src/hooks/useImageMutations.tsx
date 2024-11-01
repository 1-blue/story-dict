import { useMutation } from "@tanstack/react-query";
import {
  apis,
  CreatePresignedURLAPIRequest,
  CreatePresignedURLAPIResponse,
  PatchImageAPIRequest,
  PatchImageAPIResponse,
  CreateImageAPIRequest,
  CreateImageAPIResponse,
} from "#fe/apis";

const useImageMutations = () => {
  const { mutateAsync: createImageMutate } = useMutation<
    CreateImageAPIResponse,
    Error,
    CreateImageAPIRequest
  >({
    mutationFn: ({ body }) => apis.images.create.fn({ body }),
  });
  const { mutateAsync: patchImageMutate } = useMutation<
    PatchImageAPIResponse,
    Error,
    PatchImageAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.images.patch.fn({ body, params }),
  });
  const { mutateAsync: createPresignedURLMutate } = useMutation<
    CreatePresignedURLAPIResponse,
    Error,
    CreatePresignedURLAPIRequest
  >({
    mutationFn: ({ body }) => apis.images.createPresignedURL.fn({ body }),
  });

  return { createImageMutate, patchImageMutate, createPresignedURLMutate };
};

export default useImageMutations;
