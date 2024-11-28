import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { apis, ICreateUserAPIRequest, ICreateUserAPIResponse } from "#fe/apis";
import { routes } from "#fe/constants";

const useUserMutations = () => {
  const router = useRouter();

  const { mutateAsync: createUserMutateAsync } = useMutation<
    ICreateUserAPIResponse,
    Error,
    ICreateUserAPIRequest
  >({
    mutationFn: ({ body }) => apis.users.create.fn({ body }),
    onSuccess() {
      router.replace(routes.post.url);
    },
  });

  return { createUserMutateAsync };
};

export default useUserMutations;
