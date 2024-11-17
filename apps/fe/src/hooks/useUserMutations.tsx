import { useMutation } from "@tanstack/react-query";
import { apis, ICreateUserAPIRequest, ICreateUserAPIResponse } from "#fe/apis";

const useUserMutations = () => {
  const { mutateAsync: createUserMutate } = useMutation<
    ICreateUserAPIResponse,
    Error,
    ICreateUserAPIRequest
  >({
    mutationFn: ({ body }) => apis.users.create.fn({ body }),
  });

  return { createUserMutate };
};

export default useUserMutations;
