import { useMutation } from "@tanstack/react-query";
import {
  apis,
  ICreatePresignedURLAPIRequest,
  ICreatePresignedURLAPIResponse,
  IPatchImageAPIRequest,
  IPatchImageAPIResponse,
  ICreateImageAPIRequest,
  ICreateImageAPIResponse,
} from "#fe/apis";

const useImageMutations = () => {
  const { mutateAsync: createImageMutate } = useMutation<
    ICreateImageAPIResponse,
    Error,
    ICreateImageAPIRequest
  >({
    mutationFn: ({ body }) => apis.images.create.fn({ body }),
  });
  const { mutateAsync: patchImageMutate } = useMutation<
    IPatchImageAPIResponse,
    Error,
    IPatchImageAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.images.patch.fn({ body, params }),
  });
  const { mutateAsync: createPresignedURLMutate } = useMutation<
    ICreatePresignedURLAPIResponse,
    Error,
    ICreatePresignedURLAPIRequest
  >({
    mutationFn: ({ body }) => apis.images.createPresignedURL.fn({ body }),
  });

  return { createImageMutate, patchImageMutate, createPresignedURLMutate };
};

export default useImageMutations;
