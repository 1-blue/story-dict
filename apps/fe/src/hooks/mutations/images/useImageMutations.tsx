import { $tempAPI } from "#fe/openapis";

const useImageMutations = () => {
  const createPresignedURLMutation = $tempAPI.useMutation(
    "post",
    "/apis/v1/images/presigned-url",
  );

  return {
    createPresignedURLMutation,
  };
};

export default useImageMutations;
