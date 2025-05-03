import { openapi } from "#fe/apis";

const useImageMutations = () => {
  const createPresignedURLMutation = openapi.useMutation(
    "post",
    "/apis/v1/images/presigned-url",
  );

  return {
    createPresignedURLMutation,
  };
};

export default useImageMutations;
