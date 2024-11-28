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
  const { mutateAsync: createImageMutateAsync } = useMutation<
    ICreateImageAPIResponse,
    Error,
    ICreateImageAPIRequest
  >({
    mutationFn: ({ body }) => apis.images.create.fn({ body }),
  });
  const { mutateAsync: patchImageMutateAsync } = useMutation<
    IPatchImageAPIResponse,
    Error,
    IPatchImageAPIRequest
  >({
    mutationFn: ({ body, params }) => apis.images.patch.fn({ body, params }),
  });
  const { mutateAsync: createPresignedURLMutateAsync } = useMutation<
    ICreatePresignedURLAPIResponse,
    Error,
    ICreatePresignedURLAPIRequest
  >({
    mutationFn: ({ body }) => apis.images.createPresignedURL.fn({ body }),
  });

  return {
    createImageMutateAsync,
    patchImageMutateAsync,
    createPresignedURLMutateAsync,
  };
};

export default useImageMutations;
