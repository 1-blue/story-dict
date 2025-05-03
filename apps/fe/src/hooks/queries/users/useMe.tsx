import { useQueryClient } from "@tanstack/react-query";

import { openapi } from "#fe/apis";

const useMe = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = openapi.useQuery(
    "get",
    "/apis/v1/users/me",
    undefined,
    { select: (data) => data.payload },
  );

  const logInMutation = openapi.useMutation("post", "/apis/v1/auth/login", {
    onSuccess: ({ payload }) => {
      queryClient.setQueryData(
        openapi.queryOptions("get", "/apis/v1/users/me").queryKey,
        { payload },
      );
    },
  });
  const logOutMutation = openapi.useMutation("post", "/apis/v1/auth/logout", {
    onSuccess: () => {
      queryClient.setQueryData(
        openapi.queryOptions("get", "/apis/v1/users/me").queryKey,
        { payload: null },
      );
    },
  });

  return {
    me: data,
    meIsLoading: isLoading,
    logInMutation,
    logOutMutation,
    isLoggedIn: !!data,
    isLoggedOut: !data,
  };
};

export default useMe;
