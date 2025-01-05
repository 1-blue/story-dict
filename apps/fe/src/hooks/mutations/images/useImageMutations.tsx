import { useMutation } from "@tanstack/react-query";
import {
  apis,
  ICreatePresignedURLAPIRequest,
  ICreatePresignedURLAPIResponse,
  IPatchImageAPIRequest,
  IPatchImageAPIResponse,
} from "#fe/apis";

const useImageMutations = () => {
  const { mutateAsync: patchImageMutateAsync } = useMutation<
    IPatchImageAPIResponse,
    Error,
    IPatchImageAPIRequest
  >({
    mutationFn: ({ body }) => apis.images.patch.fn({ body }),
  });
  const { mutateAsync: createPresignedURLMutateAsync } = useMutation<
    ICreatePresignedURLAPIResponse,
    Error,
    ICreatePresignedURLAPIRequest
  >({
    mutationFn: ({ body }) => apis.images.createPresignedURL.fn({ body }),
  });

  return {
    patchImageMutateAsync,
    createPresignedURLMutateAsync,
  };
};

export default useImageMutations;
