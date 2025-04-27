import { useQueryClient } from "@tanstack/react-query";

import { $tempAPI } from "#fe/openapis";

const useMe = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = $tempAPI.useQuery(
    "get",
    "/apis/v1/users/me",
    undefined,
    { select: (data) => data.payload },
  );

  const logInMutation = $tempAPI.useMutation("post", "/apis/v1/auth/login", {
    onSuccess: ({ payload }) => {
      queryClient.setQueryData(
        $tempAPI.queryOptions("get", "/apis/v1/users/me").queryKey,
        { payload },
      );
    },
  });
  const logOutMutation = $tempAPI.useMutation("post", "/apis/v1/auth/logout", {
    onSuccess: () => {
      queryClient.setQueryData(
        $tempAPI.queryOptions("get", "/apis/v1/users/me").queryKey,
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
