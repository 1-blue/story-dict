import { useMutation } from "@tanstack/react-query";
import { apis, CreateUserAPIRequest, CreateUserAPIResponse } from "#fe/apis";

const useUserMutations = () => {
  const { mutateAsync: createUserMutate } = useMutation<
    CreateUserAPIResponse,
    Error,
    CreateUserAPIRequest
  >({
    mutationFn: ({ body }) => apis.users.create.fn({ body }),
  });

  return { createUserMutate };
};

export default useUserMutations;
