import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  apis,
  PostLogInAPIRequest,
  PostLogInAPIResponse,
  PostLogOutAPIRequest,
  PostLogOutAPIResponse,
} from "#fe/apis";

const useMe = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: apis.users.getMe.key(),
    queryFn: apis.users.getMe.fn,
  });

  const mutation = useMutation({
    mutationFn: apis.users.getMe.fn,
  });
  const { mutateAsync: logInMutate } = useMutation<
    PostLogInAPIResponse,
    Error,
    PostLogInAPIRequest
  >({
    mutationFn: ({ body }) => apis.auth.login.fn({ body }),
    onSuccess(user) {
      queryClient.setQueryData(apis.users.getMe.key(), user);
    },
  });
  const { mutateAsync: logOutMutate } = useMutation<
    PostLogOutAPIResponse,
    Error,
    PostLogOutAPIRequest
  >({
    mutationFn: apis.auth.logout.fn,
    onSuccess() {
      queryClient.setQueryData(apis.users.getMe.key(), null);
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
