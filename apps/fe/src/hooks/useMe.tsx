import { useMutation, useQuery } from "@tanstack/react-query";

import {
  apis,
  getMeAPI,
  PostLogInAPIRequest,
  PostLogInAPIResponse,
  PostLogOutAPIRequest,
  PostLogOutAPIResponse,
} from "#fe/apis";
import { getQueryClient } from "#fe/libs/getQueryClient";

const useMe = () => {
  const queryClient = getQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => getMeAPI(),
  });

  const mutation = useMutation({
    mutationFn: getMeAPI,
  });
  const { mutateAsync: logInMutate } = useMutation<
    PostLogInAPIResponse,
    Error,
    PostLogInAPIRequest
  >({
    mutationFn: ({ body }) => apis.auth.login.fn({ body }),
    onSuccess(user) {
      queryClient.setQueryData(["users", "me"], user);
    },
  });
  const { mutateAsync: logOutMutate } = useMutation<
    PostLogOutAPIResponse,
    Error,
    PostLogOutAPIRequest
  >({
    mutationFn: () => apis.auth.logout.fn(),
    onSuccess() {
      queryClient.setQueryData(["users", "me"], null);
    },
  });

  return {
    me: data,
    meIsLoading: isLoading,
    meMutation: mutation,
    logInMutate,
    logOutMutate,
    isLoggedIn: !!data,
    isLoggedOut: !data,
  };
};

export default useMe;
